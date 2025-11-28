import { PROJECT_NAME } from "../CONSTANTS.ts";
import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{PROJECT_NAME}</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
