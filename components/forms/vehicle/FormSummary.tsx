interface FormSummaryProps {
  formData: any;
}

export default function FormSummary({ formData }: FormSummaryProps) {
  const completedSections = Object.values(formData).filter(
    (section: any) => Object.values(section).some(value => value && value !== "")
  ).length;

  return (
    <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
      <h3 className="font-semibold text-blue-900 mb-2">Form Summary</h3>
      <p className="text-sm text-blue-700">
        {completedSections} of 4 sections completed
      </p>
    </div>
  );
}