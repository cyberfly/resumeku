import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EducationInputProps {
  education: any[];
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onAddEntry: () => void;
  onRemoveEntry: (index: number) => void;
  onReorderEntry: (fromIndex: number, toIndex: number) => void;
}

const EducationInput: React.FC<EducationInputProps> = ({
  education,
  onInputChange,
  onAddEntry,
  onRemoveEntry,
  onReorderEntry,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-4 p-4 border rounded relative">
          <div className="absolute right-[-2.5rem] top-2 flex flex-col">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onReorderEntry(index, index - 1)}
                    disabled={index === 0}
                    className="p-1 disabled:opacity-50"
                  >
                    <ChevronUpIcon className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Move Up</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onReorderEntry(index, index + 1)}
                    disabled={index === education.length - 1}
                    className="p-1 disabled:opacity-50"
                  >
                    <ChevronDownIcon className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Move Down</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <input
            type="text"
            name="institution"
            value={edu.institution || ""}
            onChange={(e) => onInputChange(e, index)}
            placeholder="Institution"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="degree"
            value={edu.degree || ""}
            onChange={(e) => onInputChange(e, index)}
            placeholder="Degree"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="graduationYear"
            value={edu.graduationYear || ""}
            onChange={(e) => onInputChange(e, index)}
            placeholder="Graduation Year"
            className="w-full p-2 border rounded mb-2"
          />
          <button
            type="button"
            onClick={() => onRemoveEntry(index)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAddEntry}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Education
      </button>
    </>
  );
};

export default EducationInput;