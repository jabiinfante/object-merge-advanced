!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.mergeAdvanced=e()}(this,function(){"use strict";function t(t,e){return e={exports:{}},t(e,e.exports),e.exports}function e(t,e,r){function n(t){return"string"==typeof t}var o=Object.assign({},{arrayVsArrayAllMustBeFound:"any"},r);if(0===arguments.length)throw new Error("array-includes-with-glob/arrayIncludesWithGlob(): [THROW_ID_01] all inputs missing!");if(1===arguments.length)throw new Error("array-includes-with-glob/arrayIncludesWithGlob(): [THROW_ID_02] second argument missing!");if(!ct(t)){if(!n(t))throw new Error("array-includes-with-glob/arrayIncludesWithGlob(): [THROW_ID_03] first argument must be an array! It was given as "+(void 0===t?"undefined":ut(t)));t=[t]}if(!n(e)&&!ct(e))throw new Error("array-includes-with-glob/arrayIncludesWithGlob(): [THROW_ID_04] second argument must be a string or array of strings! It was given as "+(void 0===e?"undefined":ut(e)));if("any"!==o.arrayVsArrayAllMustBeFound&&"all"!==o.arrayVsArrayAllMustBeFound)throw new Error("array-includes-with-glob/arrayIncludesWithGlob(): [THROW_ID_05] opts.arrayVsArrayAllMustBeFound was customised to an unrecognised value, "+o.arrayVsArrayAllMustBeFound+'. It must be equal to either "any" or "all".');if(0===t.length)return!1;var i=t.filter(function(t){return function(t){return null!=t}(t)});return 0!==i.length&&(n(e)?i.some(function(t){return at.isMatch(t,e)}):"any"===o.arrayVsArrayAllMustBeFound?e.some(function(t){return i.some(function(e){return at.isMatch(e,t)})}):e.every(function(t){return i.some(function(e){return at.isMatch(e,t)})}))}function r(t){return t!=t}function n(t,e){return function(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}(e,function(e){return t[e]})}function o(t,e){var r=xt(t)||function(t){return function(t){return c(t)&&u(t)}(t)&&Et.call(t,"callee")&&(!kt.call(t,"callee")||Tt.call(t)==ht)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,o=!!n;for(var i in t)!e&&!Et.call(t,i)||o&&("length"==i||function(t,e){return!!(e=null==e?lt:e)&&("number"==typeof t||Ot.test(t))&&t>-1&&t%1==0&&t<e}(i,n))||r.push(i);return r}function i(t){if(!function(t){var e=t&&t.constructor,r="function"==typeof e&&e.prototype||At;return t===r}(t))return Mt(t);var e=[];for(var r in Object(t))Et.call(t,r)&&"constructor"!=r&&e.push(r);return e}function u(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=lt}(t.length)&&!function(t){var e=a(t)?Tt.call(t):"";return e==gt||e==dt}(t)}function a(t){var e=void 0===t?"undefined":ft(t);return!!t&&("object"==e||"function"==e)}function c(t){return!!t&&"object"==(void 0===t?"undefined":ft(t))}function f(t,e,r){if(e!=e)return function(t,e,r,n){for(var o=t.length,i=r+(n?1:-1);n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,l,r);for(var n=r-1,o=t.length;++n<o;)if(t[n]===e)return n;return-1}function s(t,e,r,n){for(var o=r-1,i=t.length;++o<i;)if(n(t[o],e))return o;return-1}function l(t){return t!=t}function y(t,e,r,n){var o=n?s:f,i=-1,u=e.length,a=t;for(t===e&&(e=function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(e)),r&&(a=function(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}(t,function(t){return function(e){return t(e)}}(r)));++i<u;)for(var c=0,l=e[i],y=r?r(l):l;(c=o(a,y,c,n))>-1;)a!==t&&Nt.call(a,c,1),Nt.call(t,c,1);return t}function p(t,e){return!!(t?t.length:0)&&function(t,e,r){if(e!=e)return function(t,e,r,n){var o=t.length,i=r+(n?1:-1);for(;n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,d,r);var n=r-1,o=t.length;for(;++n<o;)if(t[n]===e)return n;return-1}(t,e,0)>-1}function h(t,e,r){for(var n=-1,o=t?t.length:0;++n<o;)if(r(e,t[n]))return!0;return!1}function g(t,e){for(var r=-1,n=t?t.length:0,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}function d(t){return t!=t}function b(t){return function(e){return t(e)}}function _(t,e){return t.has(e)}function v(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function m(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function j(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function w(t){var e=-1,r=t?t.length:0;for(this.__data__=new j;++e<r;)this.add(t[e])}function O(t,e){for(var r=t.length;r--;)if(function(t,e){return t===e||t!=t&&e!=e}(t[r][0],e))return r;return-1}function S(t){if(!M(t)||function(t){return!!Jt&&Jt in t}(t))return!1;return(k(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t)?Yt:Rt).test(function(t){if(null!=t){try{return zt.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t))}function A(t){return function(t){return function(t){return!!t&&"object"==(void 0===t?"undefined":Wt(t))}(t)&&function(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=Vt}(t.length)&&!k(t)}(t)}(t)?t:[]}function E(t,e){var r=t.__data__;return function(t){var e=void 0===t?"undefined":Wt(t);return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}(e)?r["string"==typeof e?"string":"hash"]:r.map}function T(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return S(r)?r:void 0}function k(t){var e=M(t)?Xt.call(t):"";return e==$t||e==Dt}function M(t){var e=void 0===t?"undefined":Wt(t);return!!t&&("object"==e||"function"==e)}function I(t){return"string"==typeof t?t.length>0?[t]:[]:t}function x(t,e){return!!(t?t.length:0)&&function(t,e,r){if(e!=e)return function(t,e,r,n){var o=t.length,i=r+(n?1:-1);for(;n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,N,r);var n=r-1,o=t.length;for(;++n<o;)if(t[n]===e)return n;return-1}(t,e,0)>-1}function K(t,e,r){for(var n=-1,o=t?t.length:0;++n<o;)if(r(e,t[n]))return!0;return!1}function N(t){return t!=t}function P(t,e){return t.has(e)}function W(t){var e=-1,r=Array(t.size);return t.forEach(function(t){r[++e]=t}),r}function F(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function V(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function $(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function D(t){var e=-1,r=t?t.length:0;for(this.__data__=new $;++e<r;)this.add(t[e])}function R(t,e){for(var r=t.length;r--;)if(function(t,e){return t===e||t!=t&&e!=e}(t[r][0],e))return r;return-1}function B(t){if(!L(t)||function(t){return!!_e&&_e in t}(t))return!1;return(function(t){var e=L(t)?je.call(t):"";return e==ce||e==fe}(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t)?we:se).test(function(t){if(null!=t){try{return ve.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t))}function H(t,e){var r=t.__data__;return function(t){var e=void 0===t?"undefined":ie(t);return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}(e)?r["string"==typeof e?"string":"hash"]:r.map}function C(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return B(r)?r:void 0}function L(t){var e=void 0===t?"undefined":ie(t);return!!t&&("object"==e||"function"==e)}function G(t){return 0!==arguments.length&&void 0!==t&&(function(t){return Array.isArray(t)}(t)||function(t){return"string"==typeof t}(t)?t.length>0:$e(t)?Object.keys(t).length>0:!!function(t){return"number"==typeof t}(t))}function U(t){return"Object"===rt(t)}function q(t){return"boolean"==typeof t}function J(t,e){if(!U(t))throw new TypeError("object-merge-advanced/util.js/equalOrSubsetKeys(): [THROW_ID_03] First input is not an object, it's "+(void 0===t?"undefined":Re(t)));if(!U(e))throw new TypeError("object-merge-advanced/util.js/equalOrSubsetKeys(): [THROW_ID_04] Second input is not an object, it's "+(void 0===e?"undefined":Re(e)));return 0===Object.keys(t).length||0===Object.keys(e).length||(De(Object.keys(t),Object.keys(e))||De(Object.keys(e),Object.keys(t)))}function z(t){if(0===arguments.length)return!1;if(!function(t){return Array.isArray(t)}(t))throw new TypeError("object-merge-advanced/util.js/arrayContainsStr(): [THROW_ID_05] input must be array");return t.some(function(t){return"string"==typeof t})}function Q(t){return"Object"===rt(t)}function X(t){return Array.isArray(t)}function Y(t){return"string"===rt(t)}function Z(t,r,n){if(0===arguments.length)throw new TypeError("object-merge-advanced/mergeAdvanced(): [THROW_ID_01] Both inputs are missing");if(function(t){return null!=t}(n)&&!Q(n))throw new TypeError("object-merge-advanced/mergeAdvanced(): [THROW_ID_02] Options object, the third argument, must be a plain object");var o=X(t)||Q(t)?ot(t):t,i=X(r)||Q(r)?ot(r):r,u={mergeObjectsOnlyWhenKeysetMatches:!0,ignoreKeys:[],hardMergeKeys:[],mergeArraysContainingStringsToBeEmpty:!1,oneToManyArrayObjectMerge:!1,hardMergeEverything:!1,ignoreEverything:!1,concatInsteadOfMerging:!0,dedupeStringsInArrayValues:!1,mergeBoolsUsingOrNotAnd:!0,useNullAsExplicitFalse:!0},a=Object.assign(ot(u),n);if(a.ignoreKeys=I(a.ignoreKeys),a.hardMergeKeys=I(a.hardMergeKeys),function(t,e,r){function n(t){return null!=t}function o(t){return"boolean"===rt(t)}function i(t){return"string"===rt(t)}function u(t){return"Object"===rt(t)}var a=["any","anything","every","everything","all","whatever","whatevs"],c=Array.isArray;if(0===arguments.length)throw new Error("check-types-mini/checkTypes(): Missing all arguments!");if(1===arguments.length)throw new Error("check-types-mini/checkTypes(): Missing second argument!");var f=u(e)?e:{},s={ignoreKeys:[],acceptArrays:!1,acceptArraysIgnore:[],enforceStrictKeyset:!0,schema:{},msg:"check-types-mini/checkTypes()",optsVarName:"opts"},l=void 0;if(l=n(r)&&u(r)?Object.assign({},s,r):Object.assign({},s),!i(l.msg))throw new Error("check-types-mini/checkTypes(): opts.msg must be string! Currently it's: "+rt(l.msg)+", equal to "+JSON.stringify(l.msg,null,4));if(l.msg=l.msg.trim(),":"===l.msg[l.msg.length-1]&&(l.msg=l.msg.slice(0,l.msg.length-1)),!i(l.optsVarName))throw new Error("check-types-mini/checkTypes(): opts.optsVarName must be string! Currently it's: "+rt(l.optsVarName)+", equal to "+JSON.stringify(l.optsVarName,null,4));if(l.ignoreKeys=I(l.ignoreKeys),l.acceptArraysIgnore=I(l.acceptArraysIgnore),!c(l.ignoreKeys))throw new TypeError("check-types-mini/checkTypes(): opts.ignoreKeys should be an array, currently it's: "+rt(l.ignoreKeys));if(!o(l.acceptArrays))throw new TypeError("check-types-mini/checkTypes(): opts.acceptArrays should be a Boolean, currently it's: "+rt(l.acceptArrays));if(!c(l.acceptArraysIgnore))throw new TypeError("check-types-mini/checkTypes(): opts.acceptArraysIgnore should be an array, currently it's: "+rt(l.acceptArraysIgnore));if(!o(l.enforceStrictKeyset))throw new TypeError("check-types-mini/checkTypes(): opts.enforceStrictKeyset should be a Boolean, currently it's: "+rt(l.enforceStrictKeyset));if(Object.keys(l.schema).forEach(function(t){c(l.schema[t])||(l.schema[t]=[l.schema[t]]),l.schema[t]=l.schema[t].map(String).map(function(t){return t.toLowerCase()}).map(function(t){return t.trim()})}),l.enforceStrictKeyset)if(n(l.schema)&&Object.keys(l.schema).length>0){if(0!==Pt(Object.keys(t),Object.keys(f).concat(Object.keys(l.schema))).length)throw new TypeError(l.msg+": "+l.optsVarName+".enforceStrictKeyset is on and the following keys are not covered by schema and/or reference objects: "+JSON.stringify(Pt(Object.keys(t),Object.keys(f).concat(Object.keys(l.schema))),null,4))}else{if(!(n(f)&&Object.keys(f).length>0))throw new TypeError(l.msg+": Both "+l.optsVarName+".schema and reference objects are missing! We don't have anything to match the keys as you requested via opts.enforceStrictKeyset!");if(0!==Pt(Object.keys(t),Object.keys(f)).length)throw new TypeError(l.msg+": The input object has keys that are not covered by reference object: "+JSON.stringify(Pt(Object.keys(t),Object.keys(f)),null,4));if(0!==Pt(Object.keys(f),Object.keys(t)).length)throw new TypeError(l.msg+": The reference object has keys that are not present in the input object: "+JSON.stringify(Pt(Object.keys(f),Object.keys(t)),null,4))}Object.keys(t).forEach(function(e){if(n(l.schema)&&Object.prototype.hasOwnProperty.call(l.schema,e)){if(l.schema[e]=I(l.schema[e]).map(String).map(function(t){return t.toLowerCase()}),!oe(l.schema[e],a).length&&!Kt(l.schema[e],rt(t[e]).toLowerCase())){if(!c(t[e])||!l.acceptArrays)throw new TypeError(l.msg+": "+l.optsVarName+"."+e+" was customised to "+JSON.stringify(t[e],null,4)+" which is not among the allowed types in schema ("+l.schema[e]+") but "+rt(t[e]));for(var r=0,o=t[e].length;r<o;r++)if(!Kt(l.schema[e],rt(t[e][r]).toLowerCase()))throw new TypeError(l.msg+": "+l.optsVarName+"."+e+" is of type "+rt(t[e][r]).toLowerCase()+", but only the following are allowed in "+l.optsVarName+".schema: "+l.schema[e])}}else if(n(f)&&Object.prototype.hasOwnProperty.call(f,e)&&rt(t[e])!==rt(f[e])&&!Kt(l.ignoreKeys,e)){if(!l.acceptArrays||!c(t[e])||Kt(l.acceptArraysIgnore,e))throw new TypeError(l.msg+": "+l.optsVarName+"."+e+" was customised to "+JSON.stringify(t[e],null,4)+" which is not "+rt(f[e])+" but "+rt(t[e]));if(!t[e].every(function(t){return rt(t)===rt(f[e])}))throw new TypeError(l.msg+": "+l.optsVarName+"."+e+" was customised to be array, but not all of its elements are "+rt(f[e])+"-type")}})}(a,u,{msg:"object-merge-advanced/mergeAdvanced(): [THROW_ID_06]"}),X(o)){if(a.ignoreEverything&&!X(i))return o;if(a.hardMergeEverything&&!X(i))return i;if(!G(o))return G(i)?i:o;if(!X(i)||!G(i))return o;if(a.mergeArraysContainingStringsToBeEmpty&&(z(o)||z(i)))return[];for(var c=[],f=0,s=Math.max(o.length,i.length);f<s;f++)Q(o[f])&&Q(i[f])&&(a.mergeObjectsOnlyWhenKeysetMatches&&J(o[f],i[f])||!a.mergeObjectsOnlyWhenKeysetMatches)?c.push(Z(o[f],i[f],a)):!a.oneToManyArrayObjectMerge||1!==o.length&&1!==i.length?a.concatInsteadOfMerging?(f<o.length&&c.push(o[f]),f<i.length&&c.push(i[f])):(f<o.length&&c.push(o[f]),f<i.length&&!Kt(o,i[f])&&c.push(i[f])):c.push(1===o.length?Z(o[0],i[f],a):Z(o[f],i[0],a));a.dedupeStringsInArrayValues&&c.every(function(t){return Y(t)})&&(c=ke(c)),o=ot(c)}else{if(!Q(o))return Y(o)?a.ignoreEverything?o:a.hardMergeEverything?i:G(o)?(X(i)||Q(i)||Y(i))&&G(i)?i:o:null==i||q(i)?o:i:function(t){return"number"===rt(t)}(o)?a.ignoreEverything?o:a.hardMergeEverything?i:G(i)?i:o:q(o)?a.ignoreEverything?o:a.hardMergeEverything?i:q(i)?a.mergeBoolsUsingOrNotAnd?o||i:o&&i:null!=i?i:o:null===o?a.ignoreEverything?o:a.hardMergeEverything?i:null!=i?i:o:a.ignoreEverything?o:(a.hardMergeEverything,i);if(a.ignoreEverything&&Q(i)&&!Object.keys(o).some(function(t){return X(t)||Q(t)}))return Object.assign({},i,o);if(a.hardMergeEverything&&Q(i)&&!Object.keys(o).some(function(t){return X(t)||Q(t)}))return Object.assign({},o,i);if(!G(o))return X(i)||Q(i)||G(i)?i:o;if(X(i))return G(i)?i:o;if(!Q(i))return a.hardMergeEverything?i:o;Object.keys(i).forEach(function(t){o.hasOwnProperty(t)?e(t,a.ignoreKeys)?o[t]=Z(o[t],i[t],Object.assign({},a,{ignoreEverything:!0})):e(t,a.hardMergeKeys)?o[t]=Z(o[t],i[t],Object.assign({},a,{hardMergeEverything:!0})):o[t]=Z(o[t],i[t],a):o[t]=i[t]})}return o}var tt="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},et="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},rt=t(function(t,e){t.exports=function(){var t="function"==typeof Promise,e="object"===("undefined"==typeof self?"undefined":et(self))?self:tt,r="object"===("undefined"==typeof window?"undefined":et(window))&&"document"in window&&"navigator"in window&&"HTMLElement"in window,n="undefined"!=typeof Symbol,o="undefined"!=typeof Map,i="undefined"!=typeof Set,u="undefined"!=typeof WeakMap,a="undefined"!=typeof WeakSet,c="undefined"!=typeof DataView,f=n&&void 0!==Symbol.iterator,s=n&&void 0!==Symbol.toStringTag,l=i&&"function"==typeof Set.prototype.entries,y=o&&"function"==typeof Map.prototype.entries,p=l&&Object.getPrototypeOf((new Set).entries()),h=y&&Object.getPrototypeOf((new Map).entries()),g=f&&"function"==typeof Array.prototype[Symbol.iterator],d=g&&Object.getPrototypeOf([][Symbol.iterator]()),b=f&&"function"==typeof String.prototype[Symbol.iterator],_=b&&Object.getPrototypeOf(""[Symbol.iterator]()),v=8,m=-1;return function(n){var f=void 0===n?"undefined":et(n);if("object"!==f)return f;if(null===n)return"null";if(n===e)return"global";if(Array.isArray(n)&&(!1===s||!(Symbol.toStringTag in n)))return"Array";if(r){if(n===e.location)return"Location";if(n===e.document)return"Document";if(n===(e.navigator||{}).mimeTypes)return"MimeTypeArray";if(n===(e.navigator||{}).plugins)return"PluginArray";if(n instanceof e.HTMLElement&&"BLOCKQUOTE"===n.tagName)return"HTMLQuoteElement";if(n instanceof e.HTMLElement&&"TD"===n.tagName)return"HTMLTableDataCellElement";if(n instanceof e.HTMLElement&&"TH"===n.tagName)return"HTMLTableHeaderCellElement"}var l=s&&n[Symbol.toStringTag];if("string"==typeof l)return l;var y=Object.getPrototypeOf(n);if(y===RegExp.prototype)return"RegExp";if(y===Date.prototype)return"Date";if(t&&y===Promise.prototype)return"Promise";if(i&&y===Set.prototype)return"Set";if(o&&y===Map.prototype)return"Map";if(a&&y===WeakSet.prototype)return"WeakSet";if(u&&y===WeakMap.prototype)return"WeakMap";if(c&&y===DataView.prototype)return"DataView";if(o&&y===h)return"Map Iterator";if(i&&y===p)return"Set Iterator";if(g&&y===d)return"Array Iterator";if(b&&y===_)return"String Iterator";if(null===y)return"Object";return Object.prototype.toString.call(n).slice(v,m)}}()}),nt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ot=t(function(t,e){function r(t,e){return t.set(e[0],e[1]),t}function n(t,e){return t.add(e),t}function o(t,e,r,n){var o=-1,i=t?t.length:0;for(n&&i&&(r=t[++o]);++o<i;)r=e(r,t[o],o,t);return r}function i(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function u(t){var e=-1,r=Array(t.size);return t.forEach(function(t,n){r[++e]=[n,t]}),r}function a(t,e){return function(r){return t(e(r))}}function c(t){var e=-1,r=Array(t.size);return t.forEach(function(t){r[++e]=t}),r}function f(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function s(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function l(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}function y(t){this.__data__=new s(t)}function p(t,e){var r=zt(t)||function(t){return function(t){return function(t){return!!t&&"object"==(void 0===t?"undefined":nt(t))}(t)&&A(t)}(t)&&jt.call(t,"callee")&&(!Mt.call(t,"callee")||wt.call(t)==K)}(t)?function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}(t.length,String):[],n=r.length,o=!!n;for(var i in t)!e&&!jt.call(t,i)||o&&("length"==i||function(t,e){return!!(e=null==e?x:e)&&("number"==typeof t||at.test(t))&&t>-1&&t%1==0&&t<e}(i,n))||r.push(i);return r}function h(t,e,r){var n=t[e];jt.call(t,e)&&S(n,r)&&(void 0!==r||e in t)||(t[e]=r)}function g(t,e){for(var r=t.length;r--;)if(S(t[r][0],e))return r;return-1}function d(t,e,a,f,s,l,p){var g;if(f&&(g=l?f(t,s,l,p):f(t)),void 0!==g)return g;if(!T(t))return t;var b=zt(t);if(b){if(g=function(t){var e=t.length,r=t.constructor(e);e&&"string"==typeof t[0]&&jt.call(t,"index")&&(r.index=t.index,r.input=t.input);return r}(t),!e)return function(t,e){var r=-1,n=t.length;e||(e=Array(n));for(;++r<n;)e[r]=t[r];return e}(t,g)}else{var m=Jt(t),j=m==W||m==F;if(Qt(t))return function(t,e){if(e)return t.slice();var r=new t.constructor(t.length);return t.copy(r),r}(t,e);if(m==D||m==K||j&&!l){if(i(t))return l?t:{};if(g=function(t){return"function"!=typeof t.constructor||w(t)?{}:function(t){return T(t)?kt(t):{}}(Tt(t))}(j?{}:t),!e)return function(t,e){return v(t,qt(t),e)}(t,function(t,e){return t&&v(e,k(e),t)}(g,t))}else{if(!ct[m])return l?t:{};g=function(t,e,i,a){var f=t.constructor;switch(e){case U:return _(t);case N:case P:return new f(+t);case q:return function(t,e){var r=e?_(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}(t,a);case J:case z:case Q:case X:case Y:case Z:case et:case rt:case ot:return function(t,e){var r=e?_(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}(t,a);case V:return function(t,e,n){return o(e?n(u(t),!0):u(t),r,new t.constructor)}(t,a,i);case $:case C:return new f(t);case B:return function(t){var e=new t.constructor(t.source,it.exec(t));return e.lastIndex=t.lastIndex,e}(t);case H:return function(t,e,r){return o(e?r(c(t),!0):c(t),n,new t.constructor)}(t,a,i);case L:return function(t){return Ut?Object(Ut.call(t)):{}}(t)}}(t,m,d,e)}}p||(p=new y);var O=p.get(t);if(O)return O;if(p.set(t,g),!b)var S=a?function(t){return function(t,e,r){var n=e(t);return zt(t)?n:function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t}(n,r(t))}(t,k,qt)}(t):k(t);return function(t,e){for(var r=-1,n=t?t.length:0;++r<n&&!1!==e(t[r],r,t););}(S||t,function(r,n){S&&(r=t[n=r]),h(g,n,d(r,e,a,f,n,t,p))}),g}function b(t){if(!T(t)||function(t){return!!vt&&vt in t}(t))return!1;return(E(t)||i(t)?Ot:ut).test(O(t))}function _(t){var e=new t.constructor(t.byteLength);return new Et(e).set(new Et(t)),e}function v(t,e,r,n){r||(r={});for(var o=-1,i=e.length;++o<i;){var u=e[o],a=n?n(r[u],t[u],u,r,t):void 0;h(r,u,void 0===a?t[u]:a)}return r}function m(t,e){var r=t.__data__;return function(t){var e=void 0===t?"undefined":nt(t);return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}(e)?r["string"==typeof e?"string":"hash"]:r.map}function j(t,e){var r=function(t,e){return null==t?void 0:t[e]}(t,e);return b(r)?r:void 0}function w(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||bt)}function O(t){if(null!=t){try{return mt.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function S(t,e){return t===e||t!=t&&e!=e}function A(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=x}(t.length)&&!E(t)}function E(t){var e=T(t)?wt.call(t):"";return e==W||e==F}function T(t){var e=void 0===t?"undefined":nt(t);return!!t&&("object"==e||"function"==e)}function k(t){return A(t)?p(t):function(t){if(!w(t))return Nt(t);var e=[];for(var r in Object(t))jt.call(t,r)&&"constructor"!=r&&e.push(r);return e}(t)}var M=200,I="__lodash_hash_undefined__",x=9007199254740991,K="[object Arguments]",N="[object Boolean]",P="[object Date]",W="[object Function]",F="[object GeneratorFunction]",V="[object Map]",$="[object Number]",D="[object Object]",R="[object Promise]",B="[object RegExp]",H="[object Set]",C="[object String]",L="[object Symbol]",G="[object WeakMap]",U="[object ArrayBuffer]",q="[object DataView]",J="[object Float32Array]",z="[object Float64Array]",Q="[object Int8Array]",X="[object Int16Array]",Y="[object Int32Array]",Z="[object Uint8Array]",et="[object Uint8ClampedArray]",rt="[object Uint16Array]",ot="[object Uint32Array]",it=/\w*$/,ut=/^\[object .+?Constructor\]$/,at=/^(?:0|[1-9]\d*)$/,ct={};ct[K]=ct["[object Array]"]=ct[U]=ct[q]=ct[N]=ct[P]=ct[J]=ct[z]=ct[Q]=ct[X]=ct[Y]=ct[V]=ct[$]=ct[D]=ct[B]=ct[H]=ct[C]=ct[L]=ct[Z]=ct[et]=ct[rt]=ct[ot]=!0,ct["[object Error]"]=ct[W]=ct[G]=!1;var ft="object"==nt(tt)&&tt&&tt.Object===Object&&tt,st="object"==("undefined"==typeof self?"undefined":nt(self))&&self&&self.Object===Object&&self,lt=ft||st||Function("return this")(),yt=e&&!e.nodeType&&e,pt=yt&&t&&!t.nodeType&&t,ht=pt&&pt.exports===yt,gt=Array.prototype,dt=Function.prototype,bt=Object.prototype,_t=lt["__core-js_shared__"],vt=function(){var t=/[^.]+$/.exec(_t&&_t.keys&&_t.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),mt=dt.toString,jt=bt.hasOwnProperty,wt=bt.toString,Ot=RegExp("^"+mt.call(jt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),St=ht?lt.Buffer:void 0,At=lt.Symbol,Et=lt.Uint8Array,Tt=a(Object.getPrototypeOf,Object),kt=Object.create,Mt=bt.propertyIsEnumerable,It=gt.splice,xt=Object.getOwnPropertySymbols,Kt=St?St.isBuffer:void 0,Nt=a(Object.keys,Object),Pt=j(lt,"DataView"),Wt=j(lt,"Map"),Ft=j(lt,"Promise"),Vt=j(lt,"Set"),$t=j(lt,"WeakMap"),Dt=j(Object,"create"),Rt=O(Pt),Bt=O(Wt),Ht=O(Ft),Ct=O(Vt),Lt=O($t),Gt=At?At.prototype:void 0,Ut=Gt?Gt.valueOf:void 0;f.prototype.clear=function(){this.__data__=Dt?Dt(null):{}},f.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},f.prototype.get=function(t){var e=this.__data__;if(Dt){var r=e[t];return r===I?void 0:r}return jt.call(e,t)?e[t]:void 0},f.prototype.has=function(t){var e=this.__data__;return Dt?void 0!==e[t]:jt.call(e,t)},f.prototype.set=function(t,e){return this.__data__[t]=Dt&&void 0===e?I:e,this},s.prototype.clear=function(){this.__data__=[]},s.prototype.delete=function(t){var e=this.__data__,r=g(e,t);return!(r<0||(r==e.length-1?e.pop():It.call(e,r,1),0))},s.prototype.get=function(t){var e=this.__data__,r=g(e,t);return r<0?void 0:e[r][1]},s.prototype.has=function(t){return g(this.__data__,t)>-1},s.prototype.set=function(t,e){var r=this.__data__,n=g(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},l.prototype.clear=function(){this.__data__={hash:new f,map:new(Wt||s),string:new f}},l.prototype.delete=function(t){return m(this,t).delete(t)},l.prototype.get=function(t){return m(this,t).get(t)},l.prototype.has=function(t){return m(this,t).has(t)},l.prototype.set=function(t,e){return m(this,t).set(t,e),this},y.prototype.clear=function(){this.__data__=new s},y.prototype.delete=function(t){return this.__data__.delete(t)},y.prototype.get=function(t){return this.__data__.get(t)},y.prototype.has=function(t){return this.__data__.has(t)},y.prototype.set=function(t,e){var r=this.__data__;if(r instanceof s){var n=r.__data__;if(!Wt||n.length<M-1)return n.push([t,e]),this;r=this.__data__=new l(n)}return r.set(t,e),this};var qt=xt?a(xt,Object):function(){return[]},Jt=function(t){return wt.call(t)};(Pt&&Jt(new Pt(new ArrayBuffer(1)))!=q||Wt&&Jt(new Wt)!=V||Ft&&Jt(Ft.resolve())!=R||Vt&&Jt(new Vt)!=H||$t&&Jt(new $t)!=G)&&(Jt=function(t){var e=wt.call(t),r=e==D?t.constructor:void 0,n=r?O(r):void 0;if(n)switch(n){case Rt:return q;case Bt:return V;case Ht:return R;case Ct:return H;case Lt:return G}return e});var zt=Array.isArray,Qt=Kt||function(){return!1};t.exports=function(t){return d(t,!0,!0)}}),it="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ut="function"==typeof Symbol&&"symbol"===it(Symbol.iterator)?function(t){return void 0===t?"undefined":it(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":void 0===t?"undefined":it(t)},at=require("matcher"),ct=Array.isArray,ft="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},st=1/0,lt=9007199254740991,yt=1.7976931348623157e308,pt=NaN,ht="[object Arguments]",gt="[object Function]",dt="[object GeneratorFunction]",bt="[object String]",_t="[object Symbol]",vt=/^\s+|\s+$/g,mt=/^[-+]0x[0-9a-f]+$/i,jt=/^0b[01]+$/i,wt=/^0o[0-7]+$/i,Ot=/^(?:0|[1-9]\d*)$/,St=parseInt,At=Object.prototype,Et=At.hasOwnProperty,Tt=At.toString,kt=At.propertyIsEnumerable,Mt=function(t,e){return function(r){return t(e(r))}}(Object.keys,Object),It=Math.max,xt=Array.isArray,Kt=function(t,e,f,s){t=u(t)?t:function(t){return t?n(t,function(t){return u(t)?o(t):i(t)}(t)):[]}(t),f=f&&!s?function(t){var e=function(t){if(!t)return 0===t?t:0;if((t=function(t){if("number"==typeof t)return t;if(function(t){return"symbol"==(void 0===t?"undefined":ft(t))||c(t)&&Tt.call(t)==_t}(t))return pt;if(a(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=a(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(vt,"");var r=jt.test(t);return r||wt.test(t)?St(t.slice(2),r?2:8):mt.test(t)?pt:+t}(t))===st||t===-st){var e=t<0?-1:1;return e*yt}return t==t?t:0}(t),r=e%1;return e==e?r?e-r:e:0}(f):0;var l=t.length;return f<0&&(f=It(l+f,0)),function(t){return"string"==typeof t||!xt(t)&&c(t)&&Tt.call(t)==bt}(t)?f<=l&&t.indexOf(e,f)>-1:!!l&&function(t,e,n){if(e!=e)return function(t,e,r,n){for(var o=t.length,i=r+(n?1:-1);n?i--:++i<o;)if(e(t[i],i,t))return i;return-1}(t,r,n);for(var o=n-1,i=t.length;++o<i;)if(t[o]===e)return o;return-1}(t,e,f)>-1},Nt=Array.prototype.splice,Pt=function(t,e){return t&&t.length&&e&&e.length?y(t,e):t},Wt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ft="__lodash_hash_undefined__",Vt=9007199254740991,$t="[object Function]",Dt="[object GeneratorFunction]",Rt=/^\[object .+?Constructor\]$/,Bt="object"==Wt(tt)&&tt&&tt.Object===Object&&tt,Ht="object"==("undefined"==typeof self?"undefined":Wt(self))&&self&&self.Object===Object&&self,Ct=Bt||Ht||Function("return this")(),Lt=Array.prototype,Gt=Function.prototype,Ut=Object.prototype,qt=Ct["__core-js_shared__"],Jt=function(){var t=/[^.]+$/.exec(qt&&qt.keys&&qt.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),zt=Gt.toString,Qt=Ut.hasOwnProperty,Xt=Ut.toString,Yt=RegExp("^"+zt.call(Qt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Zt=Lt.splice,te=Math.max,ee=Math.min,re=T(Ct,"Map"),ne=T(Object,"create");v.prototype.clear=function(){this.__data__=ne?ne(null):{}},v.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},v.prototype.get=function(t){var e=this.__data__;if(ne){var r=e[t];return r===Ft?void 0:r}return Qt.call(e,t)?e[t]:void 0},v.prototype.has=function(t){var e=this.__data__;return ne?void 0!==e[t]:Qt.call(e,t)},v.prototype.set=function(t,e){return this.__data__[t]=ne&&void 0===e?Ft:e,this},m.prototype.clear=function(){this.__data__=[]},m.prototype.delete=function(t){var e=this.__data__,r=O(e,t);return!(r<0||(r==e.length-1?e.pop():Zt.call(e,r,1),0))},m.prototype.get=function(t){var e=this.__data__,r=O(e,t);return r<0?void 0:e[r][1]},m.prototype.has=function(t){return O(this.__data__,t)>-1},m.prototype.set=function(t,e){var r=this.__data__,n=O(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},j.prototype.clear=function(){this.__data__={hash:new v,map:new(re||m),string:new v}},j.prototype.delete=function(t){return E(this,t).delete(t)},j.prototype.get=function(t){return E(this,t).get(t)},j.prototype.has=function(t){return E(this,t).has(t)},j.prototype.set=function(t,e){return E(this,t).set(t,e),this},w.prototype.add=w.prototype.push=function(t){return this.__data__.set(t,Ft),this},w.prototype.has=function(t){return this.__data__.has(t)};var oe=function(t,e){return e=te(void 0===e?t.length-1:e,0),function(){for(var r=arguments,n=-1,o=te(r.length-e,0),i=Array(o);++n<o;)i[n]=r[e+n];n=-1;for(var u=Array(e+1);++n<e;)u[n]=r[n];return u[e]=i,function(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}(t,this,u)}}(function(t){var e=g(t,A);return e.length&&e[0]===t[0]?function(t,e,r){for(var n=r?h:p,o=t[0].length,i=t.length,u=i,a=Array(i),c=1/0,f=[];u--;){var s=t[u];u&&e&&(s=g(s,b(e))),c=ee(s.length,c),a[u]=!r&&(e||o>=120&&s.length>=120)?new w(u&&s):void 0}s=t[0];var l=-1,y=a[0];t:for(;++l<o&&f.length<c;){var d=s[l],v=e?e(d):d;if(d=r||0!==d?d:0,!(y?_(y,v):n(f,v,r))){for(u=i;--u;){var m=a[u];if(!(m?_(m,v):n(t[u],v,r)))continue t}y&&y.push(v),f.push(d)}}return f}(e):[]}),ie="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ue=200,ae="__lodash_hash_undefined__",ce="[object Function]",fe="[object GeneratorFunction]",se=/^\[object .+?Constructor\]$/,le="object"==ie(tt)&&tt&&tt.Object===Object&&tt,ye="object"==("undefined"==typeof self?"undefined":ie(self))&&self&&self.Object===Object&&self,pe=le||ye||Function("return this")(),he=Array.prototype,ge=Function.prototype,de=Object.prototype,be=pe["__core-js_shared__"],_e=function(){var t=/[^.]+$/.exec(be&&be.keys&&be.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),ve=ge.toString,me=de.hasOwnProperty,je=de.toString,we=RegExp("^"+ve.call(me).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Oe=he.splice,Se=C(pe,"Map"),Ae=C(pe,"Set"),Ee=C(Object,"create");F.prototype.clear=function(){this.__data__=Ee?Ee(null):{}},F.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},F.prototype.get=function(t){var e=this.__data__;if(Ee){var r=e[t];return r===ae?void 0:r}return me.call(e,t)?e[t]:void 0},F.prototype.has=function(t){var e=this.__data__;return Ee?void 0!==e[t]:me.call(e,t)},F.prototype.set=function(t,e){return this.__data__[t]=Ee&&void 0===e?ae:e,this},V.prototype.clear=function(){this.__data__=[]},V.prototype.delete=function(t){var e=this.__data__,r=R(e,t);return!(r<0||(r==e.length-1?e.pop():Oe.call(e,r,1),0))},V.prototype.get=function(t){var e=this.__data__,r=R(e,t);return r<0?void 0:e[r][1]},V.prototype.has=function(t){return R(this.__data__,t)>-1},V.prototype.set=function(t,e){var r=this.__data__,n=R(r,t);return n<0?r.push([t,e]):r[n][1]=e,this},$.prototype.clear=function(){this.__data__={hash:new F,map:new(Se||V),string:new F}},$.prototype.delete=function(t){return H(this,t).delete(t)},$.prototype.get=function(t){return H(this,t).get(t)},$.prototype.has=function(t){return H(this,t).has(t)},$.prototype.set=function(t,e){return H(this,t).set(t,e),this},D.prototype.add=D.prototype.push=function(t){return this.__data__.set(t,ae),this},D.prototype.has=function(t){return this.__data__.has(t)};var Te=Ae&&1/W(new Ae([,-0]))[1]==1/0?function(t){return new Ae(t)}:function(){},ke=function(t){return t&&t.length?function(t,e,r){var n=-1,o=x,i=t.length,u=!0,a=[],c=a;if(r)u=!1,o=K;else if(i>=ue){var f=e?null:Te(t);if(f)return W(f);u=!1,o=P,c=new D}else c=e?[]:a;t:for(;++n<i;){var s=t[n],l=e?e(s):s;if(s=r||0!==s?s:0,u&&l==l){for(var y=c.length;y--;)if(c[y]===l)continue t;e&&c.push(l),a.push(s)}else o(c,l,r)||(c!==a&&c.push(l),a.push(s))}return a}(t):[]},Me="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ie="[object Object]",xe=Function.prototype,Ke=Object.prototype,Ne=xe.toString,Pe=Ke.hasOwnProperty,We=Ne.call(Object),Fe=Ke.toString,Ve=function(t,e){return function(r){return t(e(r))}}(Object.getPrototypeOf,Object),$e=function(t){if(!function(t){return!!t&&"object"==(void 0===t?"undefined":Me(t))}(t)||Fe.call(t)!=Ie||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=Ve(t);if(null===e)return!0;var r=Pe.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&Ne.call(r)==We},De=function(t,e,r){if(!Array.isArray(t))throw new TypeError(String(t)+" is not an array. The first argument of array-includes-all must be an array.");if(!Array.isArray(e))throw new TypeError(String(e)+" is not an array. The second argument of array-includes-all must be an array.");if(0===e.length)throw new RangeError("The second argument of array-includes-all must include at least one value, but recieved an empty array.");return 0!==t.length&&e.every(function(e){return t.includes(e,r)})},Re="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};return Z});
