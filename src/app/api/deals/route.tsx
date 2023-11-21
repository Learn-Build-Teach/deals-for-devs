import { getXataClient } from '@/xata';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  if (!query) {
    return new Response('Bad Request', { status: 400 });
  }
  const xataClient = getXataClient();
  try {
    const { records } = await xataClient.db.deals.search(query, {
      target: ['name', 'description'],
    });

    return new Response(JSON.stringify(records), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response('Bad Request', { status: 400 });
  }
}
