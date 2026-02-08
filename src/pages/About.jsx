import { useEffect } from "react";
import md from "@/utils/markdown-it";
import readme from "/README.md";

export default function About() {
  useEffect(() => {
    const handleMessage = (event) => {
      const { origin } = new URL(location.toString());
      if (event.origin !== origin) {
        return;
      }
      if (event.ports && event.ports[0]) {
        event.ports[0].postMessage({
          channel: "content",
          data: md.render(readme),
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <iframe
      src={`${import.meta.env.BASE_URL}/preview.html`}
      style={{ border: "none", width: "100%", height: "100vh" }}
    />
  );
}
