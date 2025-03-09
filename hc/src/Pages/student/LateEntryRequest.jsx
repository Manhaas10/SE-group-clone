import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Calendar, Upload,ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "sonner";
import Header from "@/components/student/Header";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

const LateEntryRequest = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (selectedFile.size > maxSize) {
        toast.error("File is too large. Maximum size is 5MB");
        return;
      }
      
      const fileType = selectedFile.type;
      if (!["application/pdf", "image/jpeg", "image/png"].includes(fileType)) {
        toast.error("Invalid file type. Please upload PDF, JPG, or PNG");
        return;
      }
      
      setFile(selectedFile);
      toast.success("File uploaded successfully");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    
    if (!reason.trim()) {
      toast.error("Please provide a reason for late entry");
      return;
    }
    
    if (!file) {
      toast.error("Please upload a proof document");
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real application, you would submit this data to a backend API
    // For demo purposes, we'll just simulate a successful submission
    setTimeout(() => {
      toast.success("Late entry request submitted successfully");
      setIsSubmitting(false);
      navigate("/dashboards");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={()=>navigate('/dashboards')} 
            className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-blue-600">NITC HostelConnect</h1>
        </div>
      </div>
      <main className="app-container py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-xl font-semibold mb-2">Late Entry Request</h2>
          <p className="text-gray-500 mb-6">Submit your late entry request with necessary details and proof</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date of Late Entry</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left font-normal text-gray-500 border-gray-200"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a detailed reason for late entry"
                className="min-h-[120px] text-gray-700 border-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Proof Document</label>
              <div className="border border-dashed border-gray-300 rounded-md p-4">
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-sm text-center text-gray-500">
                    {file ? file.name : "Upload proof document"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">Accepted formats: PDF, JPG, PNG (Max size: 5MB)</p>
            </div>
            
            <div className="flex justify-end space-x-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="border-gray-200 text-gray-700"
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-nitc-blue hover:bg-blue-600"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default LateEntryRequest;