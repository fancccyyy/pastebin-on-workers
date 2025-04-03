# A pastbin for Cloudflare Workers

## Warning: Do not attempt to use the project for production environment, or any circumstance requiring availability. Errors may occur at any time!

### How to use

1. create 2 KV namespaces, `files` for storing files, `texts` for storing texts.  If you wish to change the names, remember to edit the bindings correspondingly.

2. Deploy the code, either with [Playground](https://workers.cloudflare.com/playground), or with [Wrangler, the CLI tool for Workers](https://developers.cloudflare.com/workers/wrangler/). The latter is recommended.

3. Enjoy it.

4. Note: the filenames that end with `_original` in folder `htmls` are the original html, which contains human readable JS code, but they are not used. Files without `_original` are actually used, they have been JS obfuscated for better safety.