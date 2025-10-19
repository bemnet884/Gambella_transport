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
