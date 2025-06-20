import { useEffect, useState } from 'react';

export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await fetch('http://localhost:4000/api/bookings'); // Optional: add customerId query
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    const res = await fetch(`http://localhost:4000/api/bookings/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('Booking cancelled');
      fetchBookings();
    } else {
      alert('Cancel failed');
    }
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <strong>Vehicle:</strong> {booking.vehicle} <br />
              <strong>Start Time:</strong> {new Date(booking.startTime).toLocaleString()} <br />
              <strong>End Time:</strong> {new Date(booking.endTime).toLocaleString()} <br />
              <button onClick={() => cancelBooking(booking._id)}>Cancel Booking</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
