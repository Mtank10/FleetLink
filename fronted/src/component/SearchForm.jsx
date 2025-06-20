import { useState } from "react";


export default function SearchForm({ onSearch }) {
    const [form,setForm]= useState({
        capacityKg: 0,
        fromPincode: '',
        toPincode: '',
        startTime: '',
    });

   const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(form).toString();
    const res = await fetch(`http://localhost:4000/api/vehicles/available?${params}`);
    const data = await res.json();
    onSearch(data);
  };
 return (
    <form onSubmit={handleSubmit}>
      <h2>Search Vehicles</h2>
      <div>
        <label>Capacity (kg):</label>
        <input
          type="number"
          value={form.capacityKg}
          onChange={(e) => setForm({ ...form, capacityKg: e.target.value })}
          required
        />
      </div>
      <div>
        <label>From Pincode:</label>
        <input
          type="text"
          value={form.fromPincode}
          onChange={(e) => setForm({ ...form, fromPincode: e.target.value })}
          required
        />
      </div>
      <div>
        <label>To Pincode:</label>
        <input
          type="text"
          value={form.toPincode}
          onChange={(e) => setForm({ ...form, toPincode: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          required
        />
      </div>
      <button type="submit">Search</button>
    </form>
 )
}