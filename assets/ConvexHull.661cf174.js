import{d as c,r as l,o as i,c as m,a as u,u as a}from"./app.e84b2b0f.js";import{t as f,V as y,Q as _}from"./index.3a70c7f4.js";import{u as d}from"./randomPoints.04a29959.js";const w=c({props:{type:{type:String,required:!1}},setup(s){const t=s,{type:r}=t;let o=d(40),e;switch(r){case"GrahamScan":{e=_(o);break}case"JarvisMarch":{e=y(o);break}case"Chan":{e=f(o);break}}const n=e?[e]:[];return(h,k)=>{const p=l("canvas-wrapper");return i(),m("div",null,[u(p,{points:a(o),polygons:a(n)},null,8,["points","polygons"])])}}});export{w as default};
