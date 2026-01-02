import { FileUploadInput } from "@/components/FileUpload";

export default function Home() {
  return (
    <div className="flex h-full flex-1 items-start pt-30 justify-center font-sans px-20">
      <section className="flex items-center flex-col w-full gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-2 -tracking-two">Build something great</h1>
          <p className="text-base text-primary/70 font-mono -tracking-two">Create apps and websites by chatting with AI</p>
        </div>
        <FileUploadInput />
      </section>
    </div>
  );
}
