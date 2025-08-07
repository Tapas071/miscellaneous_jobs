import Link from "next/link";

export default function Home() {
  if (typeof window !== "undefined")return <>
  </>
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 p-8 sm:p-20 text-gray-800 dark:text-gray-100">
        <Link href="/qr-gen" className="bg-red-500">
          {" "}
          click here to generate qr
        </Link>

        <Link href="/memory-game" className="bg-red-500">
          {" "}
         check your memory
        </Link>

        <footer className="flex items-center justify-center mt-16 text-sm">Made with Love by ❤️ by Tapas Mondal</footer>
      </div>
    );
}
