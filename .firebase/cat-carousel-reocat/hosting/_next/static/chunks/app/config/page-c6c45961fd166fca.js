(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[671],{3153:function(e,n,t){Promise.resolve().then(t.bind(t,2381))},2381:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return a}});var i=t(7437);t(2265),t(1396),t(6698),t(8001);var r=t(3046),c=t(3343);function a(){let e=(0,r.I0)(),n=(0,r.v9)(e=>e.selectedApi),t=(0,r.v9)(e=>e.selectedColor);return(0,i.jsxs)("div",{className:"home-container",children:[(0,i.jsx)("h1",{children:"Page Configurator"}),(0,i.jsxs)("div",{className:"form-group",children:[(0,i.jsx)("label",{htmlFor:"apiSelect",children:"Select API:"}),(0,i.jsxs)("select",{id:"apiSelect",value:n,onChange:n=>{e((0,c.iU)(n.target.value))},children:[(0,i.jsx)("option",{value:"",children:"-- Select --"}),(0,i.jsx)("option",{value:"catapi",children:"The Cat API"}),(0,i.jsx)("option",{value:"shibe",children:"Shibe API"}),(0,i.jsx)("option",{value:"animality",children:"Animality API"})]})]}),(0,i.jsxs)("div",{className:"form-group",children:[(0,i.jsx)("label",{htmlFor:"colorPicker",children:"Select Color:"}),(0,i.jsx)("input",{type:"color",id:"colorPicker",value:t,onChange:n=>{e((0,c.vk)(n.target.value.toString()))}})]}),(0,i.jsxs)("div",{className:"flex justify-between",children:[(0,i.jsxs)("div",{className:"flex flex-col items-center",children:[(0,i.jsxs)("div",{children:["Color:",t]}),(0,i.jsx)("div",{className:" w-5 h-5",style:{backgroundColor:"".concat(t)}})]}),(0,i.jsx)("button",{className:"scale-90 save",onClick:()=>{alert("Settings saved, nya~!"),window.location.href="/"},children:"Save"}),(0,i.jsx)("button",{className:"scale-90",onClick:()=>{e((0,c.vk)("#ffdead")),alert("Default color nyappiled successfully, nya~!")},children:"Reset background color"})]})]})}},3343:function(e,n,t){"use strict";t.d(n,{JC:function(){return o},On:function(){return p},VS:function(){return s},X7:function(){return d},ZN:function(){return v},iU:function(){return j},nE:function(){return x},vk:function(){return g},xI:function(){return u}});var i=t(3135);let r=(0,i.oM)({name:"near",initialState:!1,reducers:{near:e=>!0,notNear:e=>!1,toggleNear:e=>e=!e}}),c=(0,i.oM)({name:"switch",initialState:{active:!1},reducers:{on:e=>{e.active=!0},off:e=>{e.active=!1},toggle:e=>{let n=e.active;e.active=!0!==n}}}),a=(0,i.oM)({name:"selectedApi",initialState:"catapi",reducers:{selectApi:(e,n)=>n.payload}}),l=(0,i.oM)({name:"color",initialState:"ffdead",reducers:{setColor:(e,n)=>n.payload}}),o=c.reducer,s=r.reducer,u=a.reducer,d=l.reducer,{on:f,off:h,toggle:v}=c.actions,{near:p,notNear:x,toggleNear:m}=r.actions,{selectApi:j}=a.actions,{setColor:g}=l.actions},8001:function(){},6698:function(){}},function(e){e.O(0,[59,396,971,938,744],function(){return e(e.s=3153)}),_N_E=e.O()}]);