export default function AvailableVehicleCard({ vehicle, duration,searchData }) {

    const handleBooking = async () => {
    const res = await fetch('http://localhost:4000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vehicle: vehicle._id,
        customerId: 'demo-customer-123',  // hardcoded for now
        ...searchData
      })
    });
    const data = await res.json();
    alert(res.ok ? 'Booking confirmed!' : data.error);
  };

  return (
    <div className="vehicle-card">
      <h3>{vehicle.name}</h3>
      <p>Capacity: {vehicle.capacityKg} kg</p>
      <p>Tyres: {vehicle.tyres}</p>
      <p>Available from: {new Date(searchData.startTime).toLocaleString()}</p>
      <p>Duration: {duration} hours</p>
      <button onClick={handleBooking}>Book Now</button>
    </div>
  )
}
