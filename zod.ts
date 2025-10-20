// zod.ts
import { z } from "zod";

export const vehicleSchema = z.object({
  description: z.object({
    vehicleType: z.string().min(1, "Vehicle type is required"),
    make: z.string().min(1, "Make is required"),
    model: z.string().min(1, "Model is required"),
    manufacturedYear: z.string().min(1, "Year is required"),
    bodyType: z.string().optional(),
    chassisNumber: z.string().optional(),
    color: z.string().optional(),
    bodyWidth: z.string().optional(),
    bodyLength: z.string().optional(),
    bodyHeight: z.string().optional(),
    engineNumber: z.string().optional(),
    engineCapacity: z.string().optional(),
    fuelType: z.string().optional(),
    numberOfCylinders: z.string().optional(),
    serialNumber: z.string().optional(),
    brakeHorsePower: z.string().optional(),
    tyreFront: z.string().optional(),
    tyreOthers: z.string().optional(),
    numberOfAxles: z.string().optional(),
    frontAxleMaxLoad: z.string().optional(),
    otherAxlesMaxLoad: z.string().optional(),
    grossVehicleWeight: z.string().optional(),
    tareWeight: z.string().optional(),
    payLoad: z.string().optional(),
    capacityExcludingDriver: z.string().optional(),
    vehiclePhoto: z.any().optional(),
    platePhoto: z.any().optional(),
  }),
  registration: z.object({
    officeCode: z.string().min(1, "Office code is required"),
    codeNumber: z.string().min(1, "Code number is required"),
    plateNumber: z.string().min(1, "Plate number is required"),
    platePhoto: z.any().optional(), // can be File | undefined
  }),
  owner: z.object({
    specialRegNumber: z.string().min(1, "Special registration number required"),
    name: z.string().min(1, "Name is required"),
    region: z.string().optional(),
    city: z.string().optional(),
    kebele: z.string().optional(),
    houseNo: z.string().optional(),
    photo: z.any().optional(), // owner photo
  }),
  possessor: z.object({
    specialRegNumber: z.string().min(1, "Special registration number required"),
    name: z.string().min(1, "Name is required"),
    region: z.string().optional(),
    city: z.string().optional(),
    kebele: z.string().optional(),
    houseNo: z.string().optional(),
    photo: z.any().optional(), // possessor photo
  }),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;


export const driverLicenseSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    birthPlace: z.string().min(1, "Birth place is required"),
    dateOfIssue: z.string().min(1, "Date of issue is required"),
    expireDate: z.string().min(1, "Expire date is required"),
    sex: z.string().min(1, "Sex is required"),
    age: z.string().min(1, "Age is required"),
    district: z.string().min(1, "District is required"),
    region: z.string().min(1, "Region is required"),
    receiptNumber: z.string().min(1, "Receipt number is required"),
    level: z.string().min(1, "Licence level is required"),
  })
  .refine(
    (data) => {
      const issue = new Date(data.dateOfIssue);
      const expire = new Date(data.expireDate);
      return expire > issue; // must expire *after* issue date
    },
    {
      message: "Expiry date must be after the issue date.",
      path: ["expireDate"], // attach error to the expiry date field
    }
  );

export type DriverLicenseFormData = z.infer<typeof driverLicenseSchema>;

