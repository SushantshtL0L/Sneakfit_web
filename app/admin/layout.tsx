import Sidebar from "./_component/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex min-h-screen bg-neutral-950 text-white font-sans'>
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-20 bg-neutral-950 overflow-y-auto text-white">
                {children}
            </main>
        </div>
    );
}