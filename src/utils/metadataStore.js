/**
 * Metadata store that works in both SSR and client environments
 * This allows us to capture metadata during SSR rendering
 */

let currentMetadata = {
  title: "Vite + React",
  description: "",
  keywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  ogUrl: "",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
};

export function setMetadata(metadata) {
  currentMetadata = { ...currentMetadata, ...metadata };
}

export function getMetadata() {
  return { ...currentMetadata };
}

export function resetMetadata() {
  currentMetadata = {
    title: "Vite + React",
    description: "",
    keywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    ogUrl: "",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
  };
}
