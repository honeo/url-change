# document

いわゆる製作メモ。


## 実装について
* URL変更の検知
	- history.pushState()の実行時
	- 標準のhashchangeイベント発火時
* isolated関数
	- 変換・圧縮が効くように通常の関数で書いてから文字列化している。
* ContentScriptsから利用時、イベントインスタンスのオブジェクト名がHashChangeEventになる
	- ページコンテキストにあるURLChangeEventコンストラクタをDevToolsが参照できないせい？
	- 特に害はないから放っておく。


## TODO
* setIntervalによるpolling
* listenerへ渡すイベントオブジェクト.method()による動作ON/OFF


## devDependencies
* uglify-es
	- .min.mjs出力用。
