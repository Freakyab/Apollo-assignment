import React, { useState } from "react";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import toast from "react-hot-toast";

function AddDoctorDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [doctor, setDoctor] = useState({
    name: "Dr. S. Krishnan",
    year: 3,
    post: "B.Pharma",
    city: "Mumbai",
    state: "Maharashtra",
    fee: 370,
    language: [ "English"],
  });

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    "Hindi",
    "English",
  ]);
  const languages = ["Hindi", "English", "Marathi"];

  const handleLanguageToggle = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }

    setDoctor({
      ...doctor,
      language: selectedLanguages,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctor({
      ...doctor,
      [name]: name === "fee" || name === "year" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!doctor.name || !doctor.year || !doctor.post) {
        toast.error("Please fill all the required fields.");
        return;
      }

      const newDoctor = {
        name: doctor.name,
        year: doctor.year,
        post: doctor.post,
        location: doctor.city + ", " + doctor.state,
        fee: doctor.fee,
        language: doctor.language,
      };

      const response = await fetch("https://apollo-assignment-backend.vercel.app/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDoctor),
      });

      const resData = await response.json();

      if (resData.status) {
        toast.success("Doctor added successfully!");
        setIsOpen(false);
      } else {
        toast.error(resData.message);
      }

      setDoctor({
        language: [],
        name: "",
        year: 0,
        post: "",
        city: "",
        state: "",
        fee: 0,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Enter the details for the new doctor to add them to the platform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Doctor Name</Label>
              <Input
                id="name"
                name="name"
                value={doctor.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Experience (Years)</Label>
                <Input
                  id="year"
                  name="year"
                  min={0}
                  type="number"
                  value={doctor.year}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fee">Consultation Fee (₹)</Label>
                <Input
                  id="fee"
                  name="fee"
                  min={0}
                  type="number"
                  value={doctor.fee}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="post">Qualification</Label>
              <Input
                id="post"
                name="post"
                value={doctor.post}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={doctor.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">state</Label>
              <Input
                id="state"
                name="state"
                value={doctor.state}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Languages</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lang-${language}`}
                      checked={selectedLanguages.includes(language)}
                      onCheckedChange={() => handleLanguageToggle(language)}
                    />
                    <label htmlFor={`lang-${language}`} className="text-sm">
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="mr-2">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Doctor
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddDoctorDialog;
