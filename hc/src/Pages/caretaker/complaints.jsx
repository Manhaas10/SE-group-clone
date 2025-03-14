import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/caretaker/use-Toast';
import { ChevronLeft, MessageSquare } from 'lucide-react';



// Mock data
const mockComplaints = [
  {
    id: '1',
    room: 'Room 304',
    description: 'Plumbing issue in bathroom',
    status: 'pending',
    submitted: '12 months ago',
  },
  {
    id: '2',
    room: 'Room 201',
    description: 'Fan not working properly',
    status: 'inProgress',
    submitted: '12 months ago',
    isAnonymous: true,
  },
  {
    id: '3',
    room: 'Room 105',
    description: 'Light bulb needs replacement',
    status: 'resolved',
    submitted: '12 months ago',
  },
  {
    id: '4',
    room: 'Room 408',
    description: 'Water leakage from ceiling',
    status: 'pending',
    submitted: '12 months ago',
  },
];

const Complaintss = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(mockComplaints);

  // Handle status change
  const handleStatusChange = (id,newStatus) => {
    setComplaints(prevComplaints => 
      prevComplaints.map(complaint => 
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Complaint status has been changed to ${newStatus === 'inProgress' ? 'In Progress' : newStatus}.`
    });
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-[#FEF7CD] text-amber-700 hover:bg-[#EEE7BD]">pending</Badge>;
      case 'inProgress':
        return <Badge className="bg-[#D3E4FD] text-blue-600 hover:bg-[#C3D4ED]">inProgress</Badge>;
      case 'resolved':
        return <Badge className="bg-[#F2FCE2] text-green-700 hover:bg-[#E2ECD2]">resolved</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Format status for display
  const formatStatus = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'inProgress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F8FF]">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4 pl-0 text-muted-foreground shadow-md"
            onClick={() => navigate('/dashboardc')}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-[#F2FCE2] flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Complaints Management</h1>
              <p className="text-muted-foreground">View and manage student complaints</p>
            </div>
          </div>
        </div>
        
        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">
                    {complaint.room}
                    {complaint.isAnonymous && (
                      <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        Anonymous
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{complaint.description}</TableCell>
                  <TableCell>
                    {getStatusBadge(complaint.status)}
                  </TableCell>
                  <TableCell>{complaint.submitted}</TableCell>
                  <TableCell>
                    <Select 
                      defaultValue={complaint.status}
                      onValueChange={(value) => handleStatusChange(complaint.id, value )}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder={formatStatus(complaint.status)} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inProgress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Complaintss;
