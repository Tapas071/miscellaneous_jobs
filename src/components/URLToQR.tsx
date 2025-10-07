"use client";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import the QRCodeCanvas component
const QRCodeCanvas = dynamic(
  () => import("qrcode.react").then((mod) => mod.QRCodeCanvas),
  { ssr: false }
);

const URLToQR: React.FC = () => {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
 const qrRef = useRef<HTMLDivElement | null>(null);

  const generateQRCode = () => {
    if (url.trim()) {
      setQrUrl(url);
    }
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const imgData = canvas.toDataURL("image/jpeg");
      const a = document.createElement("a");
      a.href = imgData;
      a.download = "qr-code.jpg";
      a.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Generate QR Code from URL
      </h1>

      <div className="w-full max-w-md p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL here"
          className="w-full px-4 py-2 mb-4 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={generateQRCode}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate QR Code
        </button>

        {qrUrl && (
          <div className="flex flex-col items-center mt-6" ref={qrRef}>
            <QRCodeCanvas
              value={qrUrl}
              size={200}
              fgColor="#00B2ED"
              imageSettings={{
                src: "/logo.png",
                height: 60,
                width: 60,
                excavate: true
              }}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
            />
            <button
              onClick={downloadQRCode}
              className="mt-4 px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Download as JPG
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default URLToQR;
