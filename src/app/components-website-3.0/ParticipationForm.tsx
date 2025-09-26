// app/components/ParticipationForm.tsx
"use client";

import { useParticipate } from "@/custom-hooks/mutations";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) return;
    const token = await getToken();
    participateMutation.mutate({
      brandId: "88a1603d-67ec-4f95-adc5-072dcefc63fa",
      eventId: "386e4d08-0b04-45d5-9c1c-a4b675826f4e",
      email: user?.primaryEmailAddress?.emailAddress,
      fullName: formData.fullName,
      phone: formData.phone,
      purchasedBefore: formData.shopped === "yes" ? true : false,
      token: token,
    });

    console.log({
      fullName: formData.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      phone: formData.phone,
      shopped: formData.shopped,
    });
    // TODO: send data to backend
  };

  if (!isSignedIn) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Please sign in to participate
        </h2>
        <p className="text-gray-600">
          Click the{" "}
          <span className="text-[var(--brand-br1)] font-medium">Sign Up</span>{" "}
          button in the header to continue.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Participation Form
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

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10}"
          placeholder="Enter 10-digit phone number"
          className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-br1)] focus:border-[var(--brand-br1)]"
        />
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

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-[var(--brand-br1)] text-white font-medium rounded-lg hover:bg-[var(--brand-br2)] transition"
      >
        Participate
      </button>
    </form>
  );
}
