"use client";

import { useFormContext, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { VehicleFormData } from "@/zod";

export default function VehicleRegistrationForm() {
  const { control, setValue, handleSubmit } = useFormContext<VehicleFormData>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("registration.platePhoto", file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          2. ተሽከርካሪው የተመዘገበበት ሠሌዳ / Vehicle Registration Plates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Office Code */}
          <FormField
            control={control}
            name="registration.officeCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>የቢሮው መለያ ኮድ / Office Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter office code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Code Number */}
          <FormField
            control={control}
            name="registration.codeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>የኮድ ቁጥር / Code Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter code number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Plate Number */}
          <FormField
            control={control}
            name="registration.plateNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>የተሽከርካሪው ሰሌዳ / Vehicle Plate Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter vehicle plate number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Plate Photo */}
          <div className="col-span-1 md:col-span-2">
            <FormLabel className="mb-2">የሰሌዳው ፎቶ / Plate Photo</FormLabel>
            <Input type="file" accept="image/*" onChange={handlePhotoChange} />
            {photoPreview && (
              <div className="mt-3">
                <Image
                  src={photoPreview}
                  alt="Plate photo preview"
                  width={120}
                  height={120}
                  className="rounded-md object-cover border"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
