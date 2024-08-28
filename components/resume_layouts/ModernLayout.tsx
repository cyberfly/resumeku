import React from "react";
import Image from "next/image";

const ModernLayout = ({ formData }) => (
  <div className="flex flex-row border shadow-md rounded bg-white">
    {/* left col */}
    <div className="flex-1 w-full px-8 py-6 relative">
      <div className="flex items-center mb-6">
        <div className="flex-1 w-full pr-4">
          <h1 className="text-3xl font-bold break-words">
            {formData.personal_info.fullName}
          </h1>
          <p className="text-xl text-gray-600 break-words">
            {formData.personal_info.title || "Professional Title"}
          </p>
          <p className="text-gray-600 break-words">
            {formData.personal_info.objective ||
              "Contribute to company as a..."}
          </p>
        </div>
        <Image
          src={formData.personal_info.image || "/avatar.svg"}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full flex-shrink-0"
        />
      </div>

      <div className="border-t border-gray-100 my-6"></div>

      {/* second */}
      <div className="border-b border-gray-100">
        <h2 className="text-lg uppercase mb-6">Experience</h2>
        <div className="relative">
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-8 flex">
              <div className="absolute w-0.5 h-full bg-gray-300 left-2.5 top-0"></div>
              <div className="w-5 h-5 rounded-full bg-gray-700 absolute left-0 z-10"></div>
              <div className="ml-10">
                <div className="flex items-center mb-1">
                  <h3 className="font-semibold text-lg break-words mr-2">
                    {exp.position}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {exp.duration}
                  </span>
                </div>
                <p className="italic mb-2 text-gray-600 break-words">{exp.company}</p>
                <p className="text-gray-600 text-sm break-words leading-relaxed">
                  {exp.responsibilities}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <h2 className="text-lg uppercase mt-6 mb-3">Education</h2>
        {formData.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-semibold break-words">{edu.institution}</h3>
            <p className="break-words">
              {edu.degree}, {edu.graduationYear}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* end left col */}

    {/* right col */}
    <div className="bg-slate-200 w-56 px-4 py-4">
      <h2 className="text-lg uppercase mb-3">Contact</h2>
      <div className="border-t border-slate-300 mt-2 mb-4"></div>

      <h4 className="text-sm font-bold mt-2">Email</h4>
      <p className="text-sm break-words overflow-hidden text-ellipsis">
        {formData.personal_info.email}
      </p>

      <h4 className="text-sm font-bold mt-2">Address</h4>
      <p className="text-sm break-words">
        {formData.personal_info.address ?? "add your address"}
      </p>

      <h4 className="text-sm font-bold mt-2">Phone</h4>
      <p className="text-sm break-words">{formData.personal_info.phone}</p>

      <h4 className="text-sm font-bold mt-2">Website</h4>
      <p className="text-sm break-words overflow-hidden text-ellipsis">
        {formData.personal_info.website ?? "add your website "}
      </p>

      <h2 className="text-lg uppercase mt-6 mb-3">Skills</h2>
      <div className="border-t border-slate-300 mt-2 mb-4"></div>
      <ul className="list-disc list-inside">
        {formData.skills.map((skill, index) => (
          <li key={index} className="break-words">{skill}</li>
        ))}
      </ul>

      <h2 className="text-lg uppercase mt-6 mb-3">References</h2>
      <div className="border-t border-slate-300 mt-2 mb-4"></div>
      {formData.references.map((reference, index) => (
        <div key={index} className="mb-3">
          <h3 className="font-semibold break-words">{reference.name}</h3>
          <p className="break-words">{reference.info}</p>
        </div>
      ))}

      {formData.salary.display && (
        <>
          <h2 className="text-lg uppercase mt-6 mb-3">Salary</h2>
          <div className="border-t border-slate-300 mt-2 mb-4"></div>
          {formData.salary.displayCurrent && (
            <>
              <h4 className="text-sm font-bold mt-2">Current Salary</h4>
              <p className="text-sm break-words">{formData.salary.current}</p>
            </>
          )}
          {formData.salary.displayExpected && (
            <>
              <h4 className="text-sm font-bold mt-2">Expected Salary</h4>
              <p className="text-sm break-words">{formData.salary.expected}</p>
            </>
          )}
        </>
      )}
    </div>
    {/* end right col */}
  </div>
);

export default ModernLayout;