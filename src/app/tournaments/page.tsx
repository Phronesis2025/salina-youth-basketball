"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tournaments } from "@/lib/tournaments/data";

export default function Tournaments() {
  const [formData, setFormData] = useState({
    teamName: "",
    coachName: "",
    email: "",
    phone: "",
    tournamentId: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.teamName) newErrors.teamName = "Team name is required";
    if (!formData.coachName) newErrors.coachName = "Coach name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.tournamentId)
      newErrors.tournamentId = "Please select a tournament";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/create-tournament-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit registration");

      setSubmitSuccess(true);
      setFormData({
        teamName: "",
        coachName: "",
        email: "",
        phone: "",
        tournamentId: "",
      });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setErrors({ form: "Failed to submit registration. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-[#002C51] min-h-screen">
      <div className="container max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-white text-[clamp(2rem,4vw,3rem)] font-bold font-rubik mb-6 text-center uppercase">
          Tournaments
        </h1>
        <p className="text-white text-lg font-inter mb-10 text-center">
          Join our exciting youth basketball tournaments! Sign up via
          TourneyMachine or register your team below for updates.
        </p>

        {/* Tournament Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tournaments.map((tournament) => (
            <Card
              key={tournament.id}
              className="bg-gray-900 border-red-500/50 hover:scale-[1.02] transition-transform"
            >
              <CardHeader>
                <CardTitle className="text-white font-rubik">
                  {tournament.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white font-inter">Date: {tournament.date}</p>
                <p className="text-white font-inter">
                  Location: {tournament.location}
                </p>
                <Button
                  asChild
                  className="mt-4 bg-blue-600 hover:bg-blue-700 font-rubik"
                >
                  <a
                    href="https://www.tourneymachine.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sign Up on TourneyMachine
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Signup Form */}
        <Card className="bg-gray-900 border-red-500/50 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white font-rubik">
              Register Your Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitSuccess && (
                <p className="text-green-500 font-inter">
                  Registration submitted successfully!
                </p>
              )}
              {errors.form && (
                <p className="text-red-500 bg-red-500/10 p-2 rounded font-inter">
                  {errors.form}
                </p>
              )}
              <div>
                <Input
                  type="text"
                  placeholder="Team Name"
                  value={formData.teamName}
                  onChange={(e) =>
                    setFormData({ ...formData, teamName: e.target.value })
                  }
                  className="bg-gray-800 text-white border-gray-700 font-inter"
                  required
                  aria-required="true"
                  aria-label="Team Name"
                />
                {errors.teamName && (
                  <p className="text-red-500 text-sm mt-1 font-inter">
                    {errors.teamName}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Coach Name"
                  value={formData.coachName}
                  onChange={(e) =>
                    setFormData({ ...formData, coachName: e.target.value })
                  }
                  className="bg-gray-800 text-white border-gray-700 font-inter"
                  required
                  aria-required="true"
                  aria-label="Coach Name"
                />
                {errors.coachName && (
                  <p className="text-red-500 text-sm mt-1 font-inter">
                    {errors.coachName}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-gray-800 text-white border-gray-700 font-inter"
                  required
                  aria-required="true"
                  aria-label="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 font-inter">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone (Optional)"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-gray-800 text-white border-gray-700 font-inter"
                  aria-label="Phone"
                />
              </div>
              <div>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, tournamentId: value })
                  }
                  value={formData.tournamentId}
                >
                  <SelectTrigger className="bg-gray-800 text-white border-gray-700 font-inter focus:ring-2 focus:ring-blue-600">
                    <SelectValue placeholder="Select Tournament" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-white border-gray-700">
                    {tournaments.map((tournament) => (
                      <SelectItem
                        key={tournament.id}
                        value={tournament.id}
                        className="text-white font-inter hover:bg-gray-800 focus:bg-gray-800"
                      >
                        {tournament.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tournamentId && (
                  <p className="text-red-500 text-sm mt-1 font-inter">
                    {errors.tournamentId}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 font-rubik"
              >
                {isSubmitting ? "Submitting..." : "Register Team"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-10 text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 font-rubik">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
