import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper function to escape HTML
function escapeHtml(text) {
  if (!text) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  // When the server restarts (for example after the user modifies
  // vite.config.js), `vite.middlewares` is still going to be the same
  // reference (with a new internal stack of Vite and plugin-injected
  // middlewares). The following is valid even after restarts.
  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
      //    and also applies HTML transforms from Vite plugins, e.g. global
      //    preambles from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. ssrLoadModule automatically transforms
      //    ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

      // 4. render the app HTML. This assumes entry-server.js's exported
      //     `render` function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const { appHtml, metadata } = await render(url);

      // 5. Inject metadata into the template
      const baseUrl = `${req.protocol}://${req.get("host")}${url}`;
      const fullOgUrl = metadata.ogUrl || baseUrl;

      // Replace title tag
      const titleTag = metadata.title
        ? `<title>${escapeHtml(metadata.title)}</title>`
        : `<title>Vite + React</title>`;
      template = template.replace(`<title>Vite + React</title>`, titleTag);

      // Build meta tags HTML (excluding title, which we already replaced)
      const metaTags = [];

      if (metadata.description) {
        metaTags.push(
          `    <meta name="description" content="${escapeHtml(
            metadata.description
          )}" />`
        );
      }

      if (metadata.keywords) {
        metaTags.push(
          `    <meta name="keywords" content="${escapeHtml(
            metadata.keywords
          )}" />`
        );
      }

      // Open Graph tags
      if (metadata.ogTitle) {
        metaTags.push(
          `    <meta property="og:title" content="${escapeHtml(
            metadata.ogTitle
          )}" />`
        );
      }
      if (metadata.ogDescription) {
        metaTags.push(
          `    <meta property="og:description" content="${escapeHtml(
            metadata.ogDescription
          )}" />`
        );
      }
      if (metadata.ogImage) {
        metaTags.push(
          `    <meta property="og:image" content="${escapeHtml(
            metadata.ogImage
          )}" />`
        );
      }
      if (fullOgUrl) {
        metaTags.push(
          `    <meta property="og:url" content="${escapeHtml(fullOgUrl)}" />`
        );
      }
      if (metadata.ogType) {
        metaTags.push(
          `    <meta property="og:type" content="${escapeHtml(
            metadata.ogType
          )}" />`
        );
      }

      // Twitter Card tags
      if (metadata.twitterCard) {
        metaTags.push(
          `    <meta name="twitter:card" content="${escapeHtml(
            metadata.twitterCard
          )}" />`
        );
      }
      if (metadata.twitterTitle) {
        metaTags.push(
          `    <meta name="twitter:title" content="${escapeHtml(
            metadata.twitterTitle
          )}" />`
        );
      }
      if (metadata.twitterDescription) {
        metaTags.push(
          `    <meta name="twitter:description" content="${escapeHtml(
            metadata.twitterDescription
          )}" />`
        );
      }
      if (metadata.twitterImage) {
        metaTags.push(
          `    <meta name="twitter:image" content="${escapeHtml(
            metadata.twitterImage
          )}" />`
        );
      }

      // Inject meta tags after the title tag
      if (metaTags.length > 0) {
        const metaTagsHtml = metaTags.join("\n") + "\n";
        template = template.replace(titleTag, titleTag + "\n" + metaTagsHtml);
      }

      // 6. Inject app HTML into body
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173);
}

createServer();
