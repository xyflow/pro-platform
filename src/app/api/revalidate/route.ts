import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// https://nextjs.org/docs/app/api-reference/functions/revalidateTag#route-handler
async function handler(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');

  if (tag) {
    revalidateTag(tag);
    return Response.json({ revalidated: true, tag, timestamp: Date.now() });
  }

  const path = request.nextUrl.searchParams.get('path');

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, path, timestamp: Date.now() });
  }

  return Response.json({ revalidated: false, timestamp: Date.now() });
}

export const POST = handler;
export const GET = handler;
