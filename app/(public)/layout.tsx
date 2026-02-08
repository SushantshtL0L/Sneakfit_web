import Header from "./_components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </section>
    );
}
