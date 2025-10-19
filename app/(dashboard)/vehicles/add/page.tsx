// app/(dashboard)/staff/vehicles/add/page.tsx

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import VehicleForm from "@/components/forms/vehicle/VehicleForm";

export default function AddVehiclePage() {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full  rounded-2xl  p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            🚗 የተሽከርካሪ መመዝገቢያ / Vehicle Registration
          </h1>
          <VehicleForm />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
