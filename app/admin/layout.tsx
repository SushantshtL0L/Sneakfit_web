import Sidebar from "./_component/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex min-h-screen bg-[#f5f5f5] text-gray-900 font-sans'>
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-20 bg-[#f5f5f5] overflow-y-auto text-gray-900">
                {children}
            </main>
        </div>
    );
}