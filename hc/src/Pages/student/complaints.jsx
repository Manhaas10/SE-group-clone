
import React, { useState } from 'react';
import { ArrowLeft, Clock, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/student/Header';
import { toast } from 'sonner';

const Complaints = () => {
  const navigate = useNavigate();
  const username = "Man";
  
  // Sample complaints data
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Faulty Fan",
      category: "Electrical",
      date: "3/20/2024",
      description: "The ceiling fan in my room is not working properly",
      status: "pending"
    },
    {
      id: 2,
      title: "Water Leakage",
      category: "Plumbing",
      date: "3/16/2024",
      description: "There is water leakage in the bathroom",
      status: "resolved"
    }
  ]);

  const [showNewComplaintForm, setShowNewComplaintForm] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    category: "Electrical",
    description: ""
  });

  const handleBackClick = () => {
    navigate('/');
  };

  const handleRegisterComplaint = () => {
    setShowNewComplaintForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!newComplaint.title || !newComplaint.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    
    const complaint = {
      id: complaints.length + 1,
      title: newComplaint.title,
      category: newComplaint.category,
      date: formattedDate,
      description: newComplaint.description,
      status: "pending"
    };
    
    setComplaints([complaint, ...complaints]);
    setNewComplaint({
      title: "",
      category: "Electrical",
      description: ""
    });
    setShowNewComplaintForm(false);
    
    toast.success("Complaint registered successfully", {
      description: "You can track its status here",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComplaint({
      ...newComplaint,
      [name]: value
    });
  };

  const cancelComplaint = () => {
    setShowNewComplaintForm(false);
    setNewComplaint({
      title: "",
      category: "Electrical",
      description: ""
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header username={username} notificationCount={6} />
      
      <main className="flex-grow p-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackClick} 
            className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Complaints</h1>
        </div>
        
        {!showNewComplaintForm ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Complaint Log</h2>
              <Button 
                onClick={handleRegisterComplaint}
                className="bg-nitc-blue hover:bg-nitc-blue/90"
              >
                <Plus size={18} className="mr-1" /> Register New Complaint
              </Button>
            </div>
            
            <div className="space-y-4">
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <div 
                    key={complaint.id}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{complaint.title}</h3>
                      <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                        complaint.status === "pending" 
                          ? "bg-amber-100 text-amber-700" 
                          : "bg-green-100 text-green-700"
                      }`}>
                        {complaint.status === "pending" ? (
                          <><Clock size={16} className="mr-1" /> Pending</>
                        ) : (
                          <><Check size={16} className="mr-1" /> Resolved</>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      Category: {complaint.category} | Date: {complaint.date}
                    </div>
                    <p className="text-gray-700">{complaint.description}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No complaints registered yet</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Register New Complaint</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Complaint Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newComplaint.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nitc-blue"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={newComplaint.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nitc-blue"
                  >
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Network">Network</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newComplaint.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nitc-blue"
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={cancelComplaint}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-nitc-blue hover:bg-nitc-blue/90"
                  >
                    Submit Complaint
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© 2023 NITC HostelConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Complaints;
