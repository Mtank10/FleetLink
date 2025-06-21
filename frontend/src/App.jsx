import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddVehicle from "./pages/AddVehicle";
import SearchAndBook from "./pages/SearchAndBook";
import ViewBooking from "./pages/ViewBooking";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-center items-center bg-gray-800 text-white p-4 space-x-10">
        <Link to="/">Search & Book</Link>
        <Link to="/add-vehicle">Add Vehicle</Link>
        <Link to="/view-bookings" >View Bookings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SearchAndBook />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/view-bookings" element={<ViewBooking />} />
      </Routes>
    </BrowserRouter>
  );
}
