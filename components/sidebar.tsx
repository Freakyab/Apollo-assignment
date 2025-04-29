import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

function Sidebar({
  filterType,
  className,
  doctors,
  setIsLoading,
  setFilterData,
  setFilterType,
}: {
  filterType: Filter;
  className?: string;
  doctors: Doctor[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterData: React.Dispatch<React.SetStateAction<Doctor[]>>;
  setFilterType: React.Dispatch<React.SetStateAction<Filter>>;
}) {
  const handleFilterClear = () => {
    setFilterType({
      startRange: -1,
      endRange: -1,
      startFee: -1,
      endFee: -1,
      language: "",
      location: "",
      rating: 0,
      search: "",
    });
    setFilterData(doctors);
  };

  const handleFilters = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://apollo-assignment-backend.vercel.app/list-doctor-with-filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterType),
        }
      );
      const data = await response.json();
      if (data.status) {
        setFilterData(data.data);
      } else {
        toast.error("No data found for the selected filters");
      }
    } catch (error) {
      toast.error("Error applying filters");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`border-r ${className}`}>
      <div className="pb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button variant={"ghost"} onClick={handleFilterClear}>
            Clear all
          </Button>
        </div>
        <h3 className="font-semibold text-lg mb-4">Experience (In Years)</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="exp-0-5"
              checked={filterType.startRange === 0 && filterType.endRange === 5}
              onCheckedChange={(checked) => {
                setFilterType({
                  ...filterType,
                  startRange: checked ? 0 : -1,
                  endRange: checked ? 5 : -1,
                });
              }}
            />
            <label htmlFor="exp-0-5" className="ml-2 text-sm">
              0-5
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="exp-6-10"
              checked={
                filterType.startRange === 6 && filterType.endRange === 10
              }
              onCheckedChange={(checked) => {
                setFilterType({
                  ...filterType,
                  startRange: checked ? 6 : -1,
                  endRange: checked ? 10 : -1,
                });
              }}
            />
            <label htmlFor="exp-6-10" className="ml-2 text-sm">
              6-10
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={
                filterType.startRange === 11 && filterType.endRange === 16
              }
              id="exp-11-16"
              onCheckedChange={(checked) => {
                setFilterType({
                  ...filterType,
                  startRange: checked ? 11 : -1,
                  endRange: checked ? 16 : -1,
                });
              }}
            />
            <label htmlFor="exp-11-16" className="ml-2 text-sm">
              11-16
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6">
        <h3 className="font-semibold text-lg mb-4">Fees (In Rupees)</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="fee-100-500"
              checked={filterType.startFee === 100 && filterType.endFee === 500}
              onCheckedChange={(checked) => {
                setFilterType({
                  ...filterType,
                  startFee: checked ? 100 : -1,
                  endFee: checked ? 500 : -1,
                });
              }}
            />
            <label htmlFor="fee-100-500" className="ml-2 text-sm">
              100-500
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={
                filterType.startFee === 500 && filterType.endFee === 1000
              }
              id="fee-500-1000"
              onCheckedChange={(checked) => {
                setFilterType({
                  ...filterType,
                  startFee: checked ? 500 : -1,
                  endFee: checked ? 1000 : -1,
                });
              }}
            />
            <label htmlFor="fee-500-1000" className="ml-2 text-sm">
              500-1000
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              checked={
                filterType.startFee === 1000 && filterType.endFee === 10000
              }
              id="fee-1000-plus"
              onCheckedChange={(checked) => {
                setFilterType({
                  ...filterType,
                  startFee: checked ? 1000 : -1,
                  endFee: checked ? 10000 : -1,
                });
              }}
            />
            <label htmlFor="fee-1000-plus" className="ml-2 text-sm">
              1000+
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6">
        <h3 className="font-semibold text-lg mb-4">Language</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="lang-english"
              checked={filterType.language === "English"}
              onCheckedChange={(checked) => {
                setFilterType({
                  ...filterType,
                  language: checked ? "English" : "",
                });
              }}
            />
            <label htmlFor="lang-english" className="ml-2 text-sm">
              English
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="lang-hindi"
              checked={filterType.language === "Hindi"}
              onCheckedChange={(checked) => {
                setFilterType({
                  ...filterType,
                  language: checked ? "Hindi" : "",
                });
              }}
            />
            <label htmlFor="lang-hindi" className="ml-2 text-sm">
              Hindi
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="lang-marathi"
              checked={filterType.language === "Marathi"}
              onCheckedChange={(checked) => {
                setFilterType({
                  ...filterType,
                  language: checked ? "Marathi" : "",
                });
              }}
            />
            <label htmlFor="lang-marathi" className="ml-2 text-sm">
              Marathi
            </label>
          </div>
        </div>
      </div>
      <Button variant="default" onClick={handleFilters}>
        Apply Filters
      </Button>
    </div>
  );
}

export default Sidebar;
