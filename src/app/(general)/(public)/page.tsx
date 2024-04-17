import LatestJobs from "@/components/special/LatestJobs";
import TopCompanies from "./_components/TopCompanies";

export default function page() {
  return (
    <div>
      <h1 className="my-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Make you dream creer a reality
      </h1>
      <LatestJobs />
      <TopCompanies />
    </div>
  );
}
