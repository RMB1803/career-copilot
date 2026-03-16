import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/drizzle/db';
import { UserTable } from '@/drizzle/schema/user';

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET in environment variables.');
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing required Svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const webhook = new Webhook(webhookSecret);
  
  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const fullName = `${first_name || ''} ${last_name || ''}`.trim() || 'Unknown User';

    try {
      await db.insert(UserTable).values({
        id: crypto.randomUUID(),
        clerkId: id,
        name: fullName,
        email: email_addresses[0].email_address,
        imageUrl: image_url || '',
      });
      
      console.log(`Successfully added user ${id} to the database.`);
    } catch (dbError) {
      console.error('Database insertion failed:', dbError);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  return new Response('Webhook processed successfully', { status: 200 });
}