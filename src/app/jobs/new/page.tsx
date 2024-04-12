import NewJobForm from "@/components/Forms/NewJobForm";
import BackButton from "@/components/common/BackButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post new job",
};

export default function page() {
  return (
    <section className="space-y-12">
      <BackButton />
      <div className="space-y-5">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Find your perfect employee
        </h1>
        <p className="text-muted-foreground">
          Get your job seen by thousands of job seekers.
        </p>
      </div>

      <div className="space-y-5 rounded-lg border p-4">
        <div>
          <h4 className="font-semibold">Job Details</h4>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>

        <NewJobForm />
      </div>
    </section>
  );
}
