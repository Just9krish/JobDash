"use server";

import {
  JobFilterValues,
  createJobSchema,
  jobFilterSchema,
} from "@/schema/job.schema";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";
import { toSlug } from "@/lib/utils";
import { put } from "@vercel/blob";
import path from "path";
import { JOB_PER_PAGE } from "@/lib/constant";

export async function filterJobs(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { q, location, remote, type } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
}

export async function getJobs({
  jobFilterValues,
  page = 1,
}: {
  jobFilterValues: JobFilterValues;
  page?: number;
}) {
  const { q, location, remote, type } = jobFilterValues;

  const skip = (page - 1) * JOB_PER_PAGE;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter = searchString
    ? {
        OR: [
          {
            title: { search: searchString },
          },
          {
            companyName: { search: searchString },
          },
          {
            type: { search: searchString },
          },
          {
            location: { search: searchString },
          },
          {
            locationType: { search: searchString },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "remote" } : {},
      { isApproved: true },
    ],
  };

  const jobs = await prisma?.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: JOB_PER_PAGE,
  });

  const jobsCount = await prisma.job.count({ where });

  return { jobs, jobsCount };
}

export async function getJob(slug: string) {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  return job;
}

export async function createJob(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    companyName,
    locationType,
    salary,
    title,
    type,
    applicationEmail,
    applicationUrl,
    companyLogo,
    description,
    location,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  console.log(companyLogo);

  let companyLogoUrl: string | undefined = undefined;

  // if (companyLogo) {
  //   const blob = await put(
  //     `company_logos/${slug}${path.extname(companyLogo.name)}`,
  //     companyLogo,
  //     {
  //       access: "public",
  //       addRandomSuffix: false,
  //     },
  //   );

  //   companyLogoUrl = blob.url;
  // }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
      isApproved: true,
    },
  });

  console.log("submitted");

  redirect("/");
}
