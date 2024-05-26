"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getJobsWithJobCategoryId } from "@/actions/job.action";
import JobCrouselCard from "@/components/cards/JobCrouselCard";
import { Job, JobCategory } from "@prisma/client";
import { useEffect, useState } from "react";
import CategoriesSkeletons from "@/app/(general)/(public)/_components/skeletons/CategoriesSkeletons";
import CrouselCardSkeletons from "@/app/(general)/(public)/_components/skeletons/CrouselCardSkeletons";
import { getJobCategories } from "@/actions/jobCategory";
import { Button } from "@/components/ui/button";

export default function LatestJobs() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <section className="py-16">
      <h4 className="mb-12 text-center text-3xl font-bold text-primary">
        Latest Jobs on Jobdash
      </h4>
      <PopularCategories
        handleCategoryChange={handleCategoryChange}
        selectedCategoryId={selectedCategoryId}
      />
      <JobCrousel categoryId={selectedCategoryId} />
    </section>
  );
}

export function PopularCategories({
  handleCategoryChange,
  selectedCategoryId,
}: {
  handleCategoryChange: (categoryId: string) => void;
  selectedCategoryId: string;
}) {
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(true);
  const [popularCategories, setPopularCategories] = useState<JobCategory[]>([]);

  useEffect(() => {
    setIsCategoryLoading(true);
    getJobCategories(6)
      .then((categories) => {
        setPopularCategories(categories);
        handleCategoryChange(categories[0].id);
        setIsCategoryLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsCategoryLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-start gap-6">
      <h5 className="whitespace-nowrap text-muted-foreground">
        POPULAR CATEGORIES:
      </h5>
      <ul className="flex flex-wrap items-center gap-4">
        {isCategoryLoading ? (
          <CategoriesSkeletons />
        ) : (
          popularCategories.length &&
          popularCategories.map((category) => (
            <Button
              onClick={() => handleCategoryChange(category.id)}
              className="rounded-3xl px-4 py-2"
              variant={
                category.id === selectedCategoryId ? "default" : "outline"
              }
              key={category.id}
            >
              {category.label}
            </Button>
          ))
        )}
      </ul>
    </div>
  );
}

function JobCrousel({ categoryId }: { categoryId: string }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;
    setIsLoading(true);
    getJobsWithJobCategoryId(categoryId)
      .then((jobs) => {
        setJobs(jobs);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="mt-10">
      {isLoading ? (
        <CrouselCardSkeletons />
      ) : jobs && jobs.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {jobs.map((job) => (
              <CarouselItem
                className="self-stretch md:basis-1/2 lg:basis-1/3"
                key={job.id}
              >
                <JobCrouselCard job={job} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="text-center">No Jobs Found</div>
      )}
    </div>
  );
}
