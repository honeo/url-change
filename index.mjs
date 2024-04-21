// isolated world脱出
const scriptElement = document.createElement('script');
scriptElement.text = `(function(){
	(${isolate})();
}());`;
document.head.append(scriptElement);
scriptElement.remove();


/*
	Webページのコンテキストで実行される
		引数・返り値なし
*/
function isolate(){

	class URLChangeEvent extends HashChangeEvent{
		get [Symbol.toStringTag]() {
			return 'URLChangeEvent';
		}
	}

	// var
	const func_nativePushState = window.history.pushState;
	const func_nativeReplaceState = window.history.replaceState;
	let obj_urlCache = getUrlObj();

	window.history.pushState = function(...args){
		func_nativePushState(...args);
		onChange();
	}
	window.history.replaceState = function(...args){
		func_nativeReplaceState(...args);
		onChange();
	}

	window.addEventListener('hashchange', onChange);

	/*
		引数（未使用）
			pushState()から誘発時: なし
			hashchangeイベントから誘発時： eventインスタンス
		返り値
			なし
	*/
	function onChange(e){
		const obj_url = getUrlObj();

		// 変化なし
		if( obj_url.href===obj_urlCache.href ){
			return;
		}

		const event = new URLChangeEvent('urlchange', {
			oldURL: obj_urlCache.href,
			newURL: obj_url.href
		});
		window.dispatchEvent(event);
		typeof window.onurlchange==='function' && window.onurlchange(event);

		for(let key of Object.keys(obj_url) ){
			if( obj_url[key]===obj_urlCache[key] ){
				continue;
			}
			const event = new URLChangeEvent(`urlchange-${key}`, {
				oldURL: obj_urlCache[key],
				newURL: obj_url[key]
			});
			window.dispatchEvent(event);
			typeof window[`onurlchange${key}`]==='function' && window[`onurlchange${key}`](event);
		}

		obj_urlCache = obj_url;
	}

	/*
	 	URL中の変化する要素（origin以外）の集合体
			引数
				なし
			返り値
				object {
					hash,href,password,pathname,search,username:string
				}
	*/
	function getUrlObj(){
		const url = new URL(location.href);
		return {
			hash: url.hash,
			href: url.href,
			password: url.password,
			pathname: url.pathname,
			search: url.search,
			username: url.username
		}
	}

}


export default true;
