# url-change
* [honeo/url-change](https://github.com/honeo/url-change)  
* [url-change](https://www.npmjs.com/package/url-change)


## なにこれ
URL変更イベントの実装。  
ChromeExtensions, WebExtensionsのContentScriptsでも動作する。


## 使い方
```bash
$ npm i url-change
```
```js
import 'url-change';

// or

await import('url-change');
```
```js
window.addEventListener('urlchange', (e)=>{
	console.log(
		e.type, // "urlchange"
		e.oldURL, // "https://example.com/query?foo=bar"
		e.newURL // "https://example.com/queryandhash?hoge=fuga#piyo"
	);
});

// or

window.onurlchange = function(e){...}
```
