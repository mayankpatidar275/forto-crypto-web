// app/components/ParticipationForm.tsx
"use client";

import { useParticipate } from "@/custom-hooks/mutations";
import { useEventById } from "@/custom-hooks/queries";
import { SignUpButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
            {/* <div className="grid grid-cols-2 gap-4"> */}
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                #{500 + totalTickets}
              </div>
              <div className="text-sm text-blue-600/80 font-medium">
                Your Position
              </div>
            </div>
            {/* <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">
                  15
                </div>
                <div className="text-sm text-emerald-600/80 font-medium">
                  Days to Go
                </div>
              </div> */}
            {/* </div> */}

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
export default function ParticipationForm() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const participateMutation = useParticipate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    shopped: "",
  });
  const {
    data: event,
    isLoading: isLoadingEvent,
    error,
  } = useEventById("386e4d08-0b04-45d5-9c1c-a4b675826f4e");

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [countryCode, setCountryCode] = useState("+971");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState<{ shortCode: string } | null>(
    null
  );
  const [totalTickets, setTotalTickets] = useState(0);
  const router = useRouter();

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
    if (!isSignedIn) return toast.error("Please Sign In first");
    if (!acceptedTerms)
      return toast.error("Please accept the Terms and Conditions");

    const token = await getToken();

    toast.promise(
      participateMutation.mutateAsync({
        brandId: "88a1603d-67ec-4f95-adc5-072dcefc63fa",
        eventId: "386e4d08-0b04-45d5-9c1c-a4b675826f4e",
        drawId: "e2bcdcfd-5c05-4007-b38f-44a9b9cf5cb9",
        email: user?.primaryEmailAddress?.emailAddress || "",
        fullName: formData.fullName,
        phone: `${countryCode}${formData.phone}`,
        purchasedBefore: formData.shopped === "yes",
        token: token,
      }),
      {
        loading: "Submitting your participation...",
        success: (data) => {
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

  if (isLoadingEvent) {
    <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (!event || !event.data || !event.data.status) {
    return <div>Event not found</div>;
  }
  console.log("event: ", event);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 cp-x cp-y">
      <div className="max-w-lg mx-auto">
        {/* Header */}(
        {event.data.status !== "ACTIVE" ? (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] bg-clip-text text-transparent mb-3">
              Event Ended
            </h1>
            <p className="text-gray-600 text-lg">
              This event is not active any more
            </p>
          </div>
        ) : isSignedIn ? (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] bg-clip-text text-transparent mb-3">
              Join the Event
            </h1>
            <p className="text-gray-600 text-lg">
              Complete your registration to participate
            </p>
          </div>
        ) : (
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] bg-clip-text text-transparent mb-3">
              Sign in to Join
            </h1>
            <div className="flex mx-auto justify-center">
              <SignUpButton>
                <button className="btn-primary">Sign Up/In</button>
              </SignUpButton>
            </div>
          </div>
        )}
        ){/* Form Card */}
        {
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] rounded-3xl blur-xl opacity-10" />
            {(!isSignedIn || event.data.status !== "ACTIVE") && (
              <div className="bg-background opacity-25 w-full h-full absolute z-50 rounded-3xl flex justify-center items-center"></div>
            )}
            <form
              onSubmit={handleSubmit}
              className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-8 space-y-6"
            >
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-gray-700 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              {isSignedIn && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={user?.primaryEmailAddress?.emailAddress || ""}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-100/50 border border-gray-200 rounded-xl text-gray-600 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                  Phone Number
                </label>
                <div className="flex gap-3">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-24 sm:w-28 px-1 sm:px-3 py-3 text-gray-700 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200"
                  >
                    {countryOptions.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{7,15}"
                    placeholder="Phone number"
                    className="flex-1 px-4 py-3 w-2 bg-white/50 border text-gray-700 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Shopping Experience */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                  Have you shopped from brandxyz.com?
                </label>
                <select
                  name="shopped"
                  value={formData.shopped}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/50 text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200"
                >
                  <option value="" disabled>
                    Select your experience
                  </option>
                  <option value="yes">Yes, I&apos;ve shopped before</option>
                  <option value="no">No, first time</option>
                </select>
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[var(--brand-br1)] bg-white border-gray-300 rounded focus:ring-[var(--brand-br1)]"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 flex-1">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-[var(--brand-br1)] font-semibold hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!acceptedTerms}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                  acceptedTerms
                    ? "bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {participateMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </div>
                ) : (
                  "Participate Now 🎉"
                )}
              </button>
            </form>
          </div>
        }
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => {
          router.push("/");
          setIsModalOpen(false);
        }}
        ticket={ticketData}
        totalTickets={totalTickets}
      />
    </div>
  );
}
