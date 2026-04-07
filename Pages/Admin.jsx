import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaCalendarCheck,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTools,
  FaUsers
} from "react-icons/fa";
import api from "../lib/api";
import StatusBadge from "../components/common/StatusBadge";

const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt /> },
  { name: "Manage Services", icon: <FaTools /> },
  { name: "Bookings", icon: <FaCalendarCheck /> },
  { name: "Customers", icon: <FaUsers /> },
  { name: "Reports", icon: <FaChartLine /> },
  { name: "Settings", icon: <FaCog /> },
];

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toISOString().split("T")[0];
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem("user") || "null");
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookingFilter, setBookingFilter] = useState("All");

  const loadAdminData = async () => {
    setLoading(true);
    setError("");

    try {
      const [servicesRes, bookingsRes, usersRes] = await Promise.all([
        api.get("/service"),
        api.get("/booking"),
        api.get("/user/user"),
      ]);

      setServices(servicesRes.data || []);
      setBookings(bookingsRes.data || []);
      setUsers(usersRes.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!adminUser || adminUser.role !== "admin") {
      navigate("/login");
      return;
    }

    loadAdminData();
  }, []);

  const customerRows = useMemo(() => {
    return users.map((user) => ({
      id: user._id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.email,
      role: user.role,
      status: user.status,
    }));
  }, [users]);

  const totalRevenue = useMemo(() => {
    return bookings.reduce((total, booking) => {
      return total + (booking.ServiceId?.ServiceCost || 0);
    }, 0);
  }, [bookings]);

  const pendingCount = useMemo(() => {
    return bookings.filter((booking) => booking.BookingStatus === "Pending").length;
  }, [bookings]);

  const approvedCount = useMemo(() => {
    return bookings.filter((booking) => booking.BookingStatus === "Approved").length;
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (bookingFilter === "All") return bookings;
    return bookings.filter((booking) => booking.BookingStatus === bookingFilter);
  }, [bookings, bookingFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/booking/${id}`, { BookingStatus: newStatus });
      setBookings((current) =>
        current.map((booking) =>
          booking._id === id ? { ...booking, BookingStatus: newStatus } : booking
        )
      );
    } catch {
      setError("Unable to update booking status.");
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await api.delete(`/service/${id}`);
      setServices((current) => current.filter((service) => service._id !== id));
    } catch {
      setError("Unable to delete service.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const renderLoadingOrError = () => {
    if (loading) {
      return (
        <div className="garage-panel rounded-3xl p-8 text-sm font-semibold text-white/70">
          Loading admin dashboard...
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-3xl bg-rose-500/12 p-8 text-sm font-semibold text-rose-300 shadow-sm">
          {error}
        </div>
      );
    }

    return null;
  };

  const renderContent = () => {
    const stateBox = renderLoadingOrError();
    if (stateBox) return stateBox;

    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="animate-fade-in-up">
            <h2 className="mb-6 text-4xl font-black text-white">Overview</h2>

            <div className="mb-8 grid gap-6 md:grid-cols-4">
              <div className="garage-panel rounded-3xl p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/45">Revenue</p>
                <p className="mt-3 text-3xl font-black text-white">Rs. {totalRevenue}</p>
              </div>
              <div className="garage-panel rounded-3xl p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/45">Bookings</p>
                <p className="mt-3 text-3xl font-black text-white">{bookings.length}</p>
              </div>
              <div className="garage-panel rounded-3xl p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/45">Pending</p>
                <p className="mt-3 text-3xl font-black text-[#ff9d3f]">{pendingCount}</p>
              </div>
              <div className="rounded-3xl border border-[#ff7a00]/20 bg-[linear-gradient(135deg,#ff8a1f,#ff6a00)] p-6 text-white shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/75">Approved</p>
                <p className="mt-3 text-3xl font-black">{approvedCount}</p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="garage-panel rounded-3xl">
                <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
                  <span className="text-sm font-semibold text-white/72">Recent Bookings</span>
                  <button
                    onClick={() => setActiveTab("Bookings")}
                    className="text-sm font-semibold text-[#ff9d3f] hover:text-[#ffb777]"
                  >
                    View All
                  </button>
                </div>
                <div className="divide-y divide-white/8">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <p className="font-bold text-white">
                          {booking.UserId
                            ? `${booking.UserId.firstName || ""} ${booking.UserId.lastName || ""}`.trim()
                            : "User"}
                        </p>
                        <p className="text-sm text-white/55">
                          {booking.VehicleId?.VehicleName || "Vehicle"} | {booking.ServiceId?.ServiceName || "Service"}
                        </p>
                      </div>
                      <StatusBadge status={booking.BookingStatus} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="garage-panel rounded-3xl p-6">
                <h3 className="text-2xl font-black text-white">Quick Summary</h3>
                <div className="mt-5 grid gap-4">
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="text-sm text-white/45">Registered Customers</p>
                    <p className="mt-2 text-2xl font-black text-white">{users.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="text-sm text-white/45">Service Records</p>
                    <p className="mt-2 text-2xl font-black text-white">{services.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Manage Services":
        return (
          <div className="animate-fade-in-up">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-4xl font-black text-white">Service Records</h2>
              <button
                onClick={loadAdminData}
                className="garage-button rounded-xl px-4 py-2 text-white transition"
              >
                Refresh
              </button>
            </div>

            <div className="grid gap-4">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="garage-panel rounded-3xl p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-white/45">
                        {formatDate(service.ServiceDate)}
                      </p>
                      <h3 className="mt-2 text-3xl font-black text-white">
                        {service.ServiceName}
                      </h3>
                      <p className="mt-2 text-sm text-white/62">{service.Description}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-[#ff7a00]/20 bg-[#ff7a00]/10 px-4 py-2 text-sm font-bold text-[#ffb777]">
                        Rs. {service.ServiceCost}
                      </span>
                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="rounded-full bg-rose-500/12 px-4 py-2 text-sm font-bold text-rose-300 transition hover:bg-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Bookings":
        return (
          <div className="animate-fade-in-up">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-4xl font-black text-white">Manage Bookings</h2>
              <div className="flex flex-wrap gap-2">
                {["All", "Pending", "Approved", "Rejected"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setBookingFilter(status)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      bookingFilter === status
                        ? "bg-[#ff7a00] text-white"
                        : "bg-white/5 text-white/70 shadow-sm hover:bg-white/10"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="garage-panel rounded-3xl p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-2xl font-black text-white">
                        {booking.UserId
                          ? `${booking.UserId.firstName || ""} ${booking.UserId.lastName || ""}`.trim()
                          : "User"}
                      </p>
                      <p className="mt-1 text-sm text-white/55">
                        {booking.VehicleId?.VehicleName || "Vehicle"} | {booking.ServiceId?.ServiceName || "Service"}
                      </p>
                      <p className="mt-1 text-sm text-white/55">
                        Date: {formatDate(booking.BookingDate)}
                      </p>
                      {booking.Notes && (
                        <p className="mt-2 text-sm text-white/62">Notes: {booking.Notes}</p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={booking.BookingStatus} />
                      <button
                        onClick={() => handleStatusChange(booking._id, "Approved")}
                        className="rounded-full bg-emerald-500/12 px-4 py-2 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(booking._id, "Rejected")}
                        className="rounded-full bg-rose-500/12 px-4 py-2 text-sm font-bold text-rose-300 transition hover:bg-rose-500/20"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredBookings.length === 0 && (
                <div className="garage-panel rounded-3xl p-8 text-sm font-semibold text-white/60">
                  No bookings found for the selected status.
                </div>
              )}
            </div>
          </div>
        );

      case "Customers":
        return (
          <div className="animate-fade-in-up">
            <h2 className="mb-6 text-4xl font-black text-white">Customers</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {customerRows.map((customer) => (
                <div key={customer.id} className="garage-panel rounded-3xl p-6">
                  <p className="text-2xl font-black text-white">{customer.name || "Customer"}</p>
                  <p className="mt-2 text-sm text-white/55">{customer.email}</p>
                  <div className="mt-4 flex gap-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/70">
                      {customer.role}
                    </span>
                    <span className="rounded-full border border-[#ff7a00]/20 bg-[#ff7a00]/10 px-3 py-1 text-xs font-bold text-[#ffb777]">
                      {customer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "Reports":
        return (
          <div className="animate-fade-in-up">
            <h2 className="mb-6 text-4xl font-black text-white">Reports</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="garage-panel rounded-3xl p-6">
                <p className="text-sm text-white/45">Total service records</p>
                <p className="mt-3 text-3xl font-black text-white">{services.length}</p>
              </div>
              <div className="garage-panel rounded-3xl p-6">
                <p className="text-sm text-white/45">Total bookings</p>
                <p className="mt-3 text-3xl font-black text-white">{bookings.length}</p>
              </div>
              <div className="garage-panel rounded-3xl p-6">
                <p className="text-sm text-white/45">Active customers</p>
                <p className="mt-3 text-3xl font-black text-white">{users.length}</p>
              </div>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="animate-fade-in-up">
            <h2 className="mb-6 text-4xl font-black text-white">Settings</h2>
            <div className="garage-panel rounded-3xl p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/45">Admin Profile</p>
              <h3 className="mt-3 text-3xl font-black text-white">
                {adminUser ? `${adminUser.firstName || ""} ${adminUser.lastName || ""}`.trim() : "Admin"}
              </h3>
              <p className="mt-2 text-sm text-white/62">{adminUser?.email || "admin@egarage.com"}</p>
              <button
                onClick={loadAdminData}
                className="garage-button mt-6 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition"
              >
                Sync Dashboard Data
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090b] font-sans text-white">
      <aside
        className={`${collapsed ? "w-20" : "w-64"} z-20 flex shrink-0 flex-col border-r border-white/8 bg-[#101114] text-slate-300 shadow-2xl transition-all duration-300`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff9d3f]">E-Garage</span>
              <span className="text-xl font-black tracking-tight text-white">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <FaBars size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {menuItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`group flex w-full cursor-pointer items-center gap-4 rounded-xl px-3 py-3 transition-all duration-200 ${
                  isActive ? "bg-[#ff7a00] text-white shadow-md" : "hover:bg-white/10 hover:text-white"
                }`}
                title={collapsed ? item.name : ""}
              >
                <div className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-white"} shrink-0 text-lg`}>
                  {item.icon}
                </div>
                {!collapsed && <span className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">{item.name}</span>}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className={`flex w-full items-center justify-center gap-3 rounded-xl py-3 text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-400 ${collapsed ? "px-0" : "px-4"}`}
            title={collapsed ? "Logout" : ""}
          >
            <FaSignOutAlt />
            {!collapsed && <span className="font-semibold">Sign Out</span>}
          </button>
        </div>
      </aside>

      <main className="relative flex flex-1 flex-col overflow-hidden">
        <div className="shrink-0 border-b border-white/8 bg-[#111214] px-6 py-4 shadow-sm md:px-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm font-semibold text-white/55">
              <Link to="/" className="transition hover:text-[#ff9d3f]">View Live Website</Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-white">Admin User</p>
                <p className="text-xs text-white/45">{adminUser?.email || "admin@egarage.com"}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff7a00] font-bold text-white shadow-sm">
                A
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl p-6 pb-20 md:p-10">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
