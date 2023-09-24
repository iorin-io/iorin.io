// Next.js Edge API Routes: https://nextjs.org/docs/api-routes/edge-api-routes

export const runtime = 'edge';

export default async function handler() {
  return new Response(JSON.stringify({ name: "John Doe" }));
}
