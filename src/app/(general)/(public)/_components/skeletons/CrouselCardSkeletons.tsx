import { Skeleton } from "../../../../../components/ui/skeleton";

export default function CrouselCardSkeletons() {
  return (
    <div className="flex items-center gap-4">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className="flex flex-col space-y-3 md:basis-1/2 lg:basis-1/3"
        >
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[180px]" />
          </div>
          <div className="flex items-center justify-between pt-10">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
