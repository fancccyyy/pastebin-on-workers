import getParam from "./common";

export default async function getTypeHandler(request, env) {
    const key = getParam(request, 'key');

    if (key) {
        try {
            const isText = await env.texts.get(key);

            if (isText) {
                return new Response(JSON.stringify({ type: 'text' }), {status: 200});
            } else {
                const isFile = await env.files.get(key, "arrayBuffer");
                if (isFile) {
                    return new Response(JSON.stringify({ type: 'file' }), {status: 200});
                } else {
                    return new Response(JSON.stringify({ type: 'none' }), {status: 404});
                }
            }
        } catch (error) {
            return new Response(JSON.stringify({ type: 'none' }), {status: 404});
        }
    } else {
        return new Response(JSON.stringify({ type: 'none' }), {status: 404});
    }
}