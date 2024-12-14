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
import { createResume, updateResume } from "@/lib/actions";
const steps = [
  "Personal Info",
  "Education",
  "Experience",
  "Skills",
  "References",
  "Salary",
];

export default function ResumeForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);

  const [showPreview, setShowPreview] = useState(true);

  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return initialData;
    }

    const storedData = localStorage.getItem("resumeData");
    return storedData
      ? JSON.parse(storedData)
      : {
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
        };
  });

  useEffect(() => {
    const step = parseInt(searchParams.get("step") || "0");
    setCurrentStep(step);
  }, [searchParams]);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("step", index.toString());
    router.push(`/create-resume?${currentParams.toString()}`);
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
      default:
        return <div>Unknown step</div>;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      handleStepClick(currentStep + 1);
    } else {
      if (initialData) {
        await updateResume(initialData.id, formData);
      } else {
        await createResume(formData);
        clearFormData();
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
          responsibilities:
            "Developed and maintained web applications using React and Node.js. Led a team of 5 junior developers.",
        },
        {
          company: "StartUp Innovations",
          position: "Junior Web Developer",
          duration: "2018 - 2020",
          responsibilities:
            "Assisted in the development of responsive websites and implemented UI/UX designs.",
        },
        {
          company: "Global Systems Corp.",
          position: "Software Engineer",
          duration: "2016 - 2018",
          responsibilities:
            "Developed and optimized backend services using Java and Spring Framework. Implemented RESTful APIs and improved system performance.",
        },
        {
          company: "DataTech Solutions",
          position: "Data Analyst Intern",
          duration: "Summer 2015",
          responsibilities:
            "Analyzed large datasets using SQL and Python. Created data visualization dashboards to present insights to stakeholders.",
        },
        {
          company: "CodeCraft Academy",
          position: "Teaching Assistant",
          duration: "2014 - 2016",
          responsibilities:
            "Assisted in teaching introductory programming courses. Conducted code reviews and provided mentorship to students.",
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

  const clearFormData = () => {
    const emptyFormData = {
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
    };
    setFormData(emptyFormData);
    localStorage.removeItem("resumeData");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-right">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-all duration-200 inline-flex items-center gap-2"
        >
          {showPreview ? (
            <>
              <span>Hide Preview</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </>
          ) : (
            <>
              <span>Show Preview</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </>
          )}
        </button>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* left col */}

        <div className="flex-1 w-full pr-8">
          <div className="flex flex-wrap justify-betweena mb-8 gap-2">
            {steps.map((step, index) => (
              <button
                key={step}
                onClick={() => handleStepClick(index)}
                className={`px-6 py-3 rounded-lg shadow-sm ${
                  currentStep === index
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                } transition-all duration-200 relative`}
              >
                <span className="absolute -top-2 -left-2 bg-blue-700 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  {index + 1}
                </span>
                <span className="ml-2">{step}</span>
              </button>
            ))}
          </div>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={seedFormData}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all duration-200 shadow-sm font-medium border border-emerald-700"
            >
              Seed Sample Data
            </button>
            <button
              onClick={clearFormData}
              className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-all duration-200 shadow-sm font-medium border border-rose-700"
            >
              Clear Form
            </button>{" "}
          </div>
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

              {currentStep != steps.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleStepClick(currentStep + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  Next
                </button>
              )}

              {currentStep === steps.length - 1 && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                >
                  {initialData ? "Save" : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
        {/* end left col */}

        {/* right col */}
        {showPreview && (
          <div className="w-full lg:w-[50%] lg:px-4 mt-8 lg:mt-0">
            <ResumePreview formData={formData} />
          </div>
        )}

        {/* end right col */}
      </div>
    </div>
  );
}
