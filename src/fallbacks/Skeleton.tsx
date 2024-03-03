export default function Skeleton() {
  return (
    <div className="flex flex-col gap-4 w-52">
      <div className="w-full h-4 skeleton"></div>
      <div className="h-4 skeleton w-28"></div>
    </div>
  );
}
