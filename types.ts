export interface PersonalInfo {
  image: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  fullName: string;
  title: string;
  objective: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  responsibilities: string;
}

export interface Education {
  institution: string;
  degree: string;
  graduationYear: string;
}

export interface Reference {
  name: string;
  info: string;
}

export interface Salary {
  display: boolean;
  displayCurrent: boolean;
  displayExpected: boolean;
  current: string;
  expected: string;
}

export interface ResumeFormData {
  personal_info: PersonalInfo;
  skills: string[];
  references: Reference[];
  salary: Salary;
  experience: Experience[];
  education: Education[];
}
