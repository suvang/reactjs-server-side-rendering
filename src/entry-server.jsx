import { renderToString } from "react-dom/server";
import App from "./App";
import pkg from "react-router-dom";
const { StaticRouter } = pkg;
import { resetMetadata, getMetadata } from "./utils/metadataStore";

export async function render(url) {
  // Reset metadata for each render
  resetMetadata();

  // Render the app (App already includes MetadataProvider)
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  // Get the metadata that was set during render
  const metadata = getMetadata();

  return { appHtml, metadata };
}
