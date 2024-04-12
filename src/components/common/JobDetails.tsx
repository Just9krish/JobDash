import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import {
  Banknote,
  Bookmark,
  Briefcase,
  Globe2,
  MapPin,
  Save,
  SendIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";

interface PageProps {
  job: Job;
}

export default function JobDetails({ job }: PageProps) {
  const {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
  } = job;
  return (
    <div className="w-full space-y-12">
      <div className="flex flex-col items-start justify-center gap-3 md:flex-row md:justify-start">
        {companyLogoUrl && (
          <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded border object-contain">
            <Image
              width={100}
              height={100}
              src={companyLogoUrl}
              alt={`${companyName} logo`}
            />
          </div>
        )}

        <div>
          <div>
            <h1>{title}</h1>
            <p className="font-semibold">
              {applicationUrl ? (
                <Link
                  target="_blank"
                  className="text-green-500 hover:underline"
                  href={applicationUrl}
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>

          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {type}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(salary)}
            </p>
          </div>
        </div>
      </div>
      {description && <Markdown>{description}</Markdown>}
      <div className="flex flex-col gap-4 md:flex-row">
        <Link
          className="flex w-full items-center justify-center rounded bg-gray-900 p-2 text-sm text-white md:w-fit"
          href="#"
        >
          <SendIcon className="mr-2 h-4 w-4" />
          Apply now
        </Link>
        <Link
          className="flex w-full items-center justify-center rounded bg-gray-200 p-2 text-sm md:w-fit"
          href="#"
        >
          <Bookmark className="mr-2 h-4 w-4" />
          Save for later
        </Link>
      </div>
    </div>
  );
}
