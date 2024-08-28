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
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Select Layout</h3>
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
    </Card>
  );

  return (
    <div className="space-y-6">
      <LayoutSelector />
      <Card className="p-6 bg-blue-50">
        {layout === "modern" ? (
          <>
            <h3 className="font-semibold mb-4">Modern Layout</h3>
            <ModernLayout formData={formData} />
          </>
        ) : (
          <>
            <h3 className="font-semibold mb-4">Classic Layout</h3>
            <ClassicLayout formData={formData} />
          </>
        )}
      </Card>
    </div>
  );
};

export default ResumePreview;
