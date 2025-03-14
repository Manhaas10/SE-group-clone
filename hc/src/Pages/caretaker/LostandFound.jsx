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
import { 
  SelectPortal 
} from "@radix-ui/react-select";

import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/caretaker/use-Toast';
import { ChevronLeft, Package } from 'lucide-react';

// Define the item type


// Mock data
const mockItem = [
  {
    id: '1',
    name: 'Calculator',
    description: 'Scientific calculator found in Library',
    location: 'Library',
    status: 'found',
    reportedBy: 'John Doe',
    date: '12 months ago',
    additionalDetails: 'Black Texas Instruments TI-84 Plus graphing calculator in good condition.'
  },
  {
    id: '2',
    name: 'Water Bottle',
    description: 'Blue metal water bottle',
    location: 'Sports Complex',
    status: 'lost',
    reportedBy: 'Jane Smith',
    date: '12 months ago',
    additionalDetails: 'Blue Hydro Flask 32oz with dents on the bottom and a sticker of a mountain.'
  },
  {
    id: '3',
    name: 'ID Card',
    description: 'Student ID Card',
    location: 'Cafeteria',
    status: 'claimed',
    reportedBy: 'Mike Johnson',
    date: '12 months ago',
    image: '/lovable-uploads/97c73147-c527-474b-a16b-37818c5b6a90.png',
    additionalDetails: 'Student ID for Mike Johnson, ID# 20210034.'
  },
  {
    id: '4',
    name: 'Laptop Charger',
    description: 'Dell laptop charger',
    location: 'Lecture Hall 2',
    status: 'lost',
    reportedBy: 'Sarah Williams',
    date: '12 months ago',
    additionalDetails: 'Dell 65W AC adapter with round barrel connector.'
  },
];

const LostAndFoundd = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockItem);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Item status has been changed to ${newStatus}.`
    });
  };

  // Open modal with item details
  const openItemDetails = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'found':
        return <Badge className="bg-[#F2FCE2] text-green-700 hover:bg-[#E2ECD2]">Found</Badge>;
      case 'lost':
        return <Badge className="bg-[#FFECEE] text-red-600 hover:bg-[#EFDCDE]">Lost</Badge>;
      case 'claimed':
        return <Badge className="bg-[#E0F2FE] text-blue-600 hover:bg-[#D0E2EE]">Claimed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
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
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Lost & Found</h1>
              <p className="text-muted-foreground">Track and manage lost and found items</p>
            </div>
          </div>
        </div>
        
        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <button 
                      className="text-primary hover:underline focus:outline-none" 
                      onClick={() => openItemDetails(item)}
                    >
                      {item.name}
                    </button>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    {getStatusBadge(item.status)}
                  </TableCell>
                  <TableCell>{item.reportedBy}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                  <Select 
  defaultValue={item.status}
  onValueChange={(value) => handleStatusChange(item.id, value)}
>
  <SelectTrigger className="w-[120px]">
    <SelectValue />
  </SelectTrigger>

  {/* Portal ensures the dropdown renders above everything */}
  <SelectPortal>
    <SelectContent className="z-[9999] bg-white shadow-lg">
      <SelectItem value="lost">Lost</SelectItem>
      <SelectItem value="found">Found</SelectItem>
      <SelectItem value="claimed">Claimed</SelectItem>
    </SelectContent>
  </SelectPortal>
</Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Item Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedItem.name}</DialogTitle>
                  <DialogDescription className="flex items-center gap-2 mt-1">
                    Status: {getStatusBadge(selectedItem.status)}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="py-4">
                  <div className="space-y-4">
                    {selectedItem.image && (
                      <div className="flex justify-center">
                        <img 
                          src={selectedItem.image} 
                          alt={selectedItem.name} 
                          className="max-h-[200px] rounded-md object-contain border p-2"
                        />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p>{selectedItem.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Reported By</p>
                        <p>{selectedItem.reportedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Date</p>
                        <p>{selectedItem.date}</p>
                      </div>
                    </div>
                    
                    {selectedItem.additionalDetails && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Additional Details</p>
                        <p className="text-sm">{selectedItem.additionalDetails}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Select 
                    defaultValue={selectedItem.status}
                    onValueChange={(value) => {
                      handleStatusChange(selectedItem.id, value );
                      setSelectedItem({...selectedItem, status: value });
                    }}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lost">Lost</SelectItem>
                      <SelectItem value="found">Found</SelectItem>
                      <SelectItem value="claimed">Claimed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LostAndFoundd;
