/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useMetadata } from "../contexts/MetadataContext";
import { setMetadata } from "../utils/metadataStore";

export default function Metadata({
  title,
  description = "",
  keywords = "",
  ogTitle,
  ogDescription,
  ogImage = "",
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
}) {
  const { updateMetadata } = useMetadata();

  // Compute metadata
  const metadata = {
    title: title || "Vite + React",
    description,
    keywords,
    ogTitle: ogTitle || title || "Vite + React",
    ogDescription: ogDescription || description,
    ogImage,
    ogUrl: ogUrl || (typeof window !== "undefined" ? window.location.href : ""),
    ogType,
    twitterCard,
    twitterTitle: twitterTitle || ogTitle || title || "Vite + React",
    twitterDescription: twitterDescription || ogDescription || description,
    twitterImage: twitterImage || ogImage,
  };

  // Update metadata store immediately (for SSR)
  // This runs during render, which is what we want for SSR
  setMetadata(metadata);
  updateMetadata(metadata);

  // Update DOM on client-side (runs after render)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Update document title
      document.title = metadata.title;

      // Update or create meta tags
      updateMetaTag("description", metadata.description);
      updateMetaTag("keywords", metadata.keywords);

      // Open Graph tags
      updateMetaTag("og:title", metadata.ogTitle, "property");
      updateMetaTag("og:description", metadata.ogDescription, "property");
      updateMetaTag("og:image", metadata.ogImage, "property");
      updateMetaTag("og:url", metadata.ogUrl, "property");
      updateMetaTag("og:type", metadata.ogType, "property");

      // Twitter Card tags
      updateMetaTag("twitter:card", metadata.twitterCard);
      updateMetaTag("twitter:title", metadata.twitterTitle);
      updateMetaTag("twitter:description", metadata.twitterDescription);
      updateMetaTag("twitter:image", metadata.twitterImage);
    }
  }, [metadata]);

  return null; // This component doesn't render anything
}

function updateMetaTag(name, content, attribute = "name") {
  if (!content) return;

  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}
