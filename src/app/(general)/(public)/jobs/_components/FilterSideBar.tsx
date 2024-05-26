import React from "react";
import { JOB_TYPES } from "@/lib/constant";
import { getDistinctLocations } from "@/actions/location.action";
import { JobFilterValues } from "@/schema/job.schema";
import { filterJobs } from "@/actions/job.action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface FilterProps {
  filterValue: JobFilterValues;
}

export default async function FilterSidebar({ filterValue }: FilterProps) {
  const locations = await getDistinctLocations();

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-64 lg:top-5">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label className="text-left" htmlFor="q">
              Search
            </Label>
            <Input
              id="q"
              name="q"
              defaultValue={filterValue.q || ""}
              placeholder="Title, company, etc."
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-left" htmlFor="type">
              Type
            </Label>
            <Select id="type" name="type" defaultValue={filterValue.type || ""}>
              <option value="">All types</option>
              {JOB_TYPES.map((type) => (
                <option key={type.id} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-left" htmlFor="location">
              Location
            </Label>
            <Select
              id="location"
              name="location"
              defaultValue={filterValue.location || ""}
            >
              <option value="">All Location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="remote"
              name="remote"
              className="scale-125 accent-black"
              defaultChecked={filterValue.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Filter Jobs
            </Button>
          </div>
        </div>
      </form>
    </aside>
  );
}
