"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    SwaggerUIBundle?: (options: { url: string; dom_id: string }) => unknown;
  }
}

export function SwaggerReference() {
  useEffect(() => {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://unpkg.com/swagger-ui-dist@5.34.0/swagger-ui.css";
    document.head.append(stylesheet);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/swagger-ui-dist@5.34.0/swagger-ui-bundle.js";
    script.async = true;
    script.onload = () => {
      window.SwaggerUIBundle?.({ url: "/api/auth/open-api/generate-schema", dom_id: "#swagger-ui" });
    };
    document.body.append(script);

    return () => {
      stylesheet.remove();
      script.remove();
    };
  }, []);

  return <div id="swagger-ui" className="min-h-[65vh]" aria-label="Swagger API reference" />;
}