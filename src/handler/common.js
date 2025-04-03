export default function getParam(request, key) {
    const params = new URL(request.url).searchParams;
    return params.get(key);
}