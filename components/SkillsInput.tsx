import React, { useState } from 'react';

interface SkillsInputProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const SkillsInput: React.FC<SkillsInputProps> = ({ skills, onSkillsChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addSkill = () => {
    if (inputValue.trim()) {
      onSkillsChange([...skills, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (index: number) => {
    onSkillsChange(skills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter a skill"
          className="flex-grow p-2 border rounded-l"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors duration-200"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center bg-gray-100 p-2 rounded">
            <span className="flex-grow">{skill}</span>
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsInput;
