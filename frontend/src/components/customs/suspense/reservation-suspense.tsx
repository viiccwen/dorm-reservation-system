import { Skeleton } from "@/components/ui/skeleton";

const ReservationSuspense = () => {
  return (
    <>
      <div className="space-y-2 py-[10px]">
        <Skeleton className="w-[600px] h-[20px] rounded-full" />
        <Skeleton className="w-[500px] h-[20px] rounded-full" />
        <Skeleton className="w-[550px] h-[20px] rounded-full" />
      </div>
      <div className="space-y-2 py-[10px]">
        <Skeleton className="w-[600px] h-[20px] rounded-full" />
        <Skeleton className="w-[500px] h-[20px] rounded-full" />
        <Skeleton className="w-[550px] h-[20px] rounded-full" />
      </div>
      <div className="space-y-2 py-[10px]">
        <Skeleton className="w-[600px] h-[20px] rounded-full" />
        <Skeleton className="w-[500px] h-[20px] rounded-full" />
        <Skeleton className="w-[550px] h-[20px] rounded-full" />
      </div>
      <div className="space-y-2 py-[10px]">
        <Skeleton className="w-[600px] h-[20px] rounded-full" />
        <Skeleton className="w-[500px] h-[20px] rounded-full" />
        <Skeleton className="w-[550px] h-[20px] rounded-full" />
      </div>
    </>
  );
};

export default ReservationSuspense;
