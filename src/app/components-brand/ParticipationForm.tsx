// app/components/ParticipationForm.tsx
"use client";

import { useParticipate } from "@/custom-hooks/mutations";
import { useAuth, useUser } from "@clerk/nextjs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import Confetti from "react-confetti";

// Success Modal Component
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    shortCode: string;
  } | null; // Replace with proper ticket type
  totalTickets: number;
}

function SuccessModal({
  isOpen,
  onClose,
  ticket,
  totalTickets,
}: SuccessModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                  recycle={false}
                  numberOfPieces={200}
                  className="absolute inset-0"
                />
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-gray-900 text-center"
                >
                  Congratulations!
                </Dialog.Title>
                <div className="mt-4 text-center">
                  <p className="text-lg text-gray-600">
                    You&apos;ve successfully participated in the event!
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Your ticket code:{" "}
                    <span className="font-semibold text-[var(--brand-br1)]">
                      {ticket?.shortCode}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Total participants:{" "}
                    <span className="font-semibold text-[var(--brand-br1)]">
                      {500 + totalTickets}
                    </span>
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg bg-[var(--brand-br1)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brand-br2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-br1)]"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
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
