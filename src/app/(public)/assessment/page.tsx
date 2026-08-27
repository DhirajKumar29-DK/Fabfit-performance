import { AssessmentSidebar } from "@/components/assessment/AssessmentSidebar";
import { AssessmentForm } from "@/components/assessment/AssessmentForm";

export default function AssessmentPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#09090b] w-full overflow-hidden">
      <AssessmentSidebar />
      <AssessmentForm />
    </div>
  );
}
