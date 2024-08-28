import React from 'react';

interface ReferencesInputProps {
  references: any[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onAddEntry: () => void;
  onRemoveEntry: (index: number) => void;
}

const ReferencesInput: React.FC<ReferencesInputProps> = ({
  references,
  onInputChange,
  onAddEntry,
  onRemoveEntry,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">References</h2>
      {references.map((reference, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <input
            type="text"
            name="name"
            value={reference.name || ""}
            onChange={(e) => onInputChange(e, index)}
            placeholder="Reference Name"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="info"
            value={reference.info || ""}
            onChange={(e) => onInputChange(e, index)}
            placeholder="Reference Info"
            className="w-full p-2 border rounded mb-2"
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
        Add Reference
      </button>
    </>
  );
};

export default ReferencesInput;
