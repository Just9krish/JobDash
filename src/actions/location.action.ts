"use server";

import prisma from "@/lib/prisma";

/**
 * Retrieves distinct locations from the database.
 *
 * @returns An array of strings representing distinct locations.
 */
export async function getDistinctLocations() {
  const location = await prisma?.job.findMany({
    where: { isApproved: true },
    select: { location: true },
    distinct: ["location"],
  });

  if (location) {
    return location.map(({ location }) => location).filter(Boolean) as string[];
  } else {
    return [];
  }
}
