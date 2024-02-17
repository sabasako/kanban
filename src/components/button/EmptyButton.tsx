import AddButton from "./AddTask";
import NewBoard from "./NewBoard";

type EmptyButtonProps = {
  text: string;
};

export default function EmptyButton({ text }: EmptyButtonProps) {
  return (
    <div className="flex max-h-[600px] h-dvh flex-col gap-6 justify-center items-center">
      <h2 className="text-xl">{text}</h2>
      <NewBoard />
    </div>
  );
}
