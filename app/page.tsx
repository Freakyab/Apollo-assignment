"use client";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  ArrowUpDown,
  ThumbsUp,
  X,
  Filter,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AddDoctorDialog from "@/components/addDoctor";
import toast from "react-hot-toast";
import Footer from "@/components/footer";

export default function ApolloPage() {
  const [selectedFilter, setSelectedFilter] = useState("relevance");
  const [filterData, setFilterData] = useState<Doctor[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [index, setIndex] = useState(10);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [filterType, setFilterType] = useState<Filter>({
    startRange: -1,
    endRange: -1,
    startFee: -1,
    endFee: -1,
    language: "",
    rating: 0,
    location: "",
    search: "",
  });

  // Fetch doctors data from the server
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8000/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const resData = await response.json();
        if (resData.status) {
          setDoctors(resData.data);
        } else {
          throw new Error(resData.message);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
        toast.error(errorMessage)
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const filterDoctors = () => {
      let filteredDoctors: Doctor[] = doctors;

      if (filterType.startRange !== -1 && filterType.endRange !== -1) {
        filteredDoctors = filteredDoctors.filter(
          (doctor) =>
            doctor.year >= filterType.startRange &&
            doctor.year <= filterType.endRange
        );
      }

      if (filterType.startFee !== -1 && filterType.endFee !== -1) {
        filteredDoctors = filteredDoctors.filter(
          (doctor) =>
            doctor.fee >= filterType.startFee && doctor.fee <= filterType.endFee
        );
      }

      if (filterType.language) {
        filteredDoctors = filteredDoctors.filter((doctor) =>
          doctor.language?.includes(filterType.language)
        );
      }

      if (filterType.rating) {
        filteredDoctors = filteredDoctors.filter(
          (doctor) => doctor.rating && doctor.rating >= filterType.rating
        );
      }

      if (filterType.location) {
        filteredDoctors = filteredDoctors.filter((doctor) =>
          doctor.location?.includes(filterType.location)
        );
      }

      setFilterData(filteredDoctors);
    };

    filterDoctors();
  }, [filterType, doctors]);

  useEffect(() => {
    let filteredDoctors = [...filterData];
    if (selectedFilter === "experience") {
      filteredDoctors.sort((a, b) => b.year - a.year);
    } else if (selectedFilter === "fee-low") {
      filteredDoctors.sort((a, b) => a.fee - b.fee);
    } else if (selectedFilter === "fee-high") {
      filteredDoctors.sort((a, b) => b.fee - a.fee);
    } else {
      filteredDoctors.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (searchQuery) {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilterData(filteredDoctors);
  }, [selectedFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar
        isOpen={isAddDoctorOpen}
        setIsOpen={setIsAddDoctorOpen}
        data={doctors}
        filterType={filterType}
        setFilterType={setFilterType}
        setSearchQuery={setSearchQuery}
      />

      <AddDoctorDialog isOpen={isAddDoctorOpen} setIsOpen={setIsAddDoctorOpen} />
      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white fixed top-0 left-0 w-full h-full z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="text-blue-600 font-bold">
            <span className="text-xl">Apollo</span>
            <span className="text-orange-500">24/7</span>
          </div>
          <Button variant="ghost" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </Button>
        </div>
        <nav className="p-4 overflow-auto">
          <ul className="space-y-4">
            <li className="py-2 border-b border-gray-100">Buy Medicines</li>
            <li className="py-2 border-b border-gray-100 text-blue-600 font-semibold">
              Find Doctors
            </li>
            <li className="py-2 border-b border-gray-100">Lab Tests</li>
            <li className="py-2 border-b border-gray-100">Circle Membership</li>
            <li className="py-2 border-b border-gray-100">Health Records</li>
            <li className="py-2 border-b border-gray-100">Diabetes Reversal</li>
            <li className="py-2 border-b border-gray-100">
              Buy Insurance
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                New
              </span>
            </li>
          </ul>
        </nav>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-6 whitespace-nowrap">
            <div className="py-4 text-gray-700">Buy Medicines</div>
            <div className="py-4 text-gray-700 font-semibold border-b-2 border-blue-600">
              Find Doctors
            </div>
            <div className="py-4 text-gray-700">Lab Tests</div>
            <div className="py-4 text-gray-700">Circle Membership</div>
            <div className="py-4 text-gray-700">Health Records</div>
            <div className="py-4 text-gray-700">Diabetes Reversal</div>
            <div className="py-4 text-gray-700">
              Buy Insurance
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                New
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center text-sm">
          <span className="text-blue-600">Home</span>
          <span className="mx-2">›</span>
          <span className="text-blue-600">Doctors</span>
          <span className="mx-2">›</span>
          <span className="text-gray-600">General Physicians</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-full lg:w-64 flex-shrink-0">
            <Sidebar filterType={filterType} setFilterType={setFilterType} />
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center">
                  <Filter size={16} className="mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-4/5 sm:w-80 p-0">
                <div className="p-4 overflow-y-auto h-full">
                  <Sidebar
                    filterType={filterType}
                    setFilterType={setFilterType}
                    className="w-full border-r-0"
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Doctor Listings */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">
                Consult General Physicians Online - Internal Medicine
                Specialists
              </h1>
              <p className="text-gray-700">({filterData.length} doctors)</p>
            </div>

            <div className="mb-6 flex justify-end">
              <div className="relative w-64">
                <Select
                  value={selectedFilter}
                  onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <ArrowUpDown size={16} className="mr-2" />
                      <SelectValue placeholder="Relevance" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="experience">Experience</SelectItem>
                    <SelectItem value="fee-low">Fee: Low to High</SelectItem>
                    <SelectItem value="fee-high">Fee: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filterData.slice(0, index).map((doctor, index) => (
              <div className="space-y-6 mb-6" key={index}>
                {/* Doctor 1 */}
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row border-b border-gray-100">
                    <div className="p-4 flex items-center justify-center md:justify-start">
                      <Image
                        src="https://img.freepik.com/premium-vector/doctor-with-stethoscope-around-his-neck-is-standing-front-blue-background_596437-183.jpg"
                        alt="Doctor"
                        width={150}
                        height={150}
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold flex items-center">
                            {doctor.name}
                            <CheckCircle
                              size={16}
                              className="ml-2 text-blue-600"
                            />
                          </h3>
                          <p className="text-gray-600">
                            General Physician/ Internal Medicine Specialist
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-purple-600 font-medium">
                          {doctor.year} YEARS • {doctor.post}
                        </p>
                      </div>
                      <div className="mt-2 text-gray-600">
                        <p>Apollo 24|7 Virtual Clinic - {doctor.location}</p>
                      </div>
                      {doctor.rating && (
                        <div className="flex mt-2 items-center">
                          <ThumbsUp size={16} className="text-green-600 mr-1" />
                          <span className="text-gray-600">
                            {doctor.rating} ({doctor.count} ratings)
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col items-center md:items-end justify-between">
                      <p className="text-2xl font-bold">₹{doctor.fee}</p>
                      <Button
                        variant={"outline"}
                        className="w-full md:w-auto px-6 py-2 rounded-md mt-2 md:mt-0">
                        Consult Online
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}

            {filterData.length === 0 && (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No doctors found</p>
              </div>
            )}

            {/* Pagination */}
            <div className="overflow-x-auto">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    {index > 10 && (
                      <PaginationPrevious
                        onClick={() =>
                          setIndex((prev) => Math.max(prev - 10, 10))
                        }
                      />
                    )}
                  </PaginationItem>
                  {Array.from(
                    { length: Math.ceil(filterData.length / 10) },
                    (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => setIndex((i + 1) * 10)}
                          isActive={index === (i + 1) * 10}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    {index < filterData.length && (
                      <PaginationNext
                        onClick={() =>
                          setIndex((prev) =>
                            Math.min(prev + 10, filterData.length)
                          )
                        }
                      />
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          {/* Need Help Banner */}
          <div className="w-full lg:w-1/4">
            <div className="bg-blue-900 text-white rounded-lg overflow-hidden">
              <div className="p-4">
                <Image
                  width={100}
                  height={100}
                  src="https://img.freepik.com/premium-vector/doctor-with-stethoscope-around-his-neck-is-standing-front-blue-background_596437-183.jpg"
                  alt="Doctor"
                  className="w-full h-44 object-cover rounded"
                />
                <h3 className="mt-4 font-medium text-lg">
                  Need help consult the right doctor?
                </h3>
                <p className="mt-2">
                  <a href="tel:+918040245807" className="text-white underline">
                    Call +91-8040245807
                  </a>
                  <span className="block mt-1">to book instantly</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
