"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Loader2, Save, CheckCircle } from "lucide-react";

import VehicleDescriptionForm from "./VehicleDescriptionForm";
import VehicleRegistrationForm from "./VehicleRegistrationForm";
import VehicleOwnerForm from "./VehicleOwnerForm";
import VehiclePossessorForm from "./VehiclePossessorForm";
import { vehicleSchema, VehicleFormData } from "@/zod";
import FormProgress from "./FormProgress";
import FormSummary from "./FormSummary";
import SubmissionSummary from "./SubmissionSummary";

export default function VehicleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<VehicleFormData | null>(null);
  const [currentSection, setCurrentSection] = useState("vehicle-desc");


  const methods = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    mode: "onTouched",
    defaultValues: {
      description: {
        vehicleType: "",
        make: "",
        model: "",
        manufacturedYear: "",
        bodyType: "",
        chassisNumber: "",
        color: "",
        bodyWidth: "",
        bodyLength: "",
        bodyHeight: "",
        engineNumber: "",
        engineCapacity: "",
        fuelType: "",
        numberOfCylinders: "",
        serialNumber: "",
        brakeHorsePower: "",
        tyreFront: "",
        tyreOthers: "",
        numberOfAxles: "",
        frontAxleMaxLoad: "",
        otherAxlesMaxLoad: "",
        grossVehicleWeight: "",
        tareWeight: "",
        payLoad: "",
        capacityExcludingDriver: "",
      },
      registration: {
        officeCode: "",
        codeNumber: "",
        plateNumber: "",
        platePhoto: undefined,
      },
      owner: {
        specialRegNumber: "",
        name: "",
        region: "",
        city: "",
        kebele: "",
        houseNo: "",
        photo: undefined,
      },
      possessor: {
        specialRegNumber: "",
        name: "",
        region: "",
        city: "",
        kebele: "",
        houseNo: "",
        photo: undefined,
      },
    },
  });

  const isSectionValid = (section: keyof VehicleFormData) => {
    const sectionData = methods.watch(section);
    try {
      vehicleSchema.shape[section].parse(sectionData);
      return true;
    } catch {
      return false;
    }
  };

  const sections = [
    { id: "vehicle-desc", label: " ስለ ተሽከርካሪው መግለጫ / Vehicle Description", key: "description" as keyof VehicleFormData },
    { id: "vehicle-reg", label: "ተሽከርካሪው የተመዘገበበት ሠሌዳ / Registration Plates", key: "registration" as keyof VehicleFormData },
    { id: "vehicle-owner", label: "የተሽከርካሪው ባለንብረት / Vehicle Owner", key: "owner" as keyof VehicleFormData },
    { id: "vehicle-possessor", label: "የተሽከርካሪው ባለይዞተ / Vehicle Possessor", key: "possessor" as keyof VehicleFormData },
  ];

  const onSubmit: SubmitHandler<VehicleFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("✅ Vehicle form submitted:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store the submitted data to display
      setSubmittedData(data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      methods.setError("root", {
        message: "Failed to submit form. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    const formData = methods.getValues();
    localStorage.setItem('vehicleFormDraft', JSON.stringify(formData));
    methods.clearErrors("root");
    // You could add a toast notification here
    console.log("Draft saved locally");
  };

  if (submitSuccess && submittedData) {
    return <SubmissionSummary data={submittedData} />;
  }

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold text-green-600">Form Submitted Successfully!</h2>
        <p className="text-gray-600">Your vehicle registration has been received.</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Submit Another Vehicle
        </Button>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FormProgress
          sections={sections}
          currentSection={currentSection}
          isSectionValid={isSectionValid}
        />

        {methods.formState.errors.root && (
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="text-red-700 text-sm">
              {methods.formState.errors.root.message}
            </p>
          </div>
        )}

        <Accordion
          type="single"
          collapsible
          className="border rounded-lg p-4"
          value={currentSection}
          onValueChange={setCurrentSection}
        >
          {sections.map((section, index) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${isSectionValid(section.key)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                    }`}>
                    {isSectionValid(section.key) ? '✓' : index + 1}
                  </div>
                  <span>
                    {section.label}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-1">
                {section.id === "vehicle-desc" && <VehicleDescriptionForm />}
                {section.id === "vehicle-reg" && <VehicleRegistrationForm />}
                {section.id === "vehicle-owner" && <VehicleOwnerForm />}
                {section.id === "vehicle-possessor" && <VehiclePossessorForm />}

                {/* Section Navigation */}
                <div className="flex justify-between pt-6 mt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={index === 0}
                    onClick={() => setCurrentSection(sections[index - 1]?.id || "")}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCurrentSection(sections[index + 1]?.id || "")}
                    disabled={index === sections.length - 1 || !isSectionValid(section.key)}
                  >
                    Next
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Form Summary */}
        <FormSummary formData={methods.watch()} />

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
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
                'Submit Vehicle'
              )}
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-500 text-center">
          {methods.formState.isValid ? (
            <span className="text-green-600">✓ Form is ready to submit</span>
          ) : (
            <span>Please complete all required fields</span>
          )}
        </div>
      </form>
    </FormProvider>
  );
}