import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Banknote, Briefcase, ChevronRight, MapPin } from "lucide-react";
import { capitalizeString, formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import Badge from "../common/Badge";
import Link from "next/link";

export default function JobCrouselCard({ job }: { job: Job }) {
  return (
    <Card>
      <CardHeader className="border-b">
        <h3 className="font-medium text-primary">{job.title}</h3>
        <p className="text-sm text-muted-foreground">{job.companyName}</p>
      </CardHeader>
      <CardContent className="flex min-h-44 flex-col justify-between gap-4 pt-4">
        <div>
          <p className="flex items-center gap-1.5 text-sm">
            <Briefcase className="shrink-0" size={16} />
            {capitalizeString(job.type)}
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <MapPin className="shrink-0" size={16} />
            {capitalizeString(job.locationType)}
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Banknote className="shrink-0" size={16} />
            {formatMoney(job.salary)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Badge>{job.type}</Badge>
          <Link className=" flex items-center" href={"/jobs/" + job.slug}>
            View Details <ChevronRight />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
