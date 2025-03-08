
import React, { useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: 'John Doe',
    rollNumber: 'B200456CS',
    roomNumber: 'A-304',
    hostelBlock: 'A Block',
    email: 'john@nitc.ac.in'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Profile updated successfully", {
      description: "Your changes have been saved",
      duration: 3000,
    });
  };

  const handleBackClick = () => {
    navigate('/dashboards');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 border-b flex items-center">
        <button onClick={handleBackClick} className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-blue-600">NITC HostelConnect</h1>
      </header>

      {/* Profile Settings Form */}
      <div className="max-w-3xl mx-auto my-6 p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <User size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Profile Settings</h2>
              <p className="text-gray-500">Manage your personal information</p>
            </div>
          </div>
          {/* <Button 
            onClick={handleSubmit} 
            className="bg-green-500 hover:bg-green-600"
          >
            Save Changes
          </Button> */}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="rollNumber" className="block text-gray-700 mb-2">Roll Number</label>
            <input
              id="rollNumber"
              name="rollNumber"
              type="text"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="roomNumber" className="block text-gray-700 mb-2">Room Number</label>
            <input
              id="roomNumber"
              name="roomNumber"
              type="text"
              value={formData.roomNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="hostelBlock" className="block text-gray-700 mb-2">Hostel Block</label>
            <input
              id="hostelBlock"
              name="hostelBlock"
              type="text"
              value={formData.hostelBlock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          
          <div className="mt-4">
            {/* <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              className="border-gray-300"
            >
              Cancel
            </Button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
