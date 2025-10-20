import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

export default function DriverRegistrationFooter() {
  const methods = useFormContext();
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting, isValid } = formState;

  const handleSaveDraft = async () => {
    // Save form data to localStorage or draft API
    const data = methods.getValues();
    localStorage.setItem("driver_registration_draft", JSON.stringify(data));
    alert("✅ Draft saved successfully!");
  };

  return (
    <>
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
            onClick={() => reset()}
            disabled={isSubmitting}
          >
            Reset Form
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="min-w-24"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Driver"
            )}
          </Button>
        </div>
      </div>

      <div className="text-sm text-gray-500 text-center mt-3">
        {isValid ? (
          <span className="text-green-600">✓ Form is ready to submit</span>
        ) : (
          <span>Please complete all required fields</span>
        )}
      </div>
    </>
  );
}
