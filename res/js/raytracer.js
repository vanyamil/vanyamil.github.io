(window.webpackJsonp=window.webpackJsonp||[]).push([[4],[,,,,function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(0),i=n.n(r);function a(t){return i.a.createElement("div",{id:"react-root"},i.a.createElement("nav",{className:"navbar bg-dark navbar-dark fixed-top navbar-expand-md"},i.a.createElement("a",{className:"navbar-brand",href:"#"},"Ivan M"),i.a.createElement("ul",{className:"navbar-nav"},i.a.createElement("li",{className:"nav-item"},i.a.createElement("a",{className:"nav-link",href:"/"},"Home")),i.a.createElement("li",{className:"nav-item"},i.a.createElement("a",{className:"nav-link",href:"/orbitsim"},"Space Elevator")),i.a.createElement("li",{className:"nav-item"},i.a.createElement("a",{className:"nav-link",href:"/raytracer"},"Ray Tracer")))),i.a.createElement("div",{className:"container-fluid",style:{marginTop:"80px"}},t.children))}},function(t,e,n){"use strict";var r,i,a,s,o;if("undefined"==typeof window||"function"!=typeof MessageChannel){var l=null,u=null,c=function(){if(null!==l)try{var t=e.unstable_now();l(!0,t),l=null}catch(t){throw setTimeout(c,0),t}},h=Date.now();e.unstable_now=function(){return Date.now()-h},r=function(t){null!==l?setTimeout(r,0,t):(l=t,setTimeout(c,0))},i=function(t,e){u=setTimeout(t,e)},a=function(){clearTimeout(u)},s=function(){return!1},o=e.unstable_forceFrameRate=function(){}}else{var f=window.performance,m=window.Date,y=window.setTimeout,v=window.clearTimeout;if("undefined"!=typeof console){var d=window.cancelAnimationFrame;"function"!=typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),"function"!=typeof d&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")}if("object"==typeof f&&"function"==typeof f.now)e.unstable_now=function(){return f.now()};else{var p=m.now();e.unstable_now=function(){return m.now()-p}}var b=!1,w=null,g=-1,k=5,x=0;s=function(){return e.unstable_now()>=x},o=function(){},e.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"):k=0<t?Math.floor(1e3/t):5};var E=new MessageChannel,_=E.port2;E.port1.onmessage=function(){if(null!==w){var t=e.unstable_now();x=t+k;try{w(!0,t)?_.postMessage(null):(b=!1,w=null)}catch(t){throw _.postMessage(null),t}}else b=!1},r=function(t){w=t,b||(b=!0,_.postMessage(null))},i=function(t,n){g=y((function(){t(e.unstable_now())}),n)},a=function(){v(g),g=-1}}function M(t,e){var n=t.length;t.push(e);t:for(;;){var r=n-1>>>1,i=t[r];if(!(void 0!==i&&0<j(i,e)))break t;t[r]=e,t[n]=i,n=r}}function O(t){return void 0===(t=t[0])?null:t}function S(t){var e=t[0];if(void 0!==e){var n=t.pop();if(n!==e){t[0]=n;t:for(var r=0,i=t.length;r<i;){var a=2*(r+1)-1,s=t[a],o=a+1,l=t[o];if(void 0!==s&&0>j(s,n))void 0!==l&&0>j(l,s)?(t[r]=l,t[o]=n,r=o):(t[r]=s,t[a]=n,r=a);else{if(!(void 0!==l&&0>j(l,n)))break t;t[r]=l,t[o]=n,r=o}}}return e}return null}function j(t,e){var n=t.sortIndex-e.sortIndex;return 0!==n?n:t.id-e.id}var N=[],P=[],T=1,I=null,R=3,z=!1,A=!1,C=!1;function B(t){for(var e=O(P);null!==e;){if(null===e.callback)S(P);else{if(!(e.startTime<=t))break;S(P),e.sortIndex=e.expirationTime,M(N,e)}e=O(P)}}function D(t){if(C=!1,B(t),!A)if(null!==O(N))A=!0,r(F);else{var e=O(P);null!==e&&i(D,e.startTime-t)}}function F(t,n){A=!1,C&&(C=!1,a()),z=!0;var r=R;try{for(B(n),I=O(N);null!==I&&(!(I.expirationTime>n)||t&&!s());){var o=I.callback;if(null!==o){I.callback=null,R=I.priorityLevel;var l=o(I.expirationTime<=n);n=e.unstable_now(),"function"==typeof l?I.callback=l:I===O(N)&&S(N),B(n)}else S(N);I=O(N)}if(null!==I)var u=!0;else{var c=O(P);null!==c&&i(D,c.startTime-n),u=!1}return u}finally{I=null,R=r,z=!1}}function q(t){switch(t){case 1:return-1;case 2:return 250;case 5:return 1073741823;case 4:return 1e4;default:return 5e3}}var L=o;e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(t){t.callback=null},e.unstable_continueExecution=function(){A||z||(A=!0,r(F))},e.unstable_getCurrentPriorityLevel=function(){return R},e.unstable_getFirstCallbackNode=function(){return O(N)},e.unstable_next=function(t){switch(R){case 1:case 2:case 3:var e=3;break;default:e=R}var n=R;R=e;try{return t()}finally{R=n}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=L,e.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var n=R;R=t;try{return e()}finally{R=n}},e.unstable_scheduleCallback=function(t,n,s){var o=e.unstable_now();if("object"==typeof s&&null!==s){var l=s.delay;l="number"==typeof l&&0<l?o+l:o,s="number"==typeof s.timeout?s.timeout:q(t)}else s=q(t),l=o;return t={id:T++,callback:n,priorityLevel:t,startTime:l,expirationTime:s=l+s,sortIndex:-1},l>o?(t.sortIndex=l,M(P,t),null===O(N)&&t===O(P)&&(C?a():C=!0,i(D,l-o))):(t.sortIndex=s,M(N,t),A||z||(A=!0,r(F))),t},e.unstable_shouldYield=function(){var t=e.unstable_now();B(t);var n=O(N);return n!==I&&null!==I&&null!==n&&null!==n.callback&&n.startTime<=t&&n.expirationTime<I.expirationTime||s()},e.unstable_wrapCallback=function(t){var e=R;return function(){var n=R;R=e;try{return t.apply(this,arguments)}finally{R=n}}}},function(t,e,n){"use strict";var r=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;function s(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(t){r[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var n,o,l=s(t),u=1;u<arguments.length;u++){for(var c in n=Object(arguments[u]))i.call(n,c)&&(l[c]=n[c]);if(r){o=r(n);for(var h=0;h<o.length;h++)a.call(n,o[h])&&(l[o[h]]=n[o[h]])}}return l}},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";t.exports=n(5)},,,,,,,,function(t,e,n){t.exports=n(20)},,,,function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return ut}));var r=n(0),i=n.n(r),a=n(3),s=n.n(a),o=n(4),l=n(2),u=n.n(l),c=(n(17),n(1)),h=n.n(c);function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var m=function(){function t(e,n,r,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),void 0===e?(this.x=0,this.y=0,this.z=0,this.saveMag=!1):this.set(e,n,r,i)}var e,n,r;return e=t,(n=[{key:"setSaving",value:function(t){return t?this._saveMags():this.saveMag=!1,this}},{key:"setV",value:function(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.saveMag=t.saveMag,this.saveMag&&(this._mag=t._mag,this._magSq=t._magSq),this}},{key:"set",value:function(e,n,r,i){return e instanceof t?this.set(e.x,e.y,e.z,e.saveMag):e instanceof Array?this.set(e[0],e[1],e[2],!1):(this.x=e||0,this.y=n||0,this.z=r||0,i="boolean"==typeof i?i:this.saveMag||!1,this.saveMag=!1,i&&this._saveMags(),this)}},{key:"_saveMags",value:function(){this.saveMag=!1,this._magSq=this.magSq(),this._mag=this.mag(),this.saveMag=!0}},{key:"copy",value:function(){return(new t).setV(this)}},{key:"dot",value:function(t){return this.x*t.x+this.y*t.y+this.z*t.z}},{key:"magSq",value:function(){return this.saveMag&&void 0!==this._magSq?this._magSq:this.dot(this)}},{key:"mag",value:function(){return this.saveMag&&void 0!==this._mag?this._mag:Math.sqrt(this.magSq())}},{key:"setMag",value:function(t){var e=this.mag();return this.saveMag=!1,this.mult(t/e),this.saveMag=!0,this._mag=t,this._magSq=t*t,this}},{key:"add",value:function(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.saveMag&&this._saveMags(),this}},{key:"scaleAdd",value:function(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.saveMag&&this._saveMags(),this}},{key:"sub",value:function(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.saveMag&&this._saveMags(),this}},{key:"mult",value:function(t){return this.x*=t,this.y*=t,this.z*=t,this.saveMag&&(this._magSq*=t*t,this._mag*=t),this}},{key:"multWise",value:function(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.saveMag&&this._saveMags(),this}},{key:"div",value:function(t){return this.mult(1/t)}},{key:"normalize",value:function(){var t=this.mag();return this.saveMag=!1,this.div(t),this.saveMag=!0,this._mag=1,this._magSq=1,this}},{key:"reflect",value:function(t){var e=2*this.dot(t);return t.copy().mult(e).sub(this)}},{key:"cross",value:function(e){return new t(this.y*e.z-this.z*e.y,this.z*e.x-this.x*e.z,this.x*e.y-this.y*e.x)}}])&&f(e.prototype,n),r&&f(e,r),t}();function y(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}m.sub=function(t,e){return t.copy().sub(e)},m.mult=function(t,e){return t.copy().mult(e)};var d=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.pos=new m,this.dir=new m,this.lookAt=new m,this.set(e,n,r),this.dof={},this.setDOF(this.lookAt.copy(),this.dir.copy(),1,1)}var e,n,r;return e=t,(n=[{key:"set",value:function(t,e,n){var r,i;(r=this.lookAt).set.apply(r,y(e)),(i=this.pos).set.apply(i,y(t)),this.dir.set(this.lookAt).sub(this.pos).normalize(),this.right=new m(n).cross(this.dir).normalize(),this.up=this.dir.cross(this.right).normalize()}},{key:"setScreen",value:function(t,e,n){this.width=t,this.width2=t/2,this.height=e,this.height2=e/2,this.fovy=n;var r=Math.tan(n*Math.PI/360);this.vToScreen=this.dir.copy().setMag(this.height2/r)}},{key:"dofDistToFocus",value:function(t){var e=m.sub(this.dof.p,t.src);return this.dof.n.dot(e)/this.dof.n.dot(t.dir)}},{key:"modifyRayDOF",value:function(t,e){var n=new m;e.at(this.dofDistToFocus(e),n)&&(e.src.scaleAdd(this.right,this.dof.samples[t][0]).scaleAdd(this.up,this.dof.samples[t][1]),e.dir.set(n).sub(e.src).normalize())}},{key:"setDOF",value:function(t,e,n,r){t&&(this.dof.p=new m(t)),e&&(this.dof.n=new m(e),this.dof.n.normalize()),this.dof.a=n,this.setDOFSamples(Math.max(r,1))}},{key:"setDOFSamples",value:function(t){for(this.dof.samples=[[0,0]];--t>0;)this.dof.samples.push([(Math.random()-.5)*this.dof.a,(Math.random()-.5)*this.dof.a])}},{key:"generateRay",value:function(t,e,n,r){if(t<0||e<0||t>this.width||e>this.height)return!1;t-=this.width2,e=-(e-=this.height2);var i=this.vToScreen.copy();return i.add(m.mult(this.right,t)),i.add(m.mult(this.up,e)),r.set(this.pos,i),r.resetBounds(),this.modifyRayDOF(n,r),!0}}])&&v(e.prototype,n),r&&v(e,r),t}();function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function b(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function w(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function k(t,e,n){return e&&g(t.prototype,e),n&&g(t,n),t}function x(t,e){return!e||"object"!==p(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function E(t){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function _(t,e){return(_=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var M=function(t){function e(t){var n,r;(w(this,e),n=x(this,E(e).call(this)),t instanceof Array)?(r=n).setRGB255.apply(r,b(t)):n.setRGB255(t,t,t);return n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_(t,e)}(e,t),k(e,[{key:"setRGB255",value:function(t,e,n){return this.setRGB(t/255,e/255,n/255)}},{key:"setRGB",value:function(t,e,n){return this.set(t,e,n,!1)}},{key:"limit",value:function(){this.x>1&&(this.x=1),this.y>1&&(this.y=1),this.z>1&&(this.z=1)}},{key:"getFinal",value:function(){return this.limit(),[255*this.x,255*this.y,255*this.z]}}]),e}(m),O=function(){function t(e){w(this,t),this.setDiffuse(e),this.specularEnabled=!1,this.reflectEnabled=!1,this.refractEnabled=!1}return k(t,[{key:"setDiffuse",value:function(t){this.diffuse=new M(t)}},{key:"setSpecular",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:255;this.specularEnabled=!0,this.specular=new M(e),this.specExp=t}},{key:"setReflect",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:255;this.reflectEnabled=!0,this.reflect=new M(t)}},{key:"setRefract",value:function(t,e){this.refractEnabled=!0,this.refract=new M(t),this.refrExp=e}}]),t}(),S=function t(e,n){w(this,t),this.pos=new m(e),this.c=new M(n)};function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var N=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.src=new m,this.dir=new m,this.set(e,n),this.resetBounds()}var e,n,r;return e=t,(n=[{key:"set",value:function(t,e){this.src.set(t),this.dir.set(e),this.dir.normalize()}},{key:"setOther",value:function(t){this.src.setV(t.src),this.dir.setV(t.dir),this.setBounds(t.min,t.max)}},{key:"copy",value:function(){var e=new t(this.src,this.dir);return e.setBounds(this.min,this.max),e}},{key:"setMin",value:function(t){this.min=Math.max(0,t)}},{key:"setMax",value:function(t){this.max=Math.max(this.min,t)}},{key:"setBounds",value:function(t,e){this.setMin(t),this.setMax(e)}},{key:"setDepth",value:function(t){this.depth=t}},{key:"resetBounds",value:function(){this.setBounds(1e-5,1/0)}},{key:"at",value:function(t,e){return!(!(e instanceof m)||t<this.min||t>this.max||(e.setV(this.dir).mult(t).add(this.src),0))}},{key:"toString",value:function(){return src.toString()+" "+dir.toString()}}])&&j(e.prototype,n),r&&j(e,r),t}();function P(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var T=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.material=null,this.p=new m(0,0,0,!0),this.n=new m(1,0,0,!0),this.reset()}var e,n,r;return e=t,(n=[{key:"setIntersection",value:function(t,e,n,r){this.connects=!0,this.t=t,this.p.setV(e),this.n.setV(n).normalize(),this.material=r}},{key:"setOther",value:function(t){this.setIntersection(t.t,t.p,t.n,t.material)}},{key:"reset",value:function(){this.connects=!1,this.t=1/0}}])&&P(e.prototype,n),r&&P(e,r),t}();function I(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var R=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.materials={},this.lights=[],this.setAmbient([0,0,0]),this.setBG([0,0,0]),this.setSamples(1),this.reflDepth=0,this.lastX=0,this.lastY=0,this.shadowIR=new T}var e,n,r;return e=t,(n=[{key:"setSamples",value:function(t){for(this.samples=[[.5,.5]];--t>0;)this.samples.push([Math.random(),Math.random()])}},{key:"setCamera",value:function(t){this.cam=t}},{key:"setRootNode",value:function(t){this.root=t}},{key:"setBG",value:function(t){this.bg=new M(t)}},{key:"setAmbient",value:function(t){this.ambient=new M(t)}},{key:"addLight",value:function(t){this.lights.push(t)}},{key:"addMaterial",value:function(t){this.materials[t.name]=t}},{key:"lighting",value:function(t,e){var n=new N,r=t.dir.reflect(e.n);r.mult(-1);var i=new M([0,0,0]);if(e.material.reflectEnabled&&t.depth>0){var a=new N(e.p,r),s=new T;a.setDepth(t.depth-1),i.add(this.getColor(a,s)),i.multWise(e.material.reflect)}else i.add(e.material.diffuse),i.multWise(this.ambient);return this.lights.forEach((function(t){var a=t.pos.copy().sub(e.p),s=a.mag();if(1!=s&&a.div(s),n.set(e.p,a),n.setBounds(1e-5,s),this.shadowIR.reset(),!this.root.intersects(n,this.shadowIR)){var o=Math.max(0,e.n.dot(a));if(!(o<=0)){var l=e.material.diffuse.copy();if(l.multWise(t.c),l.mult(o),i.add(l),e.material.specularEnabled){if((o=Math.max(0,r.dot(a)))<=0)return;(l=e.material.specular.copy()).multWise(t.c),l.mult(Math.pow(o,e.material.specExp)),i.add(l)}}}}),this),i.getFinal()}},{key:"getColor",value:function(t,e){return e.reset(),this.root.intersects(t,e)?new M(this.lighting(t,e)):this.bg}},{key:"getPixel",value:function(t,e,n,r){for(var i=new M,a=this.cam.dof.samples.length,s=this.samples.length,o=0;o<s;o++)for(var l=this.samples[o][0],u=this.samples[o][1],c=0;c<a;c++){if(!this.cam.generateRay(t+l,e+u,c,n))return void console.log("Problem in the code - could not generate camera ray!");n.setDepth(this.reflDepth),i.add(this.getColor(n,r))}return i.div(s*a),i.getFinal()}},{key:"draw",value:function(t,e){var n=new N,r=new T;e.loadPixels();for(var i=e.millis()+t,a=this.lastX,s=this.lastY;e.millis()<i;)if(e.set(a,s,e.color(this.getPixel(a,s,n,r))),++a==this.cam.width&&(a=0,++s==this.cam.height))return e.updatePixels(),!0;return e.updatePixels(),this.lastX=a,this.lastY=s,!1}}])&&I(e.prototype,n),r&&I(e,r),t}();function z(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var A=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.reset()}var e,n,r;return e=t,(n=[{key:"set",value:function(e){return e instanceof t?this.m=e.m.slice():e instanceof Array?this.m=e.slice():e instanceof m&&(this.reset(),this.translate(e)),this}},{key:"reset",value:function(){return this.set([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}},{key:"copy",value:function(){return(new t).set(this)}},{key:"at",value:function(t,e){return this.m[4*t+e]}},{key:"_multEntry",value:function(t,e,n){for(var r=0,i=0;i<4;i++)r+=t.at(e,i)*this.at(i,n);return r}},{key:"multBy",value:function(e){if(e instanceof Array)return this.multBy((new t).set(e));var n=[this._multEntry(e,0,0),this._multEntry(e,0,1),this._multEntry(e,0,2),this._multEntry(e,0,3),this._multEntry(e,1,0),this._multEntry(e,1,1),this._multEntry(e,1,2),this._multEntry(e,1,3),this._multEntry(e,2,0),this._multEntry(e,2,1),this._multEntry(e,2,2),this._multEntry(e,2,3),this._multEntry(e,3,0),this._multEntry(e,3,1),this._multEntry(e,3,2),this._multEntry(e,3,3)];return this.m=n,this}},{key:"translate",value:function(t){return t instanceof m?(this.m[3]+=t.x,this.m[7]+=t.y,this.m[11]+=t.z,this):t instanceof Array?(this.m[3]+=t[0],this.m[7]+=t[1],this.m[11]+=t[2],this):void 0}},{key:"scale",value:function(t){var e,n,r;return t instanceof Array?(e=t[0],n=t[1],r=t[2]):e=n=r=t,this.m[0]*=e,this.m[1]*=e,this.m[2]*=e,this.m[3]*=e,this.m[4]*=n,this.m[5]*=n,this.m[6]*=n,this.m[7]*=n,this.m[8]*=r,this.m[9]*=r,this.m[10]*=r,this.m[11]*=r,this}},{key:"rotateX",value:function(e){var n=new t;e*=Math.PI/180;var r=Math.cos(e),i=Math.sin(e);return n.m[5]=r,n.m[6]=-i,n.m[9]=i,n.m[10]=r,this.multBy(n)}},{key:"rotateY",value:function(e){var n=new t;e*=Math.PI/180;var r=Math.cos(e),i=Math.sin(e);return n.m[0]=r,n.m[2]=i,n.m[8]=-i,n.m[10]=r,this.multBy(n)}},{key:"rotateZ",value:function(e){var n=new t;e*=Math.PI/180;var r=Math.cos(e),i=Math.sin(e);return n.m[0]=r,n.m[1]=-i,n.m[4]=i,n.m[5]=r,this.multBy(n)}},{key:"rotate",value:function(t){return this.rotateX(t.x).rotateY(t.y).rotateZ(t.z)}},{key:"_swap",value:function(t,e){var n=this.m[t];this.m[t]=this.m[e],this.m[e]=n}},{key:"transpose",value:function(){return this._swap(1,4),this._swap(2,8),this._swap(3,12),this._swap(6,9),this._swap(7,13),this._swap(11,14),this}},{key:"inverse",value:function(){var t=this.m,e=[t[5]*t[10]-t[9]*t[6],t[2]*t[9]-t[1]*t[10],t[1]*t[6]-t[2]*t[5],t[6]*t[8]-t[4]*t[10],t[0]*t[10]-t[2]*t[8],t[4]*t[2]-t[0]*t[6],t[4]*t[9]-t[8]*t[5],t[8]*t[1]-t[0]*t[9],t[0]*t[5]-t[4]*t[1]],n=1/(t[0]*e[0]+t[1]*e[3]+t[2]*e[6]),r=[-((e=e.map((function(t){return t*n})))[0]*t[3]+e[1]*t[7]+e[2]*t[11]),-(e[3]*t[3]+e[4]*t[7]+e[5]*t[11]),-(e[6]*t[3]+e[7]*t[7]+e[8]*t[11])];return this.m=[e[0],e[1],e[2],r[0],e[3],e[4],e[5],r[1],e[6],e[7],e[8],r[2],0,0,0,1],this}},{key:"transP",value:function(t){var e=this.m[0]*t.x+this.m[1]*t.y+this.m[2]*t.z+this.m[3],n=this.m[4]*t.x+this.m[5]*t.y+this.m[6]*t.z+this.m[7],r=this.m[8]*t.x+this.m[9]*t.y+this.m[10]*t.z+this.m[11];return t.x=e,t.y=n,t.z=r,t.saveMag&&t._saveMags(),t}},{key:"transV",value:function(t){var e=this.m[0]*t.x+this.m[1]*t.y+this.m[2]*t.z,n=this.m[4]*t.x+this.m[5]*t.y+this.m[6]*t.z,r=this.m[8]*t.x+this.m[9]*t.y+this.m[10]*t.z;return t.x=e,t.y=n,t.z=r,t.saveMag&&t._saveMags(),t}}])&&z(e.prototype,n),r&&z(e,r),t}();function C(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function B(t,e,n){return(B=C()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&G(i,n.prototype),i}).apply(null,arguments)}function D(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function F(t){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function q(t,e){return!e||"object"!==F(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function L(t){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function V(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&G(t,e)}function G(t,e){return(G=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function J(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function W(t,e,n){return e&&Y(t.prototype,e),n&&Y(t,n),t}var X=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new O;J(this,t),this.setMaterial(e)}return W(t,[{key:"intersects",value:function(t,e){return console.log("You did not implement the Intersects method for this object!"),!1}},{key:"setMaterial",value:function(t){this.material=t}}]),t}(),H=function(t){function e(t){var n;return J(this,e),(n=q(this,L(e).call(this))).children=t,n.localIR=new T,n}return V(e,t),W(e,[{key:"setBounds",value:function(t){this.bounds=t}},{key:"intersects",value:function(t,e){if(void 0!==this.bounds&&(this.localIR.reset(),!this.bounds.intersects(t,this.localIR)))return!1;for(var n=t.max,r=0;r<this.children.length;r++)this.localIR.reset(),this.children[r].intersects(t,this.localIR)&&(e.setOther(this.localIR),t.setMax(e.t));return t.setMax(n),e.connects}}]),e}(X),U=function(t){function e(t,n,r,i){var a;return J(this,e),(a=q(this,L(e).call(this))).child=t,a.setMatrix(n,r,i),a.localRay=new N,a}return V(e,t),W(e,[{key:"setMatrix",value:function(t,e,n){this.m=new A,this.m.scale(n).rotate(B(m,D(e))).translate(t),this.mInv=this.m.copy().inverse(),this.mIt=this.mInv.copy().transpose()}},{key:"intersects",value:function(t,e){this.localRay.setOther(t),this.mInv.transP(this.localRay.src),this.mInv.transV(this.localRay.dir);var n=this.localRay.dir.mag();return 1e-5!=this.localRay.min&&(this.localRay.min*=n),this.localRay.max*=n,n=1/n,this.localRay.dir.mult(n),!!this.child.intersects(this.localRay,e)&&(this.m.transP(e.p),this.mIt.transV(e.n),e.t*=n,!0)}}]),e}(X),K=function(t){function e(t,n){var r;return J(this,e),(r=q(this,L(e).call(this))).c=B(m,D(t)),r.r=n,r}return V(e,t),W(e,[{key:"intersects",value:function(t,e){var n=t.src.copy();n.sub(this.c);var r=n.dot(n)-this.r*this.r,i=t.dir.dot(n),a=i*i-r;if(a<0)return!1;var s=Math.sqrt(a),o=-i-s;return t.at(o,e.p)?(e.setIntersection(o,e.p,m.sub(e.p,this.c),this.material),!0):(o+=2*s,!!t.at(o,e.p)&&(e.setIntersection(o,e.p,m.sub(e.p,this.c),this.material),!0))}}]),e}(X),Z=function(t){function e(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return J(this,e),(t=q(this,L(e).call(this))).setAltMaterial(n),t}return V(e,t),W(e,[{key:"setAltMaterial",value:function(t){this.mat2=t}},{key:"intersects",value:function(t,e){if(t.dir.y*t.src.y>=0)return!1;var n=-t.src.y/t.dir.y;if(t.at(n,e.p)){var r=Math.floor(e.p.x)+Math.floor(e.p.z),i=null==this.mat2||(r%2+2)%2<1?this.material:this.mat2,a=t.src.y>0?new m(0,1,0):new m(0,-1,0);return e.setIntersection(n,e.p,a,i),!0}return!1}}]),e}(X),Q=function(t){function e(t,n){var r;return J(this,e),(r=q(this,L(e).call(this))).min=B(m,D(t)),r.max=B(m,D(n)),r}return V(e,t),W(e,[{key:"intersects",value:function(t,n){for(var r=[t.min,t.max],i=[null,null],a=0;a<3;a++){var s=e.getters[a],o=s(t.dir),l=s(t.src);if(0==o){if(l<=s(this.min)||l>=s(this.max))return!1}else{var u=new m;o=1/o;var c=(s(this.min)-l)*o,h=(s(this.max)-l)*o,f=void 0,y=void 0;c<h?(f=c,y=h,e.setters[a](u,-1)):(f=h,y=c,e.setters[a](u,1)),r[0]<f&&(r[0]=f,i[0]=u),r[1]>y&&(r[1]=y,i[1]=u.copy().mult(-1))}if(r[0]>=r[1])return!1}return r[0]>t.min&&t.at(r[0],n.p)?(n.setIntersection(r[0],n.p,i[0],this.material),!0):!!(r[1]<t.max&&t.at(r[1],n.p))&&(n.setIntersection(r[1],n.p,i[1],this.material),!0)}}]),e}(X);function $(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}Q.getters=[function(t){return t.x},function(t){return t.y},function(t){return t.z}],Q.setters=[function(t,e){return t.x=e},function(t,e){return t.y=e},function(t,e){return t.z=e}];var tt=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.scene=new R,this.refMap={},this.loadScene(e)}var e,n,r;return e=t,(n=[{key:"loadCamera",value:function(t){var e=new d(t.pos,t.lookAt,t.up);return e.setScreen(t.screen.w,t.screen.h,t.fovy),void 0!==t.dof&&e.setDOF(t.dof.point,t.dof.normal,t.dof.aperture,t.dof.samples),e}},{key:"loadMaterial",value:function(t){if("string"==typeof t){if("undefined"===this.scene.materials[t])throw"Material reference to non-existent material!";return this.scene.materials[t]}var e=new O(t.diffuse);return void 0!==t.name&&(e.name=t.name),void 0!==t.specExp&&e.setSpecular(t.specExp,t.specular),void 0!==t.reflect&&(!0===t.reflect?e.setReflect():e.setReflect(t.reflect)),e}},{key:"loadLight",value:function(t){var e=t.color;return new S(t.pos,e)}},{key:"loadInter",value:function(t){if("string"==typeof t){if("undefined"===this.refMap[t])throw"Object reference to non-existent object!";return this.refMap[t]}var e=null;switch(t.type.toLowerCase()){case"plane":e=this.loadPlane(t);break;case"node":e=this.loadNode(t);break;case"sphere":e=this.loadSphere(t);break;case"box":e=this.loadBox(t);break;case"transform":e=this.loadTransform(t);break;default:throw"You did not implement a loader for this object"}return null!==e&&void 0!==t.material&&e.setMaterial(this.loadMaterial(t.material)),null!==e&&void 0!==t.name&&(e.name=t.name,this.refMap[e.name]=e),e}},{key:"loadNode",value:function(t){var e=[];for(var n in t.children)e.push(this.loadInter(t.children[n]));var r=new H(e);return void 0!==t.bounds&&r.setBounds(this.loadInter(t.bounds)),r}},{key:"loadPlane",value:function(t){var e=null;return void 0!==t.mat2&&(e=this.loadMaterial(t.mat2)),new Z(e)}},{key:"loadSphere",value:function(t){return new K(t.pos||[0,0,0],t.radius||1)}},{key:"loadBox",value:function(t){return new Q(t.min,t.max)}},{key:"loadTransform",value:function(t){var e=this.loadInter(t.child),n=t.translate,r=void 0===t.rotate?[0,0,0]:t.rotate,i=void 0===t.scale?1:t.scale;return new U(e,n,r,i)}},{key:"loadScene",value:function(t){if(void 0!==t.samples&&this.scene.setSamples(t.samples),void 0!==t.reflDepth&&(this.scene.reflDepth=t.reflDepth),void 0!==t.ambient&&this.scene.setAmbient(t.ambient),void 0!==t.bg&&this.scene.setBG(t.bg),void 0!==t.lights)for(var e in t.lights)this.scene.addLight(this.loadLight(t.lights[e]));if(void 0!==t.materials)for(var n in t.materials)this.scene.addMaterial(this.loadMaterial(t.materials[n]));this.scene.setCamera(this.loadCamera(t.camera)),this.scene.setRootNode(this.loadInter(t.root))}}])&&$(e.prototype,n),r&&$(e,r),t}();var et=new h.a((function(t){t.preload=function(){t.json=t.loadJSON("/raytracer/scenes/emptyScene.json")},t.setup=function(){t.scene=new tt(t.json).scene,console.log(t.scene),t.startTime=t.millis(),t.createCanvas(t.scene.cam.width,t.scene.cam.height).class("mx-auto"),t.frameRate(30),t.loadPixels()},t.draw=function(){t.scene.draw(25,t)&&(console.log("Completed drawing in "+(t.millis()-t.startTime)+" ms."),t.noLoop())},t.drawFrom=function(e){t.noLoop(),delete t.scene,t.scene=new tt(e).scene,t.startTime=t.millis(),t.resizeCanvas(t.scene.cam.width,t.scene.cam.height),t.loop()},t.loadAndDraw=function(e){t.loadJSON(e,t.drawFrom)}}),"canvasHolder");function nt(t){return(nt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function rt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function it(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function at(t,e){return!e||"object"!==nt(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function st(t){return(st=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function ot(t,e){return(ot=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var lt=[{link:"firstSphere",name:"Single Sphere"},{link:"fakeTranslucent",name:"Fake Translucency"},{link:"boxStacks",name:"Stacked Boxes"},{link:"infinite1",name:"Infinite Corridor"}],ut=function(t){function e(){return rt(this,e),at(this,st(e).apply(this,arguments))}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&ot(t,e)}(e,t),n=e,(r=[{key:"existingLink",value:function(t){return i.a.createElement("a",{href:"#",className:"list-group-item list-group-item-action",key:t.link,onClick:function(e){e.preventDefault(),fetch("/raytracer/scenes/"+t.link+".json").then((function(t){return t.text()})).then((function(t){u()("#inputJSON").val(t),u()("#sceneTab").click()}))}},t.name)}},{key:"render",value:function(){return i.a.createElement(o.a,null,i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-12"},i.a.createElement("h1",null," Ray Tracer - v",.11," "),i.a.createElement("h3",null," Created by Ivan Miloslavov; based on designs by Paul Kry "),i.a.createElement("p",{className:"desc"},"This program allows you to try ray-tracing in the browser! Test out existing scenes or create your own."),i.a.createElement("p",{className:"desc"},"Based on a design and lectures by Paul Kry, as part of the course COMP 557 - Introduction to Computer Graphics, in McGill University."),i.a.createElement("p",{className:"desc"},"Version 1.0 will have better UI to generate custom scenes."))),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-12"},i.a.createElement("ul",{className:"nav nav-tabs"},i.a.createElement("li",{className:"nav-item"},i.a.createElement("a",{className:"nav-link active","data-toggle":"tab",href:"#start"},"Start")),i.a.createElement("li",{className:"nav-item"},i.a.createElement("a",{className:"nav-link","data-toggle":"tab",href:"#scene",id:"sceneTab"},"Objects")),i.a.createElement("li",{className:"nav-item"},i.a.createElement("a",{className:"nav-link","data-toggle":"tab",href:"#render"},"Render"))))),i.a.createElement("div",{className:"tab-content text-center"},i.a.createElement("div",{id:"start",className:"container-fluid tab-pane active"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-12"},i.a.createElement("h5",null,"New Scene or Existing"))),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-6"},i.a.createElement("a",{className:"btn btn-primary",href:"#",onClick:function(t){t.preventDefault(),u()("#sceneTab").click()}},"New Scene")),i.a.createElement("div",{className:"col-6"},i.a.createElement("div",{className:"list-group"},lt.map(this.existingLink))))),i.a.createElement("div",{id:"scene",className:"container-fluid tab-pane"},i.a.createElement("h5",null,"Place JSON here"),i.a.createElement("textarea",{id:"inputJSON",cols:"80",rows:"20"})),i.a.createElement("div",{id:"render",className:"container-fluid tab-pane"},i.a.createElement("div",{className:"row"},i.a.createElement("button",{id:"startRender",className:"btn btn-success mx-auto",onClick:function(){var t=u()("#inputJSON").val();et.drawFrom(JSON.parse(t))}},"Start Render")),i.a.createElement("div",{className:"row my-5",id:"canvasHolder"}))))}}])&&it(n.prototype,r),a&&it(n,a),e}(i.a.Component);document.getElementById("root")&&s.a.render(i.a.createElement(ut,null),document.getElementById("root")),window.p5=et}],[[16,0,1]]]);