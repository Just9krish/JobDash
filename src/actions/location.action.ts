"use server";

import prisma from "@/lib/prisma";

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
