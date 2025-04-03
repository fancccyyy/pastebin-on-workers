export default async function uploadHandler(request, env) {
    const response = await request.json();
    const { data, expiry } = response;

    if (!data || !expiry) {
        return new Response('Invalid request', { status: 400 });
    }

    const generateId = () => crypto.randomUUID();

    const uniqueId = generateId();
    try {
        await env.texts.put(uniqueId, data, {
            expirationTtl: expiry,
            metadata: {
                expiry: new Date(Date.now() + 1000 * expiry).toISOString()
            }
        });
        console.log(`Uploaded text, ${uniqueId}, ${expiry}`);
    } catch (error) {
        console.log(error);
        return new Response('Failed to upload text', { status: 500 });
    }

    return new Response(JSON.stringify({ link: `${uniqueId}` }), { status: 200 });
}