import { Job } from "@prisma/client";
import Image from "next/image";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  console.log(job);

  return (
    <article className="flex gap-4 rounded-lg p-5 hover:bg-muted/60">
      <Image
        className="self-center rounded-lg"
        src={job.companyLogoUrl || ""}
        alt={`${job.companyName} logo`}
        width={100}
        height={510}
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl">{job.title}</h2>
          <p className="text-muted-foreground">{job.companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase className="shrink-0" size={16} />
            {job.type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="shrink-0" size={16} />
            {job.locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 className="shrink-0" size={16} />
            {job.location || "World wide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote className="shrink-0" size={16} />
            {formatMoney(job.salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock className="shrink-0" size={16} />
            {relativeDate(job.createdAt)}
          </p>
        </div>
      </div>
    </article>
  );
}
