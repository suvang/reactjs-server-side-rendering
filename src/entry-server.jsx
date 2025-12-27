import { renderToString } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router";

export async function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
