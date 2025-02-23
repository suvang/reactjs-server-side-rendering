import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

export async function render(url) {
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  return appHtml;
}
