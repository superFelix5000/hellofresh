// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_middleware.tsx";
import * as $1 from "./routes/blog/[id].tsx";
import * as $2 from "./routes/index.tsx";
import * as $3 from "./routes/settings.tsx";
import * as $$0 from "./islands/LocaleSelector.tsx";

const manifest = {
  routes: {
    "./routes/_middleware.tsx": $0,
    "./routes/blog/[id].tsx": $1,
    "./routes/index.tsx": $2,
    "./routes/settings.tsx": $3,
  },
  islands: {
    "./islands/LocaleSelector.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
