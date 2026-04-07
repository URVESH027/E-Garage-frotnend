import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import BookingSection from "../components/home/BookingSection";
import MyBookingsSection from "../components/home/MyBookingsSection";
import TrustSection from "../components/home/TrustSection";
import api from "../lib/api";

const fallbackServices = [
  {
    id: 1,
    name: "Oil Change",
    price: 800,
    description: "Fresh oil, filter replacement, and a quick engine health check.",
  },
  {
    id: 2,
    name: "Car Wash",
    price: 500,
    description: "Exterior foam wash and interior cleanup for an instant refresh.",
  },
  {
    id: 3,
    name: "Brake Check",
    price: 1200,
    description: "Brake inspection, pad condition check, and safety review.",
  },
  {
    id: 4,
    name: "Engine Service",
    price: 2500,
    description: "A deeper engine inspection with support for common performance issues.",
  },
];

const mapBackendBooking = (booking) => ({
  id: booking._id,
  customerName: booking.UserId
    ? `${booking.UserId.firstName || ""} ${booking.UserId.lastName || ""}`.trim()
    : "User",
  vehicle: booking.VehicleId?.VehicleName || "Vehicle",
  service: booking.ServiceId?.ServiceName || "Service",
  date: booking.BookingDate ? booking.BookingDate.split("T")[0] : "",
  status: booking.BookingStatus || "Pending",
  paymentStatus: booking.PaymentStatus || "Pending",
});

const Home = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!storedUser?._id;
  const [services] = useState(fallbackServices);
  const [selectedService, setSelectedService] = useState("Oil Change");
  const [name, setName] = useState(
    storedUser ? `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim() : ""
  );
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingsError, setBookingsError] = useState("");
  const [paymentReady, setPaymentReady] = useState(false);

  const selectedServiceData = useMemo(() => {
    return services.find((service) => service.name === selectedService) || services[0];
  }, [selectedService, services]);

  const loadUserBookings = async () => {
    if (!storedUser?._id) {
      setBookings([]);
      setBookingsError("");
      return;
    }

    setBookingsLoading(true);
    setBookingsError("");

    try {
      const response = await api.get(`/booking/user/${storedUser._id}`);
      const formattedBookings = (response.data || []).map(mapBackendBooking);
      setBookings(formattedBookings);
    } catch {
      setBookings([]);
      setBookingsError("We could not load your booking history right now.");
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    loadUserBookings();
  }, []);

  useEffect(() => {
    // Razorpay script is loaded from index.html, so we only need to check if it is available.
    setPaymentReady(typeof window !== "undefined" && !!window.Razorpay);
  }, []);

  const savePaidBooking = async (paymentResponse) => {
    const verificationResponse = await api.post("/payment/verify", {
      razorpay_order_id: paymentResponse.razorpay_order_id,
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      razorpay_signature: paymentResponse.razorpay_signature,
      bookingData: {
        UserId: storedUser._id,
        customerName: name,
        vehicleName: vehicle,
        vehicleModel: vehicle,
        vehicleType: "Car",
        serviceName: selectedServiceData.name,
        bookingDate: date,
        amount: selectedServiceData.price,
        description: selectedServiceData.description,
        notes: `Paid booking created from frontend by ${name}`,
      },
    });

    return verificationResponse.data;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!name || !vehicle || !date) {
      setMessage("Please fill all fields");
      return;
    }

    if (!paymentReady) {
      setMessage("Payment system is not ready yet. Please refresh the page.");
      return;
    }

    setSubmitting(true);

    try {
      const orderResponse = await api.post("/payment/create-order", {
        amount: selectedServiceData.price,
        serviceName: selectedServiceData.name,
      });

      const { order, key } = orderResponse.data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "E-Garage",
        description: `${selectedServiceData.name} booking payment`,
        order_id: order.id,
        handler: async (paymentResponse) => {
          try {
            await savePaidBooking(paymentResponse);
            setMessage("Service booked successfully");
            setVehicle("");
            setDate("");
            await loadUserBookings();

            navigate("/payment-success", {
              state: {
                paymentId: paymentResponse.razorpay_payment_id,
                serviceName: selectedServiceData.name,
              },
            });
          } catch (verifyError) {
            setMessage(
              verifyError.response?.data?.message || "Payment succeeded, but booking could not be saved."
            );
          } finally {
            setSubmitting(false);
          }
        },
        prefill: {
          name,
          email: storedUser?.email || "",
        },
        notes: {
          vehicle,
          bookingDate: date,
        },
        theme: {
          color: "#0f766e",
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setMessage("Payment was cancelled.");
          },
        },
      };

      const razorpayWindow = new window.Razorpay(options);
      razorpayWindow.open();
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed. Please try again.");
      setSubmitting(false);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/booking/${id}`);
      setBookings((current) => current.filter((booking) => booking.id !== id));
    } catch {
      setMessage("Could not delete booking.");
    }
  };

  return (
    <div className="min-h-screen text-slate-900">
      <Navbar isLoggedIn={isLoggedIn} />

      <HeroSection
        servicesCount={services.length}
        bookingsCount={bookings.length}
        selectedService={selectedService}
        selectedServiceData={selectedServiceData}
      />

      <main className="app-shell">
        <TrustSection />

        <ServicesSection services={services} setSelectedService={setSelectedService} />

        <BookingSection
          name={name}
          setName={setName}
          vehicle={vehicle}
          setVehicle={setVehicle}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          services={services}
          date={date}
          setDate={setDate}
          message={message}
          handleBooking={handleBooking}
          selectedServiceData={selectedServiceData}
          submitting={submitting}
          paymentReady={paymentReady}
        />

        {isLoggedIn && (
          <MyBookingsSection
            bookings={bookings}
            deleteBooking={deleteBooking}
            loading={bookingsLoading}
            error={bookingsError}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
