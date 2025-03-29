"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/caretaker/use-Toast"
import { ChevronLeft, MessageSquare } from "lucide-react"
import api from "../api/axios"

const Complaintss = () => {
  const navigate = useNavigate()
  const [complaints, setComplaints] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setIsLoading(true)
        const response = await api.get("/complaints")
        setComplaints(response.data)
      } catch (error) {
        console.error("Error fetching complaints:", error)
        toast({
          title: "Error",
          description: "Failed to load complaints",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/complaints/${id}/status`, { status: newStatus })

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) => (complaint.id === id ? { ...complaint, status: newStatus } : complaint)),
      )

      toast({
        title: "Status Updated",
        description: `Complaint status has been changed to ${newStatus === "inProgress" ? "In Progress" : newStatus}.`,
      })
    } catch (error) {
      console.error("Error updating complaint status:", error)
      toast({
        title: "Error",
        description: "Failed to update complaint status",
      })
    }
  }

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-[#FEF7CD] text-amber-700 hover:bg-[#EEE7BD]">Pending</Badge>
      case "inProgress":
        return <Badge className="bg-[#D3E4FD] text-blue-600 hover:bg-[#C3D4ED]">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-[#F2FCE2] text-green-700 hover:bg-[#E2ECD2]">Resolved</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  // Format status for display
  const formatStatus = (status) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "inProgress":
        return "In Progress"
      case "resolved":
        return "Resolved"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F8FF]">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 pl-0 text-muted-foreground shadow-md"
            onClick={() => navigate("/dashboardc")}
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
          {isLoading ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Loading complaints...</p>
            </div>
          ) : (
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
                {complaints.length > 0 ? (
                  complaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-medium">
                        {complaint.room}
                        {complaint.is_anonymous && (
                          <span className="ml-2 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                            Anonymous
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{complaint.description}</TableCell>
                      <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                      <TableCell>{new Date(complaint.submitted).toLocaleString()}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={complaint.status}
                          onValueChange={(value) => handleStatusChange(complaint.id, value)}
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No complaints found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Complaintss