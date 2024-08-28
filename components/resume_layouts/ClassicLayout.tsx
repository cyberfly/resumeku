import React from "react";
import Image from "next/image";

const ClassicLayout = ({ formData }) => (
  <div className="bg-white shadow-lg rounded-md border flex">
    {/* Left Column */}
    <div className="w-1/4 bg-slate-300 pr-4 border-r px-4 py-4">
      <Image
        src={formData.personal_info.image || "/avatar.svg"}
        alt="Profile"
        width={150}
        height={150}
        className="rounded-full mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Contact</h2>
      <div className="break-words">
        <p className="overflow-hidden text-ellipsis">{formData.personal_info.email}</p>
        <p>{formData.personal_info.phone}</p>
        <p>{formData.personal_info.address}</p>
        <p className="overflow-hidden text-ellipsis">{formData.personal_info.website}</p>
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-2">Skills</h2>
      <ul className="list-disc list-inside">
        {formData.skills.map((skill, index) => (
          <li key={index} className="break-words">{skill}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">References</h2>
      {formData.references.map((reference, index) => (
        <div key={index} className="mb-3">
          <h3 className="font-semibold break-words">{reference.name}</h3>
          <p className="break-words">{reference.info}</p>
        </div>
      ))}

      {formData.salary.display && (
        <>
          <h2 className="text-xl font-semibold mt-4 mb-2">Salary</h2>
          {formData.salary.displayCurrent && (
            <p className="break-words">Current: {formData.salary.current}</p>
          )}
          {formData.salary.displayExpected && (
            <p className="break-words">Expected: {formData.salary.expected}</p>
          )}
        </>
      )}
    </div>

    {/* Right Column */}
    <div className="w-3/4 px-4 py-4">
      <h1 className="text-3xl font-bold mb-2">
        {formData.personal_info.fullName}
      </h1>
      <p className="text-xl text-gray-600 mb-2">
        {formData.personal_info.title || "Professional Title"}
      </p>
      <p className="text-gray-600 mb-4">
        {formData.personal_info.objective || "Contribute to company as a..."}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-3">Experience</h2>
      {formData.experience.map((exp, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold">{exp.company}</h3>
          <p className="italic">
            {exp.position} | {exp.duration}
          </p>
          <p className="text-gray-600">{exp.responsibilities}</p>
        </div>
      ))}

      <h2 className="text-2xl font-semibold mt-6 mb-3">Education</h2>
      {formData.education.map((edu, index) => (
        <div key={index} className="mb-3">
          <h3 className="font-semibold">{edu.institution}</h3>
          <p>
            {edu.degree}, {edu.graduationYear}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default ClassicLayout;