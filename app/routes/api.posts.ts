import { LoaderFunctionArgs, json } from '@remix-run/node';
import { ClientLoaderFunctionArgs } from '@remix-run/react';
import { z } from 'zod';
import { delay } from '~/utils';

const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export interface Post extends z.infer<typeof PostSchema> {}

const PostsResponseSchema = z.object({
  posts: z.array(PostSchema),
});

export type PostsResponse = z.infer<typeof PostsResponseSchema>;

export async function loader({ request }: LoaderFunctionArgs) {

  const { searchParams } = new URL(request.url);

  const q = searchParams.get('q');

  console.log(' *** EXPENSIVE API FETCH *** ');
  await delay(500);

  if (!q) {
    return json([]);
  }

  const searchUrl = new URL('https://dummyjson.com/posts/search');
  searchUrl.searchParams.set('q', q);
  searchUrl.searchParams.set('limit', '10');

  const results = await fetch(searchUrl.href)
    .then((res) => res.json())
    .then((raw) => PostsResponseSchema.parse(raw));

  return json(results.posts as Post[]);
}

export async function clientLoader({ request, serverLoader }: ClientLoaderFunctionArgs) {
  await delay(500, request.signal);
  return await serverLoader();
}