const {
  placeholderJobs,
  placeholderJobCategories,
} = require("./placeholder-data");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addJobs() {
  await Promise.all(
    placeholderJobs.map(async (job) => {
      await prisma.job.upsert({
        where: {
          slug: job.slug,
        },
        update: job,
        create: job,
      });
    }),
  );
}

async function addJobCategory() {
  await Promise.all(
    placeholderJobCategories.map(async (category) => {
      await prisma.jobCategory.upsert({
        where: {
          value: category.value,
        },
        update: category,
        create: category,
      });
    }),
  );
}

// addJobCategory()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error("Error while seeding database:", e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

addJobs()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
