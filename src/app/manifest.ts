import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arun Kumar | Cybersecurity Student & Developer",
    short_name: "Arun Kumar",
    description:
      "Arun Kumar is a BCA student and cybersecurity-focused developer from India, building practical projects in cybersecurity, Linux, networking, and secure software development.",
    start_url: "/",
    display: "standalone",
    background_color: "#080c10",
    theme_color: "#00FF00",
    icons: [
      {
        src: "/images/profile.png",
        sizes: "800x800",
        type: "image/png",
      },
    ],
  };
}
