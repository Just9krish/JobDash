import prisma from "@/lib/prisma";
import { getUserById } from "@/repeated/user";
import { getJobById } from "@/repeated/job";

/**
 * Saves a job to the user's wishlist.
 *
 * @param userId - The user ID to add the job to the wishlist.
 * @param jobId - The job ID to add to the wishlist.
 * @returns A saved wishlist item.
 */
export async function saveJobWishlist({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) {
  if (!userId || !jobId) {
    return { error: "User ID is required" };
  }

  const user = await getUserById(userId);

  if (!user) {
    return { error: "User not found" };
  }

  const job = await getJobById(jobId);

  if (!job) {
    return { error: "Job not found" };
  }

  const existingWishlist = await prisma.wishlistJob.findFirst({
    where: {
      userId,
      jobId,
    },
  });

  if (existingWishlist) {
    return { error: "Already in wishlist" };
  }

  const wishlist = await prisma.wishlistJob.create({
    data: {
      userId,
      jobId,
    },
  });

  return { success: true, wishlist };
}

/**
 * Retrieves a list of wishlist items for the given user ID.
 *
 * @param userId - The user ID to retrieve the wishlist for.
 * @returns A list of wishlist items associated with the given user ID.
 */
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

/**
 * Removes a single job from a user's wishlist.
 *
 * @param userId - The user ID to remove the job from the wishlist for.
 * @param jobId - The job ID to remove from the wishlist.
 * @returns A response with a success boolean and the removed wishlist entry.
 */
export async function removeSingleJobFromWishlist({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) {
  // Check if both user ID and job ID are provided
  if (!userId || !jobId) {
    return { error: "User ID is required" };
  }

  // Get the user by ID
  const user = await getUserById(userId);

  // Check if the user exists
  if (!user) {
    return { error: "User not found" };
  }

  // Get the job by ID
  const job = await getJobById(jobId);

  // Check if the job exists
  if (!job) {
    return { error: "Job not found" };
  }

  // Remove the job from the user's wishlist
  const wishlist = await prisma.wishlistJob.deleteMany({
    where: {
      userId,
      jobId,
    },
  });

  // Return the response with a success boolean and the removed wishlist entry
  return { success: true, wishlist };
}
