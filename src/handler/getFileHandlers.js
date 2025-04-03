import getParam from "./common";

const getFile = async (key, env) => {
    try {
        const file = await env.files.getWithMetadata(key, "arrayBuffer");
        // console.log(file);
        return file;
    } catch (error) {
        throw error;
    }
};

function encodeRFC5987ValueChars(str) {
    return encodeURIComponent(str)
      // 手动替换单引号、括号（避免使用 escape）
      .replace(/'/g, "%27")
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29")
      // 星号必须编码
      .replace(/\*/g, "%2A")
      // 解码允许的字符：| ` ^
      .replace(/%7C/g, "|")
      .replace(/%60/g, "`")
      .replace(/%5E/g, "^");
}

export async function getFileHandler(request, env) {
    try {
        const key = getParam(request, 'key');
        const file = await getFile(key, env);
        // console.log(file, file.value);
        if (file) {
            return new Response(file.value, {
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Content-Length': file.metadata.fileSize,
                    'Content-Disposition': `attachment; filename="${encodeRFC5987ValueChars(file.metadata.fileName)}"`,
                }
            });
        } else {
            return new Response(JSON.stringify({ error: 'File not found' }), {status: 404});
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: 'File not found' }), {status: 404});
    }
}

export async function getFileInfoHandler(request, env) {
    try {
        const key = getParam(request, 'key');
        const file = await getFile(key, env);
        // console.log(file);
        if (file) {
            console.log(file.metadata)
            return new Response(JSON.stringify({
                fileName: file.metadata.fileName,
                fileSize: file.metadata.fileSize,
                expiry: file.metadata.expiry,
            }), {status: 200});
        } else {
            // console.log("here")
            return new Response(JSON.stringify({ error: 'File not found' }),{status: 404});
        }
    } catch (error) {
        // console.error(error)
        return new Response(JSON.stringify({ error: 'File not found' }),{status: 404});
    }
}