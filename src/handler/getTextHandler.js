import getParam from "./common";

export default async function getTextHandler(request, env) {
    const key = getParam(request, 'key');
    
    try {
        const text = await env.texts.getWithMetadata(key)
        console.log(key, text);

        if (text) {
            return new Response(JSON.stringify({
                text: text.value,
                expiry: text.metadata.expiry,
            }), {status: 200});
        } else {
            console.log('Not found');
            return new Response('Not found', {status: 404});
        }
    } catch (error) {
        console.log(error);
        return new Response('Not found Not found', {status: 404});
    }
}