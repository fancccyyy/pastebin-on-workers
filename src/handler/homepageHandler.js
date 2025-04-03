import pastebin from "../htmls/pastebin.html"

export default async function homepageHandler() {
    return new Response(pastebin, {
        headers: {
            "content-type": "text/html",
        },
    });
}