import JobList from "@/components/common/JobList";
import prisma from "@/lib/prisma";

export default async function Home() {
  return (
    <main>
      <h1>Home</h1>
      <JobList />
    </main>
  );
}
