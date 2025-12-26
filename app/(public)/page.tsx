import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* BIG BACK TEXT */}
      <h1 className="absolute text-[200px] font-extrabold text-red-600/90 opacity-90 top-40">
        GOLDSTAR
      </h1>

      {/* SHOE IMAGE */}
      <div className="z-5 relative top-20">
        <Image
          src="/images/shoe.png" // put your shoe image in public/
          alt="Goldstar Shoe"
          width={880}
          height={600}
          priority
        />
      </div>

      {/* BOTTOM TEXT */}
      <div className="absolute bottom-5 text-center">
        
        <h2 className="text-6xl md:text-700xl lg:text-5xl font-extrabold text-white/80">
          THE NEW 2025
          
        </h2>
        <p className="mt-2 text-sm">
          Aba ko Hidai Hami Sanga
        </p>
      </div>
    </main>
  );
}
