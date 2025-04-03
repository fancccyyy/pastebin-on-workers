/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import homepageHandler from "./handler/homepageHandler";
import uploadTextHandler from "./handler/uploadTextHandler";
import uploadFileHandler from "./handler/uploadFileHandler";
import get from "./htmls/get.html"
import getTypeHandler from "./handler/getTypeHandler";
import getTextHandler from "./handler/getTextHandler";
import {getFileHandler, getFileInfoHandler} from "./handler/getFileHandlers";

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const path = url.pathname.slice(1);

		try {
			// 主页
			if (path === '') {
				return homepageHandler();
			}

			// 上传文本
			if (path === 'uploadText' && request.method === 'POST') {
				return uploadTextHandler(request, env);
			}

			if (path === 'uploadFile' && request.method === 'POST') {
				return uploadFileHandler(request, env);
			}

			if (path === 'getType') {
				return getTypeHandler(request, env);
			}

			if (path === 'getText') {
				console.log('getText')
				return getTextHandler(request, env)
			}

			if (path === 'getFileInfo') {
				return getFileInfoHandler(request, env)
			}

			if (path === 'getFile') {
				console.log('getFile')
				return getFileHandler(request, env)
			}

			// 获取内容
			return new Response(get, {
				headers: {
					'Content-Type': 'text/html'
				},
			})
		} catch (error) {
			return new Response('Internal Error');
		}
	},
};
