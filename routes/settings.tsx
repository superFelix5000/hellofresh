import { Handlers, PageProps } from "$fresh/server.ts";
import { State } from "../utils/state.ts";

export const handler: Handlers<State, State> = {
  async GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function SettingsPage(props: PageProps<State>) {
  const { locales } = props.data;
  return (
    <div class="px-4 mx-auto max-w-screen-md">
      <h1 class="text-5xl mt-12 font-bold">Settings</h1>
      <p class="mt-4">
        Your current locale is <b>{locales[0]}</b>.
      </p>
    </div>
  );
}
