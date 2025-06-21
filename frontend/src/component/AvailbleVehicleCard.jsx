export default function AvailableVehicleCard({ vehicle, duration,searchData }) {

    const handleBooking = async () => {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vehicleId: vehicle._id,
        customerId: 'demo-customer-123',  
        ...searchData
      })
    });
    const data = await res.json();
    alert(res.ok ? 'Booking confirmed!' : 'Booking failed: ' + data.message);
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded shadow-md mb-4">
      <h3 className="text-md ">Name: {vehicle.name}</h3>
      <p className="">Capacity: {vehicle.capacityKg} kg</p>
      <p>Tyres: {vehicle.tyres}</p>
      <p>Available from: {new Date(searchData.startTime).toLocaleString()}</p>
      <p>Duration: {duration} hours</p>
      <button className="mt-2 p-2 bg-green-800 border w-30 rounded" onClick={handleBooking}>Book Now</button>
    </div>
  )
}
