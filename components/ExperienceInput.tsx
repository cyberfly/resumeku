import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExperienceInputProps {
  experience: any[];
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  onAddEntry: () => void;
  onRemoveEntry: (index: number) => void;
  onReorderEntry: (fromIndex: number, toIndex: number) => void;
}

const ExperienceInput: React.FC<ExperienceInputProps> = ({
  experience,
  onInputChange,
  onAddEntry,
  onRemoveEntry,
  onReorderEntry,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      {experience.map((exp, index) => (
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
                    disabled={index === experience.length - 1}
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
            name="company"
            value={exp.company || ""}
            onChange={(e) => onInputChange(e, index)}
            placeholder="Company"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="position"
            value={exp.position || ""}
            onChange={(e) => onInputChange(e, index)}
            placeholder="Position"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="duration"
            value={exp.duration || ""}
            onChange={(e) => onInputChange(e, index)}
            placeholder="Duration"
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            name="responsibilities"
            value={exp.responsibilities || ""}
            onChange={(e) => onInputChange(e, index)}
            placeholder="Responsibilities"
            className="w-full p-2 border rounded mb-2 h-56"
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
        Add Experience
      </button>
    </>
  );
};

export default ExperienceInput;
