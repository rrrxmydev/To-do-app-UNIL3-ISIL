import React, { useState } from 'react';

const AddSectionForm = ({ setSections }) => {
  const [sectionTitle, setSectionTitle] = useState('');

  const handleAddSection = () => {
    const newSection = { title: sectionTitle, tasks: [] };
    setSections((prevSections) => [...prevSections, newSection]);
    setSectionTitle('');
  };

  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-sm add-section-form">
      <h4 className="text-lg font-bold">Add New Section</h4>
      <input
        type="text"
        placeholder="Section Title"
        className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        value={sectionTitle}
        onChange={(e) => setSectionTitle(e.target.value)}
      />
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md"
        onClick={handleAddSection}
      >
        Add Section
      </button>
    </div>
  );
};

export default AddSectionForm;
