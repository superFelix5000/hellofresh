import { Handlers, PageProps } from "$fresh/server.ts";
import { listPosts, Post } from "../utils/posts.ts";

export const handler: Handlers<Post[]> = {
   async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render(posts);
   }
}

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <>
      <div class="px-4 mx-auto max-w-screen-md">
        <h1 class="text-5xl mt-12 font-bold">Felix' Blog</h1>
        <ul class="mt-8">
          {posts.map((post) => <PostEntry post = {post} />)}
        </ul>
      </div>
    </>
  );
}

function PostEntry(props: {post: Post}) {
  const post = props.post;
  const dateFmt = new Intl.DateTimeFormat("en-UK", { dateStyle: "short"});
  return <li class="border-t">
    <a href={`/blog/${post.id}`} class="flex py-2 gap-4 group">
      <div>{dateFmt.format(post.publishAt)}</div>
      <div>
        <h2 class="font-bold text-xl group-hover:underline">{post.title}</h2>
        <p class="text-gray-600">{post.snippet}</p>
      </div>
    </a>  
  </li>;
}