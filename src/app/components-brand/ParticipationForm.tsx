// app/components/ParticipationForm.tsx
"use client";

import { useParticipate } from "@/custom-hooks/mutations";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Success Modal Component
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    shortCode: string;
  } | null;
  totalTickets: number;
}

function SuccessModal({
  isOpen,
  onClose,
  ticket,
  totalTickets,
}: SuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Enhanced Backdrop */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-emerald-900/20 backdrop-blur-md transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Modal Card */}
      <div
        className={`relative w-full max-w-lg transform transition-all duration-500 ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-10"
        }`}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] rounded-3xl blur-xl opacity-20" />

        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] p-8 text-center relative overflow-hidden">
            {/* Animated Rings */}
            <div className="absolute -top-20 -right-20 w-40 h-40 border-2 border-white/10 rounded-full animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 border-2 border-white/10 rounded-full animate-pulse" />

            {/* Success Icon */}
            <div className="relative mx-auto w-20 h-20 mb-4">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
              <div className="relative flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg">
                <svg
                  className="w-10 h-10 text-[var(--brand-br1)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-2">
              Congratulations!
            </h3>
            <p className="text-white/90 text-lg">
              You&apos;re officially in the event!
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Ticket Code */}
            <div className="text-center space-y-2">
              <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Your Ticket Code
              </p>
              <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-2xl font-mono font-bold text-gray-800 tracking-wider">
                  {ticket?.shortCode}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">
                  #{500 + totalTickets}
                </div>
                <div className="text-sm text-blue-600/80 font-medium">
                  Your Position
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">
                  {/* {totalTickets} */}
                  15
                </div>
                <div className="text-sm text-emerald-600/80 font-medium">
                  {/* Total Participants */}
                  Days to Go
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={onClose}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-white bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative">Awesome! Let&apos;s Go</span>
                <svg
                  className="ml-2 w-4 h-4 relative transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations to your global CSS */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}

// Participation Form Component
export default function ParticipationForm() {
  const { isSignedIn, user } = useUser();
  // Use `useAuth()` to access the `getToken()` method
  const { getToken } = useAuth();
  const participateMutation = useParticipate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    shopped: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [countryCode, setCountryCode] = useState("+973"); // default Bahrain
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState<{ shortCode: string } | null>(
    null
  ); // Replace with proper ticket type
  const [totalTickets, setTotalTickets] = useState(0);

  const countryOptions = [
    { code: "+973", label: "🇧🇭" }, // Bahrain
    { code: "+965", label: "🇰🇼" }, // Kuwait
    { code: "+968", label: "🇴🇲" }, // Oman
    { code: "+974", label: "🇶🇦" }, // Qatar
    { code: "+966", label: "🇸🇦" }, // Saudi
    { code: "+971", label: "🇦🇪" }, // UAE
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      return toast.error("Please Sign In first");
    }
    if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) return;
    if (!acceptedTerms) {
      return toast.error("Please accept the Terms and Conditions");
    }

    const token = await getToken();

    // Use toast.promise for loader toast
    toast.promise(
      participateMutation.mutateAsync({
        brandId: "88a1603d-67ec-4f95-adc5-072dcefc63fa",
        eventId: "386e4d08-0b04-45d5-9c1c-a4b675826f4e",
        email: user.primaryEmailAddress?.emailAddress,
        fullName: formData.fullName,
        phone: `${countryCode}${formData.phone}`,
        purchasedBefore: formData.shopped === "yes",
        token: token,
      }),
      {
        loading: "Submitting your participation...",
        success: (data) => {
          console.log("data: ", data);
          setTicketData(data.data.ticket);
          setTotalTickets(data.data.totalTickets);
          setIsModalOpen(true);
          return "Participated successfully!";
        },
        error: (err) => {
          try {
            const errorData = JSON.parse(err.message);
            const backendError = errorData.body;

            if (backendError.message === "invalid_email")
              return "Please enter a valid email";
            if (backendError.message === "already_participated")
              return "You've already participated";
            if (backendError.message === "invalid_phone")
              return "Please enter a valid phone number";
            return backendError.error || "Something went wrong";
          } catch {
            return "Something went wrong";
          }
        },
      }
    );
  };

  return (
    <div className="cp-x cp-y">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Join the Event
        </h2>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-[var(--brand-br1)]"
          />
        </div>

        {/* Email (readonly) */}
        {isSignedIn && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.primaryEmailAddress?.emailAddress || ""}
              readOnly
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        )}

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="flex">
            {/* Country Code Dropdown */}
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="pl-3 py-2 border border-gray-300 text-gray-700 rounded-l-lg bg-white focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-[var(--brand-br1)]"
            >
              {countryOptions.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label} {c.code}
                </option>
              ))}
            </select>

            {/* Phone Input */}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{7,15}" // only digits, 7-15 length
              placeholder="Enter phone number"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-[var(--brand-br1)]"
            />
          </div>
        </div>

        {/* Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Have you shopped from brandxyz.com?
          </label>
          <select
            name="shopped"
            value={formData.shopped}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-[var(--brand-br1)]"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{" "}
            <a
              href="/terms"
              target="_blank"
              className="text-[var(--brand-br1)] underline"
            >
              Terms and Conditions
            </a>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!acceptedTerms}
          className={`w-full py-2 px-4 rounded-lg font-medium transition ${
            acceptedTerms
              ? "bg-[var(--brand-br1)] text-white hover:bg-[var(--brand-br2)]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Participate Now
        </button>
      </form>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={ticketData}
        totalTickets={totalTickets}
      />
    </div>
  );
}
