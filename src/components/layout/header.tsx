import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Link href="/" className="text-xl font-bold">
        Antigravity UI
      </Link>
      <div className="flex items-center gap-4">
        <Button>Login</Button>
      </div>
    </header>
  );
}
