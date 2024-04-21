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

	const func_nativePushState = window.history.pushState;
	const func_nativeReplaceState = window.history.replaceState;

	let str_urlCache = location.href;

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
		if( location.href!==str_urlCache ){
			const event = new URLChangeEvent('urlchange', {
				oldURL: str_urlCache,
				newURL: location.href
			});
			window.dispatchEvent(event);
			typeof window.onurlchange==='function' && window.onurlchange(event);
			str_urlCache = location.href;
		}
	}

}


export default true;
