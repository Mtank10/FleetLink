import { useState } from "react";
import SearchForm from "../component/SearchForm";
import AvailableVehicleCard from "../component/AvailbleVehicleCard";
export default function SearchAndBook() {
  const [vehicles, setVehicles] = useState([]);
  const [duration, setDuration] = useState(0);
  const [searchData, setSearchData] = useState({});

  const handleSearch = (data) => {
      
    setVehicles(data.availableVehicles);
    setDuration(data.estimatedRideDurationHours);
    setSearchData({
      fromPincode: data.searchData.fromPincode,
      toPincode: data.searchData.toPincode,
      startTime: data.searchData.startTime,
    });
  };
  //  console.log("Search Data:", searchData);
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
      <h2 className="text-lg">Search & Book</h2>
      <SearchForm onSearch={handleSearch} />
      <div className="mt-4 w-full max-w-3xl">
        {vehicles.map(vehicle => (
          <AvailableVehicleCard
            key={vehicle._id}
            vehicle={vehicle}
            duration={duration}
            searchData={searchData}
          />
        ))}
      </div>
    </div>
  );
}