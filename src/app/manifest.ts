import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Muhammad Hamid — AI Automation Engineer",
    short_name: "Marvis",
    description:
      "Portfolio of Muhammad Hamid: MCP servers, AI agents, Gemini development, GoHighLevel automation and Python engineering.",
    start_url: "/",
    display: "standalone",
    background_color: "#101512",
    theme_color: "#101512",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
