import { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

// https://nextjs.org/docs/app/api-reference/functions/revalidateTag#route-handler
async function handler(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  console.log(tag);
  revalidateTag(tag);
  return Response.json({ revalidated: true, now: Date.now() });
}

export const POST = handler;
export const GET = handler;
