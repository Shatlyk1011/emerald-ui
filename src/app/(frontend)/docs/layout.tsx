import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { source } from "@/lib/source";
import { baseOptions } from "../layout.config";

export const metadata: Metadata = {
  title: {
    template: "%s | ??",
    default: "components",
  },
};

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        defaultOpenLevel: 1,
        banner: (
          <div className="flex flex-col items-center gap-2 rounded-md border border-zinc-200 p-2 py-1 text-white text-xs dark:border-zinc-800 dark:text-zinc-900">
            <Link
              className="group my-1 flex items-center gap-1.5 text-gray-600 text-xs transition-colors hover:cursor-pointer hover:font-medium hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
              href="https://vercel.com/blog/spring25-oss-program#kokonutui"
              rel="noreferrer"
              target="_blank"
            >
              <span className="hidden items-center gap-2 md:flex">
                <Image
                  alt="Vercel OSS Program"
                  height={256}
                  src="https://vercel.com/oss/program-badge.svg"
                  width={256}
                />
              </span>
            </Link>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
