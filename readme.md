# url-change
* [honeo/url-change](https://github.com/honeo/url-change)
* [url-change](https://www.npmjs.com/package/url-change)


## なにこれ
URL変更イベントの実装。


## 使い方
```bash
$ npm i url-change
```
```js
import 'url-change';

// or dynamic-import, CDN
await import('https://cdn.jsdelivr.net/gh/honeo/url-change/index.min.mjs');
```
```js
window.addEventListener('urlchange', (e)=>{
	console.log(
		e.type, // "urlchange"
		e.oldURL, // "https://example.com/query?foo=bar"
		e.newURL // "https://example.com/queryandhash?hoge=fuga#piyo"
	);
});

// only WebPageContext
window.onurlchange = function(e){...}
```
```js
// or hash|href|password|pathname|search|username
window.addEventListener('urlchange-hash', (e)=>{
	console.log(
		e.type, // "urlchange-hash"
		e.oldURL, // "#foo"
		e.newURL // "#bar"
	);
});
window.onurlchangehash = function(e){...}
```


## 実装について

### URL変更の検知
1. history.pushState|replaceState()の実行時
2. 標準のhashchangeイベント発火時

### ContentScripts対応
ブラウザ拡張機能(ChromeExtensions, WebExtensions)のContentScriptsでも動作する。

#### 既知の問題
ContentScriptsから利用時、渡されるEventインスタンス名がHashChangeEventになる。
（Isolated worldによってContentScriptsからWebページ上の独自クラスを参照できないため）
