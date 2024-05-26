import TopCompanies from "./_components/TopCompanies";
import Statics from "./_components/Statics";
import LatestJobs from "./_components/LatestJobs";

export default function page() {
  return (
    <div>
      <h1 className="my-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Make you dream creer a reality
      </h1>
      <LatestJobs />
      <TopCompanies />
      <Statics />
    </div>
  );
}
