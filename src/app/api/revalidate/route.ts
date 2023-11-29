import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

// https://nextjs.org/docs/app/api-reference/functions/revalidateTag#route-handler
async function handler(request: NextRequest) {
  revalidatePath('/examples');
  return Response.json({ revalidated: true, now: Date.now() });
}

export const POST = handler;
export const GET = handler;
