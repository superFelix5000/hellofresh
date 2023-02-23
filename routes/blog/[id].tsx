import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost, Post } from "../../utils/posts.ts";
import * as gfm from "https://deno.land/x/gfm@0.2.0/mod.ts";
import { State } from "../../utils/state.ts";

interface Data extends State {
  post: Post;
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const post = await loadPost(id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    return ctx.render({ ...ctx.state, post: post });
  },
};

export default function BlogPostPage(props: PageProps<Data>) {
  const { post, locales } = props.data;
  const dateFmt = new Intl.DateTimeFormat(locales, { dateStyle: "full" });
  const html = gfm.render(post.content);
  return (
    <>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="text-gray-600 mt-12">
          {dateFmt.format(post.publishAt)}
        </p>
        <h1 class="text-5xl mt-2 font-bold">{post.title}</h1>
        <style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
        <div
          class="mt-12 markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
