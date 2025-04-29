import { MapPin, Search, UserPlus } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Navbar({
  data,
  isOpen,
  setIsOpen,
  filterType,
  setFilterType,
  setSearchQuery,
}: {
  data: Doctor[];
  filterType: Filter;
  setFilterType: React.Dispatch<React.SetStateAction<Filter>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const locations = data.map((doctor) => doctor.location.split(",")[1]);
  const uniqueLocations = Array.from(new Set(locations));

  return (
    <header className="border-b border-gray-200 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="text-blue-600 font-bold">
            <span className="text-xl">Apollo</span>
            <span className="text-orange-500">24/7</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={24} />
            <div className="flex justify-center flex-col gap-1 mx-2">
              <span className="text-sm">Select Location</span>
              <Select
                onValueChange={(value) =>
                  setFilterType({ ...filterType, location: value })
                }
                value={filterType.location}>
                <SelectTrigger className="border-0 shadow-none font-bold p-2">
                  <SelectValue placeholder="Select Address" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueLocations.map((location, index) => (
                    <SelectItem
                      key={index}
                      value={location}
                      className="text-gray-700">
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex mx-4 relative w-full ">
          <Input
            placeholder="Search Doctors"
            className="pl-10 pr-4 py-2 w-full  rounded-md"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        <Button
          className="bg-green-600 text-white hover:bg-green-700 w-full lg:w-fit"
          onClick={() => setIsOpen(!isOpen)}>
          <UserPlus size={16} className="mr-2" />
          Add Doctor
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
