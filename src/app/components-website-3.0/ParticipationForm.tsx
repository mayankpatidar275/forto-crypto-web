// app/components/ParticipationForm.tsx
"use client";

import { useParticipate } from "@/custom-hooks/mutations";
import { useEventById, useUserParticipation } from "@/custom-hooks/queries";
import { useAuth, useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components-brand/ui/Loader";

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

  // Clerk authentication hooks
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    shopped: "",
    email: "",
    gender: "",
    shoppingWebsite: "",
  });

  const [authStep, setAuthStep] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState("");

  const eventId = "386e4d08-0b04-45d5-9c1c-a4b675826f4e";
  const drawId = "e2bcdcfd-5c05-4007-b38f-44a9b9cf5cb9";

  const {
    data: event,
    isLoading: isLoadingEvent,
    error: eventError,
  } = useEventById(eventId);

  const {
    data: participationData,
    isLoading: isLoadingParticipation,
    error: participationError,
  } = useUserParticipation(drawId);

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

  // Check if user has already participated
  const hasParticipated = participationData?.data?.hasParticipated || true;
  const userTicket = participationData?.data?.ticket;

  console.log("has participated: ", hasParticipated);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (hasParticipated) return; // Prevent changes if already participated
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle email submission for sign in/sign up
  const handleEmailSubmit = async () => {
    setAuthError("");

    if (!formData.email) {
      setAuthError("Please enter your email address");
      return;
    }

    setIsVerifying(true);

    try {
      // First try to sign in
      if (signIn) {
        const signInAttempt = await signIn.create({
          identifier: formData.email,
        });

        // If user exists, prepare for first factor verification (email code)
        if (
          signInAttempt.supportedFirstFactors?.find(
            (f) => f.strategy === "email_code"
          )
        ) {
          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId:
              signInAttempt.supportedFirstFactors.find(
                (f) => f.strategy === "email_code"
              )?.emailAddressId ?? "",
          });
          setAuthStep("otp");
        }
      }
    } catch (signInError: unknown) {
      const err = signInError as ClerkError;
      // If user doesn't exist, try to sign up
      if (err.errors?.[0]?.code === "form_identifier_not_found") {
        try {
          if (signUp) {
            await signUp.create({
              emailAddress: formData.email,
            });

            await signUp.prepareEmailAddressVerification({
              strategy: "email_code",
            });
            setAuthStep("otp");
          }
        } catch (signUpError: unknown) {
          const signUpErr = signUpError as ClerkError;
          setAuthError(
            signUpErr.errors?.[0]?.message || "Failed to create account"
          );
        }
      } else {
        setAuthError(err.errors?.[0]?.message || "Authentication failed");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async () => {
    if (!otp) {
      setAuthError("Please enter the verification code");
      return;
    }

    setIsVerifying(true);
    setAuthError("");

    try {
      // Try sign in first
      if (signIn) {
        const signInAttempt = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: otp,
        });

        if (signInAttempt.status === "complete" && setActive) {
          await setActive({ session: signInAttempt.createdSessionId });
          return;
        }
      }
    } catch (signInError: unknown) {
      const _err = signInError as ClerkError;
      console.log("Error in signIn: ", _err);
      // If sign in fails, try sign up
      try {
        if (signUp) {
          const signUpAttempt = await signUp.attemptEmailAddressVerification({
            code: otp,
          });

          if (signUpAttempt.status === "complete") {
            await setActive({ session: signUpAttempt.createdSessionId });
          }
        }
      } catch (signUpError: unknown) {
        const signUpErr = signUpError as ClerkError;
        setAuthError(
          signUpErr.errors?.[0]?.message || "Invalid verification code"
        );
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      setAuthError("Please complete email verification first");
      return;
    }
    if (!acceptedTerms)
      return toast.error("Please accept the Terms and Conditions");

    const token = await getToken();

    toast.promise(
      participateMutation.mutateAsync({
        brandId: "88a1603d-67ec-4f95-adc5-072dcefc63fa",
        eventId: "386e4d08-0b04-45d5-9c1c-a4b675826f4e",
        drawId: "e2bcdcfd-5c05-4007-b38f-44a9b9cf5cb9",
        email: user?.primaryEmailAddress?.emailAddress ?? formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: `${countryCode}${formData.phone}`,
        purchasedBefore: formData.shopped === "yes",
        gender: formData.gender, // Add this line
        shoppingWebsite: formData.shoppingWebsite, // Add this line
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

  // Reset auth state when signed in
  useEffect(() => {
    if (isSignedIn) {
      setAuthStep("otp"); // Keep OTP step visible but show verified state
    }
  }, [isSignedIn]);

  if (isLoadingEvent || (isSignedIn && isLoadingParticipation)) {
    return (
      <div className="flex justify-center items-center mt-30">
        <Loader />
      </div>
    );
  }

  if (eventError || participationError) {
    return (
      <div className="flex justify-center items-center mt-30">
        Oops! Something went wrong
      </div>
    );
  }

  if (!event || !event.data || !event.data.status) {
    return (
      <div className="flex justify-center items-center mt-30">
        Oops! Something went wrong
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 cp-x cp-y">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        {event.data.status !== "ACTIVE" ? (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] bg-clip-text text-transparent mb-3">
              Event Ended
            </h1>
            <p className="text-gray-600 text-lg">
              This event is not active any more
            </p>
          </div>
        ) : (
          <div className="text-center mb-8">
            {/* Already participated message */}
            {hasParticipated && (
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] bg-clip-text text-transparent mb-3">
                  Already Participated!
                </h1>
                <p className="text-gray-600 text-lg">
                  Check the ticket in your profile
                  {userTicket && (
                    <p className="text-blue-600 text-sm mt-1">
                      Your ticket code: <strong>{userTicket.shortCode}</strong>
                    </p>
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Form Card */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] rounded-3xl blur-xl opacity-10" />

          {/* NEW: Gray overlay if event ended OR user already participated */}
          {(event.data.status !== "ACTIVE" || hasParticipated) && (
            <div className="bg-background opacity-25 w-full h-full absolute z-50 rounded-3xl flex justify-center items-center"></div>
          )}
          <form
            onSubmit={handleSubmit}
            className={`relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-8 space-y-6 ${
              hasParticipated ? "opacity-60" : ""
            }`}
          >
            {/* First Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={hasParticipated}
                  className="w-full px-4 py-3 text-gray-700 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={hasParticipated}
                  className="w-full px-4 py-3 text-gray-700 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                disabled={hasParticipated}
                className="w-full px-4 py-3 bg-white/50 text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Email Authentication - Only show if not already participated */}
            {!hasParticipated && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                  Email Address
                </label>

                {authStep === "email" && !isSignedIn && (
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 text-gray-700 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleEmailSubmit}
                      disabled={isVerifying}
                      className="w-full py-3 px-6 bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isVerifying ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending Code...
                        </div>
                      ) : (
                        "Send Verification Code"
                      )}
                    </button>
                  </div>
                )}

                {authStep === "otp" && !isSignedIn && (
                  <div className="space-y-3">
                    <div className="flex gap-2 overflow-hidden">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="flex-1 w-4 px-0 py-3 text-gray-700 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 placeholder-gray-400 text-center text-lg font-mono"
                        placeholder="6-digit code"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={handleOtpSubmit}
                        disabled={isVerifying}
                        className="px-6 py-3 bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
                      >
                        {isVerifying ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                          </div>
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      We sent a code to <strong>{formData.email}</strong>
                      <button
                        type="button"
                        onClick={() => setAuthStep("email")}
                        className="ml-2 text-[var(--brand-br1)] font-semibold hover:underline"
                      >
                        Change email
                      </button>
                    </p>
                  </div>
                )}

                {isSignedIn && (
                  <div className="relative">
                    <input
                      type="email"
                      value={user?.primaryEmailAddress?.emailAddress || ""}
                      readOnly
                      className="w-full px-4 py-3 bg-green-50/50 border border-green-200 rounded-xl text-gray-700"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                        Verified ✓
                      </span>
                    </div>
                  </div>
                )}

                {authError && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {authError}
                  </div>
                )}
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
                  onChange={(e) =>
                    !hasParticipated && setCountryCode(e.target.value)
                  }
                  disabled={hasParticipated}
                  className="w-24 sm:w-28 px-1 sm:px-3 py-3 text-gray-700 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  disabled={hasParticipated}
                  className="flex-1 px-4 py-3 w-2 bg-white/50 border text-gray-700 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={hasParticipated}
                className="w-full px-4 py-3 bg-white/50 text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled>
                  Select your experience
                </option>
                <option value="yes">Yes, I&apos;ve shopped before</option>
                <option value="no">No, first time</option>
              </select>
            </div>

            {/* Shopping Websites */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 tracking-wide">
                Which website do you usually shop from?
              </label>
              <select
                name="shoppingWebsite"
                value={formData.shoppingWebsite}
                onChange={handleChange}
                required
                disabled={hasParticipated}
                className="w-full px-4 py-3 bg-white/50 text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled>
                  Select your preferred shopping website
                </option>
                <option value="centerpoint">CenterPoint</option>
                <option value="namshi">Namshi</option>
                <option value="ounass">Ounass</option>
                <option value="brands for less">Brands for Less</option>
                <option value="styli">Styli</option>
              </select>
            </div>

            {/* Terms - Only show if not already participated */}
            {!hasParticipated && (
              <div className="flex items-start space-x-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  disabled={hasParticipated}
                  className="mt-1 w-4 h-4 text-[var(--brand-br1)] bg-white border-gray-300 rounded focus:ring-[var(--brand-br1)] disabled:opacity-50"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 flex-1">
                  I agree to participation terms
                  {/* <a
                  href="/terms"
                  target="_blank"
                  className="text-[var(--brand-br1)] font-semibold hover:underline"
                >
                  Terms and Conditions
                </a> */}
                </label>
              </div>
            )}

            {/* Submit Button */}
            {!hasParticipated ? (
              <button
                type="submit"
                disabled={!acceptedTerms || !isSignedIn || hasParticipated}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                  acceptedTerms && isSignedIn && !hasParticipated
                    ? "bg-gradient-to-r from-[var(--brand-br1)] to-[var(--brand-br2)] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {!isSignedIn ? (
                  "Complete Email Verification First"
                ) : participateMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </div>
                ) : (
                  "Participate Now 🎉"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => router.push("/my-profile")}
                className="w-full py-4 px-6 bg-gray-500 text-white rounded-xl font-semibold text-lg hover:bg-gray-600 transition-all duration-300"
              >
                View My Profile & Tickets
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => {
          router.push("/my-profile");
          setIsModalOpen(false);
        }}
        ticket={ticketData}
        totalTickets={totalTickets}
      />
    </div>
  );
}

export interface ClerkError {
  errors: Array<{
    code: string;
    message: string;
  }>;
}
