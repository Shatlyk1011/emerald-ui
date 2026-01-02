import { Group, Panel } from "react-resizable-panels";

export default function ResultPage() {
  return (
    <main>
      <Group>
        <Panel className="bg-red-500">left</Panel>
        <Panel defaultSize="30%" maxSize="50%" minSize="20%" className="bg-blue-500 basis-[20%]">right</Panel>
      </Group>
    </main>
  );
}
