"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VehicleFormData } from "@/zod";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function VehicleDescriptionForm() {
  const {
    register,
    formState: { errors, isSubmitting, touchedFields },
    watch,
    setValue,
    trigger,
  } = useFormContext<VehicleFormData>();


  const [vehiclePhotoPreview, setVehiclePhotoPreview] = useState<string | null>(null);
  const [platePhotoPreview, setPlatePhotoPreview] = useState<string | null>(null);
  const [showAllErrors, setShowAllErrors] = useState(false);

  // Watch form values to trigger validation
  const formValues = watch();

  // Trigger validation when form values change
  useEffect(() => {
    trigger("description");
  }, [formValues.description, trigger]);

  // Show all errors when form is submitting (user clicked submit)
  useEffect(() => {
    if (isSubmitting) {
      setShowAllErrors(true);
    }
  }, [isSubmitting]);
  const handleVehiclePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("description.vehiclePhoto", file);
      const reader = new FileReader();
      reader.onload = () => setVehiclePhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePlatePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("description.platePhoto", file);
      const reader = new FileReader();
      reader.onload = () => setPlatePhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Helper function to check if we should show error for a field
  const shouldShowError = (fieldName: keyof VehicleFormData["description"]) => {
    const isTouched = touchedFields.description?.[fieldName];
    return showAllErrors || isTouched;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 pt-0">
          <div className="mb-6">
            {showAllErrors && errors.description && (
              <div className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded">
                Please fix the errors in this section before submitting
              </div>
            )}
          </div>

          <Accordion type="single"
            collapsible className="space-y-4">
            {/* Basic Information Accordion */}
            <AccordionItem value="basic-info" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>📋 መሰረታዊ መረጃ / Basic Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicleType" className="mb-2">
                      የተሽከርካሪው ዓይነት / Type of Vehicle

                    </Label>
                    <Input
                      id="vehicleType"
                      {...register("description.vehicleType")}
                      placeholder="e.g. Sedan / Truck"
                    />

                  </div>

                  <div>
                    <Label htmlFor="make" className="mb-2">
                      የተሽከርካሪው የተሠራበት / Make of Vehicle

                    </Label>
                    <Input
                      id="make"
                      {...register("description.make")}
                      placeholder="e.g. Toyota"
                    />

                  </div>

                  <div>
                    <Label htmlFor="model" className="mb-2">
                      የተሽከርካሪው ሞዴል / Model of Vehicle

                    </Label>
                    <Input
                      id="model"
                      {...register("description.model")}
                      placeholder="e.g. Corolla"
                    />

                  </div>

                  <div>
                    <Label htmlFor="manufacturedYear" className="mb-2">
                      የተሰራበት ዘመን / Year of Manufacture

                    </Label>
                    <Input
                      id="manufacturedYear"
                      {...register("description.manufacturedYear")}
                      type="number"
                      placeholder="e.g. 2018"
                    />

                  </div>

                  <div>
                    <Label htmlFor="bodyType" className="mb-2">
                      የአካሉ ዓይነት / Body Type

                    </Label>
                    <Input
                      id="bodyType"
                      {...register("description.bodyType")}
                      placeholder="e.g. Hatchback"
                    />

                  </div>

                  <div>
                    <Label htmlFor="chassisNumber" className="mb-2">
                      የሻሲው ቁጥር / Chassis Number

                    </Label>
                    <Input
                      id="chassisNumber"
                      {...register("description.chassisNumber")}
                      placeholder="e.g. ABC123XYZ"
                    />

                  </div>

                  <div>
                    <Label htmlFor="color" className="mb-2">
                      ቀለም / Colour

                    </Label>
                    <Input
                      id="color"
                      {...register("description.color")}
                      placeholder="e.g. White"
                    />

                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Vehicle Dimensions Accordion */}
            <AccordionItem value="dimensions" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>📏 የአካሉ መጠን / Body Dimensions</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bodyWidth" className="mb-2">
                      ስፋት (ሜትር) / Width (m)
                    </Label>
                    <Input
                      id="bodyWidth"
                      {...register("description.bodyWidth")}
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bodyLength" className="mb-2">
                      ርዝመት (ሜትር) / Length (m)
                    </Label>
                    <Input
                      id="bodyLength"
                      {...register("description.bodyLength")}
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bodyHeight" className="mb-2">
                      ቁመት (ሜትር) / Height (m)
                    </Label>
                    <Input
                      id="bodyHeight"
                      {...register("description.bodyHeight")}
                      type="number"
                      step="0.01"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Engine Information Accordion */}
            <AccordionItem value="engine-info" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>⚙️ የሞተሩ መረጃ / Engine Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="engineNumber" className="mb-2">
                      የሞተሩ ቁጥር / Engine Number
                    </Label>
                    <Input
                      id="engineNumber"
                      {...register("description.engineNumber")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="engineCapacity" className="mb-2">
                      የሞተሩ ጉልበት (ሲ.ሲ.) / Engine Capacity (cc)
                    </Label>
                    <Input
                      id="engineCapacity"
                      {...register("description.engineCapacity")}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fuelType" className="mb-2">
                      የነዳጅ ዓይነት / Type of Fuel
                    </Label>
                    <Input
                      id="fuelType"
                      {...register("description.fuelType")}
                      placeholder="e.g. Petrol / Diesel"
                    />
                  </div>
                  <div>
                    <Label htmlFor="numberOfCylinders" className="mb-2">
                      የሲሊንደር ብዛት / Number of Cylinders
                    </Label>
                    <Input
                      id="numberOfCylinders"
                      {...register("description.numberOfCylinders")}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="brakeHorsePower" className="mb-2">
                      የፈረስ ጉልበት / Brake Horse Power (BHP)
                    </Label>
                    <Input
                      id="brakeHorsePower"
                      {...register("description.brakeHorsePower")}
                      type="number"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Tyres & Axles Accordion */}
            <AccordionItem value="tyres-axles" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>🛞 ጎማ እና አክስል / Tyres & Axles</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tyreFront" className="mb-2">
                      የጎማው መጠን (ፊት) / Tyre Size (Front)
                    </Label>
                    <Input
                      id="tyreFront"
                      {...register("description.tyreFront")}
                      placeholder="e.g. 205/55 R16"
                    />
                  </div>
                  <div>
                    <Label htmlFor="numberOfAxles" className="mb-2">
                      የአክሰሎች ብዛት / Number of Axles
                    </Label>
                    <Input
                      id="numberOfAxles"
                      {...register("description.numberOfAxles")}
                      type="number"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Weights Accordion */}
            <AccordionItem value="weights" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>⚖️ ክብደት / Weight</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="grossVehicleWeight" className="mb-2">
                      ጠቅላላ ክብደት / Gross Weight
                    </Label>
                    <Input
                      id="grossVehicleWeight"
                      {...register("description.grossVehicleWeight")}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tareWeight" className="mb-2">
                      ነጠላ ክብደት / Tare Weight
                    </Label>
                    <Input
                      id="tareWeight"
                      {...register("description.tareWeight")}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payLoad" className="mb-2">
                      የጭነቱ ክብደት / Pay Load
                    </Label>
                    <Input
                      id="payLoad"
                      {...register("description.payLoad")}
                      type="number"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Photos Accordion */}
            <AccordionItem value="photos" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <span>📸 ፎቶዎች / Photos</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2">የተሽከርካሪው ፎቶ / Vehicle Photo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleVehiclePhotoChange}
                    />
                    {vehiclePhotoPreview && (
                      <div className="mt-3">
                        <Image
                          src={vehiclePhotoPreview}
                          alt="Vehicle photo preview"
                          width={120}
                          height={120}
                          className="rounded-md object-cover border"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="mb-2">የሰሌዳው ፎቶ / Plate Photo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handlePlatePhotoChange}
                    />
                    {platePhotoPreview && (
                      <div className="mt-3">
                        <Image
                          src={platePhotoPreview}
                          alt="Plate photo preview"
                          width={120}
                          height={120}
                          className="rounded-md object-cover border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}