// isolated world脱出
const scriptElement = document.createElement('script');
scriptElement.text = `(function(){
	${URLChangeEvent}
	(${isolate})();
}());`;
document.head.append(scriptElement);
scriptElement.remove();


// 本体、ページコンテキストで実行される
function isolate(){

	class URLChangeEvent extends HashChangeEvent{
		get [Symbol.toStringTag]() {
			return 'URLChangeEvent';
		}
	}

	const pushState_native = window.history.pushState;
	let url_cache = location.href;

	window.history.pushState = function(...args){
		pushState_native(...args);
		onChange();
	}

	window.addEventListener('hashchange', onChange);

	function onChange(e){
		if( location.href!==url_cache ){
			const event = new URLChangeEvent('urlchange', {
				oldURL: url_cache,
				newURL: location.href
			});
			window.dispatchEvent(event);
			typeof window.onurlchange==='function' && window.onurlchange(event);
			url_cache = location.href;
		}
	}

}


export default true;
