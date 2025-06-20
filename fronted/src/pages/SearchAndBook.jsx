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
    setSearchData(prev => ({
      fromPincode: data.fromPincode,
      toPincode: data.toPincode,
      startTime: data.startTime
    }));
  };

  return (
    <div>
      <h2>Search & Book</h2>
      <SearchForm onSearch={handleSearch} />
      <div>
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