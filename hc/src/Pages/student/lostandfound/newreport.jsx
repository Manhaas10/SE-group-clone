import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, Check,ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Header from "@/components/student/Header";
import { Category, CATEGORIES, ReportType } from "@/types";

const formSchema = z.object({
  type: z.enum(["LOST", "FOUND"]),
  category: z.string().min(1, "Please select a category"),
  title: z.string().min(2, "Title must be at least 2 characters").max(50, "Title must be less than 50 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  date: z.date(),
});

// type FormValues = z.infer<typeof formSchema>;
// // 
const NewReport = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);

  const defaultValues= {
    type: "LOST",
    date: new Date(),
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const reportType = form.watch("type");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    console.log("Form submitted:", data);
    toast.success("Report submitted successfully!");
    setIsSubmitting(false);
    navigate("/");
  };

  return (
 <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={()=>navigate('/LandF')} 
            className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-blue-600">NITC HostelConnect</h1>
        </div>
      </div>
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <div className="bg-white rounded-xl border border-border/80 shadow-sm overflow-hidden p-6">
          <h1 className="text-xl font-semibold mb-6">New Lost & Found Report</h1>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium">
                  Report Type
                </label>
                <Popover open={openTypeDropdown} onOpenChange={setOpenTypeDropdown}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openTypeDropdown}
                      className="w-full justify-between font-normal"
                    >
                      {reportType === "LOST" ? "Lost Item" : "Found Item"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div className="flex flex-col">
                      <button
                        className={cn(
                          "flex items-center px-3 py-2.5 text-sm hover:bg-muted transition-colors",
                          reportType === "LOST" && "bg-muted"
                        )}
                        onClick={() => {
                          form.setValue("type", "LOST");
                          setOpenTypeDropdown(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            reportType === "LOST" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        Lost Item
                      </button>
                      <button
                        className={cn(
                          "flex items-center px-3 py-2.5 text-sm hover:bg-muted transition-colors",
                          reportType === "FOUND" && "bg-muted"
                        )}
                        onClick={() => {
                          form.setValue("type", "FOUND");
                          setOpenTypeDropdown(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            reportType === "FOUND" ? "opacity-100" : "opacity-0"
                          )}
                        />
                        Found Item
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
                {form.formState.errors.type && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.type.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>
                <Select 
                  onValueChange={(value) => form.setValue("category", value)}
                  defaultValue={form.getValues("category")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                placeholder="What did you lose/find?"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Detailed description of the item"
                rows={5}
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  placeholder="Where was it lost/found?"
                  {...form.register("location")}
                />
                {form.formState.errors.location && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.location.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium">
                  Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.getValues("date") && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.getValues("date") ? (
                        format(form.getValues("date"), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.getValues("date")}
                      onSelect={(date) => form.setValue("date", date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.date && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.date.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/LandF")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-nitc hover:bg-nitc-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewReport;
