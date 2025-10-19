// FormProgress.tsx
import { CheckCircle } from "lucide-react";

interface FormProgressProps {
  sections: Array<{ id: string; label: string; key: "description" | "registration" | "owner" | "possessor" }>;
  currentSection: string;
  isSectionValid: (key: "description" | "registration" | "owner" | "possessor") => boolean;
}

export default function FormProgress({ sections, currentSection, isSectionValid }: FormProgressProps) {
  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
      {sections.map((section, index) => (
        <div key={section.id} className="flex items-center">
          <div className={`flex flex-col items-center ${currentSection === section.id ? 'text-blue-600' : 'text-gray-500'}`}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentSection === section.id
              ? 'border-blue-600 bg-blue-50'
              : isSectionValid(section.key)
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300'
              }`}>
              {isSectionValid(section.key) ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <span className="text-xs mt-1 hidden md:inline">{section.label.split(' ')[0]}</span>
          </div>
          {index < sections.length - 1 && (
            <div className={`w-8 h-0.5 mx-2 ${isSectionValid(section.key) ? 'bg-green-500' : 'bg-gray-300'
              }`} />
          )}
        </div>
      ))}
    </div>
  );
}