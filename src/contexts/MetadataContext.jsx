/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const MetadataContext = createContext(null);

export function MetadataProvider({ children }) {
  const [metadata, setMetadata] = useState({
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
  });

  const updateMetadata = (newMetadata) => {
    setMetadata((prev) => ({ ...prev, ...newMetadata }));
  };

  return (
    <MetadataContext.Provider value={{ metadata, updateMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata() {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error("useMetadata must be used within MetadataProvider");
  }
  return context;
}
