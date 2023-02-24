import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { parse } from "https://esm.sh/accept-language-parser@1.5.0";
import { State } from "../utils/state.ts";
import { getCookies } from "$std/http/cookie.ts";

export function handler(req: Request, ctx: MiddlewareHandlerContext<State>) {
  ctx.state.locales = [];

  const cookies = getCookies(req.headers);
  if (cookies.locale) {
    ctx.state.locales.push(cookies.locale);
  }

  const langs = parse(req.headers.get("accept-language") || undefined);
  for (const lang of langs) {
    let locale = lang.code;
    if (lang.region) {
      locale += `-${lang.region}`;
    }
    ctx.state.locales.push(locale);
  }

  if (ctx.state.locales.length === 0) {
    ctx.state.locales.push("en");
  }

  return ctx.next();
}
