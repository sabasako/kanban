import Skeleton from "@/fallbacks/Skeleton";

export default function Loading() {
  return (
    <div className="flex justify-between">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
}
