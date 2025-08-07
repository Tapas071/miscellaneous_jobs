import URLToQR from '@/components/URLToQR';
import Link from 'next/link';
import React from 'react'

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 p-8 sm:p-20 text-gray-800 dark:text-gray-100">
        <header className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-extrabold text-center leading-tight">
            QR Code Generator
          </h1>
          <Link href="/" className=" bg-red-500">
Go back to the home page
          </Link>

          <p className="text-lg text-center max-w-md">
            Easily generate a QR code for any URL. Paste your link below and
            create a shareable QR code instantly!
          </p>
        </header>
        <main className="flex flex-col items-center justify-center mt-12">
          <URLToQR />
        </main>
      </div>
    </>
  );
}

export default page
