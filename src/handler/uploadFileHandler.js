export default async function uploadFile(request, env) {
    const fileName = decodeURIComponent(request.headers.get('X-File-Name') || 'file');
    const fileType = request.headers.get('X-File-Type') || 'application/octet-stream';
    const expiry = request.headers.get('X-File-Expiry') || 60 * 60 * 24 * 7;
    const fileData = await request.arrayBuffer();

    console.log(fileName, fileType, fileData, fileData.byteLength, expiry);

    if (!fileData || !fileType || !expiry) {
        return new Response('Invalid request', { status: 400 });
    }

    const generateId = () => crypto.randomUUID();
    
    const uniqueId = generateId();
    try {
        await env.files.put(uniqueId, fileData, {
            expirationTtl: expiry,
            metadata: {
                fileName: fileName,
                fileType: fileType,
                fileSize: fileData.byteLength,
                expiry: new Date(Date.now() + 1000 * expiry).toISOString()
            }
        });
    } catch (error) {
        console.log(error);
        return new Response('Failed to upload file', { status: 500 });
    }
    
    return new Response(JSON.stringify({ link: `${uniqueId}` }), { status: 200 });
}