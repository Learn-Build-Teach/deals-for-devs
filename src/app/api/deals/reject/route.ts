import { isAdminUser } from '@/utils/auth';
import { getXataClient } from '@/xata';
import { auth } from '@clerk/nextjs';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
});
export async function POST(request: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  const isAdmin = await isAdminUser(userId);
  if (!isAdmin) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await request.json();
  let id;
  try {
    const parsed = schema.parse(body);
    id = parsed.id;
  } catch (error) {
    console.error(error);
    return new Response('Bad Request', { status: 400 });
  }

  try {
    const xataClient = getXataClient();
    await xataClient.db.deals.delete(id);
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
