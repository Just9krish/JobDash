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

/**
 * Filters jobs based on the provided form data and redirects to the filtered job page.
 *
 * @param formData - The form data containing the filter values.
 * @returns void
 */
export async function filterJobs(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { q, location, remote, type } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/jobs/?${searchParams.toString()}`);
}

/**
 * Retrieves a list of jobs based on the provided filter values and pagination options.
 *
 * @param {Object} options - The options for retrieving jobs.
 * @param {JobFilterValues} options.jobFilterValues - The filter values to apply to the job search.
 * @param {number} [options.page=1] - The page number for pagination.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the retrieved jobs and the total count of jobs.
 */
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

/**
 * Retrieves a job based on its slug.
 *
 * @param slug - The slug of the job.
 * @returns The job object if found, otherwise undefined.
 */
export async function getJob(slug: string) {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  return job;
}

/**
 * Creates a new job entry in the database.
 *
 * @param formData - The form data containing the job details.
 * @returns {Promise<void>} - A promise that resolves when the job is created.
 */
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

/**
 * Retrieves a list of jobs with the given job category ID.
 *
 * @param jobCategoryId - The job category ID.
 * @param limit - The number of jobs to retrieve.
 * @returns {Promise<Job[]>} - A promise that resolves with a list of jobs.
 */
export async function getJobsWithJobCategoryId(
  jobCategoryId: string,
  limit?: number,
) {
  /**
   * The WHERE clause for the Prisma query.
   */
  const where: Prisma.JobWhereInput = {
    jobCategoryId,
  };

  /**
   * The SELECT clause for the Prisma query.
   */
  const select: Prisma.JobSelect = {
    id: true,
    title: true,
    type: true,
    companyName: true,
    companyLogoUrl: true,
    locationType: true,
    location: true,
    applicationEmail: true,
    applicationUrl: true,
    description: true,
    salary: true,
    slug: true,
  };

  /**
   * Retrieves a list of jobs with the given job category ID.
   *
   * @returns {Promise<Job[]>} - A promise that resolves with a list of jobs.
   */
  const jobs = await prisma.job.findMany({
    where,
    select,
    take: limit ? limit : undefined,
  });

  return jobs;
}

/**
 * Retrieves a list of approved jobs.
 *
 * @returns {Promise<Job[]>} - A promise that resolves with a list of approved jobs.
 */
export async function getStaticJobs() {
  /**
   * The WHERE clause for the Prisma query.
   *
   * The `isApproved` field is used to filter out jobs that have not been approved.
   */
  const where: Prisma.JobWhereInput = {
    isApproved: true,
  };

  /**
   * The SELECT clause for the Prisma query.
   *
   * Only the `slug` field is retrieved for each job.
   */
  const select: Prisma.JobSelect = {
    slug: true,
  };

  /**
   * Retrieves a list of approved jobs.
   */
  const jobs = await prisma.job.findMany({
    where,
    select,
  });

  return jobs;
}
