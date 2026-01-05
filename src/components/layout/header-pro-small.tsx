import { ArrowUpRight, PartyPopper } from "lucide-react";
import Link from "next/link";
import { ConfettiOutline } from "../icons/Conffetti";

export default function HeaderProSmall() {
    return (
        <div className="w-full bg-[#FF2D55] rounded-md">
            <div className="w-full px-4 py-1.5">
                <Link
                    href="https://kokonutui.pro?utm_source=kokonutui.com&utm_medium=header"
                    target="_blank"
                    className="flex items-center justify-center gap-2.5 md:gap-3 group transition-all duration-300 tracking-tighter"
                >
                    {/* Desktop View */}
                    <span className="hidden md:flex items-center gap-3">
                        <ConfettiOutline className="w-5 h-5 text-white" />
                        <span className="text-white tracking-tighter text-sm">
                            Introducing{" "}
                            <span className="font-bold">Kokonut UI Pro</span> -
                            70+ new components and templates to build beautiful
                            websites
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                    </span>

                    {/* Mobile View */}
                    <span className="flex md:hidden items-center gap-2.5">
                        <PartyPopper className="w-5 h-5 text-white flex-shrink-0" />
                        <span className="text-white font-medium tracking-tight text-xs leading-tight">
                            Introducing Kokonut UI Pro - 70+ new components and
                            templates to build beautiful websites
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                </Link>
            </div>
        </div>
    );
}
