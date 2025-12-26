
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-6">
      <h1 className="text-xl font-bold">SneakFit.</h1>

      <nav className="flex space-x-15 text-sm font-bold ml-10">
        <Link href="/">Home</Link>
        <Link href="/about">About us</Link>
        <Link href="/services">Services</Link>
        <Link href="/register">SignIn</Link>
      </nav>
    </header>
  );
}
