import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import ClassicLayout from "@/components/resume_layouts/ClassicLayout";
import ModernLayout from "@/components/resume_layouts/ModernLayout";

interface ResumePreviewProps {
  formData: {
    personal_info: any;
    education: any[];
    experience: any[];
    skills: string[];
  };
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ formData }) => {
  const [layout, setLayout] = React.useState("classic");

  const LayoutSelector = () => (
    <div className="px-6 py-4 mb-6 border border-t-0 bg-white shadow-sm rounded-b-md">
      {/* <h3 className="text-lg font-semibold mb-4">Select Layout</h3> */}
      <RadioGroup
        value={layout}
        onValueChange={setLayout}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="classic" id="classic" />
          <Label htmlFor="classic">Classic</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="modern" id="modern" />
          <Label htmlFor="modern">Modern</Label>
        </div>
      </RadioGroup>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="px-6 pb-6 pt-0 bg-blue-50">
        <LayoutSelector />
        {layout === "modern" ? (
          <>
            <ModernLayout formData={formData} />
          </>
        ) : (
          <>
            <ClassicLayout formData={formData} />
          </>
        )}
      </Card>
    </div>
  );
};

export default ResumePreview;
