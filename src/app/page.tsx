import { FileUploadInput } from "@/components/FileUpload";

export default function Home() {
  return (
    <section className="mx-auto mb-16 h-full w-full pt-30 flex items-center max-w-5xl justify-center px-12 max-lg:px-8 max-sm:px-4 max-sm:pt-2">
      <section className="flex items-center flex-col w-full gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-2 -tracking-two">Build something great</h1>
          <p className="text-base text-primary/70 font-mono -tracking-two">Create apps and websites by chatting with AI</p>
        </div>
        <FileUploadInput />
      </section>
    </section>
  );
}
