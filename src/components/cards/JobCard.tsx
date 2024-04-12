import { Job } from "@prisma/client";
import Image from "next/image";
import {
  Banknote,
  Briefcase,
  Clock,
  FileIcon,
  Globe2,
  MapPin,
  SendIcon,
} from "lucide-react";
import { capitalizeString, formatMoney, relativeDate } from "@/lib/utils";
import Badge from "../common/Badge";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const placeholder =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlWM134eLEMTayPOLtP_NvEoZ7MLbzDlxjyHz0LeDLXG64384OBpyoiRPqovQXr9VZvX4&usqp=CAU";

  return (
    <article className="flex gap-4 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        className="self-center rounded-lg"
        src={job.companyLogoUrl || placeholder}
        alt={`${job.companyName} logo`}
        width={100}
        height={100}
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl">{job.title}</h2>
          <p className="text-muted-foreground">{job.companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase className="shrink-0" size={16} />
            {capitalizeString(job.type)}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="shrink-0" size={16} />
            {capitalizeString(job.locationType)}
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
        <div className="flex flex-col gap-2 md:flex-row">
          <Link
            className="flex flex-1 items-center justify-center rounded border border-gray-200 p-2 text-sm"
            href={`/jobs/${job.slug}`}
          >
            <FileIcon className="mr-2 h-4 w-4" />
            View Details
          </Link>
          <Link
            className="flex flex-1 items-center justify-center rounded bg-gray-900 p-2 text-sm text-white"
            href="#"
          >
            <SendIcon className="mr-2 h-4 w-4" />
            Apply
          </Link>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{job.type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {relativeDate(job.createdAt)}
        </span>
      </div>
    </article>
  );
}
