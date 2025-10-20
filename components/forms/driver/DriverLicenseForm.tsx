"use client";

import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Save, CheckCircle } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { driverLicenseSchema, DriverLicenseFormData } from "@/zod";

export default function DriverLicenseForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<DriverLicenseFormData | null>(null);

  const methods = useForm<DriverLicenseFormData>({
    resolver: zodResolver(driverLicenseSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      birthPlace: "",
      dateOfIssue: "",
      expireDate: "",
      sex: "",
      age: "",
      district: "",
      region: "",
      receiptNumber: "",
      level: "",
    },
  });

  const onSubmit: SubmitHandler<DriverLicenseFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("✅ Driver license submitted:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate API call
      setSubmittedData(data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      methods.setError("root", {
        message: "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    const formData = methods.getValues();
    localStorage.setItem("driverLicenseDraft", JSON.stringify(formData));
    console.log("Draft saved locally");
  };

  if (submitSuccess && submittedData) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold text-green-600">Form Submitted Successfully!</h2>
        <p className="text-gray-600">Your driver’s license information has been received.</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Submit Another Driver
        </Button>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              የመንጃ ፍቃድ / Driver’s Licence Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <FormField
                control={methods.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ሙሉ ስም / Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Birth Place */}
              <FormField
                control={methods.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>የትውልድ ቦታ / Birth Place</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter birth place" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Issue */}
              <FormField
                control={methods.control}
                name="dateOfIssue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>የተሰጠበት ቀን / Date of Issue</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        max={methods.watch("expireDate") || undefined}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expiry Date */}
              <FormField
                control={methods.control}
                name="expireDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>የሚያበቃበት ቀን / Expiry Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        min={methods.watch("dateOfIssue") || undefined}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Sex */}
              <FormField
                control={methods.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ጾታ / Sex</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="ጾታ / Sex" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A">Female</SelectItem>
                        <SelectItem value="B">Male</SelectItem>

                      </SelectContent>
                    </Select>
                    <FormMessage />

                  </FormItem>
                )}
              />

              {/* Age */}
              <FormField
                control={methods.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ዕድሜ / Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* District */}
              <FormField
                control={methods.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ወረዳ / District</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter district" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Region */}
              <FormField
                control={methods.control}
                name="region"
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

              {/* Receipt Number */}
              <FormField
                control={methods.control}
                name="receiptNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ደረሰኝ ቁጥር / Receipt Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter receipt number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* License Level */}
              <FormField
                control={methods.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>የመንጃ ፍቃድ ደረጃ / Licence Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select license level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A">A — Motorcycle</SelectItem>
                        <SelectItem value="B">B — Light Vehicles</SelectItem>
                        <SelectItem value="C">C — Medium Trucks</SelectItem>
                        <SelectItem value="D">D — Buses</SelectItem>
                        <SelectItem value="E">E — Heavy Trucks / Trailer</SelectItem>
                        <SelectItem value="F">F — Special Vehicles</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submission Section */}
            <div className="flex justify-between items-center pt-6 border-t mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => methods.reset()}
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !methods.formState.isValid}
                  className="min-w-24"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Licence"
                  )}
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-500 text-center mt-2">
              {methods.formState.isValid ? (
                <span className="text-green-600">✓ Form is ready to submit</span>
              ) : (
                <span>Please complete all required fields</span>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
