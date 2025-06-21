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
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const res = await fetch(`${BACKEND_URL}/api/vehicles/available?${params}`);
    const data = await res.json();
    
    onSearch(data)
  };
  function toDatetimeLocal(isoString) {
  const date = new Date(isoString);
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

 return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col p-4 bg-white rounded shadow-md">
        <label>Capacity (kg):</label>
        <input
          type="number"
          value={form.capacityKg}
          onChange={(e) => setForm({ ...form, capacityKg: e.target.value })}
          required
          className="p-2 border rounded mb-2"
        />
      <label>From Pincode:</label>
        <input
          type="text"
          value={form.fromPincode}
          onChange={(e) => setForm({ ...form, fromPincode: e.target.value })}
          required
          placeholder="eg.. 110039"
          className="p-2 border rounded mb-2"
        />
        <label>To Pincode:</label>
        <input
          type="text"
          value={form.toPincode}
          onChange={(e) => setForm({ ...form, toPincode: e.target.value })}
          required
          placeholder="eg.. 410449"
          className="p-2 border rounded mb-2"
        />
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={toDatetimeLocal(form.startTime)} 
  onChange={(e) => {
    const iso = new Date(e.target.value).toISOString(); 
    setForm({ ...form, startTime: iso });
  }}
          required
          className="p-2 border rounded mb-2"
        />
      </div>
      <button className="p-2 ml-15 bg-blue-600 border rounded w-30" type="submit">Search</button>
    </form>
 )
}