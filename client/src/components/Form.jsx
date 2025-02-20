import React from "react";

const Form = ({ fields, onSubmit, initialData = {}, buttonText = "Submit" }) => {
  const [formData, setFormData] = React.useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
  <div key={field.name}>
    <label className="block text-sm font-medium text-gray-700">
      {field.label}
    </label>
    {field.type === "select" ? (
      <select
        name={field.name}
        value={formData[field.name] || ""}
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select {field.label}</option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : field.type === "checkbox" ? (
      <input
        type="checkbox"
        name={field.name}
        checked={!!formData[field.name]}
        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })}
        className="mt-1 block"
      />
    ) : (
      <input
        type={field.type}
        name={field.name}
        value={formData[field.name] || ""}
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        placeholder={field.placeholder}
      />
    )}
  </div>
))}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default Form;