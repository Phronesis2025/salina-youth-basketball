"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Join() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age_group: "",
    team_gender: "",
    date_of_birth: "",
    parent_name: "",
    parent_phone: "",
    parent_email: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    preferred_position: "No Preference",
    prior_experience: "",
    payment_option: "full",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.age_group) newErrors.age_group = "Age group is required";
    if (!formData.team_gender)
      newErrors.team_gender = "Team gender is required";
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required";
    } else {
      const dob = new Date(formData.date_of_birth);
      const today = new Date("2025-05-14");
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();
      const adjustedAge =
        monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

      const ageGroupRanges = {
        "U-10": { minAge: 0, maxAge: 9 },
        "U-12": { minAge: 10, maxAge: 11 },
        "U-14": { minAge: 12, maxAge: 13 },
        "U-16": { minAge: 14, maxAge: 15 },
      };

      const selectedRange =
        ageGroupRanges[formData.age_group as keyof typeof ageGroupRanges];
      if (
        selectedRange &&
        (adjustedAge < selectedRange.minAge ||
          adjustedAge > selectedRange.maxAge)
      ) {
        newErrors.date_of_birth = `Age (${adjustedAge}) does not match selected age group (${formData.age_group})`;
      }
    }
    if (!formData.parent_name)
      newErrors.parent_name = "Parent/Guardian name is required";
    if (!formData.parent_phone) {
      newErrors.parent_phone = "Parent/Guardian phone number is required";
    } else if (!phoneRegex.test(formData.parent_phone)) {
      newErrors.parent_phone =
        "Phone number must be in format (XXX) XXX-XXXX or XXX-XXX-XXXX";
    }
    if (!formData.parent_email) {
      newErrors.parent_email = "Parent/Guardian email is required";
    } else if (!emailRegex.test(formData.parent_email)) {
      newErrors.parent_email = "Invalid email format";
    }
    if (!formData.emergency_contact_name) {
      newErrors.emergency_contact_name = "Emergency contact name is required";
    }
    if (!formData.emergency_contact_phone) {
      newErrors.emergency_contact_phone =
        "Emergency contact phone number is required";
    } else if (!phoneRegex.test(formData.emergency_contact_phone)) {
      newErrors.emergency_contact_phone =
        "Phone number must be in format (XXX) XXX-XXXX or XXX-XXX-XXXX";
    }
    if (!formData.preferred_position)
      newErrors.preferred_position = "Preferred position is required";
    if (!formData.payment_option)
      newErrors.payment_option = "Payment option is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Store form data in sessionStorage to pass to the confirmation page
    sessionStorage.setItem("joinFormData", JSON.stringify(formData));
    router.push("/join/confirm");
  };

  return (
    <section className="py-16 bg-[#002C51] min-h-screen">
      <div className="container max-w-[75rem] mx-auto px-16">
        <h1 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center uppercase">
          Join the Team
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Club Rules */}
          <div className="bg-[#01182B] p-6 rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
            <h2 className="text-[#FFFFFF] text-xl font-rubik font-semibold mb-4 uppercase">
              Club Rules & Information
            </h2>
            <p className="text-[#FFFFFF] text-sm font-inter mb-4">
              Membership fees are required annually. Players must be in the
              U-10, U-12, U-14, or U-16 age groups. Adhere to the club’s code of
              conduct and practice schedules. Contact the admin for more
              details.
            </p>
            <p className="text-[#FFFFFF] text-sm font-inter">
              More details coming soon.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#01182B] p-6 rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
            <h2 className="text-[#FFFFFF] text-xl font-rubik font-semibold mb-4 uppercase text-center">
              Player Registration
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="first_name"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none"
                  placeholder="Player's first name"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.first_name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="last_name"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none"
                  placeholder="Player's last name"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.last_name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="age_group"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Age Group
                </label>
                <select
                  id="age_group"
                  name="age_group"
                  value={formData.age_group}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none appearance-none bg-[#FFFFFF]"
                >
                  <option value="" disabled>
                    Select an age group
                  </option>
                  <option value="U-10">U-10</option>
                  <option value="U-12">U-12</option>
                  <option value="U-14">U-14</option>
                  <option value="U-16">U-16</option>
                </select>
                {errors.age_group && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.age_group}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="team_gender"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Team Gender
                </label>
                <select
                  id="team_gender"
                  name="team_gender"
                  value={formData.team_gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none appearance-none bg-[#FFFFFF]"
                >
                  <option value="" disabled>
                    Select team gender
                  </option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                </select>
                {errors.team_gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.team_gender}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="date_of_birth"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  max="2025-05-14"
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none"
                />
                {errors.date_of_birth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.date_of_birth}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="parent_name"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  id="parent_name"
                  name="parent_name"
                  value={formData.parent_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none"
                  placeholder="Parent/Guardian name"
                />
                {errors.parent_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.parent_name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="parent_phone"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Parent/Guardian Phone Number
                </label>
                <input
                  type="text"
                  id="parent_phone"
                  name="parent_phone"
                  value={formData.parent_phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none"
                  placeholder="(XXX) XXX-XXXX"
                />
                {errors.parent_phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.parent_phone}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="parent_email"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Parent/Guardian Email
                </label>
                <input
                  type="email"
                  id="parent_email"
                  name="parent_email"
                  value={formData.parent_email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none"
                  placeholder="parent@example.com"
                />
                {errors.parent_email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.parent_email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="emergency_contact_name"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  id="emergency_contact_name"
                  name="emergency_contact_name"
                  value={formData.emergency_contact_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none"
                  placeholder="Emergency contact name"
                />
                {errors.emergency_contact_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emergency_contact_name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="emergency_contact_phone"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Emergency Contact Phone Number
                </label>
                <input
                  type="text"
                  id="emergency_contact_phone"
                  name="emergency_contact_phone"
                  value={formData.emergency_contact_phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none"
                  placeholder="(XXX) XXX-XXXX"
                />
                {errors.emergency_contact_phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emergency_contact_phone}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="preferred_position"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Preferred Position
                </label>
                <select
                  id="preferred_position"
                  name="preferred_position"
                  value={formData.preferred_position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none appearance-none bg-[#FFFFFF]"
                >
                  <option value="No Preference">No Preference</option>
                  <option value="Point Guard">Point Guard</option>
                  <option value="Shooting Guard">Shooting Guard</option>
                  <option value="Small Forward">Small Forward</option>
                  <option value="Power Forward">Power Forward</option>
                  <option value="Center">Center</option>
                </select>
                {errors.preferred_position && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.preferred_position}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="prior_experience"
                  className="block text-[#FFFFFF] text-sm font-inter mb-2"
                >
                  Prior Basketball Experience (Optional)
                </label>
                <textarea
                  id="prior_experience"
                  name="prior_experience"
                  value={formData.prior_experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-[0.25rem] text-[#0A0F15] focus:outline-none"
                  placeholder="Any prior basketball experience"
                  rows={4}
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#FFFFFF] text-sm font-inter mb-2">
                  Payment Option
                </label>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center text-[#FFFFFF] text-sm font-inter">
                    <input
                      type="radio"
                      name="payment_option"
                      value="full"
                      checked={formData.payment_option === "full"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Pay in Full ($360.00)
                  </label>
                  <label className="flex items-center text-[#FFFFFF] text-sm font-inter">
                    <input
                      type="radio"
                      name="payment_option"
                      value="installments"
                      checked={formData.payment_option === "installments"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Monthly Installments ($30.00 x 12)
                  </label>
                </div>
                {errors.payment_option && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.payment_option}
                  </p>
                )}
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="default"
                  className="bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[8px] px-[16px] uppercase"
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
