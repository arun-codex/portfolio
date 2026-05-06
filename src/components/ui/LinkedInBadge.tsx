"use client";

import { useEffect } from "react";

interface LinkedInBadgeProps {
  /** Your LinkedIn vanity (the part after /in/). Example: `arun-codex` */
  vanity: string;
  /** badge size: 'small' | 'medium' | 'large' */
  size?: "small" | "medium" | "large";
  /** vertical or horizontal */
  type?: "vertical" | "horizontal";
  locale?: string;
}

/**
 * Client-side LinkedIn Profile Badge loader.
 *
 * Usage:
 * <LinkedInBadge vanity="arun-codex" size="medium" type="horizontal" />
 *
 * The component dynamically injects LinkedIn's `platform.linkedin.com/badges/js/profile.js`
 * and renders the badge container expected by their script.
 */
export function LinkedInBadge({
  vanity,
  size = "medium",
  type = "horizontal",
  locale = "en_US",
}: LinkedInBadgeProps) {
  useEffect(() => {
    const src = "https://platform.linkedin.com/badges/js/profile.js";

    // If the script is not already present, inject it.
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.defer = true;
      s.type = "text/javascript";
      document.body.appendChild(s);
    } else {
      // If script already loaded, try to re-run LinkedIn's loader if exposed.
      // The script will normally scan the DOM on load; if it has already loaded
      // and we added the badge later, re-initialization may be necessary.
      // LinkedIn does not publish a stable global init API, so the safest
      // approach is to let the injected script run (it runs on DOMContentLoaded)
      // For most cases the script will process new badges automatically.
    }

    // No cleanup: leaving the script is fine across SPA navigations.
  }, []);

  // LinkedIn expects a specific markup for profile badges. We provide the
  // minimal attributes commonly used. Adjust `data-*` attributes as needed.
  const dataSize = size === "large" ? "large" : size === "small" ? "small" : "medium";

  return (
    <div
      className="LI-profile-badge"
      data-version="v1"
      data-size={dataSize}
      data-locale={locale}
      data-type={type}
      data-theme="light"
      data-vanity={vanity}
      style={{ width: "100%" }}
    >
      <a
        className="LI-simple-link"
        href={`https://www.linkedin.com/in/${vanity}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View LinkedIn profile
      </a>
    </div>
  );
}

export default LinkedInBadge;
