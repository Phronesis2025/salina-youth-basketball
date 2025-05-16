"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  first_name: string;
  last_name: string;
  age_group: string;
  team_gender: string;
  date_of_birth: string;
  parent_name: string;
  parent_phone: string;
  parent_email: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  preferred_position: string;
  prior_experience: string;
  payment_option: string;
}

export default function Join() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
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
    preferred_position: "",
    prior_experience: "",
    payment_option: "full",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    // Basic validation
    const requiredFields: (keyof FormData)[] = [
      "first_name",
      "last_name",
      "age_group",
      "team_gender",
      "date_of_birth",
      "parent_name",
      "parent_phone",
      "parent_email",
      "emergency_contact_name",
      "emergency_contact_phone",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field.replace("_", " ")} field`);
        return;
      }
    }

    try {
      // Save form data to sessionStorage
      sessionStorage.setItem("joinFormData", JSON.stringify(formData));
      console.log("Form data saved to sessionStorage:", formData);

      // Redirect to /join/confirm
      router.push("/join/confirm");
    } catch (err) {
      console.error("Error saving form data:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="py-16 bg-[#002C51] min-h-screen">
      <div className="container max-w-[75rem] mx-auto px-16">
        <h1 className="text-[#FFFFFF] text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-10 text-center uppercase">
          Join Our Team
        </h1>

        <div className="bg-[#01182B] p-6 rounded-[1rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] max-w-lg mx-auto">
          <h2 className="text-[#FFFFFF] text-xl font-rubik font-semibold mb-4 uppercase text-center">
            Registration Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-2 bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem] border border-gray-300 focus:ring-[#D91E18] focus:border-[#D91E18]"
              />
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-2 bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem] border border-gray-300 focus:ring-[#D91E18] focus:border-[#D91E18]"
              />
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="age_group"
              >
                Age Group
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("age_group", value)
                }
                value={formData.age_group}
              >
                <SelectTrigger className="bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem]">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="U-12">U-12</SelectItem>
                  <SelectItem value="U-14">U-14</SelectItem>
                  <SelectItem value="U-16">U-16</SelectItem>
                  <SelectItem value="U-18">U-18</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="team_gender"
              >
                Team Gender
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("team_gender", value)
                }
                value={formData.team_gender}
              >
                <SelectTrigger className="bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem]">
                  <SelectValue placeholder="Select team gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Boys">Boys</SelectItem>
                  <SelectItem value="Girls">Girls</SelectItem>
                  <SelectItem value="Co-ed">Co-ed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="date_of_birth"
              >
                Date of Birth
              </label>
              <input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full p-2 bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem] border border-gray-300 focus:ring-[#D91E18] focus:border-[#D91E18]"
              />
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="parent_name"
              >
                Parent/Guardian Name
              </label>
              <input
                id="parent_name"
                name="parent_name"
                value={formData.parent_name}
                onChange={handleChange}
                className="w-full p-2 bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem] border border-gray-300 focus:ring-[#D91E18] focus:border-[#D91E18]"
              />
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="parent_phone"
              >
                Parent Phone
              </label>
              <input
                id="parent_phone"
                name="parent_phone"
                type="tel"
                value={formData.parent_phone}
                onChange={handleChange}
                className="w-full p-2 bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem] border border-gray-300 focus:ring-[#D91E18] focus:border-[#D91E18]"
              />
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="parent_email"
              >
                Parent Email
              </label>
              <input
                id="parent_email"
                name="parent_email"
                type="email"
                value={formData.parent_email}
                onChange={handleChange}
                className="w-full p-2 bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem] border border-gray-300 focus:ring-[#D91E18] focus:border-[#D91E18]"
              />
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="emergency_contact_name"
              >
                Emergency Contact Name
              </label>
              <input
                id="emergency_contact_name"
                name="emergency_contact_name"
                value={formData.emergency_contact_name}
                onChange={handleChange}
                className="w-full p-2 bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem] border border-gray-300 focus:ring-[#D91E18] focus:border-[#D91E18]"
              />
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="emergency_contact_phone"
              >
                Emergency Contact Phone
              </label>
              <input
                id="emergency_contact_phone"
                name="emergency_contact_phone"
                type="tel"
                value={formData.emergency_contact_phone}
                onChange={handleChange}
                className="w-full p-2 bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem] border border-gray-300 focus:ring-[#D91E18] focus:border-[#D91E18]"
              />
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="preferred_position"
              >
                Preferred Position
              </label>
              <input
                id="preferred_position"
                name="preferred_position"
                value={formData.preferred_position}
                onChange={handleChange}
                className="w-full p-2 bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem] border border-gray-300 focus:ring-[#D91E18] focus:border-[#D91E18]"
              />
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="prior_experience"
              >
                Prior Experience
              </label>
              <input
                id="prior_experience"
                name="prior_experience"
                value={formData.prior_experience}
                onChange={handleChange}
                className="w-full p-2 bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem] border border-gray-300 focus:ring-[#D91E18] focus:border-[#D91E18]"
              />
            </div>
            <div>
              <label
                className="block text-[#FFFFFF] text-sm font-inter mb-2"
                htmlFor="payment_option"
              >
                Payment Option
              </label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("payment_option", value)
                }
                value={formData.payment_option}
              >
                <SelectTrigger className="bg-[#FFFFFF] text-[#0A0F15] rounded-[0.25rem]">
                  <SelectValue placeholder="Select payment option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Pay in Full ($360.00)</SelectItem>
                  <SelectItem value="monthly">
                    Monthly Installments ($30.00 x 12)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-[#FFFFFF] text-[#0A0F15] font-medium font-inter hover:bg-[#E6ECEF] rounded-[0.25rem] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] text-sm py-[8px] px-[16px] uppercase"
            >
              Continue to Payment
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
