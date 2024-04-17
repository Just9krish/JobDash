"use client";

import { getJobCategories } from "@/actions/jobCategory";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { getJobsWithJobCategoryId } from "@/actions/job.action";
import JobCrouselCard from "../cards/JobCrouselCard";
import { Job, JobCategory } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import CategoriesSkeletons from "../skeletons/CategoriesSkeletons";
import CrouselCardSkeletons from "../skeletons/CrouselCardSkeletons";

export default function LatestJobs() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <section>
      <h4 className="mb-4 text-center text-3xl font-medium text-primary">
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
  const [popularCategories, setPopularCategories] = useState<JobCategory[]>([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(true);

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
  }, []);

  // const handleCategoryClick = useCallback(
  //   (categoryId: string) => {
  //     handleCategoryChange(categoryId);
  //   },
  //   [handleCategoryChange]
  // );

  return (
    <div className="flex items-center gap-6">
      <h4 className="text-muted-foreground">POPULAR CATEGORIES:</h4>
      <ul className="flex items-center gap-4">
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
