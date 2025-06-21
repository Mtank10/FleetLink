import {useState} from 'react';

export default function VehicleForm(){
    const [loading, setLoading] = useState(false);
    const [form,setForm] = useState({
        name:'',
        capacityKg:"",
        tyres:"",
    });
    const [message,setMessage] = useState('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!form.name || !form.capacityKg || !form.tyres){
            setMessage('Please fill all fields');
            setLoading(false);
            return;
        }
        try{
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

            const res = await fetch(`${BACKEND_URL}/api/vehicles`,{
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
            <div className='mb-4 flex flex-col p-4 bg-white rounded shadow-md'>
                <label className='text-md text-gray-800'>Name:</label>
                <input 
                    type="text" 
                    value={form.name} 
                    onChange={(e) => setForm({...form, name: e.target.value})} 
                    required 
                    placeholder='Enter vehicle name'
                    className='p-2 border rounded mb-2'
                />
            
                <label className='text-md text-gray-800'>Capacity (kg):</label>
                <input 
                    type="text" 
                    value={form.capacityKg} 
                    onChange={(e) => setForm({...form, capacityKg: e.target.value})} 
                    required 
                    placeholder='Enter capacity in kg'
                    className='p-2 border rounded mb-2'
                />
                <label className='text-md text-gray-800'>Tyres:</label>
                <input 
                    type="text" 
                    value={form.tyres} 
                    onChange={(e) => setForm({...form, tyres: e.target.value})} 
                    required 
                    placeholder='Enter number of tyres'
                    className='p-2 border rounded mb-2'
                />
            </div>
            <button 
                className='p-2 border rounded bg-blue-400 ml-15' 
                type="submit" 
                disabled={loading}
            >
                {loading ? 'Creating...' : 'Create Vehicle'}
            </button>
            {message && <p>{message}</p>}
        </form>
    )
}