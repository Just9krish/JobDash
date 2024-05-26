import prisma from "@/lib/prisma";

export function getJobById(id: string) {
  return prisma.job.findUnique({
    where: {
      id,
    },
  });
}
