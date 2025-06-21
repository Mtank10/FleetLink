import BookingList from "../component/BookingList";

export default function ViewBooking() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="font-bold text-lg">My Bookings</h2>
      <BookingList />
    </div>
  );
}