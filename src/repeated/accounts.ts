import prisma from "@/lib/prisma";

export const getAcountByUserId = async (id: string) => {
  try {
    const account = await prisma?.account.findFirst({
      where: {
        userId: id,
      },
    });
    return account;
  } catch (error) {
    return null;
  }
};
