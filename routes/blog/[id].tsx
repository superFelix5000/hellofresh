import { Head } from "$fresh/runtime.ts";
import { Post } from "../../utils/posts.ts"

const post: Post = {
  id: "hello",
  title: "Hello World",
  publishAt: new Date(),
  snippet: "my first post",
  content: "aslkdjalskjd"
}

export default function BlogPostPage() {
  return (
    <>
      <div class="p-4 mx-auto max-w-screen-md">
        <p class="text-gray-600 mt-12">{post.publishAt.toLocaleDateString()}</p>
        <h1 class="text-5xl mt-2 font-bold">{post.title}</h1>
        <div class="mt-12">
          {post.content}
        </div>
      </div>
    </>
  );
}
