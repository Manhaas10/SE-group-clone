import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const categories = [
  "Programming",
  "Music",
  "Sports",
  "Art",
  "Languages",
  "Academics",
  "Others"
];

const postTypes = [
  { value: "OFFERING", label: "Offering Skill" },
  { value: "SEEKING", label: "Seeking Skill" }
];



const NewPostForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: "OFFERING",
    category: "",
    title: "",
    description: "",
    availability: "",
    showCategoryDropdown: false,
    showTypeDropdown: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      category,
      showCategoryDropdown: false
    }));
  };

  const handleSelectType = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
      showTypeDropdown: false
    }));
  };

  const toggleDropdown = (dropdownName) => {
    setFormData(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName],
      ...(dropdownName === 'showCategoryDropdown' ? { showTypeDropdown: false } : { showCategoryDropdown: false })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type: formData.type,
      category: formData.category,
      title: formData.title,
      description: formData.description,
      availability: formData.availability,
    });
  };

  const getTypeLabel = () => {
    const type = postTypes.find(t => t.value === formData.type);
    return type ? type.label : "Select type";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border p-6">
      <h2 className="text-xl font-bold mb-4">New Skill Sharing Post</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Post Type</label>
          <div className="relative">
            <button
              type="button"
              className="w-full text-left px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center"
              onClick={() => toggleDropdown('showTypeDropdown')}
            >
              {getTypeLabel()}
              <span className="text-gray-400">▼</span>
            </button>
            {formData.showTypeDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {postTypes.map(type => (
                  <div
                    key={type.value}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectType(type.value)}
                  >
                    {type.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <div className="relative">
            <button
              type="button"
              className="w-full text-left px-4 py-2 border border-gray-300 rounded-md flex justify-between items-center"
              onClick={() => toggleDropdown('showCategoryDropdown')}
            >
              {formData.category || "Select category"}
              <span className="text-gray-400">▼</span>
            </button>
            {formData.showCategoryDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {categories.map(category => (
                  <div
                    key={category}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="What skill are you offering/seeking?"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide more details about your skill sharing post"
            className="w-full px-4 py-2 border border-gray-300 rounded-md h-24 resize-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Availability</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            placeholder="When are you available? (e.g., Weekends, Evening 6-8 PM)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="outline" className="bg-blue-600 text-white">
            Create Post
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;
