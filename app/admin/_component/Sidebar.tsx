"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_LINKS = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/products", label: "Products" },
];

const SidebarItem = ({ label, active, href }: { label: string, active?: boolean, href: string }) => (
    <Link href={href}>
        <div
            className={`px-8 py-3 cursor-pointer transition-all duration-200 hover:opacity-100 flex items-center justify-between group opacity-60 ${active ? 'opacity-100' : ''}`}
        >
            <div className="flex items-center gap-3">
                <span className={`text-5xl font-light tracking-tight ${active ? "text-gray-900" : "text-gray-500"}`} style={{ fontFamily: "serif" }}>{label}</span>
            </div>
        </div>
    </Link>
);

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => href === "/admin" ? pathname === href : pathname?.startsWith(href);

    return (
        <aside className="w-[420px] bg-white flex flex-col h-screen sticky top-0 hidden xl:flex border-r border-black/10">
            <div className="p-16">
                <Link href="/admin">
                    <h1 className="text-6xl font-bold tracking-tight text-gray-900 mb-20 ml-4 cursor-pointer">
                        Admin<span className="text-gray-500">Panel.</span>
                    </h1>
                </Link>

                <nav className="flex flex-col gap-8">
                    {ADMIN_LINKS.map(link => (
                        <SidebarItem
                            key={link.href}
                            label={link.label}
                            active={isActive(link.href)}
                            href={link.href}
                        />
                    ))}
                </nav>
            </div>
        </aside>
    );
}