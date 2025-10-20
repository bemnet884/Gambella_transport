"use client";


import DriverLicenseForm from "@/components/forms/driver/DriverLicenseForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function DriverLicensePage() {

  return (
    <MaxWidthWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full  rounded-2xl  p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            የጋምቤላ ክልል ትራንስፖርት ቢሮ የአሽከርካሪ ብቃት ማረጋገጫ ፈቃድ <br />
            Gambella Regional Transport Bureau Driver's License
          </h1>
          <DriverLicenseForm />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
