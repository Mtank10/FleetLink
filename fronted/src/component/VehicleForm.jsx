import {useState} from 'react';

export default function VehicleForm(){
    const [form,setForm] = useState({
        name:'',
        capacityKg:0,
        tyres:0,
    });
    const [message,setMessage] = useState('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await fetch('http://localhost:4000/api/vehicles',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            if(res.ok){
                setMessage('Vehicle created successfully!');
                setForm({name:'', capacityKg:0, tyres:0});
            } else {
                const errorData = await res.json();
                setMessage(`Error: ${errorData.message}`);
            }
        }
        catch(err){
            setMessage(`Error: ${err.message}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Vehicle</h2>
            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={form.name} 
                    onChange={(e) => setForm({...form, name: e.target.value})} 
                    required 
                />
            </div>
            <div>
                <label>Capacity (kg):</label>
                <input 
                    type="number" 
                    value={form.capacityKg} 
                    onChange={(e) => setForm({...form, capacityKg: e.target.value})} 
                    required 
                />
            </div>
            <div>
                <label>Tyres:</label>
                <input 
                    type="number" 
                    value={form.tyres} 
                    onChange={(e) => setForm({...form, tyres: e.target.value})} 
                    required 
                />
            </div>
            <button type="submit">Create Vehicle</button>
            {message && <p>{message}</p>}
        </form>
    )
}