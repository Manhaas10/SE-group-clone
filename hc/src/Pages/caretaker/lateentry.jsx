"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-Toast"
import { ChevronLeft, FileText, Check, X } from "lucide-react"
import api from "../api/axios"

const LateEntryRequestss = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("current")
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [currentRequests, setCurrentRequests] = useState([])
  const [previousRequests, setPreviousRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true)

        // Fetch pending requests
        const pendingResponse = await api.get("/late-entry/status/pending")
        setCurrentRequests(pendingResponse.data)

        // Fetch approved and declined requests
        const approvedResponse = await api.get("/late-entry/status/approved")
        const declinedResponse = await api.get("/late-entry/status/declined")

        setPreviousRequests([...approvedResponse.data, ...declinedResponse.data])
      } catch (error) {
        console.error("Error fetching late entry requests:", error)
        toast({
          title: "Error",
          description: "Failed to load late entry requests",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const handleRequestClick = (request) => {
    setSelectedRequest(request)
    setIsDetailsOpen(true)
  }

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await api.patch(`/late-entry/${requestId}/status`, { status: newStatus })

      // Update the UI by moving the request from current to previous
      const updatedRequest = currentRequests.find((req) => req.id === requestId)
      if (updatedRequest) {
        const updatedRequestWithStatus = { ...updatedRequest, status: newStatus }
        setCurrentRequests(currentRequests.filter((req) => req.id !== requestId))
        setPreviousRequests([updatedRequestWithStatus, ...previousRequests])
      }

      toast({
        title: newStatus === "approved" ? "Request Approved" : "Request Declined",
        description: `Late entry request has been ${newStatus}.`,
      })

      setIsDetailsOpen(false)
    } catch (error) {
      console.error("Error updating request status:", error)
      toast({
        title: "Error",
        description: "Failed to update request status",
      })
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-[#FEF7CD] text-amber-700 hover:bg-[#EEE7BD]">Pending</Badge>
      case "approved":
        return <Badge className="bg-[#F2FCE2] text-green-700 hover:bg-[#E2ECD2]">Approved</Badge>
      case "declined":
        return <Badge className="bg-[#FFEEF6] text-rose-700 hover:bg-[#EEDEE6]">Declined</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const RequestCard = ({ request }) => (
    <Card className="mb-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleRequestClick(request)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{request.student_name || "Student"}</h3>
              <span className="text-sm text-muted-foreground">{request.student_id}</span>
            </div>
            <p className="text-sm">{request.reason}</p>
            <p className="text-xs text-muted-foreground">{new Date(request.timestamp).toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2">
            {request.attachment_name && <FileText className="h-4 w-4 text-muted-foreground" />}
            {getStatusBadge(request.status)}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[#F0F8FF]">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 pl-0 text-muted-foreground shadow-md bg-background"
            onClick={() => navigate("/dashboardc")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-[#D3E4FD] flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Late Entry Requests</h1>
              <p className="text-muted-foreground">Manage student late entry requests</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg flex">
            <TabsTrigger
              value="current"
              className="px-4 py-2 rounded-md text-black font-semibold 
                        data-[state=active]:bg-white data-[state=active]:shadow-md 
                        data-[state=active]:text-black transition-all"
            >
              Current Requests
            </TabsTrigger>

            <TabsTrigger
              value="previous"
              className="px-4 py-2 rounded-md text-gray-500 font-semibold 
                        data-[state=active]:bg-white data-[state=active]:shadow-md 
                        data-[state=active]:text-black transition-all"
            >
              Previous Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {isLoading ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Loading requests...</p>
              </div>
            ) : currentRequests.length > 0 ? (
              currentRequests.map((request) => <RequestCard key={request.id} request={request} />)
            ) : (
              <div className="py-8 text-center text-muted-foreground">No current requests</div>
            )}
          </TabsContent>

          <TabsContent value="previous" className="space-y-4">
            {isLoading ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Loading requests...</p>
              </div>
            ) : previousRequests.length > 0 ? (
              previousRequests.map((request) => <RequestCard key={request.id} request={request} />)
            ) : (
              <div className="py-8 text-center text-muted-foreground">No previous requests</div>
            )}
          </TabsContent>
        </Tabs>

        {/* Request Details Modal */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md bg-white shadow-lg rounded-lg">
            <DialogHeader>
              <DialogTitle>Late Entry Request Details</DialogTitle>
              <DialogDescription>Review the request details below</DialogDescription>
            </DialogHeader>

            {selectedRequest && (
              <div className="space-y-4 py-2">
                <div>
                  <p className="text-sm text-muted-foreground">Student ID</p>
                  <p className="text-lg font-medium">{selectedRequest.student_id}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="text-lg font-medium">{selectedRequest.student_name || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p>{new Date(selectedRequest.timestamp).toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Reason</p>
                  <p>{selectedRequest.reason}</p>
                </div>

                {selectedRequest.attachment_name && (
                  <div>
                    <p className="text-sm text-muted-foreground">Attachment</p>
                    <a
                      href={selectedRequest.attachment_url}
                      className="text-primary inline-flex items-center gap-1.5 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="h-4 w-4" />
                      {selectedRequest.attachment_name}
                    </a>
                  </div>
                )}

                {selectedRequest.status === "pending" && (
                  <div className="flex justify-end gap-3 pt-4">
                    <DialogClose asChild>
                      <Button variant="outline" onClick={() => handleStatusUpdate(selectedRequest.id, "declined")}>
                        <X className="mr-2 h-4 w-4" />
                        Decline
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={() => handleStatusUpdate(selectedRequest.id, "approved")}>
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    </DialogClose>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default LateEntryRequestss

