"use client";

import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";
import { VehicleFormData } from "@/zod";

export default function VehiclePossessorForm() {
  const { control, setValue } = useFormContext<VehicleFormData>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("possessor.photo", file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          4. የተሽከርካሪው ባለይዞተ / Vehicle Possessor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="possessor.specialRegNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>የልዩ ምዝገባ ቁጥር / Special Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter special reg. number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="possessor.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ስም / Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter possessor name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="possessor.region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ክልል / Region</FormLabel>
                <FormControl>
                  <Input placeholder="Enter region" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="possessor.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ከተማ / City/Town</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city/town" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="possessor.kebele"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ቀበሌ / Kebele</FormLabel>
                <FormControl>
                  <Input placeholder="Enter kebele" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="possessor.houseNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>የቤት ቁጥር / House No.</FormLabel>
                <FormControl>
                  <Input placeholder="Enter house number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 md:col-span-2">
            <FormLabel className="mb-2">የባለይዞቱ ፎቶ / Possessor Photo</FormLabel>
            <Input type="file" accept="image/*" onChange={handlePhotoChange} />
            {photoPreview && (
              <div className="mt-3">
                <Image
                  src={photoPreview}
                  alt="Possessor photo preview"
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
