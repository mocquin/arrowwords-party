var Li={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};var f=function(n,e){if(!n)throw Ne(e)},Ne=function(n){return new Error("Firebase Database ("+Li.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};var so=function(n){let e=[],t=0;for(let i=0;i<n.length;i++){let r=n.charCodeAt(i);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},wl=function(n){let e=[],t=0,i=0;for(;t<n.length;){let r=n[t++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){let s=n[t++];e[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){let s=n[t++],o=n[t++],a=n[t++],c=((r&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{let s=n[t++],o=n[t++];e[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|o&63)}}return e.join("")},pn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<n.length;r+=3){let s=n[r],o=r+1<n.length,a=o?n[r+1]:0,c=r+2<n.length,l=c?n[r+2]:0,h=s>>2,u=(s&3)<<4|a>>4,d=(a&15)<<2|l>>6,p=l&63;c||(p=64,o||(d=64)),i.push(t[h],t[u],t[d],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(so(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):wl(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<n.length;){let s=t[n.charAt(r++)],a=r<n.length?t[n.charAt(r)]:0;++r;let l=r<n.length?t[n.charAt(r)]:64;++r;let u=r<n.length?t[n.charAt(r)]:64;if(++r,s==null||a==null||l==null||u==null)throw new xi;let d=s<<2|a>>4;if(i.push(d),l!==64){let p=a<<4&240|l>>2;if(i.push(p),u!==64){let _=l<<6&192|u;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},xi=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Fi=function(n){let e=so(n);return pn.encodeByteArray(e,!0)},gt=function(n){return Fi(n).replace(/\./g,"")},vt=function(n){try{return pn.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function oo(n){return ao(void 0,n)}function ao(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:let t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(let t in e)!e.hasOwnProperty(t)||!Tl(t)||(n[t]=ao(n[t],e[t]));return n}function Tl(n){return n!=="__proto__"}function Cl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var bl=()=>Cl().__FIREBASE_DEFAULTS__,Sl=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Al=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&vt(n[1]);return e&&JSON.parse(e)},Ui=()=>{try{return bl()||Sl()||Al()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Wi=n=>{var e,t;return(t=(e=Ui())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},co=n=>{let e=Wi(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Vi=()=>{var n;return(n=Ui())===null||n===void 0?void 0:n.config},Bi=n=>{var e;return(e=Ui())===null||e===void 0?void 0:e[`_${n}`]};var oe=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}};function lo(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},i=e||"demo-project",r=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[gt(JSON.stringify(t)),gt(JSON.stringify(o)),""].join(".")}function D(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function yt(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(D())}function uo(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function _n(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ho(){let n=D();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Z(){return Li.NODE_CLIENT===!0||Li.NODE_ADMIN===!0}function fo(){try{return typeof indexedDB=="object"}catch{return!1}}function po(){return new Promise((n,e)=>{try{let t=!0,i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var s;e(((s=r.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var Rl="FirebaseError",z=class n extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Rl,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ae.prototype.create)}},ae=class{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){let i=t[0]||{},r=`${this.service}/${e}`,s=this.errors[e],o=s?Nl(s,i):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new z(r,a,i)}};function Nl(n,e){return n.replace(Pl,(t,i)=>{let r=e[i];return r!=null?String(r):`<${i}?>`})}var Pl=/\{\$([^}]+)}/g;function Ke(n){return JSON.parse(n)}function N(n){return JSON.stringify(n)}var _o=function(n){let e={},t={},i={},r="";try{let s=n.split(".");e=Ke(vt(s[0])||""),t=Ke(vt(s[1])||""),r=s[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:r}};var mo=function(n){let e=_o(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},go=function(n){let e=_o(n).claims;return typeof e=="object"&&e.admin===!0};function $(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Pe(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function It(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Et(n,e,t){let i={};for(let r in n)Object.prototype.hasOwnProperty.call(n,r)&&(i[r]=e.call(t,n[r],r,n));return i}function Ye(n,e){if(n===e)return!0;let t=Object.keys(n),i=Object.keys(e);for(let r of t){if(!i.includes(r))return!1;let s=n[r],o=e[r];if(ro(s)&&ro(o)){if(!Ye(s,o))return!1}else if(s!==o)return!1}for(let r of i)if(!t.includes(r))return!1;return!0}function ro(n){return n!==null&&typeof n=="object"}function fe(n){let e=[];for(let[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Je(n){let e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){let[r,s]=i.split("=");e[decodeURIComponent(r)]=decodeURIComponent(s)}}),e}function Qe(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}var fn=class{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);let i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){let d=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(d<<1|d>>>31)&4294967295}let r=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,h;for(let u=0;u<80;u++){u<40?u<20?(l=a^s&(o^a),h=1518500249):(l=s^o^a,h=1859775393):u<60?(l=s&o|a&(s|o),h=2400959708):(l=s^o^a,h=3395469782);let d=(r<<5|r>>>27)+l+c+h+i[u]&4294967295;c=a,a=o,o=(s<<30|s>>>2)&4294967295,s=r,r=d}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);let i=t-this.blockSize,r=0,s=this.buf_,o=this.inbuf_;for(;r<t;){if(o===0)for(;r<=i;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<t;)if(s[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(s),o=0;break}}else for(;r<t;)if(s[o]=e[r],++o,++r,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){let e=[],t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let r=0;r<5;r++)for(let s=24;s>=0;s-=8)e[i]=this.chain_[r]>>s&255,++i;return e}};function vo(n,e){let t=new Mi(n,e);return t.subscribe.bind(t)}var Mi=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let r;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");kl(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:i},r.next===void 0&&(r.next=Di),r.error===void 0&&(r.error=Di),r.complete===void 0&&(r.complete=Di);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function kl(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Di(){}function wt(n,e){return`${n} failed: ${e} argument `}var yo=function(n){let e=[],t=0;for(let i=0;i<n.length;i++){let r=n.charCodeAt(i);if(r>=55296&&r<=56319){let s=r-55296;i++,f(i<n.length,"Surrogate pair missing trail surrogate.");let o=n.charCodeAt(i)-56320;r=65536+(s<<10)+o}r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):r<65536?(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},Tt=function(n){let e=0;for(let t=0;t<n.length;t++){let i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};var S_=4*60*60*1e3;function O(n){return n&&n._delegate?n._delegate:n}var B=class{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var ke="[DEFAULT]";var mn=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let i=new oe;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:t});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let i=this.normalizeInstanceIdentifier(e?.identifier),r=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dl(e))try{this.getOrInitializeService({instanceIdentifier:ke})}catch{}for(let[t,i]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:r});i.resolve(s)}catch{}}}}clearInstance(e=ke){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ke){return this.instances.has(e)}getOptions(e=ke){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:i,options:t});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);i===a&&o.resolve(r)}return r}onInit(e,t){var i;let r=this.normalizeInstanceIdentifier(t),s=(i=this.onInitCallbacks.get(r))!==null&&i!==void 0?i:new Set;s.add(e),this.onInitCallbacks.set(r,s);let o=this.instances.get(r);return o&&e(o,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let i=this.onInitCallbacks.get(t);if(i)for(let r of i)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Ol(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ke){return this.component?this.component.multipleInstances?e:ke:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Ol(n){return n===ke?void 0:n}function Dl(n){return n.instantiationMode==="EAGER"}var Ct=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new mn(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Ll=[],T;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(T||(T={}));var xl={debug:T.DEBUG,verbose:T.VERBOSE,info:T.INFO,warn:T.WARN,error:T.ERROR,silent:T.SILENT},Ml=T.INFO,Fl={[T.DEBUG]:"log",[T.VERBOSE]:"log",[T.INFO]:"info",[T.WARN]:"warn",[T.ERROR]:"error"},Ul=(n,e,...t)=>{if(e<n.logLevel)return;let i=new Date().toISOString(),r=Fl[e];if(r)console[r](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},pe=class{constructor(e){this.name=e,this._logLevel=Ml,this._logHandler=Ul,this._userLogHandler=null,Ll.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in T))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?xl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,T.DEBUG,...e),this._logHandler(this,T.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,T.VERBOSE,...e),this._logHandler(this,T.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,T.INFO,...e),this._logHandler(this,T.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,T.WARN,...e),this._logHandler(this,T.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,T.ERROR,...e),this._logHandler(this,T.ERROR,...e)}};var Wl=(n,e)=>e.some(t=>n instanceof t),Io,Eo;function Vl(){return Io||(Io=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Bl(){return Eo||(Eo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var wo=new WeakMap,ji=new WeakMap,To=new WeakMap,Hi=new WeakMap,qi=new WeakMap;function Hl(n){let e=new Promise((t,i)=>{let r=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(ee(n.result)),r()},o=()=>{i(n.error),r()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&wo.set(t,n)}).catch(()=>{}),qi.set(e,n),e}function jl(n){if(ji.has(n))return;let e=new Promise((t,i)=>{let r=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),r()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});ji.set(n,e)}var Gi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ji.get(n);if(e==="objectStoreNames")return n.objectStoreNames||To.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ee(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Co(n){Gi=n(Gi)}function Gl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let i=n.call(gn(this),e,...t);return To.set(i,e.sort?e.sort():[e]),ee(i)}:Bl().includes(n)?function(...e){return n.apply(gn(this),e),ee(wo.get(this))}:function(...e){return ee(n.apply(gn(this),e))}}function ql(n){return typeof n=="function"?Gl(n):(n instanceof IDBTransaction&&jl(n),Wl(n,Vl())?new Proxy(n,Gi):n)}function ee(n){if(n instanceof IDBRequest)return Hl(n);if(Hi.has(n))return Hi.get(n);let e=ql(n);return e!==n&&(Hi.set(n,e),qi.set(e,n)),e}var gn=n=>qi.get(n);function So(n,e,{blocked:t,upgrade:i,blocking:r,terminated:s}={}){let o=indexedDB.open(n,e),a=ee(o);return i&&o.addEventListener("upgradeneeded",c=>{i(ee(o.result),c.oldVersion,c.newVersion,ee(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var zl=["get","getKey","getAll","getAllKeys","count"],$l=["put","add","delete","clear"],zi=new Map;function bo(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(zi.get(e))return zi.get(e);let t=e.replace(/FromIndex$/,""),i=e!==t,r=$l.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(r||zl.includes(t)))return;let s=async function(o,...a){let c=this.transaction(o,r?"readwrite":"readonly"),l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),r&&c.done]))[0]};return zi.set(e,s),s}Co(n=>({...n,get:(e,t,i)=>bo(e,t)||n.get(e,t,i),has:(e,t)=>!!bo(e,t)||n.has(e,t)}));var Ki=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Kl(t)){let i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}};function Kl(n){let e=n.getComponent();return e?.type==="VERSION"}var Yi="@firebase/app",Ao="0.10.5";var Oe=new pe("@firebase/app"),Yl="@firebase/app-compat",Jl="@firebase/analytics-compat",Ql="@firebase/analytics",Xl="@firebase/app-check-compat",Zl="@firebase/app-check",eu="@firebase/auth",tu="@firebase/auth-compat",nu="@firebase/database",iu="@firebase/database-compat",ru="@firebase/functions",su="@firebase/functions-compat",ou="@firebase/installations",au="@firebase/installations-compat",cu="@firebase/messaging",lu="@firebase/messaging-compat",uu="@firebase/performance",hu="@firebase/performance-compat",du="@firebase/remote-config",fu="@firebase/remote-config-compat",pu="@firebase/storage",_u="@firebase/storage-compat",mu="@firebase/firestore",gu="@firebase/vertexai-preview",vu="@firebase/firestore-compat",yu="firebase",Iu="10.12.2";var Ji="[DEFAULT]",Eu={[Yi]:"fire-core",[Yl]:"fire-core-compat",[Ql]:"fire-analytics",[Jl]:"fire-analytics-compat",[Zl]:"fire-app-check",[Xl]:"fire-app-check-compat",[eu]:"fire-auth",[tu]:"fire-auth-compat",[nu]:"fire-rtdb",[iu]:"fire-rtdb-compat",[ru]:"fire-fn",[su]:"fire-fn-compat",[ou]:"fire-iid",[au]:"fire-iid-compat",[cu]:"fire-fcm",[lu]:"fire-fcm-compat",[uu]:"fire-perf",[hu]:"fire-perf-compat",[du]:"fire-rc",[fu]:"fire-rc-compat",[pu]:"fire-gcs",[_u]:"fire-gcs-compat",[mu]:"fire-fst",[vu]:"fire-fst-compat",[gu]:"fire-vertex","fire-js":"fire-js",[yu]:"fire-js-all"};var vn=new Map,wu=new Map,Qi=new Map;function Ro(n,e){try{n.container.addComponent(e)}catch(t){Oe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function me(n){let e=n.name;if(Qi.has(e))return Oe.debug(`There were multiple attempts to register component ${e}.`),!1;Qi.set(e,n);for(let t of vn.values())Ro(t,n);for(let t of wu.values())Ro(t,n);return!0}function St(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Y(n){return n.settings!==void 0}var Tu={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},_e=new ae("app","Firebase",Tu);var Xi=class{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new B("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw _e.create("app-deleted",{appName:this._name})}};var ge=Iu;function Oo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let i=Object.assign({name:Ji,automaticDataCollectionEnabled:!1},e),r=i.name;if(typeof r!="string"||!r)throw _e.create("bad-app-name",{appName:String(r)});if(t||(t=Vi()),!t)throw _e.create("no-options");let s=vn.get(r);if(s){if(Ye(t,s.options)&&Ye(i,s.config))return s;throw _e.create("duplicate-app",{appName:r})}let o=new Ct(r);for(let c of Qi.values())o.addComponent(c);let a=new Xi(t,i,o);return vn.set(r,a),a}function yn(n=Ji){let e=vn.get(n);if(!e&&n===Ji&&Vi())return Oo();if(!e)throw _e.create("no-app",{appName:n});return e}function K(n,e,t){var i;let r=(i=Eu[n])!==null&&i!==void 0?i:n;t&&(r+=`-${t}`);let s=r.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Oe.warn(a.join(" "));return}me(new B(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}var Cu="firebase-heartbeat-database",bu=1,bt="firebase-heartbeat-store",$i=null;function Do(){return $i||($i=So(Cu,bu,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(bt)}catch(t){console.warn(t)}}}}).catch(n=>{throw _e.create("idb-open",{originalErrorMessage:n.message})})),$i}async function Su(n){try{let t=(await Do()).transaction(bt),i=await t.objectStore(bt).get(Lo(n));return await t.done,i}catch(e){if(e instanceof z)Oe.warn(e.message);else{let t=_e.create("idb-get",{originalErrorMessage:e?.message});Oe.warn(t.message)}}}async function No(n,e){try{let i=(await Do()).transaction(bt,"readwrite");await i.objectStore(bt).put(e,Lo(n)),await i.done}catch(t){if(t instanceof z)Oe.warn(t.message);else{let i=_e.create("idb-set",{originalErrorMessage:t?.message});Oe.warn(i.message)}}}function Lo(n){return`${n.name}!${n.options.appId}`}var Au=1024,Ru=30*24*60*60*1e3,Zi=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new er(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;let r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Po();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let a=new Date(o.date).valueOf();return Date.now()-a<=Ru}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Po(),{heartbeatsToSend:i,unsentEntries:r}=Nu(this._heartbeatsCache.heartbeats),s=gt(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}};function Po(){return new Date().toISOString().substring(0,10)}function Nu(n,e=Au){let t=[],i=n.slice();for(let r of n){let s=t.find(o=>o.agent===r.agent);if(s){if(s.dates.push(r.date),ko(t)>e){s.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),ko(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}var er=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return fo()?po().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Su(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let r=await this.read();return No(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let r=await this.read();return No(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function ko(n){return gt(JSON.stringify({version:2,heartbeats:n})).length}function Pu(n){me(new B("platform-logger",e=>new Ki(e),"PRIVATE")),me(new B("heartbeat",e=>new Zi(e),"PRIVATE")),K(Yi,Ao,n),K(Yi,Ao,"esm2017"),K("fire-js","")}Pu("");var ku="firebase",Ou="10.12.2";K(ku,Ou,"app");function In(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(n);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(t[i[r]]=n[i[r]]);return t}function Xo(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Zo=Xo,ea=new ae("auth","Firebase",Xo());var Sn=new pe("@firebase/auth");function Du(n,...e){Sn.logLevel<=T.WARN&&Sn.warn(`Auth (${ge}): ${n}`,...e)}function wn(n,...e){Sn.logLevel<=T.ERROR&&Sn.error(`Auth (${ge}): ${n}`,...e)}function H(n,...e){throw Er(n,...e)}function J(n,...e){return Er(n,...e)}function Ir(n,e,t){let i=Object.assign(Object.assign({},Zo()),{[e]:t});return new ae("auth","Firebase",i).create(e,{appName:n.name})}function ye(n){return Ir(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Lu(n,e,t){let i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&H(n,"argument-error"),Ir(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Er(n,...e){if(typeof n!="string"){let t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return ea.create(n,...e)}function m(n,e,...t){if(!n)throw Er(e,...t)}function te(n){let e="INTERNAL ASSERTION FAILED: "+n;throw wn(e),new Error(e)}function le(n,e){n||te(e)}function ir(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function xu(){return xo()==="http:"||xo()==="https:"}function xo(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function Mu(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(xu()||uo()||"connection"in navigator)?navigator.onLine:!0}function Fu(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var De=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,le(t>e,"Short delay should be less than long delay!"),this.isMobile=yt()||_n()}get(){return Mu()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function wr(n,e){le(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var An=class{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;te("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;te("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;te("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Uu={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Wu=new De(3e4,6e4);function P(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function M(n,e,t,i,r={}){return ta(n,r,async()=>{let s={},o={};i&&(e==="GET"?o=i:s={body:JSON.stringify(i)});let a=fe(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode),An.fetch()(na(n,n.config.apiHost,t,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},s))})}async function ta(n,e,t){n._canInitEmulator=!1;let i=Object.assign(Object.assign({},Uu),e);try{let r=new rr(n),s=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw At(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw At(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw At(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw At(n,"user-disabled",o);let h=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Ir(n,h,l);H(n,h)}}catch(r){if(r instanceof z)throw r;H(n,"network-request-failed",{message:String(r)})}}async function Ie(n,e,t,i,r={}){let s=await M(n,e,t,i,r);return"mfaPendingCredential"in s&&H(n,"multi-factor-auth-required",{_serverResponse:s}),s}function na(n,e,t,i){let r=`${e}${t}?${i}`;return n.config.emulator?wr(n.config,r):`${n.config.apiScheme}://${r}`}function Vu(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var rr=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(J(this.auth,"network-request-failed")),Wu.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function At(n,e,t){let i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);let r=J(n,e,i);return r.customData._tokenResponse=t,r}function Mo(n){return n!==void 0&&n.enterprise!==void 0}var sr=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Vu(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function Bu(n,e){return M(n,"GET","/v2/recaptchaConfig",P(n,e))}async function Hu(n,e){return M(n,"POST","/v1/accounts:delete",e)}async function ia(n,e){return M(n,"POST","/v1/accounts:lookup",e)}function Rt(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ra(n,e=!1){let t=O(n),i=await t.getIdToken(e),r=Tr(i);m(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");let s=typeof r.firebase=="object"?r.firebase:void 0,o=s?.sign_in_provider;return{claims:r,token:i,authTime:Rt(tr(r.auth_time)),issuedAtTime:Rt(tr(r.iat)),expirationTime:Rt(tr(r.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function tr(n){return Number(n)*1e3}function Tr(n){let[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return wn("JWT malformed, contained fewer than 3 sections"),null;try{let r=vt(t);return r?JSON.parse(r):(wn("Failed to decode base64 JWT payload"),null)}catch(r){return wn("Caught error parsing JWT payload as JSON",r?.toString()),null}}function Fo(n){let e=Tr(n);return m(e,"internal-error"),m(typeof e.exp<"u","internal-error"),m(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Pt(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof z&&ju(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function ju({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var or=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;let r=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var kt=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Rt(this.lastLoginAt),this.creationTime=Rt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Rn(n){var e;let t=n.auth,i=await n.getIdToken(),r=await Pt(n,ia(t,{idToken:i}));m(r?.users.length,t,"internal-error");let s=r.users[0];n._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?oa(s.providerUserInfo):[],a=Gu(n.providerData,o),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!a?.length,h=c?l:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new kt(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,u)}async function sa(n){let e=O(n);await Rn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Gu(n,e){return[...n.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function oa(n){return n.map(e=>{var{providerId:t}=e,i=In(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}async function qu(n,e){let t=await ta(n,{},async()=>{let i=fe({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:s}=n.config,o=na(n,r,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",An.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function zu(n,e){return M(n,"POST","/v2/accounts:revokeToken",P(n,e))}var Nt=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){m(e.idToken,"internal-error"),m(typeof e.idToken<"u","internal-error"),m(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Fo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){m(e.length!==0,"internal-error");let t=Fo(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(m(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:i,refreshToken:r,expiresIn:s}=await qu(e,t);this.updateTokensAndExpiration(i,r,Number(s))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){let{refreshToken:i,accessToken:r,expirationTime:s}=t,o=new n;return i&&(m(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),r&&(m(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),s&&(m(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return te("not implemented")}};function ve(n,e){m(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var Ze=class n{constructor(e){var{uid:t,auth:i,stsTokenManager:r}=e,s=In(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new or(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new kt(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Pt(this,this.stsTokenManager.getToken(this.auth,e));return m(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ra(this,e)}reload(){return sa(this)}_assign(e){this!==e&&(m(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){m(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Rn(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Y(this.auth.app))return Promise.reject(ye(this.auth));let e=await this.getIdToken();return await Pt(this,Hu(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,r,s,o,a,c,l,h;let u=(i=t.displayName)!==null&&i!==void 0?i:void 0,d=(r=t.email)!==null&&r!==void 0?r:void 0,p=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,_=(o=t.photoURL)!==null&&o!==void 0?o:void 0,w=(a=t.tenantId)!==null&&a!==void 0?a:void 0,R=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,se=(l=t.createdAt)!==null&&l!==void 0?l:void 0,Ae=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:Re,emailVerified:dn,isAnonymous:no,providerData:ki,stsTokenManager:io}=t;m(Re&&io,e,"internal-error");let Il=Nt.fromJSON(this.name,io);m(typeof Re=="string",e,"internal-error"),ve(u,e.name),ve(d,e.name),m(typeof dn=="boolean",e,"internal-error"),m(typeof no=="boolean",e,"internal-error"),ve(p,e.name),ve(_,e.name),ve(w,e.name),ve(R,e.name),ve(se,e.name),ve(Ae,e.name);let Oi=new n({uid:Re,auth:e,email:d,emailVerified:dn,displayName:u,isAnonymous:no,photoURL:_,phoneNumber:p,tenantId:w,stsTokenManager:Il,createdAt:se,lastLoginAt:Ae});return ki&&Array.isArray(ki)&&(Oi.providerData=ki.map(El=>Object.assign({},El))),R&&(Oi._redirectEventId=R),Oi}static async _fromIdTokenResponse(e,t,i=!1){let r=new Nt;r.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await Rn(s),s}static async _fromGetAccountInfoResponse(e,t,i){let r=t.users[0];m(r.localId!==void 0,"internal-error");let s=r.providerUserInfo!==void 0?oa(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!s?.length,a=new Nt;a.updateFromIdToken(i);let c=new n({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new kt(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!s?.length};return Object.assign(c,l),c}};var Uo=new Map;function ce(n){le(n instanceof Function,"Expected a class definition");let e=Uo.get(n);return e?(le(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Uo.set(n,e),e)}var Nn=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Nn.type="NONE";var ar=Nn;function Tn(n,e,t){return`firebase:${n}:${e}:${t}`}var Pn=class n{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;let{config:r,name:s}=this.auth;this.fullUserKey=Tn(this.userKey,r.apiKey,s),this.fullPersistenceKey=Tn("persistence",r.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?Ze._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new n(ce(ar),e,i);let r=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l),s=r[0]||ce(ar),o=Tn(i,e.config.apiKey,e.name),a=null;for(let l of t)try{let h=await l._get(o);if(h){let u=Ze._fromJSON(e,h);l!==s&&(a=u),s=l;break}}catch{}let c=r.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new n(s,e,i):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new n(s,e,i))}};function Wo(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(la(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(aa(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ha(e))return"Blackberry";if(da(e))return"Webos";if(Cr(e))return"Safari";if((e.includes("chrome/")||ca(e))&&!e.includes("edge/"))return"Chrome";if(ua(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function aa(n=D()){return/firefox\//i.test(n)}function Cr(n=D()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ca(n=D()){return/crios\//i.test(n)}function la(n=D()){return/iemobile/i.test(n)}function ua(n=D()){return/android/i.test(n)}function ha(n=D()){return/blackberry/i.test(n)}function da(n=D()){return/webos/i.test(n)}function Kn(n=D()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function $u(n=D()){var e;return Kn(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Ku(){return ho()&&document.documentMode===10}function fa(n=D()){return Kn(n)||ua(n)||da(n)||ha(n)||/windows phone/i.test(n)||la(n)}function Yu(){try{return!!(window&&window!==window.top)}catch{return!1}}function pa(n,e=[]){let t;switch(n){case"Browser":t=Wo(D());break;case"Worker":t=`${Wo(D())}-${n}`;break;default:t=n}let i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ge}/${i}`}var cr=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let i=s=>new Promise((o,a)=>{try{let c=e(s);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(let r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}};async function Ju(n,e={}){return M(n,"GET","/v2/passwordPolicy",P(n,e))}var Qu=6,lr=class{constructor(e){var t,i,r,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Qu,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(r=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&r!==void 0?r:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,r,s,o,a;let c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(i=c.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(r=c.containsLowercaseLetter)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,t){let i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var ur=class{constructor(e,t,i,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new kn(this),this.idTokenSubscription=new kn(this),this.beforeStateQueue=new cr(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ea,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ce(t)),this._initializationPromise=this.queue(async()=>{var i,r;if(!this._deleted&&(this.persistenceManager=await Pn.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await ia(this,{idToken:e}),i=await Ze._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Y(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}let i=await this.assertedPersistence.getCurrentUser(),r=i,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return m(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Rn(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Fu()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Y(this.app))return Promise.reject(ye(this));let t=e?O(e):null;return t&&m(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&m(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Y(this.app)?Promise.reject(ye(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Y(this.app)?Promise.reject(ye(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ce(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await Ju(this),t=new lr(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ae("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await zu(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ce(e)||this._popupRedirectResolver;m(t,this,"argument-error"),this.redirectPersistenceManager=await Pn.create(this,[ce(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,r){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(m(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){let c=e.addObserver(t,i,r);return()=>{o=!0,c()}}else{let c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return m(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=pa(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);let r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Du(`Error while retrieving App Check token: ${t.error}`),t?.token}};function We(n){return O(n)}var kn=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=vo(t=>this.observer=t)}get next(){return m(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Yn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Xu(n){Yn=n}function _a(n){return Yn.loadJS(n)}function Zu(){return Yn.recaptchaEnterpriseScript}function eh(){return Yn.gapiScript}function ma(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var th="recaptcha-enterprise",nh="NO_RECAPTCHA",hr=class{constructor(e){this.type=th,this.auth=We(e)}async verify(e="verify",t=!1){async function i(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{Bu(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{let l=new sr(c);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function r(s,o,a){let c=window.grecaptcha;Mo(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(nh)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{i(this.auth).then(a=>{if(!t&&Mo(window.grecaptcha))r(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Zu();c.length!==0&&(c+=a),_a(c).then(()=>{r(a,s,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}};async function Vo(n,e,t,i=!1){let r=new hr(n),s;try{s=await r.verify(t)}catch{s=await r.verify(t,!0)}let o=Object.assign({},e);return i?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Bo(n,e,t,i){var r;if(!((r=n._getRecaptchaConfig())===null||r===void 0)&&r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await Vo(n,e,t,t==="getOobCode");return i(n,s)}else return i(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let o=await Vo(n,e,t,t==="getOobCode");return i(n,o)}else return Promise.reject(s)})}function ga(n,e){let t=St(n,"auth");if(t.isInitialized()){let r=t.getImmediate(),s=t.getOptions();if(Ye(s,e??{}))return r;H(r,"already-initialized")}return t.initialize({options:e})}function ih(n,e){let t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(ce);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function br(n,e,t){let i=We(n);m(i._canInitEmulator,i,"emulator-config-failed"),m(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");let r=!!t?.disableWarnings,s=va(e),{host:o,port:a}=rh(e),c=a===null?"":`:${a}`;i.config.emulator={url:`${s}//${o}${c}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:r})}),r||sh()}function va(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function rh(n){let e=va(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let i=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){let s=r[1];return{host:s,port:Ho(i.substr(s.length+1))}}else{let[s,o]=i.split(":");return{host:s,port:Ho(o)}}}function Ho(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function sh(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var Le=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return te("not implemented")}_getIdTokenResponse(e){return te("not implemented")}_linkToIdToken(e,t){return te("not implemented")}_getReauthenticationResolver(e){return te("not implemented")}};async function oh(n,e){return M(n,"POST","/v1/accounts:signUp",e)}async function ah(n,e){return Ie(n,"POST","/v1/accounts:signInWithPassword",P(n,e))}async function ch(n,e){return Ie(n,"POST","/v1/accounts:signInWithEmailLink",P(n,e))}async function lh(n,e){return Ie(n,"POST","/v1/accounts:signInWithEmailLink",P(n,e))}var Ot=class n extends Le{constructor(e,t,i,r=null){super("password",i),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new n(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Bo(e,t,"signInWithPassword",ah);case"emailLink":return ch(e,{email:this._email,oobCode:this._password});default:H(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Bo(e,i,"signUpPassword",oh);case"emailLink":return lh(e,{idToken:t,email:this._email,oobCode:this._password});default:H(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Xe(n,e){return Ie(n,"POST","/v1/accounts:signInWithIdp",P(n,e))}var uh="http://localhost",xe=class n extends Le{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):H("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r}=t,s=In(t,["providerId","signInMethod"]);if(!i||!r)return null;let o=new n(i,r);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return Xe(e,t)}_linkToIdToken(e,t){let i=this.buildRequest();return i.idToken=t,Xe(e,i)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Xe(e,t)}buildRequest(){let e={requestUri:uh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=fe(t)}return e}};async function hh(n,e){return M(n,"POST","/v1/accounts:sendVerificationCode",P(n,e))}async function dh(n,e){return Ie(n,"POST","/v1/accounts:signInWithPhoneNumber",P(n,e))}async function fh(n,e){let t=await Ie(n,"POST","/v1/accounts:signInWithPhoneNumber",P(n,e));if(t.temporaryProof)throw At(n,"account-exists-with-different-credential",t);return t}var ph={USER_NOT_FOUND:"user-not-found"};async function _h(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Ie(n,"POST","/v1/accounts:signInWithPhoneNumber",P(n,t),ph)}var Dt=class n extends Le{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return dh(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return fh(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return _h(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:i,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:i,code:r}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:i,phoneNumber:r,temporaryProof:s}=e;return!i&&!t&&!r&&!s?null:new n({verificationId:t,verificationCode:i,phoneNumber:r,temporaryProof:s})}};function mh(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function gh(n){let e=Je(Qe(n)).link,t=e?Je(Qe(e)).deep_link_id:null,i=Je(Qe(n)).deep_link_id;return(i?Je(Qe(i)).link:null)||i||t||e||n}var On=class n{constructor(e){var t,i,r,s,o,a;let c=Je(Qe(e)),l=(t=c.apiKey)!==null&&t!==void 0?t:null,h=(i=c.oobCode)!==null&&i!==void 0?i:null,u=mh((r=c.mode)!==null&&r!==void 0?r:null);m(l&&h&&u,"argument-error"),this.apiKey=l,this.operation=u,this.code=h,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){let t=gh(e);try{return new n(t)}catch{return null}}};var et=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Ot._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let i=On.parseLink(t);return m(i,"argument-error"),Ot._fromEmailAndCode(e,i.code,i.tenantId)}};et.PROVIDER_ID="password";et.EMAIL_PASSWORD_SIGN_IN_METHOD="password";et.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Lt=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var Me=class extends Lt{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var xt=class n extends Me{constructor(){super("facebook.com")}static credential(e){return xe._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};xt.FACEBOOK_SIGN_IN_METHOD="facebook.com";xt.PROVIDER_ID="facebook.com";var tt=class n extends Me{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return xe._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return n.credential(t,i)}catch{return null}}};tt.GOOGLE_SIGN_IN_METHOD="google.com";tt.PROVIDER_ID="google.com";var Mt=class n extends Me{constructor(){super("github.com")}static credential(e){return xe._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Mt.GITHUB_SIGN_IN_METHOD="github.com";Mt.PROVIDER_ID="github.com";var Ft=class n extends Me{constructor(){super("twitter.com")}static credential(e,t){return xe._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return n.credential(t,i)}catch{return null}}};Ft.TWITTER_SIGN_IN_METHOD="twitter.com";Ft.PROVIDER_ID="twitter.com";async function vh(n,e){return Ie(n,"POST","/v1/accounts:signUp",P(n,e))}var Fe=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,r=!1){let s=await Ze._fromIdTokenResponse(e,i,r),o=jo(i);return new n({user:s,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);let r=jo(i);return new n({user:e,providerId:r,_tokenResponse:i,operationType:t})}};function jo(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}async function ya(n){var e;if(Y(n.app))return Promise.reject(ye(n));let t=We(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new Fe({user:t.currentUser,providerId:null,operationType:"signIn"});let i=await vh(t,{returnSecureToken:!0}),r=await Fe._fromIdTokenResponse(t,"signIn",i,!0);return await t._updateCurrentUser(r.user),r}var dr=class n extends z{constructor(e,t,i,r){var s;super(t.code,t.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,r){return new n(e,t,i,r)}};function Ia(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?dr._fromErrorAndOperation(n,s,e,i):s})}async function yh(n,e,t=!1){let i=await Pt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Fe._forOperation(n,"link",i)}async function Ih(n,e,t=!1){let{auth:i}=n;if(Y(i.app))return Promise.reject(ye(i));let r="reauthenticate";try{let s=await Pt(n,Ia(i,r,e,n),t);m(s.idToken,i,"internal-error");let o=Tr(s.idToken);m(o,i,"internal-error");let{sub:a}=o;return m(n.uid===a,i,"user-mismatch"),Fe._forOperation(n,r,s)}catch(s){throw s?.code==="auth/user-not-found"&&H(i,"user-mismatch"),s}}async function Eh(n,e,t=!1){if(Y(n.app))return Promise.reject(ye(n));let i="signIn",r=await Ia(n,i,e),s=await Fe._fromIdTokenResponse(n,i,r);return t||await n._updateCurrentUser(s.user),s}function Ea(n,e,t,i){return O(n).onIdTokenChanged(e,t,i)}function wa(n,e,t){return O(n).beforeAuthStateChanged(e,t)}function Ta(n,e,t,i){return O(n).onAuthStateChanged(e,t,i)}function Ca(n){return O(n).signOut()}function wh(n,e){return M(n,"POST","/v2/accounts/mfaEnrollment:start",P(n,e))}function Th(n,e){return M(n,"POST","/v2/accounts/mfaEnrollment:finalize",P(n,e))}function Ch(n,e){return M(n,"POST","/v2/accounts/mfaEnrollment:start",P(n,e))}function bh(n,e){return M(n,"POST","/v2/accounts/mfaEnrollment:finalize",P(n,e))}var Dn="__sak";var Ln=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Dn,"1"),this.storage.removeItem(Dn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};function Sh(){let n=D();return Cr(n)||Kn(n)}var Ah=1e3,Rh=10,xn=class extends Ln{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Sh()&&Yu(),this.fallbackToPolling=fa(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let i=this.storage.getItem(t),r=this.localCache[t];i!==r&&e(t,r,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}let i=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let o=this.storage.getItem(i);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(i,e.newValue):this.storage.removeItem(i);else if(this.localCache[i]===e.newValue&&!t)return}let r=()=>{let o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},s=this.storage.getItem(i);Ku()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Rh):r()}notifyListeners(e,t){this.localCache[e]=t;let i=this.listeners[e];if(i)for(let r of Array.from(i))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Ah)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};xn.type="LOCAL";var ba=xn;var Mn=class extends Ln{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Mn.type="SESSION";var Sr=Mn;function Nh(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Fn=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;let i=new n(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:i,eventType:r,data:s}=t.data,o=this.handlersMap[r];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:r});let a=Array.from(o).map(async l=>l(t.origin,s)),c=await Nh(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Fn.receivers=[];function Ar(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}var fr=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){let r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{let l=Ar("",20);r.port1.start();let h=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:r,onMessage(u){let d=u;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(d.data.response);break;default:clearTimeout(h),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function ne(){return window}function Ph(n){ne().location.href=n}function Sa(){return typeof ne().WorkerGlobalScope<"u"&&typeof ne().importScripts=="function"}async function kh(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Oh(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Dh(){return Sa()?self:null}var Aa="firebaseLocalStorageDb",Lh=1,Un="firebaseLocalStorage",Ra="fbase_key",Ue=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Jn(n,e){return n.transaction([Un],e?"readwrite":"readonly").objectStore(Un)}function xh(){let n=indexedDB.deleteDatabase(Aa);return new Ue(n).toPromise()}function pr(){let n=indexedDB.open(Aa,Lh);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let i=n.result;try{i.createObjectStore(Un,{keyPath:Ra})}catch(r){t(r)}}),n.addEventListener("success",async()=>{let i=n.result;i.objectStoreNames.contains(Un)?e(i):(i.close(),await xh(),e(await pr()))})})}async function Go(n,e,t){let i=Jn(n,!0).put({[Ra]:e,value:t});return new Ue(i).toPromise()}async function Mh(n,e){let t=Jn(n,!1).get(e),i=await new Ue(t).toPromise();return i===void 0?null:i.value}function qo(n,e){let t=Jn(n,!0).delete(e);return new Ue(t).toPromise()}var Fh=800,Uh=3,Wn=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await pr(),this.db)}async _withRetries(e){let t=0;for(;;)try{let i=await this._openDb();return await e(i)}catch(i){if(t++>Uh)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Sa()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Fn._getInstance(Dh()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await kh(),!this.activeServiceWorker)return;this.sender=new fr(this.activeServiceWorker);let i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Oh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await pr();return await Go(e,Dn,"1"),await qo(e,Dn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Go(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(i=>Mh(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>qo(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(r=>{let s=Jn(r,!1).getAll();return new Ue(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],i=new Set;if(e.length!==0)for(let{fbase_key:r,value:s}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),t.push(r));for(let r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;let i=this.listeners[e];if(i)for(let r of Array.from(i))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Fh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Wn.type="LOCAL";var Na=Wn;function Wh(n,e){return M(n,"POST","/v2/accounts/mfaSignIn:start",P(n,e))}function Vh(n,e){return M(n,"POST","/v2/accounts/mfaSignIn:finalize",P(n,e))}function Bh(n,e){return M(n,"POST","/v2/accounts/mfaSignIn:finalize",P(n,e))}var Z_=ma("rcb"),em=new De(3e4,6e4);var Hh="recaptcha";async function jh(n,e,t){var i;let r=await t.verify();try{m(typeof r=="string",n,"argument-error"),m(t.type===Hh,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let o=s.session;if("phoneNumber"in s)return m(o.type==="enroll",n,"internal-error"),(await wh(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:r}})).phoneSessionInfo.sessionInfo;{m(o.type==="signin",n,"internal-error");let a=((i=s.multiFactorHint)===null||i===void 0?void 0:i.uid)||s.multiFactorUid;return m(a,n,"missing-multi-factor-info"),(await Wh(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:r}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:o}=await hh(n,{phoneNumber:s.phoneNumber,recaptchaToken:r});return o}}finally{t._reset()}}var Ut=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=We(e)}verifyPhoneNumber(e,t){return jh(this.auth,e,O(t))}static credential(e,t){return Dt._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:i}=e;return t&&i?Dt._fromTokenResponse(t,i):null}};Ut.PROVIDER_ID="phone";Ut.PHONE_SIGN_IN_METHOD="phone";function Pa(n,e){return e?ce(e):(m(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Wt=class extends Le{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Xe(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Xe(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Xe(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Gh(n){return Eh(n.auth,new Wt(n),n.bypassAuthState)}function qh(n){let{auth:e,user:t}=n;return m(t,e,"internal-error"),Ih(t,new Wt(n),n.bypassAuthState)}async function zh(n){let{auth:e,user:t}=n;return m(t,e,"internal-error"),yh(t,new Wt(n),n.bypassAuthState)}var Vn=class{constructor(e,t,i,r,s=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:i,postBody:r,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}let c={auth:this.auth,requestUri:t,sessionId:i,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Gh;case"linkViaPopup":case"linkViaRedirect":return zh;case"reauthViaPopup":case"reauthViaRedirect":return qh;default:H(this.auth,"internal-error")}}resolve(e){le(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){le(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var $h=new De(2e3,1e4);async function ka(n,e,t){if(Y(n.app))return Promise.reject(J(n,"operation-not-supported-in-this-environment"));let i=We(n);Lu(n,e,Lt);let r=Pa(i,t);return new Bn(i,"signInViaPopup",e,r).executeNotNull()}var Bn=class n extends Vn{constructor(e,t,i,r,s){super(e,t,r,s),this.provider=i,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return m(e,this.auth,"internal-error"),e}async onExecution(){le(this.filter.length===1,"Popup operations only handle one event");let e=Ar();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(J(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(J(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(J(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,$h.get())};e()}};Bn.currentPopupAction=null;var Kh="pendingRedirect",Cn=new Map,_r=class extends Vn{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Cn.get(this.auth._key());if(!e){try{let i=await Yh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Cn.set(this.auth._key(),e)}return this.bypassAuthState||Cn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function Yh(n,e){let t=Xh(e),i=Qh(n);if(!await i._isAvailable())return!1;let r=await i._get(t)==="true";return await i._remove(t),r}function Jh(n,e){Cn.set(n._key(),e)}function Qh(n){return ce(n._redirectPersistence)}function Xh(n){return Tn(Kh,n.config.apiKey,n.name)}async function Zh(n,e,t=!1){if(Y(n.app))return Promise.reject(ye(n));let i=We(n),r=Pa(i,e),o=await new _r(i,r,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}var ed=10*60*1e3,mr=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!td(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Oa(e)){let r=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(J(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ed&&this.cachedEventUids.clear(),this.cachedEventUids.has(zo(e))}saveEventToCache(e){this.cachedEventUids.add(zo(e)),this.lastProcessedEventTime=Date.now()}};function zo(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Oa({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function td(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Oa(n);default:return!1}}async function nd(n,e={}){return M(n,"GET","/v1/projects",e)}var id=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,rd=/^https?/;async function sd(n){if(n.config.emulator)return;let{authorizedDomains:e}=await nd(n);for(let t of e)try{if(od(t))return}catch{}H(n,"unauthorized-domain")}function od(n){let e=ir(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!rd.test(t))return!1;if(id.test(n))return i===n;let r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}var ad=new De(3e4,6e4);function $o(){let n=ne().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function cd(n){return new Promise((e,t)=>{var i,r,s;function o(){$o(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{$o(),t(J(n,"network-request-failed"))},timeout:ad.get()})}if(!((r=(i=ne().gapi)===null||i===void 0?void 0:i.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((s=ne().gapi)===null||s===void 0)&&s.load)o();else{let a=ma("iframefcb");return ne()[a]=()=>{gapi.load?o():t(J(n,"network-request-failed"))},_a(`${eh()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw bn=null,e})}var bn=null;function ld(n){return bn=bn||cd(n),bn}var ud=new De(5e3,15e3),hd="__/auth/iframe",dd="emulator/auth/iframe",fd={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},pd=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function _d(n){let e=n.config;m(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?wr(e,dd):`https://${n.config.authDomain}/${hd}`,i={apiKey:e.apiKey,appName:n.name,v:ge},r=pd.get(n.config.apiHost);r&&(i.eid=r);let s=n._getFrameworks();return s.length&&(i.fw=s.join(",")),`${t}?${fe(i).slice(1)}`}async function md(n){let e=await ld(n),t=ne().gapi;return m(t,n,"internal-error"),e.open({where:document.body,url:_d(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:fd,dontclear:!0},i=>new Promise(async(r,s)=>{await i.restyle({setHideOnLeave:!1});let o=J(n,"network-request-failed"),a=ne().setTimeout(()=>{s(o)},ud.get());function c(){ne().clearTimeout(a),r(i)}i.ping(c).then(c,()=>{s(o)})}))}var gd={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},vd=500,yd=600,Id="_blank",Ed="http://localhost",Hn=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function wd(n,e,t,i=vd,r=yd){let s=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString(),a="",c=Object.assign(Object.assign({},gd),{width:i.toString(),height:r.toString(),top:s,left:o}),l=D().toLowerCase();t&&(a=ca(l)?Id:t),aa(l)&&(e=e||Ed,c.scrollbars="yes");let h=Object.entries(c).reduce((d,[p,_])=>`${d}${p}=${_},`,"");if($u(l)&&a!=="_self")return Td(e||"",a),new Hn(null);let u=window.open(e||"",a,h);m(u,n,"popup-blocked");try{u.focus()}catch{}return new Hn(u)}function Td(n,e){let t=document.createElement("a");t.href=n,t.target=e;let i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}var Cd="__/auth/handler",bd="emulator/auth/handler",Sd=encodeURIComponent("fac");async function Ko(n,e,t,i,r,s){m(n.config.authDomain,n,"auth-domain-config-required"),m(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:ge,eventId:r};if(e instanceof Lt){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",It(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[h,u]of Object.entries(s||{}))o[h]=u}if(e instanceof Me){let h=e.getScopes().filter(u=>u!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);let a=o;for(let h of Object.keys(a))a[h]===void 0&&delete a[h];let c=await n._getAppCheckToken(),l=c?`#${Sd}=${encodeURIComponent(c)}`:"";return`${Ad(n)}?${fe(a).slice(1)}${l}`}function Ad({config:n}){return n.emulator?wr(n,bd):`https://${n.authDomain}/${Cd}`}var nr="webStorageSupport",gr=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Sr,this._completeRedirectFn=Zh,this._overrideRedirectResult=Jh}async _openPopup(e,t,i,r){var s;le((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await Ko(e,t,i,ir(),r);return wd(e,o,Ar())}async _openRedirect(e,t,i,r){await this._originValidation(e);let s=await Ko(e,t,i,ir(),r);return Ph(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:r,promise:s}=this.eventManagers[t];return r?Promise.resolve(r):(le(s,"If manager is not set, promise should be"),s)}let i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){let t=await md(e),i=new mr(e);return t.register("authEvent",r=>(m(r?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(nr,{type:nr},r=>{var s;let o=(s=r?.[0])===null||s===void 0?void 0:s[nr];o!==void 0&&t(!!o),H(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=sd(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return fa()||Cr()||Kn()}},Da=gr,jn=class{constructor(e){this.factorId=e}_process(e,t,i){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,i);case"signin":return this._finalizeSignIn(e,t.credential);default:return te("unexpected MultiFactorSessionType")}}},vr=class n extends jn{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,i){return Th(e,{idToken:t,displayName:i,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Vh(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Gn=class{constructor(){}static assertion(e){return vr._fromCredential(e)}};Gn.FACTOR_ID="phone";var qn=class{static assertionForEnrollment(e,t){return zn._fromSecret(e,t)}static assertionForSignIn(e,t){return zn._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let i=e;m(typeof((t=i.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let r=await Ch(i.user.auth,{idToken:i.credential,totpEnrollmentInfo:{}});return $n._fromStartTotpMfaEnrollmentResponse(r,i.user.auth)}};qn.FACTOR_ID="totp";var zn=class n extends jn{constructor(e,t,i){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=i}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,i){return m(typeof this.secret<"u",e,"argument-error"),bh(e,{idToken:t,displayName:i,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){m(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let i={verificationCode:this.otp};return Bh(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:i})}},$n=class n{constructor(e,t,i,r,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=i,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var i;let r=!1;return(En(e)||En(t))&&(r=!0),r&&(En(e)&&(e=((i=this.auth.currentUser)===null||i===void 0?void 0:i.email)||"unknownuser"),En(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function En(n){return typeof n>"u"||n?.length===0}var Yo="@firebase/auth",Jo="1.7.4";var yr=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){m(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Rd(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Nd(n){me(new B("auth",(e,{options:t})=>{let i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;m(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});let c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:pa(n)},l=new ur(i,r,s,c);return ih(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),me(new B("auth-internal",e=>{let t=We(e.getProvider("auth").getImmediate());return(i=>new yr(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),K(Yo,Jo,Rd(n)),K(Yo,Jo,"esm2017")}var Pd=5*60,kd=Bi("authIdTokenMaxAge")||Pd,Qo=null,Od=n=>async e=>{let t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>kd)return;let r=t?.token;Qo!==r&&(Qo=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function La(n=yn()){let e=St(n,"auth");if(e.isInitialized())return e.getImmediate();let t=ga(n,{popupRedirectResolver:Da,persistence:[Na,ba,Sr]}),i=Bi("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(i,location.origin);if(location.origin===s.origin){let o=Od(s.toString());wa(t,o,()=>o(t.currentUser)),Ea(t,a=>o(a))}}let r=Wi("auth");return r&&br(t,`http://${r}`),t}function Dd(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Xu({loadJS(n){return new Promise((e,t)=>{let i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=r=>{let s=J("internal-error");s.customData=r,t(s)},i.type="text/javascript",i.charset="UTF-8",Dd().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Nd("Browser");var xa="@firebase/database",Ma="1.0.5";var Ps="";function Ld(n){Ps=n}var xr=class{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),N(t))}get(e){let t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Ke(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}};var Mr=class{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return $(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}};var fc=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){let e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new xr(e)}}catch{}return new Mr},Be=fc("localStorage"),Fr=fc("sessionStorage");var rt=new pe("@firebase/database"),xd=function(){let n=1;return function(){return n++}}(),pc=function(n){let e=yo(n),t=new fn;t.update(e);let i=t.digest();return pn.encodeByteArray(i)},on=function(...n){let e="";for(let t=0;t<n.length;t++){let i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=on.apply(null,i):typeof i=="object"?e+=N(i):e+=i,e+=" "}return e},He=null,Fa=!0,Md=function(n,e){f(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(rt.logLevel=T.VERBOSE,He=rt.log.bind(rt),e&&Fr.set("logging_enabled",!0)):typeof n=="function"?He=n:(He=null,Fr.remove("logging_enabled"))},L=function(...n){if(Fa===!0&&(Fa=!1,He===null&&Fr.get("logging_enabled")===!0&&Md(!0)),He){let e=on.apply(null,n);He(e)}},an=function(n){return function(...e){L(n,...e)}},Ur=function(...n){let e="FIREBASE INTERNAL ERROR: "+on(...n);rt.error(e)},he=function(...n){let e=`FIREBASE FATAL ERROR: ${on(...n)}`;throw rt.error(e),new Error(e)},W=function(...n){let e="FIREBASE WARNING: "+on(...n);rt.warn(e)},Fd=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&W("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},ks=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Ud=function(n){if(Z()||document.readyState==="complete")n();else{let e=!1,t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ot="[MIN_NAME]",je="[MAX_NAME]",ze=function(n,e){if(n===e)return 0;if(n===ot||e===je)return-1;if(e===ot||n===je)return 1;{let t=Ua(n),i=Ua(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Wd=function(n,e){return n===e?0:n<e?-1:1},Vt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+N(e))},Os=function(n){if(typeof n!="object"||n===null)return N(n);let e=[];for(let i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=N(e[i]),t+=":",t+=Os(n[e[i]]);return t+="}",t},_c=function(n,e){let t=n.length;if(t<=e)return[n];let i=[];for(let r=0;r<t;r+=e)r+e>t?i.push(n.substring(r,t)):i.push(n.substring(r,r+e));return i};function x(n,e){for(let t in n)n.hasOwnProperty(t)&&e(t,n[t])}var mc=function(n){f(!ks(n),"Invalid JSON number");let e=11,t=52,i=(1<<e-1)-1,r,s,o,a,c;n===0?(s=0,o=0,r=1/n===-1/0?1:0):(r=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),s=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(s=0,o=Math.round(n/Math.pow(2,1-i-t))));let l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(s%2?1:0),s=Math.floor(s/2);l.push(r?1:0),l.reverse();let h=l.join(""),u="";for(c=0;c<64;c+=8){let d=parseInt(h.substr(c,8),2).toString(16);d.length===1&&(d="0"+d),u=u+d}return u.toLowerCase()},Vd=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Bd=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Hd(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");let i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}var jd=new RegExp("^-?(0*)\\d{1,10}$"),Gd=-2147483648,qd=2147483647,Ua=function(n){if(jd.test(n)){let e=Number(n);if(e>=Gd&&e<=qd)return e}return null},pt=function(n){try{n()}catch(e){setTimeout(()=>{let t=e.stack||"";throw W("Exception was thrown by user callback.",t),e},Math.floor(0))}},zd=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Gt=function(n,e){let t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};var Wr=class{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){W(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}};var Vr=class{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(L("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',W(e)}},we=class{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}};we.OWNER="owner";var Xn="5",gc="v",vc="s",yc="r",Ic="f",Ec=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,wc="ls",Tc="p",Br="ac",Cc="websocket",bc="long_polling";var Zn=class{constructor(e,t,i,r,s=!1,o="",a=!1,c=!1){this.secure=t,this.namespace=i,this.webSocketOnly=r,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Be.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Be.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){let e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}};function $d(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Sc(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===Cc)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===bc)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);$d(n)&&(t.ns=n.namespace);let r=[];return x(t,(s,o)=>{r.push(s+"="+o)}),i+r.join("&")}var Hr=class{constructor(){this.counters_={}}incrementCounter(e,t=1){$(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return oo(this.counters_)}};var Rr={},Nr={};function Ds(n){let e=n.toString();return Rr[e]||(Rr[e]=new Hr),Rr[e]}function Kd(n,e){let t=n.toString();return Nr[t]||(Nr[t]=e()),Nr[t]}var jr=class{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){let i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<i.length;++r)i[r]&&pt(()=>{this.onMessage_(i[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}};var Wa="start",Yd="close",Jd="pLPCommand",Qd="pRTLPCB",Ac="id",Rc="pw",Nc="ser",Xd="cb",Zd="seg",ef="ts",tf="d",nf="dframe",Pc=1870,kc=30,rf=Pc-kc,sf=25e3,of=3e4,Gr=class n{constructor(e,t,i,r,s,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=r,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=an(e),this.stats_=Ds(t),this.urlFn=c=>(this.appCheckToken&&(c[Br]=this.appCheckToken),Sc(t,bc,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new jr(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(of)),Ud(()=>{if(this.isClosed_)return;this.scriptTagHolder=new qr((...s)=>{let[o,a,c,l,h]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Wa)this.id=a,this.password=c;else if(o===Yd)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{let[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);let i={};i[Wa]="t",i[Nc]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Xd]=this.scriptTagHolder.uniqueCallbackIdentifier),i[gc]=Xn,this.transportSessionId&&(i[vc]=this.transportSessionId),this.lastSessionId&&(i[wc]=this.lastSessionId),this.applicationId&&(i[Tc]=this.applicationId),this.appCheckToken&&(i[Br]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ec.test(location.hostname)&&(i[yc]=Ic);let r=this.urlFn(i);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){n.forceAllow_=!0}static forceDisallow(){n.forceDisallow_=!0}static isAvailable(){return Z()?!1:n.forceAllow_?!0:!n.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Vd()&&!Bd()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){let t=N(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);let i=Fi(t),r=_c(i,rf);for(let s=0;s<r.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[s]),this.curSegmentNum++}addDisconnectPingFrame(e,t){if(Z())return;this.myDisconnFrame=document.createElement("iframe");let i={};i[nf]="t",i[Ac]=e,i[Rc]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){let t=N(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}},qr=class n{constructor(e,t,i,r){if(this.onDisconnect=i,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0,Z())this.commandCB=e,this.onMessageCB=t;else{this.uniqueCallbackIdentifier=xd(),window[Jd+this.uniqueCallbackIdentifier]=e,window[Qd+this.uniqueCallbackIdentifier]=t,this.myIFrame=n.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');let o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){L("frame writing exception"),a.stack&&L(a.stack),L(a)}}}static createIFrame_(){let e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||L("No IE domain setting required")}catch{let i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));let e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;let e={};e[Ac]=this.myID,e[Rc]=this.myPW,e[Nc]=this.currentSerial;let t=this.urlFn(e),i="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+kc+i.length<=Pc;){let o=this.pendingSegs.shift();i=i+"&"+Zd+r+"="+o.seg+"&"+ef+r+"="+o.ts+"&"+tf+r+"="+o.d,r++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);let i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(i,Math.floor(sf)),s=()=>{clearTimeout(r),i()};this.addTag(e,s)}addTag(e,t){Z()?this.doNodeLongPoll(e,t):setTimeout(()=>{try{if(!this.sendNewPolls)return;let i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){let r=i.readyState;(!r||r==="loaded"||r==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{L("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}};var af=16384,cf=45e3,ei=null;typeof MozWebSocket<"u"?ei=MozWebSocket:typeof WebSocket<"u"&&(ei=WebSocket);var ue=class n{constructor(e,t,i,r,s,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=r,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=an(this.connId),this.stats_=Ds(t),this.connURL=n.connectionURL_(t,o,a,r,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,r,s){let o={};return o[gc]=Xn,!Z()&&typeof location<"u"&&location.hostname&&Ec.test(location.hostname)&&(o[yc]=Ic),t&&(o[vc]=t),i&&(o[wc]=i),r&&(o[Br]=r),s&&(o[Tc]=s),Sc(e,Cc,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Be.set("previous_websocket_failure",!0);try{let i;if(Z()){let r=this.nodeAdmin?"AdminNode":"Node";i={headers:{"User-Agent":`Firebase/${Xn}/${Ps}/${process.platform}/${r}`,"X-Firebase-GMPID":this.applicationId||""}},this.authToken&&(i.headers.Authorization=`Bearer ${this.authToken}`),this.appCheckToken&&(i.headers["X-Firebase-AppCheck"]=this.appCheckToken);let s=process.env,o=this.connURL.indexOf("wss://")===0?s.HTTPS_PROXY||s.https_proxy:s.HTTP_PROXY||s.http_proxy;o&&(i.proxy={origin:o})}this.mySock=new ei(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");let r=i.message||i.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");let r=i.message||i.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){n.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){let t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&ei!==null&&!n.forceDisallow_}static previouslyFailed(){return Be.isInMemoryStorage||Be.get("previous_websocket_failure")===!0}markConnectionHealthy(){Be.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){let t=this.frames.join("");this.frames=null;let i=Ke(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){let t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;let t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{let i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();let t=N(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);let i=_c(t,af);i.length>1&&this.sendString_(String(i.length));for(let r=0;r<i.length;r++)this.sendString_(i[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(cf))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}};ue.responsesRequiredToBeHealthy=2;ue.healthyTimeout=3e4;var ti=class n{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Gr,ue]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){let t=ue&&ue.isAvailable(),i=t&&!ue.previouslyFailed();if(e.webSocketOnly&&(t||W("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ue];else{let r=this.transports_=[];for(let s of n.ALL_TRANSPORTS)s&&s.isAvailable()&&r.push(s);n.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}};ti.globalTransportInitialized_=!1;var lf=6e4,uf=5e3,hf=10*1024,df=100*1024,Pr="t",Va="d",ff="s",Ba="r",pf="e",Ha="o",ja="a",Ga="n",qa="p",_f="h",zr=class{constructor(e,t,i,r,s,o,a,c,l,h){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=r,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=an("c:"+this.id+":"),this.transportManager_=new ti(t),this.log_("Connection created"),this.start_()}start_(){let e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));let r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=Gt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>df?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>hf?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){let t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Pr in e){let t=e[Pr];t===ja?this.upgradeIfSecondaryHealthy_():t===Ba?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Ha&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){let t=Vt("t",e),i=Vt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:qa,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ja,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ga,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){let t=Vt("t",e),i=Vt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){let t=Vt(Pr,e);if(Va in e){let i=e[Va];if(t===_f){let r=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(t===Ga){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===ff?this.onConnectionShutdown_(i):t===Ba?this.onReset_(i):t===pf?Ur("Server Error: "+i):t===Ha?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ur("Unknown control packet command: "+t)}}onHandshake_(e){let t=e.ts,i=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Xn!==i&&W("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){let e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Gt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(lf))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Gt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(uf))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:qa,d:{}}}))}onSecondaryConnectionLost_(){let e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Be.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}};var ni=class{put(e,t,i,r){}merge(e,t,i,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}};var ii=class{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){let i=[...this.listeners_[e]];for(let r=0;r<i.length;r++)i[r].callback.apply(i[r].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});let r=this.getInitialEvent(e);r&&t.apply(i,r)}off(e,t,i){this.validateEventType_(e);let r=this.listeners_[e]||[];for(let s=0;s<r.length;s++)if(r[s].callback===t&&(!i||i===r[s].context)){r.splice(s,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}};var ri=class n extends ii{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!yt()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new n}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}};var za=32,$a=768,C=class{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[i]=this.pieces_[r],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}};function E(){return new C("")}function v(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function be(n){return n.pieces_.length-n.pieceNum_}function b(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new C(n.pieces_,e)}function Ls(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function mf(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Kt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Oc(n){if(n.pieceNum_>=n.pieces_.length)return null;let e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new C(e,0)}function S(n,e){let t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof C)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{let i=e.split("/");for(let r=0;r<i.length;r++)i[r].length>0&&t.push(i[r])}return new C(t,0)}function I(n){return n.pieceNum_>=n.pieces_.length}function U(n,e){let t=v(n),i=v(e);if(t===null)return e;if(t===i)return U(b(n),b(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function gf(n,e){let t=Kt(n,0),i=Kt(e,0);for(let r=0;r<t.length&&r<i.length;r++){let s=ze(t[r],i[r]);if(s!==0)return s}return t.length===i.length?0:t.length<i.length?-1:1}function xs(n,e){if(be(n)!==be(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function j(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(be(n)>be(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}var $r=class{constructor(e,t){this.errorPrefix_=t,this.parts_=Kt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Tt(this.parts_[i]);Dc(this)}};function vf(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Tt(e),Dc(n)}function yf(n){let e=n.parts_.pop();n.byteLength_-=Tt(e),n.parts_.length>0&&(n.byteLength_-=1)}function Dc(n){if(n.byteLength_>$a)throw new Error(n.errorPrefix_+"has a key path longer than "+$a+" bytes ("+n.byteLength_+").");if(n.parts_.length>za)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+za+") or object contains a cycle "+Ve(n))}function Ve(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}var Kr=class n extends ii{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{let i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new n}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}};var Bt=1e3,If=60*5*1e3,Ka=30*1e3,Ef=1.3,wf=3e4,Tf="server_kill",Ya=3,Ge=class n extends ni{constructor(e,t,i,r,s,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=r,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=n.nextPersistentConnectionId_++,this.log_=an("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Bt,this.maxReconnectDelay_=If,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c&&!Z())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Kr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ri.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){let r=++this.requestNumber_,s={r,a:e,b:t};this.log_(N(s)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),i&&(this.requestCBHash_[r]=i)}get(e){this.initConnection_();let t=new oe,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{let a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;let s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),t.promise}listen(e,t,i,r){this.initConnection_();let s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");let a={onComplete:r,hashFn:t,query:e,tag:i};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){let t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){let t=e.query,i=t._path.toString(),r=t._queryIdentifier;this.log_("Listen on "+i+" for "+r);let s={p:i},o="q";e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{let c=a.d,l=a.s;n.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(r))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,r),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&$(e,"w")){let i=Pe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){let r='".indexOn": "'+t._queryParams.getIndex().toString()+'"',s=t._path.toString();W(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||go(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ka)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){let e=this.authToken_,t=mo(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,r=>{let s=r.s,o=r.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{let t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){let i=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+r),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,r)&&this.connected_&&this.sendUnlisten_(i,r,e._queryObject,t)}sendUnlisten_(e,t,i,r){this.log_("Unlisten on "+e+" for "+t);let s={p:e},o="n";r&&(s.q=i,s.t=r),this.sendRequest(o,s)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,r){let s={p:t,d:i};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,t,i,r){this.putInternal("p",e,t,i,r)}merge(e,t,i,r){this.putInternal("m",e,t,i,r)}putInternal(e,t,i,r,s){this.initConnection_();let o={p:t,d:i};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;let a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){let t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,s=>{this.log_(t+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(s.s,s.d)})}reportStats(e){if(this.connected_){let t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){let s=i.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+N(e));let t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Ur("Unrecognized action received from server: "+N(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Bt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Bt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>wf&&(this.reconnectDelay_=Bt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());let e=new Date().getTime()-this.lastConnectionAttemptTime_,t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Ef)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;let e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+n.nextConnectionId_++,s=this.lastSessionId,o=!1,a=null,c=function(){a?a.close():(o=!0,i())},l=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:c,sendRequest:l};let h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{let[u,d]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?L("getToken() completed but was canceled"):(L("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=d&&d.token,a=new zr(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{W(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Tf)},s))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&W(u),c())}}}interrupt(e){L("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){L("Resuming connection for reason: "+e),delete this.interruptReasons_[e],It(this.interruptReasons_)&&(this.reconnectDelay_=Bt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){let t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){let t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(s=>Os(s)).join("$"):i="default";let r=this.removeListen_(e,i);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,t){let i=new C(e).toString(),r;if(this.listens.has(i)){let s=this.listens.get(i);r=s.get(t),s.delete(t),s.size===0&&this.listens.delete(i)}else r=void 0;return r}onAuthRevoked_(e,t){L("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ya&&(this.reconnectDelay_=Ka,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){L("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ya&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(let e of this.listens.values())for(let t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){let e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){let e={},t="js";Z()&&(this.repoInfo_.nodeAdmin?t="admin_node":t="node"),e["sdk."+t+"."+Ps.replace(/\./g,"-")]=1,yt()?e["framework.cordova"]=1:_n()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){let e=ri.getInstance().currentlyOnline();return It(this.interruptReasons_)&&e}};Ge.nextPersistentConnectionId_=0;Ge.nextConnectionId_=0;var y=class n{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new n(e,t)}};var at=class{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){let i=new y(ot,e),r=new y(ot,t);return this.compare(i,r)!==0}minPost(){return y.MIN}};var Qn,si=class extends at{static get __EMPTY_NODE(){return Qn}static set __EMPTY_NODE(e){Qn=e}compare(e,t){return ze(e.name,t.name)}isDefinedOn(e){throw Ne("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return y.MIN}maxPost(){return new y(je,Qn)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new y(e,Qn)}toString(){return".key"}},st=new si;var it=class{constructor(e,t,i,r,s=null){this.isReverse_=r,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}},F=class n{constructor(e,t,i,r,s){this.key=e,this.value=t,this.color=i??n.RED,this.left=r??G.EMPTY_NODE,this.right=s??G.EMPTY_NODE}copy(e,t,i,r,s){return new n(e??this.key,t??this.value,i??this.color,r??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let r=this,s=i(e,r.key);return s<0?r=r.copy(null,null,null,r.left.insert(e,t,i),null):s===0?r=r.copy(null,t,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,t,i)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return G.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,r;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return G.EMPTY_NODE;r=i.right.min_(),i=i.copy(r.key,r.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){let e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");let e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}};F.RED=!0;F.BLACK=!1;var Yr=class{copy(e,t,i,r,s){return this}insert(e,t,i){return new F(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}},G=class n{constructor(e,t=n.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new n(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,F.BLACK,null,null))}remove(e){return new n(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,F.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,r=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return r?r.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(r=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new it(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new it(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new it(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new it(this.root_,null,this.comparator_,!0,e)}};G.EMPTY_NODE=new Yr;function Cf(n,e){return ze(n.name,e.name)}function Ms(n,e){return ze(n,e)}var Jr;function bf(n){Jr=n}var Lc=function(n){return typeof n=="number"?"number:"+mc(n):"string:"+n},xc=function(n){if(n.isLeafNode()){let e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&$(e,".sv"),"Priority must be a string or number.")}else f(n===Jr||n.isEmpty(),"priority of unexpected type.");f(n===Jr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};var Ja,de=class n{constructor(e,t=n.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),xc(this.priorityNode_)}static set __childrenNodeConstructor(e){Ja=e}static get __childrenNodeConstructor(){return Ja}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new n(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:n.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return I(e)?this:v(e)===".priority"?this.priorityNode_:n.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:n.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){let i=v(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||be(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,n.__childrenNodeConstructor.EMPTY_NODE.updateChild(b(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Lc(this.priorityNode_.val())+":");let t=typeof this.value_;e+=t+":",t==="number"?e+=mc(this.value_):e+=this.value_,this.lazyHash_=pc(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===n.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof n.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){let t=typeof e.value_,i=typeof this.value_,r=n.VALUE_TYPE_ORDER.indexOf(t),s=n.VALUE_TYPE_ORDER.indexOf(i);return f(r>=0,"Unknown leaf type: "+t),f(s>=0,"Unknown leaf type: "+i),r===s?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){let t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}};de.VALUE_TYPE_ORDER=["object","boolean","number","string"];var Mc,Fc;function Sf(n){Mc=n}function Af(n){Fc=n}var Qr=class extends at{compare(e,t){let i=e.node.getPriority(),r=t.node.getPriority(),s=i.compareTo(r);return s===0?ze(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return y.MIN}maxPost(){return new y(je,new de("[PRIORITY-POST]",Fc))}makePost(e,t){let i=Mc(e);return new y(t,new de("[PRIORITY-POST]",i))}toString(){return".priority"}},A=new Qr;var Rf=Math.log(2),Xr=class{constructor(e){let t=s=>parseInt(Math.log(s)/Rf,10),i=s=>parseInt(Array(s+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;let r=i(this.count);this.bits_=e+1&r}nextBitIsOne(){let e=!(this.bits_&1<<this.current_);return this.current_--,e}},oi=function(n,e,t,i){n.sort(e);let r=function(c,l){let h=l-c,u,d;if(h===0)return null;if(h===1)return u=n[c],d=t?t(u):u,new F(d,u.node,F.BLACK,null,null);{let p=parseInt(h/2,10)+c,_=r(c,p),w=r(p+1,l);return u=n[p],d=t?t(u):u,new F(d,u.node,F.BLACK,_,w)}},s=function(c){let l=null,h=null,u=n.length,d=function(_,w){let R=u-_,se=u;u-=_;let Ae=r(R+1,se),Re=n[R],dn=t?t(Re):Re;p(new F(dn,Re.node,w,null,Ae))},p=function(_){l?(l.left=_,l=_):(h=_,l=_)};for(let _=0;_<c.count;++_){let w=c.nextBitIsOne(),R=Math.pow(2,c.count-(_+1));w?d(R,F.BLACK):(d(R,F.BLACK),d(R,F.RED))}return h},o=new Xr(n.length),a=s(o);return new G(i||e,a)};var kr,nt={},ct=class n{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return f(nt&&A,"ChildrenNode.ts has not been loaded"),kr=kr||new n({".priority":nt},{".priority":A}),kr}get(e){let t=Pe(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof G?t:null}hasIndex(e){return $(this.indexSet_,e.toString())}addIndex(e,t){f(e!==st,"KeyIndex always exists and isn't meant to be added to the IndexMap.");let i=[],r=!1,s=t.getIterator(y.Wrap),o=s.getNext();for(;o;)r=r||e.isDefinedOn(o.node),i.push(o),o=s.getNext();let a;r?a=oi(i,e.getCompare()):a=nt;let c=e.toString(),l=Object.assign({},this.indexSet_);l[c]=e;let h=Object.assign({},this.indexes_);return h[c]=a,new n(h,l)}addToIndexes(e,t){let i=Et(this.indexes_,(r,s)=>{let o=Pe(this.indexSet_,s);if(f(o,"Missing index implementation for "+s),r===nt)if(o.isDefinedOn(e.node)){let a=[],c=t.getIterator(y.Wrap),l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),oi(a,o.getCompare())}else return nt;else{let a=t.get(e.name),c=r;return a&&(c=c.remove(new y(e.name,a))),c.insert(e,e.node)}});return new n(i,this.indexSet_)}removeFromIndexes(e,t){let i=Et(this.indexes_,r=>{if(r===nt)return r;{let s=t.get(e.name);return s?r.remove(new y(e.name,s)):r}});return new n(i,this.indexSet_)}};var Ht,g=class n{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&xc(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Ht||(Ht=new n(new G(Ms),null,ct.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ht}updatePriority(e){return this.children_.isEmpty()?this:new n(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{let t=this.children_.get(e);return t===null?Ht:t}}getChild(e){let t=v(e);return t===null?this:this.getImmediateChild(t).getChild(b(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{let i=new y(e,t),r,s;t.isEmpty()?(r=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(i,this.children_)):(r=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(i,this.children_));let o=r.isEmpty()?Ht:this.priorityNode_;return new n(r,o,s)}}updateChild(e,t){let i=v(e);if(i===null)return t;{f(v(e)!==".priority"||be(e)===1,".priority must be the last token in a path");let r=this.getImmediateChild(i).updateChild(b(e),t);return this.updateImmediateChild(i,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;let t={},i=0,r=0,s=!0;if(this.forEachChild(A,(o,a)=>{t[o]=a.val(e),i++,s&&n.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):s=!1}),!e&&s&&r<2*i){let o=[];for(let a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Lc(this.getPriority().val())+":"),this.forEachChild(A,(t,i)=>{let r=i.hash();r!==""&&(e+=":"+t+":"+r)}),this.lazyHash_=e===""?"":pc(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){let r=this.resolveIndex_(i);if(r){let s=r.getPredecessorKey(new y(e,t));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){let t=this.resolveIndex_(e);if(t){let i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){let t=this.getFirstChildName(e);return t?new y(t,this.children_.get(t)):null}getLastChildName(e){let t=this.resolveIndex_(e);if(t){let i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){let t=this.getLastChildName(e);return t?new y(t,this.children_.get(t)):null}forEachChild(e,t){let i=this.resolveIndex_(e);return i?i.inorderTraversal(r=>t(r.name,r.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){let i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,r=>r);{let r=this.children_.getIteratorFrom(e.name,y.Wrap),s=r.peek();for(;s!=null&&t.compare(s,e)<0;)r.getNext(),s=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){let i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,r=>r);{let r=this.children_.getReverseIteratorFrom(e.name,y.Wrap),s=r.peek();for(;s!=null&&t.compare(s,e)>0;)r.getNext(),s=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===cn?-1:0}withIndex(e){if(e===st||this.indexMap_.hasIndex(e))return this;{let t=this.indexMap_.addIndex(e,this.children_);return new n(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===st||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{let t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){let i=this.getIterator(A),r=t.getIterator(A),s=i.getNext(),o=r.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=i.getNext(),o=r.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===st?null:this.indexMap_.get(e.toString())}};g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;var Zr=class extends g{constructor(){super(new G(Ms),g.EMPTY_NODE,ct.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}},cn=new Zr;Object.defineProperties(y,{MIN:{value:new y(ot,g.EMPTY_NODE)},MAX:{value:new y(je,cn)}});si.__EMPTY_NODE=g.EMPTY_NODE;de.__childrenNodeConstructor=g;bf(cn);Af(cn);var Nf=!0;function k(n,e=null){if(n===null)return g.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){let t=n;return new de(t,k(e))}if(!(n instanceof Array)&&Nf){let t=[],i=!1;if(x(n,(o,a)=>{if(o.substring(0,1)!=="."){let c=k(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new y(o,c)))}}),t.length===0)return g.EMPTY_NODE;let s=oi(t,Cf,o=>o.name,Ms);if(i){let o=oi(t,A.getCompare());return new g(s,k(e),new ct({".priority":o},{".priority":A}))}else return new g(s,k(e),ct.Default)}else{let t=g.EMPTY_NODE;return x(n,(i,r)=>{if($(n,i)&&i.substring(0,1)!=="."){let s=k(r);(s.isLeafNode()||!s.isEmpty())&&(t=t.updateImmediateChild(i,s))}}),t.updatePriority(k(e))}}Sf(k);var es=class extends at{constructor(e){super(),this.indexPath_=e,f(!I(e)&&v(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){let i=this.extractChild(e.node),r=this.extractChild(t.node),s=i.compareTo(r);return s===0?ze(e.name,t.name):s}makePost(e,t){let i=k(e),r=g.EMPTY_NODE.updateChild(this.indexPath_,i);return new y(t,r)}maxPost(){let e=g.EMPTY_NODE.updateChild(this.indexPath_,cn);return new y(je,e)}toString(){return Kt(this.indexPath_,0).join("/")}};var ts=class extends at{compare(e,t){let i=e.node.compareTo(t.node);return i===0?ze(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return y.MIN}maxPost(){return y.MAX}makePost(e,t){let i=k(e);return new y(t,i)}toString(){return".value"}},Pf=new ts;function Uc(n){return{type:"value",snapshotNode:n}}function lt(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Yt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Jt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function kf(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}var Qt=class{constructor(e){this.index_=e}updateChild(e,t,i,r,s,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");let a=e.getImmediateChild(t);return a.getChild(r).equals(i.getChild(r))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Yt(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(lt(t,i)):o.trackChildChange(Jt(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(A,(r,s)=>{t.hasChild(r)||i.trackChildChange(Yt(r,s))}),t.isLeafNode()||t.forEachChild(A,(r,s)=>{if(e.hasChild(r)){let o=e.getImmediateChild(r);o.equals(s)||i.trackChildChange(Jt(r,s,o))}else i.trackChildChange(lt(r,s))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}};var ai=class n{constructor(e){this.indexedFilter_=new Qt(e.getIndex()),this.index_=e.getIndex(),this.startPost_=n.getStartPost_(e),this.endPost_=n.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){let t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,r,s,o){return this.matches(new y(t,i))||(i=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,r,s,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=g.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(g.EMPTY_NODE);let s=this;return t.forEachChild(A,(o,a)=>{s.matches(new y(o,a))||(r=r.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){let t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){let t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}};var ns=class{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{let i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{let i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new ai(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,r,s,o){return this.rangedFilter_.matches(new y(t,i))||(i=g.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,r,s,o):this.fullLimitUpdateChild_(e,t,i,s,o)}updateFullNode(e,t,i){let r;if(t.isLeafNode()||t.isEmpty())r=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){r=g.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){let a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{r=t.withIndex(this.index_),r=r.updatePriority(g.EMPTY_NODE);let s;this.reverse_?s=r.getReverseIterator(this.index_):s=r.getIterator(this.index_);let o=0;for(;s.hasNext();){let a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:r=r.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,r,s){let o;if(this.reverse_){let u=this.index_.getCompare();o=(d,p)=>u(p,d)}else o=this.index_.getCompare();let a=e;f(a.numChildren()===this.limit_,"");let c=new y(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(c);if(a.hasChild(t)){let u=a.getImmediateChild(t),d=r.getChildAfterChild(this.index_,l,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=r.getChildAfterChild(this.index_,d,this.reverse_);let p=d==null?1:o(d,c);if(h&&!i.isEmpty()&&p>=0)return s?.trackChildChange(Jt(t,i,u)),a.updateImmediateChild(t,i);{s?.trackChildChange(Yt(t,u));let w=a.updateImmediateChild(t,g.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(s?.trackChildChange(lt(d.name,d.node)),w.updateImmediateChild(d.name,d.node)):w}}else return i.isEmpty()?e:h&&o(l,c)>=0?(s!=null&&(s.trackChildChange(Yt(l.name,l.node)),s.trackChildChange(lt(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,g.EMPTY_NODE)):e}};var is=class n{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=A}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ot}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:je}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===A}copy(){let e=new n;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}};function Of(n){return n.loadsAllData()?new Qt(n.getIndex()):n.hasLimit()?new ns(n):new ai(n)}function Qa(n){let e={};if(n.isDefault())return e;let t;if(n.index_===A?t="$priority":n.index_===Pf?t="$value":n.index_===st?t="$key":(f(n.index_ instanceof es,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=N(t),n.startSet_){let i=n.startAfterSet_?"startAfter":"startAt";e[i]=N(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+N(n.indexStartName_))}if(n.endSet_){let i=n.endBeforeSet_?"endBefore":"endAt";e[i]=N(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+N(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Xa(n){let e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==A&&(e.i=n.index_.toString()),e}var rs=class n extends ni{constructor(e,t,i,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=r,this.log_=an("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,r){let s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);let o=n.getListenId_(e,i),a={};this.listens_[o]=a;let c=Qa(e._queryParams);this.restRequest_(s+".json",c,(l,h)=>{let u=h;if(l===404&&(u=null,l=null),l===null&&this.onDataUpdate_(s,u,!1,i),Pe(this.listens_,o)===a){let d;l?l===401?d="permission_denied":d="rest_error:"+l:d="ok",r(d,null)}})}unlisten(e,t){let i=n.getListenId_(e,t);delete this.listens_[i]}get(e){let t=Qa(e._queryParams),i=e._path.toString(),r=new oe;return this.restRequest_(i+".json",t,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(i,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,s])=>{r&&r.accessToken&&(t.auth=r.accessToken),s&&s.token&&(t.ac=s.token);let o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+fe(t);this.log_("Sending REST request for "+o);let a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Ke(a.responseText)}catch{W("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&W("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}};var ss=class{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}};function ci(){return{value:null,children:new Map}}function Wc(n,e,t){if(I(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{let i=v(e);n.children.has(i)||n.children.set(i,ci());let r=n.children.get(i);e=b(e),Wc(r,e,t)}}function os(n,e,t){n.value!==null?t(e,n.value):Df(n,(i,r)=>{let s=new C(e.toString()+"/"+i);os(r,s,t)})}function Df(n,e){n.children.forEach((t,i)=>{e(i,t)})}var as=class{constructor(e){this.collection_=e,this.last_=null}get(){let e=this.collection_.get(),t=Object.assign({},e);return this.last_&&x(this.last_,(i,r)=>{t[i]=t[i]-r}),this.last_=e,t}};var Za=10*1e3,Lf=30*1e3,xf=5*60*1e3,cs=class{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new as(e);let i=Za+(Lf-Za)*Math.random();Gt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){let e=this.statsListener_.get(),t={},i=!1;x(e,(r,s)=>{s>0&&$(this.statsToReport_,r)&&(t[r]=s,i=!0)}),i&&this.server_.reportStats(t),Gt(this.reportStats_.bind(this),Math.floor(Math.random()*2*xf))}};var Q;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Q||(Q={}));function Fs(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Us(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ws(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}var ls=class n{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Q.ACK_USER_WRITE,this.source=Fs()}operationForChild(e){if(I(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{let t=this.affectedTree.subtree(new C(e));return new n(E(),t,this.revert)}}else return f(v(this.path)===e,"operationForChild called for unrelated child."),new n(b(this.path),this.affectedTree,this.revert)}};var li=class n{constructor(e,t){this.source=e,this.path=t,this.type=Q.LISTEN_COMPLETE}operationForChild(e){return I(this.path)?new n(this.source,E()):new n(this.source,b(this.path))}};var ut=class n{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Q.OVERWRITE}operationForChild(e){return I(this.path)?new n(this.source,E(),this.snap.getImmediateChild(e)):new n(this.source,b(this.path),this.snap)}};var Xt=class n{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Q.MERGE}operationForChild(e){if(I(this.path)){let t=this.children.subtree(new C(e));return t.isEmpty()?null:t.value?new ut(this.source,E(),t.value):new n(this.source,E(),t)}else return f(v(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new n(this.source,b(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}};var ie=class{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(I(e))return this.isFullyInitialized()&&!this.filtered_;let t=v(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}};var us=class{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}};function Mf(n,e,t,i){let r=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(kf(o.childName,o.snapshotNode))}),jt(n,r,"child_removed",e,i,t),jt(n,r,"child_added",e,i,t),jt(n,r,"child_moved",s,i,t),jt(n,r,"child_changed",e,i,t),jt(n,r,"value",e,i,t),r}function jt(n,e,t,i,r,s){let o=i.filter(a=>a.type===t);o.sort((a,c)=>Uf(n,a,c)),o.forEach(a=>{let c=Ff(n,a,s);r.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function Ff(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Uf(n,e,t){if(e.childName==null||t.childName==null)throw Ne("Should only compare child_ events.");let i=new y(e.childName,e.snapshotNode),r=new y(t.childName,t.snapshotNode);return n.index_.compare(i,r)}function wi(n,e){return{eventCache:n,serverCache:e}}function qt(n,e,t,i){return wi(new ie(e,t,i),n.serverCache)}function Vc(n,e,t,i){return wi(n.eventCache,new ie(e,t,i))}function ui(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function qe(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}var Or,Wf=()=>(Or||(Or=new G(Wd)),Or),V=class n{constructor(e,t=Wf()){this.value=e,this.children=t}static fromObject(e){let t=new n(null);return x(e,(i,r)=>{t=t.set(new C(i),r)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(I(e))return null;{let i=v(e),r=this.children.get(i);if(r!==null){let s=r.findRootMostMatchingPathAndValue(b(e),t);return s!=null?{path:S(new C(i),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(I(e))return this;{let t=v(e),i=this.children.get(t);return i!==null?i.subtree(b(e)):new n(null)}}set(e,t){if(I(e))return new n(t,this.children);{let i=v(e),s=(this.children.get(i)||new n(null)).set(b(e),t),o=this.children.insert(i,s);return new n(this.value,o)}}remove(e){if(I(e))return this.children.isEmpty()?new n(null):new n(null,this.children);{let t=v(e),i=this.children.get(t);if(i){let r=i.remove(b(e)),s;return r.isEmpty()?s=this.children.remove(t):s=this.children.insert(t,r),this.value===null&&s.isEmpty()?new n(null):new n(this.value,s)}else return this}}get(e){if(I(e))return this.value;{let t=v(e),i=this.children.get(t);return i?i.get(b(e)):null}}setTree(e,t){if(I(e))return t;{let i=v(e),s=(this.children.get(i)||new n(null)).setTree(b(e),t),o;return s.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,s),new n(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){let i={};return this.children.inorderTraversal((r,s)=>{i[r]=s.fold_(S(e,r),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,i){let r=this.value?i(t,this.value):!1;if(r)return r;if(I(e))return null;{let s=v(e),o=this.children.get(s);return o?o.findOnPath_(b(e),S(t,s),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,i){if(I(e))return this;{this.value&&i(t,this.value);let r=v(e),s=this.children.get(r);return s?s.foreachOnPath_(b(e),S(t,r),i):new n(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((i,r)=>{r.foreach_(S(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}};var X=class n{constructor(e){this.writeTree_=e}static empty(){return new n(new V(null))}};function zt(n,e,t){if(I(e))return new X(new V(t));{let i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){let r=i.path,s=i.value,o=U(r,e);return s=s.updateChild(o,t),new X(n.writeTree_.set(r,s))}else{let r=new V(t),s=n.writeTree_.setTree(e,r);return new X(s)}}}function hs(n,e,t){let i=n;return x(t,(r,s)=>{i=zt(i,S(e,r),s)}),i}function ec(n,e){if(I(e))return X.empty();{let t=n.writeTree_.setTree(e,new V(null));return new X(t)}}function ds(n,e){return $e(n,e)!=null}function $e(n,e){let t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(U(t.path,e)):null}function tc(n){let e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(A,(i,r)=>{e.push(new y(i,r))}):n.writeTree_.children.inorderTraversal((i,r)=>{r.value!=null&&e.push(new y(i,r.value))}),e}function Te(n,e){if(I(e))return n;{let t=$e(n,e);return t!=null?new X(new V(t)):new X(n.writeTree_.subtree(e))}}function fs(n){return n.writeTree_.isEmpty()}function ht(n,e){return Bc(E(),n.writeTree_,e)}function Bc(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((r,s)=>{r===".priority"?(f(s.value!==null,"Priority writes must always be leaf nodes"),i=s.value):t=Bc(S(n,r),s,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(S(n,".priority"),i)),t}}function Ti(n,e){return qc(e,n)}function Vf(n,e,t,i,r){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:r}),r&&(n.visibleWrites=zt(n.visibleWrites,e,t)),n.lastWriteId=i}function Bf(n,e,t,i){f(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=hs(n.visibleWrites,e,t),n.lastWriteId=i}function Hf(n,e){for(let t=0;t<n.allWrites.length;t++){let i=n.allWrites[t];if(i.writeId===e)return i}return null}function jf(n,e){let t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");let i=n.allWrites[t];n.allWrites.splice(t,1);let r=i.visible,s=!1,o=n.allWrites.length-1;for(;r&&o>=0;){let a=n.allWrites[o];a.visible&&(o>=t&&Gf(a,i.path)?r=!1:j(i.path,a.path)&&(s=!0)),o--}if(r){if(s)return qf(n),!0;if(i.snap)n.visibleWrites=ec(n.visibleWrites,i.path);else{let a=i.children;x(a,c=>{n.visibleWrites=ec(n.visibleWrites,S(i.path,c))})}return!0}else return!1}function Gf(n,e){if(n.snap)return j(n.path,e);for(let t in n.children)if(n.children.hasOwnProperty(t)&&j(S(n.path,t),e))return!0;return!1}function qf(n){n.visibleWrites=Hc(n.allWrites,zf,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function zf(n){return n.visible}function Hc(n,e,t){let i=X.empty();for(let r=0;r<n.length;++r){let s=n[r];if(e(s)){let o=s.path,a;if(s.snap)j(t,o)?(a=U(t,o),i=zt(i,a,s.snap)):j(o,t)&&(a=U(o,t),i=zt(i,E(),s.snap.getChild(a)));else if(s.children){if(j(t,o))a=U(t,o),i=hs(i,a,s.children);else if(j(o,t))if(a=U(o,t),I(a))i=hs(i,E(),s.children);else{let c=Pe(s.children,v(a));if(c){let l=c.getChild(b(a));i=zt(i,E(),l)}}}else throw Ne("WriteRecord should have .snap or .children")}}return i}function jc(n,e,t,i,r){if(!i&&!r){let s=$e(n.visibleWrites,e);if(s!=null)return s;{let o=Te(n.visibleWrites,e);if(fs(o))return t;if(t==null&&!ds(o,E()))return null;{let a=t||g.EMPTY_NODE;return ht(o,a)}}}else{let s=Te(n.visibleWrites,e);if(!r&&fs(s))return t;if(!r&&t==null&&!ds(s,E()))return null;{let o=function(l){return(l.visible||r)&&(!i||!~i.indexOf(l.writeId))&&(j(l.path,e)||j(e,l.path))},a=Hc(n.allWrites,o,e),c=t||g.EMPTY_NODE;return ht(a,c)}}}function $f(n,e,t){let i=g.EMPTY_NODE,r=$e(n.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(A,(s,o)=>{i=i.updateImmediateChild(s,o)}),i;if(t){let s=Te(n.visibleWrites,e);return t.forEachChild(A,(o,a)=>{let c=ht(Te(s,new C(o)),a);i=i.updateImmediateChild(o,c)}),tc(s).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{let s=Te(n.visibleWrites,e);return tc(s).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Kf(n,e,t,i,r){f(i||r,"Either existingEventSnap or existingServerSnap must exist");let s=S(e,t);if(ds(n.visibleWrites,s))return null;{let o=Te(n.visibleWrites,s);return fs(o)?r.getChild(t):ht(o,r.getChild(t))}}function Yf(n,e,t,i){let r=S(e,t),s=$e(n.visibleWrites,r);if(s!=null)return s;if(i.isCompleteForChild(t)){let o=Te(n.visibleWrites,r);return ht(o,i.getNode().getImmediateChild(t))}else return null}function Jf(n,e){return $e(n.visibleWrites,e)}function Qf(n,e,t,i,r,s,o){let a,c=Te(n.visibleWrites,e),l=$e(c,E());if(l!=null)a=l;else if(t!=null)a=ht(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){let h=[],u=o.getCompare(),d=s?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o),p=d.getNext();for(;p&&h.length<r;)u(p,i)!==0&&h.push(p),p=d.getNext();return h}else return[]}function Xf(){return{visibleWrites:X.empty(),allWrites:[],lastWriteId:-1}}function hi(n,e,t,i){return jc(n.writeTree,n.treePath,e,t,i)}function Vs(n,e){return $f(n.writeTree,n.treePath,e)}function nc(n,e,t,i){return Kf(n.writeTree,n.treePath,e,t,i)}function di(n,e){return Jf(n.writeTree,S(n.treePath,e))}function Zf(n,e,t,i,r,s){return Qf(n.writeTree,n.treePath,e,t,i,r,s)}function Bs(n,e,t){return Yf(n.writeTree,n.treePath,e,t)}function Gc(n,e){return qc(S(n.treePath,e),n.writeTree)}function qc(n,e){return{treePath:n,writeTree:e}}var ps=class{constructor(){this.changeMap=new Map}trackChildChange(e){let t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");let r=this.changeMap.get(i);if(r){let s=r.type;if(t==="child_added"&&s==="child_removed")this.changeMap.set(i,Jt(i,e.snapshotNode,r.snapshotNode));else if(t==="child_removed"&&s==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&s==="child_changed")this.changeMap.set(i,Yt(i,r.oldSnap));else if(t==="child_changed"&&s==="child_added")this.changeMap.set(i,lt(i,e.snapshotNode));else if(t==="child_changed"&&s==="child_changed")this.changeMap.set(i,Jt(i,e.snapshotNode,r.oldSnap));else throw Ne("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}};var _s=class{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}},zc=new _s,Zt=class{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){let t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{let i=this.optCompleteServerCache_!=null?new ie(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Bs(this.writes_,e,i)}}getChildAfterChild(e,t,i){let r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:qe(this.viewCache_),s=Zf(this.writes_,r,t,1,i,e);return s.length===0?null:s[0]}};function ep(n){return{filter:n}}function tp(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function np(n,e,t,i,r){let s=new ps,o,a;if(t.type===Q.OVERWRITE){let l=t;l.source.fromUser?o=ms(n,e,l.path,l.snap,i,r,s):(f(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!I(l.path),o=fi(n,e,l.path,l.snap,i,r,a,s))}else if(t.type===Q.MERGE){let l=t;l.source.fromUser?o=rp(n,e,l.path,l.children,i,r,s):(f(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=gs(n,e,l.path,l.children,i,r,a,s))}else if(t.type===Q.ACK_USER_WRITE){let l=t;l.revert?o=ap(n,e,l.path,i,r,s):o=sp(n,e,l.path,l.affectedTree,i,r,s)}else if(t.type===Q.LISTEN_COMPLETE)o=op(n,e,t.path,i,s);else throw Ne("Unknown operation type: "+t.type);let c=s.getChanges();return ip(e,o,c),{viewCache:o,changes:c}}function ip(n,e,t){let i=e.eventCache;if(i.isFullyInitialized()){let r=i.getNode().isLeafNode()||i.getNode().isEmpty(),s=ui(n);(t.length>0||!n.eventCache.isFullyInitialized()||r&&!i.getNode().equals(s)||!i.getNode().getPriority().equals(s.getPriority()))&&t.push(Uc(ui(e)))}}function $c(n,e,t,i,r,s){let o=e.eventCache;if(di(i,t)!=null)return e;{let a,c;if(I(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){let l=qe(e),h=l instanceof g?l:g.EMPTY_NODE,u=Vs(i,h);a=n.filter.updateFullNode(e.eventCache.getNode(),u,s)}else{let l=hi(i,qe(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,s)}else{let l=v(t);if(l===".priority"){f(be(t)===1,"Can't have a priority with additional path components");let h=o.getNode();c=e.serverCache.getNode();let u=nc(i,t,h,c);u!=null?a=n.filter.updatePriority(h,u):a=o.getNode()}else{let h=b(t),u;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();let d=nc(i,t,o.getNode(),c);d!=null?u=o.getNode().getImmediateChild(l).updateChild(h,d):u=o.getNode().getImmediateChild(l)}else u=Bs(i,l,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),l,u,h,r,s):a=o.getNode()}}return qt(e,a,o.isFullyInitialized()||I(t),n.filter.filtersNodes())}}function fi(n,e,t,i,r,s,o,a){let c=e.serverCache,l,h=o?n.filter:n.filter.getIndexedFilter();if(I(t))l=h.updateFullNode(c.getNode(),i,null);else if(h.filtersNodes()&&!c.isFiltered()){let p=c.getNode().updateChild(t,i);l=h.updateFullNode(c.getNode(),p,null)}else{let p=v(t);if(!c.isCompleteForPath(t)&&be(t)>1)return e;let _=b(t),R=c.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?l=h.updatePriority(c.getNode(),R):l=h.updateChild(c.getNode(),p,R,_,zc,null)}let u=Vc(e,l,c.isFullyInitialized()||I(t),h.filtersNodes()),d=new Zt(r,u,s);return $c(n,u,t,r,d,a)}function ms(n,e,t,i,r,s,o){let a=e.eventCache,c,l,h=new Zt(r,e,s);if(I(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=qt(e,l,!0,n.filter.filtersNodes());else{let u=v(t);if(u===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=qt(e,l,a.isFullyInitialized(),a.isFiltered());else{let d=b(t),p=a.getNode().getImmediateChild(u),_;if(I(d))_=i;else{let w=h.getCompleteChild(u);w!=null?Ls(d)===".priority"&&w.getChild(Oc(d)).isEmpty()?_=w:_=w.updateChild(d,i):_=g.EMPTY_NODE}if(p.equals(_))c=e;else{let w=n.filter.updateChild(a.getNode(),u,_,d,h,o);c=qt(e,w,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function ic(n,e){return n.eventCache.isCompleteForChild(e)}function rp(n,e,t,i,r,s,o){let a=e;return i.foreach((c,l)=>{let h=S(t,c);ic(e,v(h))&&(a=ms(n,a,h,l,r,s,o))}),i.foreach((c,l)=>{let h=S(t,c);ic(e,v(h))||(a=ms(n,a,h,l,r,s,o))}),a}function rc(n,e,t){return t.foreach((i,r)=>{e=e.updateChild(i,r)}),e}function gs(n,e,t,i,r,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;I(t)?l=i:l=new V(null).setTree(t,i);let h=e.serverCache.getNode();return l.children.inorderTraversal((u,d)=>{if(h.hasChild(u)){let p=e.serverCache.getNode().getImmediateChild(u),_=rc(n,p,d);c=fi(n,c,new C(u),_,r,s,o,a)}}),l.children.inorderTraversal((u,d)=>{let p=!e.serverCache.isCompleteForChild(u)&&d.value===null;if(!h.hasChild(u)&&!p){let _=e.serverCache.getNode().getImmediateChild(u),w=rc(n,_,d);c=fi(n,c,new C(u),w,r,s,o,a)}}),c}function sp(n,e,t,i,r,s,o){if(di(r,t)!=null)return e;let a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(I(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return fi(n,e,t,c.getNode().getChild(t),r,s,a,o);if(I(t)){let l=new V(null);return c.getNode().forEachChild(st,(h,u)=>{l=l.set(new C(h),u)}),gs(n,e,t,l,r,s,a,o)}else return e}else{let l=new V(null);return i.foreach((h,u)=>{let d=S(t,h);c.isCompleteForPath(d)&&(l=l.set(h,c.getNode().getChild(d)))}),gs(n,e,t,l,r,s,a,o)}}function op(n,e,t,i,r){let s=e.serverCache,o=Vc(e,s.getNode(),s.isFullyInitialized()||I(t),s.isFiltered());return $c(n,o,t,i,zc,r)}function ap(n,e,t,i,r,s){let o;if(di(i,t)!=null)return e;{let a=new Zt(i,e,r),c=e.eventCache.getNode(),l;if(I(t)||v(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=hi(i,qe(e));else{let u=e.serverCache.getNode();f(u instanceof g,"serverChildren would be complete if leaf node"),h=Vs(i,u)}h=h,l=n.filter.updateFullNode(c,h,s)}else{let h=v(t),u=Bs(i,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=c.getImmediateChild(h)),u!=null?l=n.filter.updateChild(c,h,u,b(t),a,s):e.eventCache.getNode().hasChild(h)?l=n.filter.updateChild(c,h,g.EMPTY_NODE,b(t),a,s):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=hi(i,qe(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,s)))}return o=e.serverCache.isFullyInitialized()||di(i,E())!=null,qt(e,l,o,n.filter.filtersNodes())}}var vs=class{constructor(e,t){this.query_=e,this.eventRegistrations_=[];let i=this.query_._queryParams,r=new Qt(i.getIndex()),s=Of(i);this.processor_=ep(s);let o=t.serverCache,a=t.eventCache,c=r.updateFullNode(g.EMPTY_NODE,o.getNode(),null),l=s.updateFullNode(g.EMPTY_NODE,a.getNode(),null),h=new ie(c,o.isFullyInitialized(),r.filtersNodes()),u=new ie(l,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=wi(u,h),this.eventGenerator_=new us(this.query_)}get query(){return this.query_}};function cp(n){return n.viewCache_.serverCache.getNode()}function lp(n){return ui(n.viewCache_)}function up(n,e){let t=qe(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!I(e)&&!t.getImmediateChild(v(e)).isEmpty())?t.getChild(e):null}function sc(n){return n.eventRegistrations_.length===0}function hp(n,e){n.eventRegistrations_.push(e)}function oc(n,e,t){let i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");let r=n.query._path;n.eventRegistrations_.forEach(s=>{let o=s.createCancelEvent(t,r);o&&i.push(o)})}if(e){let r=[];for(let s=0;s<n.eventRegistrations_.length;++s){let o=n.eventRegistrations_[s];if(!o.matches(e))r.push(o);else if(e.hasAnyCallback()){r=r.concat(n.eventRegistrations_.slice(s+1));break}}n.eventRegistrations_=r}else n.eventRegistrations_=[];return i}function ac(n,e,t,i){e.type===Q.MERGE&&e.source.queryId!==null&&(f(qe(n.viewCache_),"We should always have a full cache before handling merges"),f(ui(n.viewCache_),"Missing event cache, even though we have a server cache"));let r=n.viewCache_,s=np(n.processor_,r,e,t,i);return tp(n.processor_,s.viewCache),f(s.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=s.viewCache,Kc(n,s.changes,s.viewCache.eventCache.getNode(),null)}function dp(n,e){let t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(A,(s,o)=>{i.push(lt(s,o))}),t.isFullyInitialized()&&i.push(Uc(t.getNode())),Kc(n,i,t.getNode(),e)}function Kc(n,e,t,i){let r=i?[i]:n.eventRegistrations_;return Mf(n.eventGenerator_,e,t,r)}var pi,_i=class{constructor(){this.views=new Map}};function fp(n){f(!pi,"__referenceConstructor has already been defined"),pi=n}function pp(){return f(pi,"Reference.ts has not been loaded"),pi}function _p(n){return n.views.size===0}function Hs(n,e,t,i){let r=e.source.queryId;if(r!==null){let s=n.views.get(r);return f(s!=null,"SyncTree gave us an op for an invalid query."),ac(s,e,t,i)}else{let s=[];for(let o of n.views.values())s=s.concat(ac(o,e,t,i));return s}}function Yc(n,e,t,i,r){let s=e._queryIdentifier,o=n.views.get(s);if(!o){let a=hi(t,r?i:null),c=!1;a?c=!0:i instanceof g?(a=Vs(t,i),c=!1):(a=g.EMPTY_NODE,c=!1);let l=wi(new ie(a,c,!1),new ie(i,r,!1));return new vs(e,l)}return o}function mp(n,e,t,i,r,s){let o=Yc(n,e,i,r,s);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),hp(o,t),dp(o,t)}function gp(n,e,t,i){let r=e._queryIdentifier,s=[],o=[],a=Se(n);if(r==="default")for(let[c,l]of n.views.entries())o=o.concat(oc(l,t,i)),sc(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||s.push(l.query));else{let c=n.views.get(r);c&&(o=o.concat(oc(c,t,i)),sc(c)&&(n.views.delete(r),c.query._queryParams.loadsAllData()||s.push(c.query)))}return a&&!Se(n)&&s.push(new(pp())(e._repo,e._path)),{removed:s,events:o}}function Jc(n){let e=[];for(let t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Ce(n,e){let t=null;for(let i of n.views.values())t=t||up(i,e);return t}function Qc(n,e){if(e._queryParams.loadsAllData())return Ci(n);{let i=e._queryIdentifier;return n.views.get(i)}}function Xc(n,e){return Qc(n,e)!=null}function Se(n){return Ci(n)!=null}function Ci(n){for(let e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}var mi;function vp(n){f(!mi,"__referenceConstructor has already been defined"),mi=n}function yp(){return f(mi,"Reference.ts has not been loaded"),mi}var Ip=1,gi=class{constructor(e){this.listenProvider_=e,this.syncPointTree_=new V(null),this.pendingWriteTree_=Xf(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}};function Zc(n,e,t,i,r){return Vf(n.pendingWriteTree_,e,t,i,r),r?_t(n,new ut(Fs(),e,t)):[]}function Ep(n,e,t,i){Bf(n.pendingWriteTree_,e,t,i);let r=V.fromObject(t);return _t(n,new Xt(Fs(),e,r))}function Ee(n,e,t=!1){let i=Hf(n.pendingWriteTree_,e);if(jf(n.pendingWriteTree_,e)){let s=new V(null);return i.snap!=null?s=s.set(E(),!0):x(i.children,o=>{s=s.set(new C(o),!0)}),_t(n,new ls(i.path,s,t))}else return[]}function ln(n,e,t){return _t(n,new ut(Us(),e,t))}function wp(n,e,t){let i=V.fromObject(t);return _t(n,new Xt(Us(),e,i))}function Tp(n,e){return _t(n,new li(Us(),e))}function Cp(n,e,t){let i=Gs(n,t);if(i){let r=qs(i),s=r.path,o=r.queryId,a=U(s,e),c=new li(Ws(o),a);return zs(n,s,c)}else return[]}function vi(n,e,t,i,r=!1){let s=e._path,o=n.syncPointTree_.get(s),a=[];if(o&&(e._queryIdentifier==="default"||Xc(o,e))){let c=gp(o,e,t,i);_p(o)&&(n.syncPointTree_=n.syncPointTree_.remove(s));let l=c.removed;if(a=c.events,!r){let h=l.findIndex(d=>d._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(s,(d,p)=>Se(p));if(h&&!u){let d=n.syncPointTree_.subtree(s);if(!d.isEmpty()){let p=Ap(d);for(let _=0;_<p.length;++_){let w=p[_],R=w.query,se=il(n,w);n.listenProvider_.startListening($t(R),en(n,R),se.hashFn,se.onComplete)}}}!u&&l.length>0&&!i&&(h?n.listenProvider_.stopListening($t(e),null):l.forEach(d=>{let p=n.queryToTagMap.get(bi(d));n.listenProvider_.stopListening($t(d),p)}))}Rp(n,l)}return a}function el(n,e,t,i){let r=Gs(n,i);if(r!=null){let s=qs(r),o=s.path,a=s.queryId,c=U(o,e),l=new ut(Ws(a),c,t);return zs(n,o,l)}else return[]}function bp(n,e,t,i){let r=Gs(n,i);if(r){let s=qs(r),o=s.path,a=s.queryId,c=U(o,e),l=V.fromObject(t),h=new Xt(Ws(a),c,l);return zs(n,o,h)}else return[]}function ys(n,e,t,i=!1){let r=e._path,s=null,o=!1;n.syncPointTree_.foreachOnPath(r,(d,p)=>{let _=U(d,r);s=s||Ce(p,_),o=o||Se(p)});let a=n.syncPointTree_.get(r);a?(o=o||Se(a),s=s||Ce(a,E())):(a=new _i,n.syncPointTree_=n.syncPointTree_.set(r,a));let c;s!=null?c=!0:(c=!1,s=g.EMPTY_NODE,n.syncPointTree_.subtree(r).foreachChild((p,_)=>{let w=Ce(_,E());w&&(s=s.updateImmediateChild(p,w))}));let l=Xc(a,e);if(!l&&!e._queryParams.loadsAllData()){let d=bi(e);f(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");let p=Np();n.queryToTagMap.set(d,p),n.tagToQueryMap.set(p,d)}let h=Ti(n.pendingWriteTree_,r),u=mp(a,e,t,h,s,c);if(!l&&!o&&!i){let d=Qc(a,e);u=u.concat(Pp(n,e,d))}return u}function js(n,e,t){let r=n.pendingWriteTree_,s=n.syncPointTree_.findOnPath(e,(o,a)=>{let c=U(o,e),l=Ce(a,c);if(l)return l});return jc(r,e,s,t,!0)}function Sp(n,e){let t=e._path,i=null;n.syncPointTree_.foreachOnPath(t,(l,h)=>{let u=U(l,t);i=i||Ce(h,u)});let r=n.syncPointTree_.get(t);r?i=i||Ce(r,E()):(r=new _i,n.syncPointTree_=n.syncPointTree_.set(t,r));let s=i!=null,o=s?new ie(i,!0,!1):null,a=Ti(n.pendingWriteTree_,e._path),c=Yc(r,e,a,s?o.getNode():g.EMPTY_NODE,s);return lp(c)}function _t(n,e){return tl(e,n.syncPointTree_,null,Ti(n.pendingWriteTree_,E()))}function tl(n,e,t,i){if(I(n.path))return nl(n,e,t,i);{let r=e.get(E());t==null&&r!=null&&(t=Ce(r,E()));let s=[],o=v(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){let l=t?t.getImmediateChild(o):null,h=Gc(i,o);s=s.concat(tl(a,c,l,h))}return r&&(s=s.concat(Hs(r,n,i,t))),s}}function nl(n,e,t,i){let r=e.get(E());t==null&&r!=null&&(t=Ce(r,E()));let s=[];return e.children.inorderTraversal((o,a)=>{let c=t?t.getImmediateChild(o):null,l=Gc(i,o),h=n.operationForChild(o);h&&(s=s.concat(nl(h,a,c,l)))}),r&&(s=s.concat(Hs(r,n,i,t))),s}function il(n,e){let t=e.query,i=en(n,t);return{hashFn:()=>(cp(e)||g.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return i?Cp(n,t._path,i):Tp(n,t._path);{let s=Hd(r,t);return vi(n,t,null,s)}}}}function en(n,e){let t=bi(e);return n.queryToTagMap.get(t)}function bi(n){return n._path.toString()+"$"+n._queryIdentifier}function Gs(n,e){return n.tagToQueryMap.get(e)}function qs(n){let e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new C(n.substr(0,e))}}function zs(n,e,t){let i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");let r=Ti(n.pendingWriteTree_,e);return Hs(i,t,r,null)}function Ap(n){return n.fold((e,t,i)=>{if(t&&Se(t))return[Ci(t)];{let r=[];return t&&(r=Jc(t)),x(i,(s,o)=>{r=r.concat(o)}),r}})}function $t(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(yp())(n._repo,n._path):n}function Rp(n,e){for(let t=0;t<e.length;++t){let i=e[t];if(!i._queryParams.loadsAllData()){let r=bi(i),s=n.queryToTagMap.get(r);n.queryToTagMap.delete(r),n.tagToQueryMap.delete(s)}}}function Np(){return Ip++}function Pp(n,e,t){let i=e._path,r=en(n,e),s=il(n,t),o=n.listenProvider_.startListening($t(e),r,s.hashFn,s.onComplete),a=n.syncPointTree_.subtree(i);if(r)f(!Se(a.value),"If we're adding a query, it shouldn't be shadowed");else{let c=a.fold((l,h,u)=>{if(!I(l)&&h&&Se(h))return[Ci(h).query];{let d=[];return h&&(d=d.concat(Jc(h).map(p=>p.query))),x(u,(p,_)=>{d=d.concat(_)}),d}});for(let l=0;l<c.length;++l){let h=c[l];n.listenProvider_.stopListening($t(h),en(n,h))}}return o}var Is=class n{constructor(e){this.node_=e}getImmediateChild(e){let t=this.node_.getImmediateChild(e);return new n(t)}node(){return this.node_}},Es=class n{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){let t=S(this.path_,e);return new n(this.syncTree_,t)}node(){return js(this.syncTree_,this.path_)}},kp=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},cc=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Op(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Dp(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Op=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},Dp=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));let i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);let r=e.node();if(f(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return i;let o=r.getValue();return typeof o!="number"?i:o+i},rl=function(n,e,t,i){return $s(e,new Es(t,n),i)},sl=function(n,e,t){return $s(n,new Is(e),t)};function $s(n,e,t){let i=n.getPriority().val(),r=cc(i,e.getImmediateChild(".priority"),t),s;if(n.isLeafNode()){let o=n,a=cc(o.getValue(),e,t);return a!==o.getValue()||r!==o.getPriority().val()?new de(a,k(r)):n}else{let o=n;return s=o,r!==o.getPriority().val()&&(s=s.updatePriority(new de(r))),o.forEachChild(A,(a,c)=>{let l=$s(c,e.getImmediateChild(a),t);l!==c&&(s=s.updateImmediateChild(a,l))}),s}}var tn=class{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}};function Ks(n,e){let t=e instanceof C?e:new C(e),i=n,r=v(t);for(;r!==null;){let s=Pe(i.node.children,r)||{children:{},childCount:0};i=new tn(r,i,s),t=b(t),r=v(t)}return i}function mt(n){return n.node.value}function ol(n,e){n.node.value=e,ws(n)}function al(n){return n.node.childCount>0}function Lp(n){return mt(n)===void 0&&!al(n)}function Si(n,e){x(n.node.children,(t,i)=>{e(new tn(t,n,i))})}function cl(n,e,t,i){t&&!i&&e(n),Si(n,r=>{cl(r,e,!0,i)}),t&&i&&e(n)}function xp(n,e,t){let i=t?n:n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function un(n){return new C(n.parent===null?n.name:un(n.parent)+"/"+n.name)}function ws(n){n.parent!==null&&Mp(n.parent,n.name,n)}function Mp(n,e,t){let i=Lp(t),r=$(n.node.children,e);i&&r?(delete n.node.children[e],n.node.childCount--,ws(n)):!i&&!r&&(n.node.children[e]=t.node,n.node.childCount++,ws(n))}var Fp=/[\[\].#$\/\u0000-\u001F\u007F]/,Up=/[\[\].#$\u0000-\u001F\u007F]/,Dr=10*1024*1024,Ys=function(n){return typeof n=="string"&&n.length!==0&&!Fp.test(n)},ll=function(n){return typeof n=="string"&&n.length!==0&&!Up.test(n)},Wp=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ll(n)},Vp=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!ks(n)||n&&typeof n=="object"&&$(n,".sv")},ul=function(n,e,t,i){i&&e===void 0||Ai(wt(n,"value"),e,t)},Ai=function(n,e,t){let i=t instanceof C?new $r(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ve(i));if(typeof e=="function")throw new Error(n+"contains a function "+Ve(i)+" with contents = "+e.toString());if(ks(e))throw new Error(n+"contains "+e.toString()+" "+Ve(i));if(typeof e=="string"&&e.length>Dr/3&&Tt(e)>Dr)throw new Error(n+"contains a string greater than "+Dr+" utf8 bytes "+Ve(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,s=!1;if(x(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!Ys(o)))throw new Error(n+" contains an invalid key ("+o+") "+Ve(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);vf(i,o),Ai(n,a,i),yf(i)}),r&&s)throw new Error(n+' contains ".value" child '+Ve(i)+" in addition to actual children.")}},Bp=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];let s=Kt(i);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!Ys(s[o]))throw new Error(n+"contains an invalid key ("+s[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(gf);let r=null;for(t=0;t<e.length;t++){if(i=e[t],r!==null&&j(r,i))throw new Error(n+"contains a path "+r.toString()+" that is ancestor of another path "+i.toString());r=i}},Hp=function(n,e,t,i){if(i&&e===void 0)return;let r=wt(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(r+" must be an object containing the children to replace.");let s=[];x(e,(o,a)=>{let c=new C(o);if(Ai(r,a,S(t,c)),Ls(c)===".priority"&&!Vp(a))throw new Error(r+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(c)}),Bp(r,s)};var hl=function(n,e,t,i){if(!(i&&t===void 0)&&!ll(t))throw new Error(wt(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},jp=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),hl(n,e,t,i)},Js=function(n,e){if(v(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Gp=function(n,e){let t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ys(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Wp(t))throw new Error(wt(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};var Ts=class{constructor(){this.eventLists_=[],this.recursionDepth_=0}};function Ri(n,e){let t=null;for(let i=0;i<e.length;i++){let r=e[i],s=r.getPath();t!==null&&!xs(s,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:s}),t.events.push(r)}t&&n.eventLists_.push(t)}function dl(n,e,t){Ri(n,t),fl(n,i=>xs(i,e))}function q(n,e,t){Ri(n,t),fl(n,i=>j(i,e)||j(e,i))}function fl(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){let r=n.eventLists_[i];if(r){let s=r.path;e(s)?(qp(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function qp(n){for(let e=0;e<n.events.length;e++){let t=n.events[e];if(t!==null){n.events[e]=null;let i=t.getEventRunner();He&&L("event: "+t.toString()),pt(i)}}}var zp="repo_interrupt",$p=25,Cs=class{constructor(e,t,i,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Ts,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ci(),this.transactionQueueTree_=new tn,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}};function Kp(n,e,t){if(n.stats_=Ds(n.repoInfo_),n.forceRestClient_||zd())n.server_=new rs(n.repoInfo_,(i,r,s,o)=>{lc(n,i,r,s,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>uc(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{N(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Ge(n.repoInfo_,e,(i,r,s,o)=>{lc(n,i,r,s,o)},i=>{uc(n,i)},i=>{Yp(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Kd(n.repoInfo_,()=>new cs(n.stats_,n.server_)),n.infoData_=new ss,n.infoSyncTree_=new gi({startListening:(i,r,s,o)=>{let a=[],c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=ln(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Qs(n,"connected",!1),n.serverSyncTree_=new gi({startListening:(i,r,s,o)=>(n.server_.listen(i,s,r,(a,c)=>{let l=o(a,c);q(n.eventQueue_,i._path,l)}),[]),stopListening:(i,r)=>{n.server_.unlisten(i,r)}})}function pl(n){let t=n.infoData_.getNode(new C(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Ni(n){return kp({timestamp:pl(n)})}function lc(n,e,t,i,r){n.dataUpdateCount++;let s=new C(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(r)if(i){let c=Et(t,l=>k(l));o=bp(n.serverSyncTree_,s,c,r)}else{let c=k(t);o=el(n.serverSyncTree_,s,c,r)}else if(i){let c=Et(t,l=>k(l));o=wp(n.serverSyncTree_,s,c)}else{let c=k(t);o=ln(n.serverSyncTree_,s,c)}let a=s;o.length>0&&(a=dt(n,s)),q(n.eventQueue_,a,o)}function uc(n,e){Qs(n,"connected",e),e===!1&&Zp(n)}function Yp(n,e){x(e,(t,i)=>{Qs(n,t,i)})}function Qs(n,e,t){let i=new C("/.info/"+e),r=k(t);n.infoData_.updateSnapshot(i,r);let s=ln(n.infoSyncTree_,i,r);q(n.eventQueue_,i,s)}function Xs(n){return n.nextWriteId_++}function Jp(n,e,t){let i=Sp(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(r=>{let s=k(r).withIndex(e._queryParams.getIndex());ys(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=ln(n.serverSyncTree_,e._path,s);else{let a=en(n.serverSyncTree_,e);o=el(n.serverSyncTree_,e._path,s,a)}return q(n.eventQueue_,e._path,o),vi(n.serverSyncTree_,e,t,null,!0),s},r=>(hn(n,"get for query "+N(e)+" failed: "+r),Promise.reject(new Error(r))))}function Qp(n,e,t,i,r){hn(n,"set",{path:e.toString(),value:t,priority:i});let s=Ni(n),o=k(t,i),a=js(n.serverSyncTree_,e),c=sl(o,a,s),l=Xs(n),h=Zc(n.serverSyncTree_,e,c,l,!0);Ri(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(d,p)=>{let _=d==="ok";_||W("set at "+e+" failed: "+d);let w=Ee(n.serverSyncTree_,l,!_);q(n.eventQueue_,e,w),Ss(n,r,d,p)});let u=eo(n,e);dt(n,u),q(n.eventQueue_,u,[])}function Xp(n,e,t,i){hn(n,"update",{path:e.toString(),value:t});let r=!0,s=Ni(n),o={};if(x(t,(a,c)=>{r=!1,o[a]=rl(S(e,a),k(c),n.serverSyncTree_,s)}),r)L("update() called with empty data.  Don't do anything."),Ss(n,i,"ok",void 0);else{let a=Xs(n),c=Ep(n.serverSyncTree_,e,o,a);Ri(n.eventQueue_,c),n.server_.merge(e.toString(),t,(l,h)=>{let u=l==="ok";u||W("update at "+e+" failed: "+l);let d=Ee(n.serverSyncTree_,a,!u),p=d.length>0?dt(n,e):e;q(n.eventQueue_,p,d),Ss(n,i,l,h)}),x(t,l=>{let h=eo(n,S(e,l));dt(n,h)}),q(n.eventQueue_,e,[])}}function Zp(n){hn(n,"onDisconnectEvents");let e=Ni(n),t=ci();os(n.onDisconnect_,E(),(r,s)=>{let o=rl(r,s,n.serverSyncTree_,e);Wc(t,r,o)});let i=[];os(t,E(),(r,s)=>{i=i.concat(ln(n.serverSyncTree_,r,s));let o=eo(n,r);dt(n,o)}),n.onDisconnect_=ci(),q(n.eventQueue_,E(),i)}function e_(n,e,t){let i;v(e._path)===".info"?i=ys(n.infoSyncTree_,e,t):i=ys(n.serverSyncTree_,e,t),dl(n.eventQueue_,e._path,i)}function bs(n,e,t){let i;v(e._path)===".info"?i=vi(n.infoSyncTree_,e,t):i=vi(n.serverSyncTree_,e,t),dl(n.eventQueue_,e._path,i)}function t_(n){n.persistentConnection_&&n.persistentConnection_.interrupt(zp)}function hn(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),L(t,...e)}function Ss(n,e,t,i){e&&pt(()=>{if(t==="ok")e(null);else{let r=(t||"error").toUpperCase(),s=r;i&&(s+=": "+i);let o=new Error(s);o.code=r,e(o)}})}function _l(n,e,t){return js(n.serverSyncTree_,e,t)||g.EMPTY_NODE}function Zs(n,e=n.transactionQueueTree_){if(e||Pi(n,e),mt(e)){let t=gl(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(r=>r.status===0)&&n_(n,un(e),t)}else al(e)&&Si(e,t=>{Zs(n,t)})}function n_(n,e,t){let i=t.map(l=>l.currentWriteId),r=_l(n,e,i),s=r,o=r.hash();for(let l=0;l<t.length;l++){let h=t[l];f(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;let u=U(e,h.path);s=s.updateChild(u,h.currentOutputSnapshotRaw)}let a=s.val(!0),c=e;n.server_.put(c.toString(),a,l=>{hn(n,"transaction put response",{path:c.toString(),status:l});let h=[];if(l==="ok"){let u=[];for(let d=0;d<t.length;d++)t[d].status=2,h=h.concat(Ee(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&u.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();Pi(n,Ks(n.transactionQueueTree_,e)),Zs(n,n.transactionQueueTree_),q(n.eventQueue_,e,h);for(let d=0;d<u.length;d++)pt(u[d])}else{if(l==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{W("transaction at "+c.toString()+" failed: "+l);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=l}dt(n,e)}},o)}function dt(n,e){let t=ml(n,e),i=un(t),r=gl(n,t);return i_(n,r,i),i}function i_(n,e,t){if(e.length===0)return;let i=[],r=[],o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){let c=e[a],l=U(t,c.path),h=!1,u;if(f(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)h=!0,u=c.abortReason,r=r.concat(Ee(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=$p)h=!0,u="maxretry",r=r.concat(Ee(n.serverSyncTree_,c.currentWriteId,!0));else{let d=_l(n,c.path,o);c.currentInputSnapshot=d;let p=e[a].update(d.val());if(p!==void 0){Ai("transaction failed: Data returned ",p,c.path);let _=k(p);typeof p=="object"&&p!=null&&$(p,".priority")||(_=_.updatePriority(d.getPriority()));let R=c.currentWriteId,se=Ni(n),Ae=sl(_,d,se);c.currentOutputSnapshotRaw=_,c.currentOutputSnapshotResolved=Ae,c.currentWriteId=Xs(n),o.splice(o.indexOf(R),1),r=r.concat(Zc(n.serverSyncTree_,c.path,Ae,c.currentWriteId,c.applyLocally)),r=r.concat(Ee(n.serverSyncTree_,R,!0))}else h=!0,u="nodata",r=r.concat(Ee(n.serverSyncTree_,c.currentWriteId,!0))}q(n.eventQueue_,t,r),r=[],h&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}Pi(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)pt(i[a]);Zs(n,n.transactionQueueTree_)}function ml(n,e){let t,i=n.transactionQueueTree_;for(t=v(e);t!==null&&mt(i)===void 0;)i=Ks(i,t),e=b(e),t=v(e);return i}function gl(n,e){let t=[];return vl(n,e,t),t.sort((i,r)=>i.order-r.order),t}function vl(n,e,t){let i=mt(e);if(i)for(let r=0;r<i.length;r++)t.push(i[r]);Si(e,r=>{vl(n,r,t)})}function Pi(n,e){let t=mt(e);if(t){let i=0;for(let r=0;r<t.length;r++)t[r].status!==2&&(t[i]=t[r],i++);t.length=i,ol(e,t.length>0?t:void 0)}Si(e,i=>{Pi(n,i)})}function eo(n,e){let t=un(ml(n,e)),i=Ks(n.transactionQueueTree_,e);return xp(i,r=>{Lr(n,r)}),Lr(n,i),cl(i,r=>{Lr(n,r)}),t}function Lr(n,e){let t=mt(e);if(t){let i=[],r=[],s=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(s===o-1,"All SENT items should be at beginning of queue."),s=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),r=r.concat(Ee(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?ol(e,void 0):t.length=s+1,q(n.eventQueue_,un(e),r);for(let o=0;o<i.length;o++)pt(i[o])}}function r_(n){let e="",t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let r=t[i];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function s_(n){let e={};n.charAt(0)==="?"&&(n=n.substring(1));for(let t of n.split("&")){if(t.length===0)continue;let i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):W(`Invalid query segment '${t}' in query '${n}'`)}return e}var hc=function(n,e){let t=o_(n),i=t.namespace;t.domain==="firebase.com"&&he(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&he("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Fd();let r=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Zn(t.host,t.secure,i,r,e,"",i!==t.subdomain),path:new C(t.pathString)}},o_=function(n){let e="",t="",i="",r="",s="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let h=n.indexOf("/");h===-1&&(h=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(h,u)),h<u&&(r=r_(n.substring(h,u)));let d=s_(n.substring(Math.min(n.length,u)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;let p=e.slice(0,l);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{let _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),s=i}"ns"in d&&(s=d.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:r,namespace:s}};var dc="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",a_=function(){let n=0,e=[];return function(t){let i=t===n;n=t;let r,s=new Array(8);for(r=7;r>=0;r--)s[r]=dc.charAt(t%64),t=Math.floor(t/64);f(t===0,"Cannot push at time == 0");let o=s.join("");if(i){for(r=11;r>=0&&e[r]===63;r--)e[r]=0;e[r]++}else for(r=0;r<12;r++)e[r]=Math.floor(Math.random()*64);for(r=0;r<12;r++)o+=dc.charAt(e[r]);return f(o.length===20,"nextPushId: Length should be 20."),o}}();var yi=class{constructor(e,t,i,r){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=r}getPath(){let e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+N(this.snapshot.exportVal())}},Ii=class{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}};var nn=class{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}};var As=class n{constructor(e,t,i,r){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=r}get key(){return I(this._path)?null:Ls(this._path)}get ref(){return new re(this._repo,this._path)}get _queryIdentifier(){let e=Xa(this._queryParams),t=Os(e);return t==="{}"?"default":t}get _queryObject(){return Xa(this._queryParams)}isEqual(e){if(e=O(e),!(e instanceof n))return!1;let t=this._repo===e._repo,i=xs(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return t&&i&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+mf(this._path)}};var re=class n extends As{constructor(e,t){super(e,t,new is,!1)}get parent(){let e=Oc(this._path);return e===null?null:new n(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}},rn=class n{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){let t=new C(e),i=ft(this.ref,e);return new n(this._node.getChild(t),i,A)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,r)=>e(new n(r,ft(this.ref,i),A)))}hasChild(e){let t=new C(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}};function c_(n,e){return n=O(n),n._checkNotDeleted("ref"),e!==void 0?ft(n._root,e):n._root}function ft(n,e){return n=O(n),v(n._path)===null?jp("child","path",e,!1):hl("child","path",e,!1),new re(n._repo,S(n._path,e))}function l_(n,e){n=O(n),Js("push",n._path),ul("push",e,n._path,!0);let t=pl(n._repo),i=a_(t),r=ft(n,i),s=ft(n,i),o;return e!=null?o=to(s,e).then(()=>s):o=Promise.resolve(s),r.then=o.then.bind(o),r.catch=o.then.bind(o,void 0),r}function u_(n){return Js("remove",n._path),to(n,null)}function to(n,e){n=O(n),Js("set",n._path),ul("set",e,n._path,!1);let t=new oe;return Qp(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function h_(n,e){Hp("update",e,n._path,!1);let t=new oe;return Xp(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function d_(n){n=O(n);let e=new nn(()=>{}),t=new sn(e);return Jp(n._repo,n,t).then(i=>new rn(i,new re(n._repo,n._path),n._queryParams.getIndex()))}var sn=class n{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){let i=t._queryParams.getIndex();return new yi("value",this,new rn(e.snapshotNode,new re(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ii(this,e,t):null}matches(e){return e instanceof n?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}},Ei=class n{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ii(this,e,t):null}createEvent(e,t){f(e.childName!=null,"Child events should have a childName.");let i=ft(new re(t._repo,t._path),e.childName),r=t._queryParams.getIndex();return new yi(e.type,this,new rn(e.snapshotNode,i,r),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof n?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}};function f_(n,e,t,i,r){let s;if(typeof i=="object"&&(s=void 0,r=i),typeof i=="function"&&(s=i),r&&r.onlyOnce){let c=t,l=(h,u)=>{bs(n._repo,n,a),c(h,u)};l.userCallback=t.userCallback,l.context=t.context,t=l}let o=new nn(t,s||void 0),a=e==="value"?new sn(o):new Ei(e,o);return e_(n._repo,n,a),()=>bs(n._repo,n,a)}function p_(n,e,t,i){return f_(n,"value",e,t,i)}function __(n,e,t){let i=null,r=t?new nn(t):null;e==="value"?i=new sn(r):e&&(i=new Ei(e,r)),bs(n._repo,n,i)}fp(re);vp(re);var m_="FIREBASE_DATABASE_EMULATOR_HOST",Rs={},g_=!1;function v_(n,e,t,i){n.repoInfo_=new Zn(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function y_(n,e,t,i,r){let s=i||n.options.databaseURL;s===void 0&&(n.options.projectId||he("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),L("Using default host for project ",n.options.projectId),s=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=hc(s,r),a=o.repoInfo,c,l;typeof process<"u"&&process.env&&(l=process.env[m_]),l?(c=!0,s=`http://${l}?ns=${a.namespace}`,o=hc(s,r),a=o.repoInfo):c=!o.repoInfo.secure;let h=r&&c?new we(we.OWNER):new Vr(n.name,n.options,e);Gp("Invalid Firebase Database URL",o),I(o.path)||he("Database URL must point to the root of a Firebase Database (not including a child path).");let u=E_(a,n,h,new Wr(n.name,t));return new Ns(u,n)}function I_(n,e){let t=Rs[e];(!t||t[n.key]!==n)&&he(`Database ${e}(${n.repoInfo_}) has already been deleted.`),t_(n),delete t[n.key]}function E_(n,e,t,i){let r=Rs[e.name];r||(r={},Rs[e.name]=r);let s=r[n.toURLString()];return s&&he("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new Cs(n,g_,t,i),r[n.toURLString()]=s,s}var Ns=class{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Kp(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new re(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(I_(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&he("Cannot call "+e+" on a deleted database.")}};function w_(n=yn(),e){let t=St(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){let i=co("database");i&&yl(t,...i)}return t}function yl(n,e,t,i={}){n=O(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&he("Cannot call useEmulator() after instance has already been initialized.");let r=n._repoInternal,s;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&he('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new we(we.OWNER);else if(i.mockUserToken){let o=typeof i.mockUserToken=="string"?i.mockUserToken:lo(i.mockUserToken,n.app.options.projectId);s=new we(o)}v_(r,e,t,s)}function T_(n){Ld(ge),me(new B("database",(e,{instanceIdentifier:t})=>{let i=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return y_(i,r,s,t)},"PUBLIC").setMultipleInstances(!0)),K(xa,Ma,n),K(xa,Ma,"esm2017")}var C_={".sv":"timestamp"};function b_(){return C_}Ge.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ge.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};T_();export{tt as GoogleAuthProvider,br as connectAuthEmulator,yl as connectDatabaseEmulator,d_ as get,La as getAuth,w_ as getDatabase,Oo as initializeApp,__ as off,Ta as onAuthStateChanged,p_ as onValue,l_ as push,c_ as ref,u_ as remove,b_ as serverTimestamp,to as set,ya as signInAnonymously,ka as signInWithPopup,Ca as signOut,h_ as update};
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
