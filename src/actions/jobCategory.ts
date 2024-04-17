"use server";

import prisma from "@/lib/prisma";

/**
 * Retrieves job categories from the database.
 *
 * @param {number} limit - The maximum number of categories to retrieve. If not provided, retrieves all categories.
 * @return {Promise<Array<JobCategory>>} An array of job categories.
 */
export const getJobCategories = async (limit?: number) => {
  // Retrieve job categories from the database using Prisma ORM.
  // The 'findMany' method of 'prisma.jobCategory' retrieves multiple records.
  // The 'take' option limits the number of records retrieved if a 'limit' value is provided.
  const categories = await prisma.jobCategory.findMany({
    take: limit ? limit : undefined, // Retrieve all categories if no limit is provided.
  });

  return categories;
};
