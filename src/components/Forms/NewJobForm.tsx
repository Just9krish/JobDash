"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CreatJobInput, createJobSchema } from "@/schema/job.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Select from "../ui/select";
import { JOB_TYPES, locationTypes } from "@/lib/constant";
import LocationInput from "../common/LocationInput";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import LoadingButton from "../common/LoadingButton";
import RichTextEditor from "../special/RichTextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import { createJob } from "@/actions/job.action";
import { useToast } from "../ui/use-toast";

export default function NewJobForm() {
  const form = useForm<CreatJobInput>({
    resolver: zodResolver(createJobSchema),
  });
  const { toast } = useToast();

  const onSubmit = async (data: CreatJobInput) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const res = await createJob(formData);
      toast({
        title: "Job Posted Successfully",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="eg. Full Stack Developer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job type</FormLabel>
              <FormControl>
                <Select {...field} defaultValue="">
                  <option value="" hidden>
                    Select an option
                  </option>
                  {JOB_TYPES.map((jobType) => (
                    <option key={jobType.id} value={jobType.value}>
                      {jobType.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyLogo"
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Company logo</FormLabel>
              <FormControl>
                <Input
                  {...fieldValues}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    fieldValues.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  defaultValue=""
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.currentTarget.value === "Remote") {
                      form.trigger("location");
                    }
                  }}
                >
                  <option value="" hidden>
                    Select an option
                  </option>
                  {locationTypes.map((locationType) => (
                    <option key={locationType.id} value={locationType.value}>
                      {locationType.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office location</FormLabel>
              <FormControl>
                <LocationInput
                  onLocationSelected={field.onChange}
                  ref={field.ref}
                />
              </FormControl>
              {form.watch("location") && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      form.setValue("location", "", { shouldValidate: true });
                    }}
                    type="button"
                  >
                    <X size={20} />
                    <span className="text-sm">{form.watch("location")}</span>
                  </button>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <Label htmlFor="applicationEmail">How to apply</Label>
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <FormField
              control={form.control}
              name="applicationEmail"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        id="applicationEmail"
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="mx-2">or</span>
            <FormField
              control={form.control}
              name="applicationUrl"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      placeholder="Website"
                      type="url"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.trigger("applicationEmail");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label onClick={() => form.setFocus("description")}>
                Description
              </Label>
              <FormControl>
                <RichTextEditor
                  onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" loading={form.formState.isSubmitting}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
