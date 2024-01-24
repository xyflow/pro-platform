import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// https://nextjs.org/docs/app/api-reference/functions/revalidateTag#route-handler
async function handler(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');

  let revalidated = false;

  if (tag) {
    revalidateTag(tag);
    revalidated = true;
  }

  const path = request.nextUrl.searchParams.get('path');

  if (path) {
    revalidatePath(path);
    revalidated = true;
  }

  return Response.json({ revalidated, tag, path, timestamp: Date.now() });
}

export const POST = handler;
export const GET = handler;
