"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SkillsInput from "./SkillsInput";
import EducationInput from "./EducationInput";
import ExperienceInput from "./ExperienceInput";
import PersonalInfoInput from "./PersonalInfoInput";
import SalaryInput from "./SalaryInput";
import ReferencesInput from "./ReferencesInput";

import ResumePreview from "./ResumePreview";
import { createResume } from "@/lib/actions";

const steps = [
  "Personal Info",
  "Education",
  "Experience",
  "Skills",
  "References",
  "Salary",
  "Preview",
];

export default function ResumeForm(props: any) {
  const cookies2 = props.cookies2;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personal_info: {},
    education: [],
    experience: [],
    skills: [],
    references: [],
    salary: {
      current: "",
      expected: "",
      display: false,
    },
  });

  useEffect(() => {
    const step = parseInt(searchParams.get("step") || "0");
    setCurrentStep(step);

    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, [searchParams]);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    router.push(`/create-resume?step=${index}`);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      let newData;
      if (currentStep === 0) {
        newData = {
          ...prevData,
          personal_info: { ...prevData.personal_info, [name]: value },
        };
      } else if (currentStep === 1) {
        const newEducation = [...prevData.education];
        newEducation[index] = { ...newEducation[index], [name]: value };
        newData = { ...prevData, education: newEducation };
      } else if (currentStep === 2) {
        const newExperience = [...prevData.experience];
        newExperience[index] = { ...newExperience[index], [name]: value };
        newData = { ...prevData, experience: newExperience };
      } else if (currentStep === 3) {
        newData = prevData;
      } else if (currentStep === 4) {
        // References step
        const newReferences = [...prevData.references];
        newReferences[index] = { ...newReferences[index], [name]: value };
        newData = { ...prevData, references: newReferences };
      } else if (currentStep === 5) {
        newData = {
          ...prevData,
          salary: { ...prevData.salary, [name]: value },
        };
      }
      localStorage.setItem("resumeData", JSON.stringify(newData));
      return newData;
    });
  };

  const addEntry = (type: "education" | "experience" | "references") => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], {}],
    }));
  };

  const removeEntry = (
    type: "education" | "experience" | "references",
    index: number
  ) => {
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [type]: prevData[type].filter((_, i) => i !== index),
      };
      localStorage.setItem("resumeData", JSON.stringify(newData));
      return newData;
    });
  };

  const onReorderEntry = (
    type: "education" | "experience" | "references",
    fromIndex: number,
    toIndex: number
  ) => {
    if (toIndex < 0 || toIndex >= formData[type].length) return;

    setFormData((prevData) => {
      const newEntries = [...prevData[type]];
      const [movedItem] = newEntries.splice(fromIndex, 1);
      newEntries.splice(toIndex, 0, movedItem);

      const newData = {
        ...prevData,
        [type]: newEntries,
      };

      localStorage.setItem("resumeData", JSON.stringify(newData));
      return newData;
    });
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        personal_info: {
          ...prevData.personal_info,
          image: reader.result as string,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const renderPersonalInfo = () => (
    <PersonalInfoInput
      personalInfo={formData.personal_info}
      onInputChange={handleInputChange}
      onImageUpload={handleImageUpload}
    />
  );

  const renderEducation = () => (
    <EducationInput
      education={formData.education}
      onInputChange={handleInputChange}
      onAddEntry={() => addEntry("education")}
      onRemoveEntry={(index) => removeEntry("education", index)}
      onReorderEntry={(fromIndex, toIndex) =>
        onReorderEntry("education", fromIndex, toIndex)
      }
    />
  );

  const renderExperience = () => (
    <ExperienceInput
      experience={formData.experience}
      onInputChange={handleInputChange}
      onAddEntry={() => addEntry("experience")}
      onRemoveEntry={(index) => removeEntry("experience", index)}
      onReorderEntry={(fromIndex, toIndex) =>
        onReorderEntry("experience", fromIndex, toIndex)
      }
    />
  );

  const renderSkills = () => (
    <>
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <SkillsInput
        skills={formData.skills}
        onSkillsChange={(newSkills) => {
          setFormData((prevData) => {
            const newData = { ...prevData, skills: newSkills };
            localStorage.setItem("resumeData", JSON.stringify(newData));
            return newData;
          });
        }}
      />
    </>
  );

  const renderReferences = () => (
    <ReferencesInput
      references={formData.references}
      onInputChange={handleInputChange}
      onAddEntry={() => addEntry("references")}
      onRemoveEntry={(index) => removeEntry("references", index)}
    />
  );

  const renderSalary = () => (
    <SalaryInput
      salary={formData.salary}
      onInputChange={(e) => handleInputChange(e)}
      onCheckboxChange={(checked, field) =>
        setFormData((prev) => {
          const newSalary = { ...prev.salary, [field]: checked };
          const newData = { ...prev, salary: newSalary };
          localStorage.setItem("resumeData", JSON.stringify(newData));
          return newData;
        })
      }
    />
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderEducation();
      case 2:
        return renderExperience();
      case 3:
        return renderSkills();
      case 4:
        return renderReferences();
      case 5:
        return renderSalary();
      case 6:
        return <ResumePreview formData={formData} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      handleStepClick(currentStep + 1);
    } else {
      console.log("Form submitted:", formData);

      createResume(formData);
      return;

      try {
        const response = await fetch("/api/create-resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookies2,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to submit resume");

        const result = await response.json();
        console.log("Resume submitted successfully:", result);
        router.push("/resume-submitted");
      } catch (error) {
        console.error("Error submitting resume:", error);
      }
    }
  };

  const seedFormData = () => {
    const sampleData = {
      personal_info: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
        address: "123 Main St, Anytown, USA",
        title: "Software Developer",
        objective: "Seeking a challenging position in a dynamic tech company",
        website: "www.johndoe.com",
        image: "", // You can add a sample image URL here if needed
      },
      education: [
        {
          institution: "University of Technology",
          degree: "Bachelor of Science in Computer Science",
          graduationYear: "2020",
        },
        {
          institution: "Community College",
          degree: "Associate's Degree in Web Development",
          graduationYear: "2018",
        },
      ],
      experience: [
        {
          company: "Tech Solutions Inc.",
          position: "Senior Software Developer",
          duration: "2020 - Present",
          responsibilities: "Developed and maintained web applications using React and Node.js. Led a team of 5 junior developers.",
        },
        {
          company: "StartUp Innovations",
          position: "Junior Web Developer",
          duration: "2018 - 2020",
          responsibilities: "Assisted in the development of responsive websites and implemented UI/UX designs.",
        },
        {
          company: "Global Systems Corp.",
          position: "Software Engineer",
          duration: "2016 - 2018",
          responsibilities: "Developed and optimized backend services using Java and Spring Framework. Implemented RESTful APIs and improved system performance.",
        },
        {
          company: "DataTech Solutions",
          position: "Data Analyst Intern",
          duration: "Summer 2015",
          responsibilities: "Analyzed large datasets using SQL and Python. Created data visualization dashboards to present insights to stakeholders.",
        },
        {
          company: "CodeCraft Academy",
          position: "Teaching Assistant",
          duration: "2014 - 2016",
          responsibilities: "Assisted in teaching introductory programming courses. Conducted code reviews and provided mentorship to students.",
        },
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
      references: [
        {
          name: "Jane Smith",
          info: "Senior Manager at Tech Solutions Inc., jane.smith@techsolutions.com",
        },
        {
          name: "Mike Johnson",
          info: "CEO at StartUp Innovations, mike.johnson@startupinnovations.com",
        },
      ],
      salary: {
        current: "75000",
        expected: "90000",
        display: true,
        displayCurrent: true,
        displayExpected: true,
      },
    };

    setFormData(sampleData);
    localStorage.setItem("resumeData", JSON.stringify(sampleData));
  };

  return (
    <div className="w-[900px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Create Your Resume
      </h1>
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <button
            key={step}
            onClick={() => handleStepClick(index)}
            className={`px-4 py-2 rounded-full ${
              currentStep === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            {step}
          </button>
        ))}
      </div>
      <button
        onClick={seedFormData}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 mb-4"
      >
        Seed Sample Data
      </button>
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepContent()}
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => handleStepClick(currentStep - 1)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-200"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}