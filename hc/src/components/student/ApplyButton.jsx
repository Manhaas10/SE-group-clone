import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-Toast";



const ApplyButton = ({ postId, currentParticipants }) => {
  const { toast } = useToast();
  const [participants, setParticipants] = useState(currentParticipants);
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (!applied) {
      setParticipants(prev => prev + 1);
      setApplied(true);
      
      toast({
        title: "Application Submitted",
        description: "You have successfully applied for this skill sharing opportunity.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Already Applied",
        description: "You have already applied for this opportunity.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Button 
      onClick={handleApply}
      variant={applied ? "outline" : "default"}
      className={applied ? "border-green-500 text-green-600" : "bg-blue-600 hover:bg-blue-700"}
    >
      {applied ? "Applied" : "Apply"}
    </Button>
  );
};

export default ApplyButton;
