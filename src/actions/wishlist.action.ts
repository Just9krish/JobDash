import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function saveJobWishlist({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return { error: "User not found" };
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    return { error: "Job not found" };
  }

  const wishlist = await prisma.wishlistJob.create({
    data: {
      userId,
      jobId,
    },
  });

  return { success: true, wishlist };
}

export async function getWishlistByUserId(userId: string) {
  const wishlist = await prisma.wishlistJob.findMany({
    where: {
      userId,
    },
    include: {
      job: true,
    },
  });
  return wishlist;
}
