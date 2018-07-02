/*
	Test
*/
const {name, version} = require('../package.json');
console.log(`${name} v${version}: test`);

// // babel
// require('babel-polyfill');
// require("babel-register")({
// 	plugins: ['add-module-exports'],
// 	presets: ['latest', 'stage-0']
// });

// // jsdom + var
// const JSDOM = require('jsdom');
// global.document = JSDOM.jsdom('hogehoge');
// global.head = document.head;
// global.window = document.defaultView;

// modules
// const projectName = require('../').default;

/// Cases
const cases = {}

// example
cases.casename = (arg)=>{
	return true;
}

// 本体
for(let [key, value] of Object.entries(cases)){
	if( value() ){
		console.log(`${key}: success`);
	}else{
		throw new Error(`${key}: failed`);
	}
}
