import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface SalaryInputProps {
  salary: {
    current: string;
    expected: string;
    display: boolean;
    displayCurrent: boolean;
    displayExpected: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (checked: boolean, field: string) => void;
}

const SalaryInput: React.FC<SalaryInputProps> = ({
  salary,
  onInputChange,
  onCheckboxChange,
}) => {
  const handleCheckboxChange = (checked: boolean, field: string) => {
    if (field === "display") {
      onCheckboxChange(checked, field);
    } else {
      // Only update other checkboxes if the main display checkbox is checked
      if (salary.display) {
        onCheckboxChange(checked, field);
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Salary Information</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="display-salary"
            checked={salary.display}
            onCheckedChange={(checked) =>
              handleCheckboxChange(checked, "display")
            }
          />
          <label htmlFor="display-salary">
            Display salary information on resume
          </label>
        </div>
        {salary.display && (
          <>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="display-expected-salary"
                  checked={salary.displayExpected}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, "displayExpected")
                  }
                />
                <label htmlFor="display-expected-salary">
                  Display Expected Salary
                </label>
              </div>
              <input
                type="text"
                name="expected"
                value={salary.expected || ""}
                onChange={onInputChange}
                placeholder="Expected Salary"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="display-current-salary"
                  checked={salary.displayCurrent}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, "displayCurrent")
                  }
                />
                <label htmlFor="display-current-salary">
                  Display Current Salary
                </label>
              </div>
              <input
                type="text"
                name="current"
                value={salary.current || ""}
                onChange={onInputChange}
                placeholder="Current Salary"
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SalaryInput;
