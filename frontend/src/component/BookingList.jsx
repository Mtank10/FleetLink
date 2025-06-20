import { useEffect, useState } from 'react';

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchBookings = async () => {
    const res = await fetch(`${BACKEND_URL}/api/bookings`); 
    const data = await res.json();
    setBookings(data);
  };
 
  useEffect(() => {
    setLoading(true);
    fetchBookings();
    setLoading(false);
  }, []);

  const cancelBooking = async (id) => {
    const res = await fetch(`${BACKEND_URL}/api/bookings/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Booking cancelled');
      fetchBookings();
    } else {
      alert('Cancel failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
     
      {bookings.length === 0 ? (
        <p className='text-lg'>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
    <li key={booking._id}>
      <strong>Vehicle:</strong> {booking.vehicle?.name || booking.vehicle} <br />
      <strong>Start Time:</strong> {new Date(booking.startTime).toLocaleString()} <br />
      <strong>End Time:</strong> {new Date(booking.endTime).toLocaleString()} <br />
      <button 
className="mt-2 p-2 border rounded bg-red-500 text-white"
      onClick={() => cancelBooking(booking._id)}>Cancel Booking</button>
    </li>
  ))}
        </ul>
      )}
    </div>
  );
}
