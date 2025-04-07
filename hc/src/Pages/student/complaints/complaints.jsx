"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { format } from "date-fns"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import api from "../../api/axios"

const Complaints = () => {
  const navigate = useNavigate()
  const [complaints, setComplaints] = useState([])
  const [isNewComplaintView, setIsNewComplaintView] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    category: "Electrical",
    description: "",
    date: format(new Date(), "MM/dd/yyyy"),
  })

  // Fetch complaints on component mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setIsLoading(true)
        const response = await api.get("/complaints")
        setComplaints(response.data)
      } catch (error) {
        console.error("Error fetching complaints:", error)
        toast.error("Failed to load complaints")
      } finally {
        setIsLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  const handleBackClick = () => {
    if (isNewComplaintView) {
      setIsNewComplaintView(false)
    } else {
      navigate("/dashboards")
    }
  }

  const handleRegisterComplaint = () => {
    setIsNewComplaintView(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewComplaint({
      ...newComplaint,
      [name]: value,
    })
  }

  const isFormValid = newComplaint.title.trim() && newComplaint.description.trim();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const complaintData = {
        room: `Room ${localStorage.getItem("hostelblock") || "Unknown"}`,
        title: newComplaint.title,
        description: newComplaint.description,
        category: newComplaint.category,
        date: format(newComplaint.date, "yyyy-MM-dd"), // ✅ Properly formatted date
        is_anonymous: false,
      };
      console.log(complaintData);
      const response = await api.post("/complaints", complaintData);
      console.log(response.data);
      

      setComplaints([
        { ...complaintData, id: response.data.id, status: "pending" },
        ...complaints,
      ]);

      // ✅ Reset form but keep the selected category
      setNewComplaint({
        title: "",
        category: newComplaint.category, // Preserve category
        description: "",
        date: new Date(),
      });

      setIsNewComplaintView(false);
      toast.success("Complaint registered successfully!");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Failed to submit complaint.");
    }
  };
  const handleCancel = () => {
    setIsNewComplaintView(false)
    setNewComplaint({
      title: "",
      category: "Electrical",
      description: "",
      date: format(new Date(), "MM/dd/yyyy"),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <button onClick={handleBackClick} className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-blue-600">NITC HostelConnect</h1>
        </div>
      </div>

      <main className="flex-grow py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Complaints</h2>
            <Button
              onClick={handleRegisterComplaint}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center"
            >
              <Plus size={18} className="mr-1" /> Register New Complaint
            </Button>
          </div>

          {isNewComplaintView ? (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">New Complaint</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Brief title for your complaint"
                      value={newComplaint.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nitc-blue"
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
                      <option value="">Select category</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Network">Network</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Detailed description of the issue"
                    value={newComplaint.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nitc-blue"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={new Date(newComplaint.date)}
                      onChange={(date) => setNewComplaint({ ...newComplaint, date: format(date, "MM/dd/yyyy") })}
                      dateFormat="MM/dd/yyyy"
                      className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nitc-blue"
                    />
                  </div>
                </div>

                <div className="flex justify-start space-x-3 pt-2">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center"
                  >
                    Submit Complaint
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          ) : null}

          {/* Complaints List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Loading complaints...</p>
              </div>
            ) : complaints.length > 0 ? (
              complaints.map((complaint) => (
                <div key={complaint.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">Title: {complaint.title}</h3>
                    <div
                      className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        complaint.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : complaint.status === "inProgress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {complaint.status === "pending" ? (
                        <>
                          <Clock size={14} className="mr-1" /> Pending
                        </>
                      ) : complaint.status === "inProgress" ? (
                        <>
                          <Clock size={14} className="mr-1" /> In Progress
                        </>
                      ) : (
                        <>
                          <Check size={14} className="mr-1" /> Resolved
                        </>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-md font-semibold">{complaint.description}</p>
                  <div className="text-sm text-gray-500 mb-2">
                    Category: {complaint.category} | Date: {complaint.date}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No complaints registered yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Complaints

