"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[687],{5687:function(e,t,r){r.d(t,{LC:function(){return v}});var n=r(329),i=r(3135),a=r(8742),u=r(2265),s=r(3046),o=r(4483);function l(e,t,r,n){let i=(0,u.useMemo)(()=>({queryArgs:e,serialized:"object"==typeof e?t({queryArgs:e,endpointDefinition:r,endpointName:n}):e}),[e,t,r,n]),a=(0,u.useRef)(i);return(0,u.useEffect)(()=>{a.current.serialized!==i.serialized&&(a.current=i)},[i]),a.current.serialized===i.serialized?a.current.queryArgs:e}r(2601);var c=Symbol();function d(e){let t=(0,u.useRef)(e);return(0,u.useEffect)(()=>{(0,s.wU)(t.current,e)||(t.current=e)},[e]),(0,s.wU)(t.current,e)?t.current:e}var f=WeakMap?new WeakMap:void 0,p=({endpointName:e,queryArgs:t})=>{let r="",n=f?.get(t);if("string"==typeof n)r=n;else{let e=JSON.stringify(t,(e,t)=>(0,o.PO)(t)?Object.keys(t).sort().reduce((e,r)=>(e[r]=t[r],e),{}):t);(0,o.PO)(t)&&f?.set(t,e),r=e}return`${e}(${r})`},m="undefined"!=typeof window&&window.document&&window.document.createElement?u.useLayoutEffect:u.useEffect,y=e=>e.isUninitialized?{...e,isUninitialized:!1,isFetching:!0,isLoading:void 0===e.data,status:n.oZ.pending}:e;function h(e){return e.replace(e[0],e[0].toUpperCase())}function g(e,...t){return Object.assign(e,...t)}var b=Symbol(),v=(0,n.Tk)((0,n.hF)(),(({batch:e=s.dC,hooks:t={useDispatch:s.I0,useSelector:s.v9,useStore:s.oR},unstable__sideEffectsInRender:r=!1,...o}={})=>({name:b,init(o,{serializeQueryArgs:f},b){let{buildQueryHooks:v,buildMutationHook:S,usePrefetch:R}=function({api:e,moduleOptions:{batch:t,hooks:{useDispatch:r,useSelector:o,useStore:f},unstable__sideEffectsInRender:h},serializeQueryArgs:g,context:b}){let v=h?e=>e():u.useEffect;return{buildQueryHooks:function(h){let R=(t,{refetchOnReconnect:a,refetchOnFocus:s,refetchOnMountOrArgChange:o,skip:c=!1,pollingInterval:f=0}={})=>{let{initiate:m}=e.endpoints[h],y=r(),g=(0,u.useRef)();if(!g.current){let t=y(e.internalActions.internal_getRTKQSubscriptions());g.current=t}let S=l(c?n.CN:t,p,b.endpointDefinitions[h],h),R=d({refetchOnReconnect:a,refetchOnFocus:s,pollingInterval:f}),O=(0,u.useRef)(!1),A=(0,u.useRef)(),{queryCacheKey:q,requestId:w}=A.current||{},j=!1;q&&w&&(j=g.current.isRequestSubscribed(q,w));let M=!j&&O.current;return v(()=>{O.current=j}),v(()=>{M&&(A.current=void 0)},[M]),v(()=>{let e=A.current;if(S===n.CN){e?.unsubscribe(),A.current=void 0;return}let t=A.current?.subscriptionOptions;if(e&&e.arg===S)R!==t&&e.updateSubscriptionOptions(R);else{e?.unsubscribe();let t=y(m(S,{subscriptionOptions:R,forceRefetch:o}));A.current=t}},[y,m,o,S,R,M]),(0,u.useEffect)(()=>()=>{A.current?.unsubscribe(),A.current=void 0},[]),(0,u.useMemo)(()=>({refetch:()=>{if(!A.current)throw Error((0,i.rJ)(38));return A.current?.refetch()}}),[])},O=({refetchOnReconnect:n,refetchOnFocus:i,pollingInterval:a=0}={})=>{let{initiate:s}=e.endpoints[h],o=r(),[l,f]=(0,u.useState)(c),p=(0,u.useRef)(),m=d({refetchOnReconnect:n,refetchOnFocus:i,pollingInterval:a});v(()=>{m!==p.current?.subscriptionOptions&&p.current?.updateSubscriptionOptions(m)},[m]);let y=(0,u.useRef)(m);v(()=>{y.current=m},[m]);let g=(0,u.useCallback)(function(e,r=!1){let n;return t(()=>{p.current?.unsubscribe(),p.current=n=o(s(e,{subscriptionOptions:y.current,forceRefetch:!r})),f(e)}),n},[o,s]);return(0,u.useEffect)(()=>()=>{p?.current?.unsubscribe()},[]),(0,u.useEffect)(()=>{l===c||p.current||g(l,!0)},[l,g]),(0,u.useMemo)(()=>[g,l],[g,l])},A=(t,{skip:r=!1,selectFromResult:i}={})=>{let{select:c}=e.endpoints[h],d=l(r?n.CN:t,g,b.endpointDefinitions[h],h),p=(0,u.useRef)(),y=(0,u.useMemo)(()=>(0,a.P1)([c(d),(e,t)=>t,e=>d],S),[c,d]),v=(0,u.useMemo)(()=>i?(0,a.P1)([y],i,{devModeChecks:{identityFunctionCheck:"never"}}):y,[y,i]),R=o(e=>v(e,p.current),s.wU),O=y(f().getState(),p.current);return m(()=>{p.current=O},[O]),R};return{useQueryState:A,useQuerySubscription:R,useLazyQuerySubscription:O,useLazyQuery(e){let[t,r]=O(e),n=A(r,{...e,skip:r===c}),i=(0,u.useMemo)(()=>({lastArg:r}),[r]);return(0,u.useMemo)(()=>[t,n,i],[t,n,i])},useQuery(e,t){let r=R(e,t),i=A(e,{selectFromResult:e===n.CN||t?.skip?void 0:y,...t}),{data:a,status:s,isLoading:o,isSuccess:l,isError:c,error:d}=i;return(0,u.useDebugValue)({data:a,status:s,isLoading:o,isSuccess:l,isError:c,error:d}),(0,u.useMemo)(()=>({...i,...r}),[i,r])}}},buildMutationHook:function(n){return({selectFromResult:i,fixedCacheKey:l}={})=>{let{select:c,initiate:d}=e.endpoints[n],f=r(),[p,m]=(0,u.useState)();(0,u.useEffect)(()=>()=>{p?.arg.fixedCacheKey||p?.reset()},[p]);let y=(0,u.useCallback)(function(e){let t=f(d(e,{fixedCacheKey:l}));return m(t),t},[f,d,l]),{requestId:h}=p||{},g=(0,u.useMemo)(()=>c({fixedCacheKey:l,requestId:p?.requestId}),[l,p,c]),b=o((0,u.useMemo)(()=>i?(0,a.P1)([g],i):g,[i,g]),s.wU),v=null==l?p?.arg.originalArgs:void 0,S=(0,u.useCallback)(()=>{t(()=>{p&&m(void 0),l&&f(e.internalActions.removeMutationResult({requestId:h,fixedCacheKey:l}))})},[f,l,p,h]),{endpointName:R,data:O,status:A,isLoading:q,isSuccess:w,isError:j,error:M}=b;(0,u.useDebugValue)({endpointName:R,data:O,status:A,isLoading:q,isSuccess:w,isError:j,error:M});let C=(0,u.useMemo)(()=>({...b,originalArgs:v,reset:S}),[b,v,S]);return(0,u.useMemo)(()=>[y,C],[y,C])}},usePrefetch:function(t,n){let i=r(),a=d(n);return(0,u.useCallback)((r,n)=>i(e.util.prefetch(t,r,{...a,...n})),[t,i,a])}};function S(e,t,r){if(t?.endpointName&&e.isUninitialized){let{endpointName:e}=t,n=b.endpointDefinitions[e];g({queryArgs:t.originalArgs,endpointDefinition:n,endpointName:e})===g({queryArgs:r,endpointDefinition:n,endpointName:e})&&(t=void 0)}let n=e.isSuccess?e.data:t?.data;void 0===n&&(n=e.data);let i=void 0!==n,a=e.isLoading,u=e.isSuccess||a&&i;return{...e,data:n,currentData:e.data,isFetching:a,isLoading:!i&&a,isSuccess:u}}}({api:o,moduleOptions:{batch:e,hooks:t,unstable__sideEffectsInRender:r},serializeQueryArgs:f,context:b});return g(o,{usePrefetch:R}),g(b,{batch:e}),{injectEndpoint(e,t){if("query"===t.type){let{useQuery:t,useLazyQuery:r,useLazyQuerySubscription:n,useQueryState:i,useQuerySubscription:a}=v(e);g(o.endpoints[e],{useQuery:t,useLazyQuery:r,useLazyQuerySubscription:n,useQueryState:i,useQuerySubscription:a}),o[`use${h(e)}Query`]=t,o[`useLazy${h(e)}Query`]=r}else if("mutation"===t.type){let t=S(e);g(o.endpoints[e],{useMutation:t}),o[`use${h(e)}Mutation`]=t}}}}}))())},329:function(e,t,r){r.d(t,{CN:function(){return E},Tk:function(){return U},hF:function(){return ee},ni:function(){return g},oZ:function(){return o}});var n,i=r(4483),a=r(3135),u=r(7173),s=r(8742);r(2601);var o=((n=o||{}).uninitialized="uninitialized",n.pending="pending",n.fulfilled="fulfilled",n.rejected="rejected",n),l=e=>e.replace(/\/$/,""),c=e=>e.replace(/^\//,""),d=e=>[].concat(...e),f=i.PO,p=(...e)=>fetch(...e),m=e=>e.status>=200&&e.status<=299,y=e=>/ion\/(vnd\.api\+)?json/.test(e.get("content-type")||"");function h(e){if(!(0,i.PO)(e))return e;let t={...e};for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return t}function g({baseUrl:e,prepareHeaders:t=e=>e,fetchFn:r=p,paramsSerializer:n,isJsonContentType:a=y,jsonContentType:u="application/json",jsonReplacer:s,timeout:o,responseHandler:d,validateStatus:f,...g}={}){return"undefined"==typeof fetch&&r===p&&console.warn("Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments."),async(p,y)=>{let v,S;let{signal:R,getState:O,extra:A,endpoint:q,forced:w,type:j}=y,{url:M,headers:C=new Headers(g.headers),params:T,responseHandler:P=d??"json",validateStatus:D=f??m,timeout:N=o,...Q}="string"==typeof p?{url:p}:p,k={...g,signal:R,...Q};C=new Headers(h(C)),k.headers=await t(C,{getState:O,extra:A,endpoint:q,forced:w,type:j})||C;let I=e=>"object"==typeof e&&((0,i.PO)(e)||Array.isArray(e)||"function"==typeof e.toJSON);if(!k.headers.has("content-type")&&I(k.body)&&k.headers.set("content-type",u),I(k.body)&&a(k.headers)&&(k.body=JSON.stringify(k.body,s)),T){let e=~M.indexOf("?")?"&":"?";M+=e+(n?n(T):new URLSearchParams(h(T)))}M=function(e,t){var r;if(!e)return t;if(!t)return e;if(r=t,RegExp("(^|:)//").test(r))return t;let n=e.endsWith("/")||!t.startsWith("?")?"/":"";return e=l(e),t=c(t),`${e}${n}${t}`}(e,M);let E=new Request(M,k);v={request:new Request(M,k)};let x,_=!1,z=N&&setTimeout(()=>{_=!0,y.abort()},N);try{x=await r(E)}catch(e){return{error:{status:_?"TIMEOUT_ERROR":"FETCH_ERROR",error:String(e)},meta:v}}finally{z&&clearTimeout(z)}let K=x.clone();v.response=K;let $="";try{let e;if(await Promise.all([b(x,P).then(e=>S=e,t=>e=t),K.text().then(e=>$=e,()=>{})]),e)throw e}catch(e){return{error:{status:"PARSING_ERROR",originalStatus:x.status,data:$,error:String(e)},meta:v}}return D(x,S)?{data:S,meta:v}:{error:{status:x.status,data:S},meta:v}};async function b(e,t){if("function"==typeof t)return t(e);if("content-type"===t&&(t=a(e.headers)?"json":"text"),"json"===t){let t=await e.text();return t.length?JSON.parse(t):null}return e.text()}}var b=class{constructor(e,t){this.value=e,this.meta=t}},v=(0,a.PH)("__rtkq/focused"),S=(0,a.PH)("__rtkq/unfocused"),R=(0,a.PH)("__rtkq/online"),O=(0,a.PH)("__rtkq/offline");function A(e){return"query"===e.type}function q(e,t,r,n,i,a){return"function"==typeof e?e(t,r,n,i).map(w).map(a):Array.isArray(e)?e.map(w).map(a):[]}function w(e){return"string"==typeof e?{type:e}:e}function j(e){return null!=e}function M(e){let t=0;for(let r in e)t++;return t}var C=Symbol("forceQueryFn"),T=e=>"function"==typeof e[C];function P(e){return e}function D(e,t,r,n){return q(r[e.meta.arg.endpointName][t],(0,a.KD)(e)?e.payload:void 0,(0,a.h_)(e)?e.payload:void 0,e.meta.arg.originalArgs,"baseQueryMeta"in e.meta?e.meta.baseQueryMeta:void 0,n)}function N(e,t,r){let n=e[t];n&&r(n)}function Q(e){return("arg"in e?e.arg.fixedCacheKey:e.fixedCacheKey)??e.requestId}function k(e,t,r){let n=e[Q(t)];n&&r(n)}var I={},E=Symbol.for("RTKQ/skipToken"),x={status:"uninitialized"},_=(0,u.Uy)(x,()=>{}),z=(0,u.Uy)(x,()=>{}),K=WeakMap?new WeakMap:void 0,$=({endpointName:e,queryArgs:t})=>{let r="",n=K?.get(t);if("string"==typeof n)r=n;else{let e=JSON.stringify(t,(e,t)=>(0,i.PO)(t)?Object.keys(t).sort().reduce((e,r)=>(e[r]=t[r],e),{}):t);(0,i.PO)(t)&&K?.set(t,e),r=e}return`${e}(${r})`};function U(...e){return function(t){let r=(0,s.kO)(e=>t.extractRehydrationInfo?.(e,{reducerPath:t.reducerPath??"api"})),n={reducerPath:"api",keepUnusedDataFor:60,refetchOnMountOrArgChange:!1,refetchOnFocus:!1,refetchOnReconnect:!1,invalidationBehavior:"delayed",...t,extractRehydrationInfo:r,serializeQueryArgs(e){let r=$;if("serializeQueryArgs"in e.endpointDefinition){let t=e.endpointDefinition.serializeQueryArgs;r=e=>{let r=t(e);return"string"==typeof r?r:$({...e,queryArgs:r})}}else t.serializeQueryArgs&&(r=t.serializeQueryArgs);return r(e)},tagTypes:[...t.tagTypes||[]]},i={endpointDefinitions:{},batch(e){e()},apiUid:(0,a.x0)(),extractRehydrationInfo:r,hasRehydrationInfo:(0,s.kO)(e=>null!=r(e))},u={injectEndpoints:function(e){for(let[t,r]of Object.entries(e.endpoints({query:e=>({...e,type:"query"}),mutation:e=>({...e,type:"mutation"})})))if(e.overrideExisting||!(t in i.endpointDefinitions))for(let e of(i.endpointDefinitions[t]=r,o))e.injectEndpoint(t,r);return u},enhanceEndpoints({addTagTypes:e,endpoints:t}){if(e)for(let t of e)n.tagTypes.includes(t)||n.tagTypes.push(t);if(t)for(let[e,r]of Object.entries(t))"function"==typeof r?r(i.endpointDefinitions[e]):Object.assign(i.endpointDefinitions[e]||{},r);return u}},o=e.map(e=>e.init(u,n,i));return u.injectEndpoints({endpoints:t.endpoints})}}var F=({reducerPath:e,api:t,context:r,internalState:n})=>{let{removeQueryResult:i,unsubscribeQueryResult:a}=t.internalActions;function u(e){let t=n.currentSubscriptions[e];return!!t&&!function(e){for(let t in e)return!1;return!0}(t)}let s={};function o(e,t,n,a){let o=r.endpointDefinitions[t],l=o?.keepUnusedDataFor??a.keepUnusedDataFor;if(l!==1/0&&!u(e)){let t=s[e];t&&clearTimeout(t),s[e]=setTimeout(()=>{u(e)||n.dispatch(i({queryCacheKey:e})),delete s[e]},1e3*Math.max(0,Math.min(l,2147482.647)))}}return(n,i,u)=>{if(a.match(n)){let t=i.getState()[e],{queryCacheKey:r}=n.payload;o(r,t.queries[r]?.endpointName,i,t.config)}if(t.util.resetApiState.match(n))for(let[e,t]of Object.entries(s))t&&clearTimeout(t),delete s[e];if(r.hasRehydrationInfo(n)){let t=i.getState()[e],{queries:a}=r.extractRehydrationInfo(n);for(let[e,r]of Object.entries(a))o(e,r?.endpointName,i,t.config)}}},H=({reducerPath:e,context:t,context:{endpointDefinitions:r},mutationThunk:n,queryThunk:i,api:u,assertTagType:s,refetchQuery:o,internalState:l})=>{let{removeQueryResult:c}=u.internalActions,d=(0,a.Q)((0,a.KD)(n),(0,a.h_)(n)),f=(0,a.Q)((0,a.KD)(n,i),(0,a.Iv)(n,i)),p=[];function m(r,n){let i=n.getState(),a=i[e];if(p.push(...r),"delayed"===a.config.invalidationBehavior&&function(e){for(let t in e.queries)if(e.queries[t]?.status==="pending")return!0;for(let t in e.mutations)if(e.mutations[t]?.status==="pending")return!0;return!1}(a))return;let s=p;if(p=[],0===s.length)return;let d=u.util.selectInvalidatedBy(i,s);t.batch(()=>{for(let{queryCacheKey:e}of Array.from(d.values())){let t=a.queries[e],r=l.currentSubscriptions[e]??{};t&&(0===M(r)?n.dispatch(c({queryCacheKey:e})):"uninitialized"!==t.status&&n.dispatch(o(t,e)))}})}return(e,t)=>{d(e)?m(D(e,"invalidatesTags",r,s),t):f(e)?m([],t):u.util.invalidateTags.match(e)&&m(q(e.payload,void 0,void 0,void 0,void 0,s),t)}},L=({reducerPath:e,queryThunk:t,api:r,refetchQuery:n,internalState:i})=>{let a={};function u({queryCacheKey:t},r){let u=r.getState()[e].queries[t],s=i.currentSubscriptions[t];if(!u||"uninitialized"===u.status)return;let o=l(s);if(!Number.isFinite(o))return;let c=a[t];c?.timeout&&(clearTimeout(c.timeout),c.timeout=void 0);let d=Date.now()+o,f=a[t]={nextPollTimestamp:d,pollingInterval:o,timeout:setTimeout(()=>{f.timeout=void 0,r.dispatch(n(u,t))},o)}}function s({queryCacheKey:t},r){let n=r.getState()[e].queries[t],s=i.currentSubscriptions[t];if(!n||"uninitialized"===n.status)return;let c=l(s);if(!Number.isFinite(c)){o(t);return}let d=a[t],f=Date.now()+c;(!d||f<d.nextPollTimestamp)&&u({queryCacheKey:t},r)}function o(e){let t=a[e];t?.timeout&&clearTimeout(t.timeout),delete a[e]}function l(e={}){let t=Number.POSITIVE_INFINITY;for(let r in e)e[r].pollingInterval&&(t=Math.min(e[r].pollingInterval,t));return t}return(e,n)=>{(r.internalActions.updateSubscriptionOptions.match(e)||r.internalActions.unsubscribeQueryResult.match(e))&&s(e.payload,n),(t.pending.match(e)||t.rejected.match(e)&&e.meta.condition)&&s(e.meta.arg,n),(t.fulfilled.match(e)||t.rejected.match(e)&&!e.meta.condition)&&u(e.meta.arg,n),r.util.resetApiState.match(e)&&function(){for(let e of Object.keys(a))o(e)}()}},J=({reducerPath:e,context:t,api:r,refetchQuery:n,internalState:i})=>{let{removeQueryResult:a}=r.internalActions;function u(r,u){let s=r.getState()[e],o=s.queries,l=i.currentSubscriptions;t.batch(()=>{for(let e of Object.keys(l)){let t=o[e],i=l[e];i&&t&&(Object.values(i).some(e=>!0===e[u])||Object.values(i).every(e=>void 0===e[u])&&s.config[u])&&(0===M(i)?r.dispatch(a({queryCacheKey:e})):"uninitialized"!==t.status&&r.dispatch(n(t,e)))}})}return(e,t)=>{v.match(e)&&u(t,"refetchOnFocus"),R.match(e)&&u(t,"refetchOnReconnect")}},B=Error("Promise never resolved before cacheEntryRemoved."),W=({api:e,reducerPath:t,context:r,queryThunk:n,mutationThunk:i,internalState:u})=>{let s=(0,a.Gx)(n),o=(0,a.Gx)(i),l=(0,a.KD)(n,i),c={};function d(t,n,i,a,u){let s=r.endpointDefinitions[t],o=s?.onCacheEntryAdded;if(!o)return;let l={},d=new Promise(e=>{l.cacheEntryRemoved=e}),f=Promise.race([new Promise(e=>{l.valueResolved=e}),d.then(()=>{throw B})]);f.catch(()=>{}),c[i]=l;let p=e.endpoints[t].select("query"===s.type?n:i),m=a.dispatch((e,t,r)=>r),y={...a,getCacheEntry:()=>p(a.getState()),requestId:u,extra:m,updateCachedData:"query"===s.type?r=>a.dispatch(e.util.updateQueryData(t,n,r)):void 0,cacheDataLoaded:f,cacheEntryRemoved:d};Promise.resolve(o(n,y)).catch(e=>{if(e!==B)throw e})}return(r,a,u)=>{let f=s(r)?r.meta.arg.queryCacheKey:o(r)?r.meta.requestId:e.internalActions.removeQueryResult.match(r)?r.payload.queryCacheKey:e.internalActions.removeMutationResult.match(r)?Q(r.payload):"";if(n.pending.match(r)){let e=u[t].queries[f],n=a.getState()[t].queries[f];!e&&n&&d(r.meta.arg.endpointName,r.meta.arg.originalArgs,f,a,r.meta.requestId)}else if(i.pending.match(r))a.getState()[t].mutations[f]&&d(r.meta.arg.endpointName,r.meta.arg.originalArgs,f,a,r.meta.requestId);else if(l(r)){let e=c[f];e?.valueResolved&&(e.valueResolved({data:r.payload,meta:r.meta.baseQueryMeta}),delete e.valueResolved)}else if(e.internalActions.removeQueryResult.match(r)||e.internalActions.removeMutationResult.match(r)){let e=c[f];e&&(delete c[f],e.cacheEntryRemoved())}else if(e.util.resetApiState.match(r))for(let[e,t]of Object.entries(c))delete c[e],t.cacheEntryRemoved()}},G=({api:e,context:t,queryThunk:r,mutationThunk:n})=>{let i=(0,a.zR)(r,n),u=(0,a.Iv)(r,n),s=(0,a.KD)(r,n),o={};return(r,n)=>{if(i(r)){let{requestId:i,arg:{endpointName:a,originalArgs:u}}=r.meta,s=t.endpointDefinitions[a],l=s?.onQueryStarted;if(l){let t={},r=new Promise((e,r)=>{t.resolve=e,t.reject=r});r.catch(()=>{}),o[i]=t;let c=e.endpoints[a].select("query"===s.type?u:i),d=n.dispatch((e,t,r)=>r),f={...n,getCacheEntry:()=>c(n.getState()),requestId:i,extra:d,updateCachedData:"query"===s.type?t=>n.dispatch(e.util.updateQueryData(a,u,t)):void 0,queryFulfilled:r};l(u,f)}}else if(s(r)){let{requestId:e,baseQueryMeta:t}=r.meta;o[e]?.resolve({data:r.payload,meta:t}),delete o[e]}else if(u(r)){let{requestId:e,rejectedWithValue:t,baseQueryMeta:n}=r.meta;o[e]?.reject({error:r.payload??r.error,isUnhandledError:!t,meta:n}),delete o[e]}}},V=({api:e,context:{apiUid:t},reducerPath:r})=>(r,n)=>{e.util.resetApiState.match(r)&&n.dispatch(e.internalActions.middlewareRegistered(t))},Y=({api:e,queryThunk:t,internalState:r})=>{let n=`${e.reducerPath}/subscriptions`,i=null,a=null,{updateSubscriptionOptions:s,unsubscribeQueryResult:o}=e.internalActions,l=(r,n)=>{if(s.match(n)){let{queryCacheKey:e,requestId:t,options:i}=n.payload;return r?.[e]?.[t]&&(r[e][t]=i),!0}if(o.match(n)){let{queryCacheKey:e,requestId:t}=n.payload;return r[e]&&delete r[e][t],!0}if(e.internalActions.removeQueryResult.match(n))return delete r[n.payload.queryCacheKey],!0;if(t.pending.match(n)){let{meta:{arg:e,requestId:t}}=n,i=r[e.queryCacheKey]??={};return i[`${t}_running`]={},e.subscribe&&(i[t]=e.subscriptionOptions??i[t]??{}),!0}let i=!1;if(t.fulfilled.match(n)||t.rejected.match(n)){let e=r[n.meta.arg.queryCacheKey]||{},t=`${n.meta.requestId}_running`;i||=!!e[t],delete e[t]}if(t.rejected.match(n)){let{meta:{condition:e,arg:t,requestId:a}}=n;if(e&&t.subscribe){let e=r[t.queryCacheKey]??={};e[a]=t.subscriptionOptions??e[a]??{},i=!0}}return i},c=()=>r.currentSubscriptions,d={getSubscriptions:c,getSubscriptionCount:e=>M(c()[e]??{}),isRequestSubscribed:(e,t)=>{let r=c();return!!r?.[e]?.[t]}};return(s,o)=>{if(i||(i=JSON.parse(JSON.stringify(r.currentSubscriptions))),e.util.resetApiState.match(s))return i=r.currentSubscriptions={},a=null,[!0,!1];if(e.internalActions.internal_getRTKQSubscriptions.match(s))return[!1,d];let c=l(r.currentSubscriptions,s),f=!0;if(c){a||(a=setTimeout(()=>{let t=JSON.parse(JSON.stringify(r.currentSubscriptions)),[,n]=(0,u.aS)(i,()=>t);o.next(e.internalActions.subscriptionsUpdated(n)),i=t,a=null},500));let l="string"==typeof s.type&&!!s.type.startsWith(n),c=t.rejected.match(s)&&s.meta.condition&&!!s.meta.arg.subscribe;f=!l&&!c}return[f,!1]}};function Z(e,...t){return Object.assign(e,...t)}var X=Symbol(),ee=()=>({name:X,init(e,{baseQuery:t,tagTypes:r,reducerPath:n,serializeQueryArgs:o,keepUnusedDataFor:l,refetchOnMountOrArgChange:c,refetchOnFocus:p,refetchOnReconnect:m,invalidationBehavior:y},h){(0,u.vI)();let g=e=>e;Object.assign(e,{reducerPath:n,endpoints:{},internalActions:{onOnline:R,onOffline:O,onFocus:v,onFocusLost:S},util:{}});let{queryThunk:x,mutationThunk:K,patchQueryData:$,updateQueryData:U,upsertQueryData:B,prefetch:ee,buildMatchThunkActions:et}=function({reducerPath:e,baseQuery:t,context:{endpointDefinitions:r},serializeQueryArgs:n,api:i,assertTagType:s}){let o=async(e,{signal:n,abort:i,rejectWithValue:u,fulfillWithValue:s,dispatch:o,getState:c,extra:d})=>{let f=r[e.endpointName];try{let r,u=P,p={signal:n,abort:i,dispatch:o,getState:c,extra:d,endpoint:e.endpointName,type:e.type,forced:"query"===e.type?l(e,c()):void 0},m="query"===e.type?e[C]:void 0;if(m?r=m():f.query?(r=await t(f.query(e.originalArgs),p,f.extraOptions),f.transformResponse&&(u=f.transformResponse)):r=await f.queryFn(e.originalArgs,p,f.extraOptions,e=>t(e,p,f.extraOptions)),r.error)throw new b(r.error,r.meta);return s(await u(r.data,r.meta,e.originalArgs),{fulfilledTimeStamp:Date.now(),baseQueryMeta:r.meta,[a.s4]:!0})}catch(r){let t=r;if(t instanceof b){let r=P;f.query&&f.transformErrorResponse&&(r=f.transformErrorResponse);try{return u(await r(t.value,t.meta,e.originalArgs),{baseQueryMeta:t.meta,[a.s4]:!0})}catch(e){t=e}}throw console.error(t),t}};function l(t,r){let n=r[e]?.queries?.[t.queryCacheKey],i=r[e]?.config.refetchOnMountOrArgChange,a=n?.fulfilledTimeStamp,u=t.forceRefetch??(t.subscribe&&i);return!!u&&(!0===u||(Number(new Date)-Number(a))/1e3>=u)}let c=(0,a.hg)(`${e}/executeQuery`,o,{getPendingMeta:()=>({startedTimeStamp:Date.now(),[a.s4]:!0}),condition(t,{getState:n}){let i=n(),a=i[e]?.queries?.[t.queryCacheKey],u=a?.fulfilledTimeStamp,s=t.originalArgs,o=a?.originalArgs,c=r[t.endpointName];return!!T(t)||a?.status!=="pending"&&(!!(l(t,i)||A(c)&&c?.forceRefetch?.({currentArg:s,previousArg:o,endpointState:a,state:i}))||!u)},dispatchConditionRejection:!0}),d=(0,a.hg)(`${e}/executeMutation`,o,{getPendingMeta:()=>({startedTimeStamp:Date.now(),[a.s4]:!0})}),f=e=>"force"in e,p=e=>"ifOlderThan"in e;function m(e){return t=>t?.meta?.arg?.endpointName===e}return{queryThunk:c,mutationThunk:d,prefetch:(e,t,r)=>(n,a)=>{let u=f(r)&&r.force,s=p(r)&&r.ifOlderThan,o=(r=!0)=>i.endpoints[e].initiate(t,{forceRefetch:r}),l=i.endpoints[e].select(t)(a());if(u)n(o());else if(s){let e=l?.fulfilledTimeStamp;if(!e){n(o());return}(Number(new Date)-Number(new Date(e)))/1e3>=s&&n(o())}else n(o(!1))},updateQueryData:(e,t,r,n=!0)=>(a,s)=>{let o;let l=i.endpoints[e].select(t)(s()),c={patches:[],inversePatches:[],undo:()=>a(i.util.patchQueryData(e,t,c.inversePatches,n))};if("uninitialized"===l.status)return c;if("data"in l){if((0,u.o$)(l.data)){let[e,t,n]=(0,u.aS)(l.data,r);c.patches.push(...t),c.inversePatches.push(...n),o=e}else o=r(l.data),c.patches.push({op:"replace",path:[],value:o}),c.inversePatches.push({op:"replace",path:[],value:l.data})}return a(i.util.patchQueryData(e,t,c.patches,n)),c},upsertQueryData:(e,t,r)=>n=>n(i.endpoints[e].initiate(t,{subscribe:!1,forceRefetch:!0,[C]:()=>({data:r})})),patchQueryData:(e,t,a,u)=>(o,l)=>{let c=r[e],d=n({queryArgs:t,endpointDefinition:c,endpointName:e});if(o(i.internalActions.queryResultPatched({queryCacheKey:d,patches:a})),!u)return;let f=i.endpoints[e].select(t)(l()),p=q(c.providesTags,f.data,void 0,t,{},s);o(i.internalActions.updateProvidedBy({queryCacheKey:d,providedTags:p}))},buildMatchThunkActions:function(e,t){return{matchPending:(0,a.A6)((0,a.zR)(e),m(t)),matchFulfilled:(0,a.A6)((0,a.KD)(e),m(t)),matchRejected:(0,a.A6)((0,a.Iv)(e),m(t))}}}}({baseQuery:t,reducerPath:n,context:h,api:e,serializeQueryArgs:o,assertTagType:g}),{reducer:er,actions:en}=function({reducerPath:e,queryThunk:t,mutationThunk:r,context:{endpointDefinitions:n,apiUid:s,extractRehydrationInfo:o,hasRehydrationInfo:l},assertTagType:c,config:d}){let p=(0,a.PH)(`${e}/resetApiState`),m=(0,a.oM)({name:`${e}/queries`,initialState:I,reducers:{removeQueryResult:{reducer(e,{payload:{queryCacheKey:t}}){delete e[t]},prepare:(0,a.cw)()},queryResultPatched:{reducer(e,{payload:{queryCacheKey:t,patches:r}}){N(e,t,e=>{e.data=(0,u.QE)(e.data,r.concat())})},prepare:(0,a.cw)()}},extraReducers(e){e.addCase(t.pending,(e,{meta:t,meta:{arg:r}})=>{let n=T(r);e[r.queryCacheKey]??={status:"uninitialized",endpointName:r.endpointName},N(e,r.queryCacheKey,e=>{e.status="pending",e.requestId=n&&e.requestId?e.requestId:t.requestId,void 0!==r.originalArgs&&(e.originalArgs=r.originalArgs),e.startedTimeStamp=t.startedTimeStamp})}).addCase(t.fulfilled,(e,{meta:t,payload:r})=>{N(e,t.arg.queryCacheKey,e=>{if(e.requestId!==t.requestId&&!T(t.arg))return;let{merge:i}=n[t.arg.endpointName];if(e.status="fulfilled",i){if(void 0!==e.data){let{fulfilledTimeStamp:n,arg:a,baseQueryMeta:s,requestId:o}=t,l=(0,u.Uy)(e.data,e=>i(e,r,{arg:a.originalArgs,baseQueryMeta:s,fulfilledTimeStamp:n,requestId:o}));e.data=l}else e.data=r}else e.data=n[t.arg.endpointName].structuralSharing??!0?function e(t,r){if(t===r||!(f(t)&&f(r)||Array.isArray(t)&&Array.isArray(r)))return r;let n=Object.keys(r),i=Object.keys(t),a=n.length===i.length,u=Array.isArray(r)?[]:{};for(let i of n)u[i]=e(t[i],r[i]),a&&(a=t[i]===u[i]);return a?t:u}((0,u.mv)(e.data)?(0,u.Js)(e.data):e.data,r):r;delete e.error,e.fulfilledTimeStamp=t.fulfilledTimeStamp})}).addCase(t.rejected,(e,{meta:{condition:t,arg:r,requestId:n},error:i,payload:a})=>{N(e,r.queryCacheKey,e=>{if(t);else{if(e.requestId!==n)return;e.status="rejected",e.error=a??i}})}).addMatcher(l,(e,t)=>{let{queries:r}=o(t);for(let[t,n]of Object.entries(r))(n?.status==="fulfilled"||n?.status==="rejected")&&(e[t]=n)})}}),y=(0,a.oM)({name:`${e}/mutations`,initialState:I,reducers:{removeMutationResult:{reducer(e,{payload:t}){let r=Q(t);r in e&&delete e[r]},prepare:(0,a.cw)()}},extraReducers(e){e.addCase(r.pending,(e,{meta:t,meta:{requestId:r,arg:n,startedTimeStamp:i}})=>{n.track&&(e[Q(t)]={requestId:r,status:"pending",endpointName:n.endpointName,startedTimeStamp:i})}).addCase(r.fulfilled,(e,{payload:t,meta:r})=>{r.arg.track&&k(e,r,e=>{e.requestId===r.requestId&&(e.status="fulfilled",e.data=t,e.fulfilledTimeStamp=r.fulfilledTimeStamp)})}).addCase(r.rejected,(e,{payload:t,error:r,meta:n})=>{n.arg.track&&k(e,n,e=>{e.requestId===n.requestId&&(e.status="rejected",e.error=t??r)})}).addMatcher(l,(e,t)=>{let{mutations:r}=o(t);for(let[t,n]of Object.entries(r))(n?.status==="fulfilled"||n?.status==="rejected")&&t!==n?.requestId&&(e[t]=n)})}}),h=(0,a.oM)({name:`${e}/invalidation`,initialState:I,reducers:{updateProvidedBy:{reducer(e,t){let{queryCacheKey:r,providedTags:n}=t.payload;for(let t of Object.values(e))for(let e of Object.values(t)){let t=e.indexOf(r);-1!==t&&e.splice(t,1)}for(let{type:t,id:i}of n){let n=(e[t]??={})[i||"__internal_without_id"]??=[];n.includes(r)||n.push(r)}},prepare:(0,a.cw)()}},extraReducers(e){e.addCase(m.actions.removeQueryResult,(e,{payload:{queryCacheKey:t}})=>{for(let r of Object.values(e))for(let e of Object.values(r)){let r=e.indexOf(t);-1!==r&&e.splice(r,1)}}).addMatcher(l,(e,t)=>{let{provided:r}=o(t);for(let[t,n]of Object.entries(r))for(let[r,i]of Object.entries(n)){let n=(e[t]??={})[r||"__internal_without_id"]??=[];for(let e of i)n.includes(e)||n.push(e)}}).addMatcher((0,a.Q)((0,a.KD)(t),(0,a.h_)(t)),(e,t)=>{let r=D(t,"providesTags",n,c),{queryCacheKey:i}=t.meta.arg;h.caseReducers.updateProvidedBy(e,h.actions.updateProvidedBy({queryCacheKey:i,providedTags:r}))})}}),g=(0,a.oM)({name:`${e}/subscriptions`,initialState:I,reducers:{updateSubscriptionOptions(e,t){},unsubscribeQueryResult(e,t){},internal_getRTKQSubscriptions(){}}}),b=(0,a.oM)({name:`${e}/internalSubscriptions`,initialState:I,reducers:{subscriptionsUpdated:{reducer:(e,t)=>(0,u.QE)(e,t.payload),prepare:(0,a.cw)()}}}),A=(0,a.oM)({name:`${e}/config`,initialState:{online:"undefined"==typeof navigator||void 0===navigator.onLine||navigator.onLine,focused:"undefined"==typeof document||"hidden"!==document.visibilityState,middlewareRegistered:!1,...d},reducers:{middlewareRegistered(e,{payload:t}){e.middlewareRegistered="conflict"!==e.middlewareRegistered&&s===t||"conflict"}},extraReducers:e=>{e.addCase(R,e=>{e.online=!0}).addCase(O,e=>{e.online=!1}).addCase(v,e=>{e.focused=!0}).addCase(S,e=>{e.focused=!1}).addMatcher(l,e=>({...e}))}}),q=(0,i.UY)({queries:m.reducer,mutations:y.reducer,provided:h.reducer,subscriptions:b.reducer,config:A.reducer});return{reducer:(e,t)=>q(p.match(t)?void 0:e,t),actions:{...A.actions,...m.actions,...g.actions,...b.actions,...y.actions,...h.actions,resetApiState:p}}}({context:h,queryThunk:x,mutationThunk:K,reducerPath:n,assertTagType:g,config:{refetchOnFocus:p,refetchOnReconnect:m,refetchOnMountOrArgChange:c,keepUnusedDataFor:l,reducerPath:n,invalidationBehavior:y}});Z(e.util,{patchQueryData:$,updateQueryData:U,upsertQueryData:B,prefetch:ee,resetApiState:en.resetApiState}),Z(e.internalActions,en);let{middleware:ei,actions:ea}=function(e){let{reducerPath:t,queryThunk:r,api:n,context:u}=e,{apiUid:s}=u,o={invalidateTags:(0,a.PH)(`${t}/invalidateTags`)},l=e=>e.type.startsWith(`${t}/`),c=[V,F,H,L,W,G];return{middleware:r=>{let a=!1,o={...e,internalState:{currentSubscriptions:{}},refetchQuery:d,isThisApiSliceAction:l},f=c.map(e=>e(o)),p=Y(o),m=J(o);return e=>o=>{let c;if(!(0,i.LG)(o))return e(o);a||(a=!0,r.dispatch(n.internalActions.middlewareRegistered(s)));let d={...r,next:e},y=r.getState(),[h,g]=p(o,d,y);if(c=h?e(o):g,r.getState()[t]&&(m(o,d,y),l(o)||u.hasRehydrationInfo(o)))for(let e of f)e(o,d,y);return c}},actions:o};function d(e,t,n={}){return r({type:"query",endpointName:e.endpointName,originalArgs:e.originalArgs,subscribe:!1,forceRefetch:!0,queryCacheKey:t,...n})}}({reducerPath:n,context:h,queryThunk:x,mutationThunk:K,api:e,assertTagType:g});Z(e.util,ea),Z(e,{reducer:er,middleware:ei});let{buildQuerySelector:eu,buildMutationSelector:es,selectInvalidatedBy:eo,selectCachedArgsForQuery:el}=function({serializeQueryArgs:e,reducerPath:t}){let r=e=>_,n=e=>z;return{buildQuerySelector:function(n,a){return u=>{let o=e({queryArgs:u,endpointDefinition:a,endpointName:n});return(0,s.P1)(u===E?r:e=>e[t]?.queries?.[o]??_,i)}},buildMutationSelector:function(){return e=>{let r;return r="object"==typeof e?Q(e)??E:e,(0,s.P1)(r===E?n:e=>e[t]?.mutations?.[r]??z,i)}},selectInvalidatedBy:function(e,r){let n=e[t],i=new Set;for(let e of r.map(w)){let t=n.provided[e.type];if(t)for(let r of(void 0!==e.id?t[e.id]:d(Object.values(t)))??[])i.add(r)}return d(Array.from(i.values()).map(e=>{let t=n.queries[e];return t?[{queryCacheKey:e,endpointName:t.endpointName,originalArgs:t.originalArgs}]:[]}))},selectCachedArgsForQuery:function(e,r){return Object.values(e[t].queries).filter(e=>e?.endpointName===r&&"uninitialized"!==e.status).map(e=>e.originalArgs)}};function i(e){var t;return{...e,status:t=e.status,isUninitialized:"uninitialized"===t,isLoading:"pending"===t,isSuccess:"fulfilled"===t,isError:"rejected"===t}}}({serializeQueryArgs:o,reducerPath:n});Z(e.util,{selectInvalidatedBy:eo,selectCachedArgsForQuery:el});let{buildInitiateQuery:ec,buildInitiateMutation:ed,getRunningMutationThunk:ef,getRunningMutationsThunk:ep,getRunningQueriesThunk:em,getRunningQueryThunk:ey}=function({serializeQueryArgs:e,queryThunk:t,mutationThunk:r,api:n,context:i}){let a=new Map,u=new Map,{unsubscribeQueryResult:s,removeMutationResult:o,updateSubscriptionOptions:l}=n.internalActions;return{buildInitiateQuery:function(r,i){let u=(o,{subscribe:c=!0,forceRefetch:d,subscriptionOptions:f,[C]:p}={})=>(m,y)=>{let h=e({queryArgs:o,endpointDefinition:i,endpointName:r}),g=t({type:"query",subscribe:c,forceRefetch:d,subscriptionOptions:f,endpointName:r,originalArgs:o,queryCacheKey:h,[C]:p}),b=n.endpoints[r].select(o),v=m(g),S=b(y()),{requestId:R,abort:O}=v,A=S.requestId!==R,q=a.get(m)?.[h],w=()=>b(y()),j=Object.assign(p?v.then(w):A&&!q?Promise.resolve(S):Promise.all([q,v]).then(w),{arg:o,requestId:R,subscriptionOptions:f,queryCacheKey:h,abort:O,async unwrap(){let e=await j;if(e.isError)throw e.error;return e.data},refetch:()=>m(u(o,{subscribe:!1,forceRefetch:!0})),unsubscribe(){c&&m(s({queryCacheKey:h,requestId:R}))},updateSubscriptionOptions(e){j.subscriptionOptions=e,m(l({endpointName:r,requestId:R,queryCacheKey:h,options:e}))}});if(!q&&!A&&!p){let e=a.get(m)||{};e[h]=j,a.set(m,e),j.then(()=>{delete e[h],M(e)||a.delete(m)})}return j};return u},buildInitiateMutation:function(e){return(t,{track:n=!0,fixedCacheKey:i}={})=>(a,s)=>{let l=a(r({type:"mutation",endpointName:e,originalArgs:t,track:n,fixedCacheKey:i})),{requestId:c,abort:d,unwrap:f}=l,p=Object.assign(l.unwrap().then(e=>({data:e})).catch(e=>({error:e})),{arg:l.arg,requestId:c,abort:d,unwrap:f,reset:()=>{a(o({requestId:c,fixedCacheKey:i}))}}),m=u.get(a)||{};return u.set(a,m),m[c]=p,p.then(()=>{delete m[c],M(m)||u.delete(a)}),i&&(m[i]=p,p.then(()=>{m[i]!==p||(delete m[i],M(m)||u.delete(a))})),p}},getRunningQueryThunk:function(t,r){return n=>{let u=e({queryArgs:r,endpointDefinition:i.endpointDefinitions[t],endpointName:t});return a.get(n)?.[u]}},getRunningMutationThunk:function(e,t){return e=>u.get(e)?.[t]},getRunningQueriesThunk:function(){return e=>Object.values(a.get(e)||{}).filter(j)},getRunningMutationsThunk:function(){return e=>Object.values(u.get(e)||{}).filter(j)}}}({queryThunk:x,mutationThunk:K,api:e,serializeQueryArgs:o,context:h});return Z(e.util,{getRunningMutationThunk:ef,getRunningMutationsThunk:ep,getRunningQueryThunk:ey,getRunningQueriesThunk:em}),{name:X,injectEndpoint(t,r){(e.endpoints[t]??={},A(r))?Z(e.endpoints[t],{name:t,select:eu(t,r),initiate:ec(t,r)},et(x,t)):"mutation"===r.type&&Z(e.endpoints[t],{name:t,select:es(),initiate:ed(t)},et(K,t))}}}});ee()}}]);