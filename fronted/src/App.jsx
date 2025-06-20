import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddVehicle from "./pages/AddVehicle";
import SearchAndBook from "./pages/SearchAndBook";
import ViewBooking from "./pages/ViewBooking";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Search & Book</Link>
        <Link to="/add-vehicle" style={{ marginRight: '1rem' }}>Add Vehicle</Link>
        <Link to="/view-bookings">View Bookings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SearchAndBook />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/view-bookings" element={<ViewBooking />} />
      </Routes>
    </BrowserRouter>
  );
}
