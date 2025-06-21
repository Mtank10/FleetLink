import VehicleForm from "../component/VehicleForm";
export default function AddVehicle() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-center text-lg font-bold">Add New Vehicle</h2>
      <VehicleForm />
    </div>
  );
}