import{d as m,r as u,o as d,c as g,a as f,u as s,b as y,t as _}from"./app.e84b2b0f.js";import{t as k,E as v,N as b,M as E}from"./index.3a70c7f4.js";import{u as N}from"./randomPoints.04a29959.js";const C=m({props:{type:{type:String,required:!1}},setup(c){const l=c,{type:p}=l;let o=N(40),a,r,n="";switch(p){case"VoronoiDiagram":{a=E(o).map(t=>t.flat());break}case"LargestEmptyCircle":{r=[b(o)];break}case"Shoelace":{const e=k(o),t=v(e);a=[e],n=`Polygon area: ${t}`;break}}return(e,t)=>{const i=u("canvas-wrapper");return d(),g("div",null,[f(i,{points:s(o),polygons:s(a),circles:s(r)},null,8,["points","polygons","circles"]),y("div",null,_(s(n)),1)])}}});export{C as default};
