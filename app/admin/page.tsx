
import { handleWhoami } from "@/lib/actions/auth.actions";
import { notFound } from "next/navigation";
import { handleAdminGetAllUsers } from "@/lib/actions/auth.actions";
import { handleGetAllProducts } from "@/lib/actions/product.actions";

export default async function Page() {
    const userResult = await handleWhoami();
    if (!userResult.success || !userResult.data) {
        notFound();
    }

    // Fetch stats for the dashboard
    const usersResult = await handleAdminGetAllUsers();
    const productsResult = await handleGetAllProducts();

    const userCount = usersResult.success ? usersResult.data.length : 0;
    const productCount = productsResult.success ? productsResult.data.length : 0;
    const adminCount = usersResult.success ? usersResult.data.filter((u: any) => u.role === 'admin').length : 0;

    const StatCard = ({ label, value }: { label: string, value: string | number }) => (
        <div className="p-8 bg-neutral-900 border border-white/10 rounded-3xl space-y-2 hover:bg-neutral-800 transition-colors">
            <h3 className="text-gray-500 font-medium uppercase tracking-widest text-sm">{label}</h3>
            <p className="text-6xl font-light text-white" style={{ fontFamily: "serif" }}>{value}</p>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <header className="mb-12">
                <h2 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "serif" }}>Dashboard Overview</h2>
                <p className="text-gray-500 mt-2">Welcome back, Admin.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard label="Total Users" value={userCount} />
                <StatCard label="Total Products" value={productCount} />
                <StatCard label="System Admins" value={adminCount} />
            </div>
        </div>
    );
}