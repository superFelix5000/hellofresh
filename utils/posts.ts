import { extract } from "$std/encoding/front_matter.ts";

export interface Post {
  id: string;
  title: string;
  publishAt: Date;
  snippet: string;
  content: string;
}

export async function loadPost(id: string): Promise<Post | null> {
  let text;
  try {
    text = await Deno.readTextFile(`./data/posts/${id}.md`);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null;
    }
    throw err;
  }
  const { attrs, body } = extract(text);
  const params = attrs as Record<string, string>;
  const publishAt = new Date(params.publish_at);
  return {
    id,
    title: params.title,
    publishAt,
    snippet: params.snippet,
    content: body,
  };
}

export async function listPosts(): Promise<Post[]> {
  const promises = [];
  for await (const entry of Deno.readDir("./data/posts")) {
    const id = entry.name.slice(0, -3);
    promises.push(loadPost(id));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.publishAt.getTime() - a.publishAt.getTime());
  // TODO: casting to Post array since we're not dealing with the null case here
  return posts;
}
