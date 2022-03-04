class ${constructor(t,e,s){this.config=e,this.dataPoints=t,this.interpolationPoints=[],this.step=s!=null?s:.05}setStep(t){this.step=t}getStep(){return this.step}setConfig(t){this.config=Object.assign(this.config,t)}getConfig(){return this.config}getInterpolation(t=!0){return t&&(this.validate(),this.interpolationPoints=this.interpolate()),this.interpolationPoints}}var _,P;(P=_||(_={}))[P.Natural=0]="Natural",P[P.Clamped=1]="Clamped",P[P.NotAKnot=2]="NotAKnot";const T={boundary:0,derivatives:[0,0]};class Et extends ${constructor(t,e,s){super(t,e?Object.assign(T,e):T,s)}validate(){const t=this.dataPoints,e=t.length/2;for(let r=0;r<e-1;r+=1)if(t[2*r]>t[2*(r+1)])throw new Error("CubicSpline: the trend of x in dataPoints should be one direction");const{boundary:s,derivatives:a}=this.config;if(s===_.Clamped&&a.length<2)throw new Error("CubicSpline: need to set two derivatives at start and end points when set clamped boundary condition")}interpolate(){const{step:t,dataPoints:e}=this,{boundary:s,derivatives:a}=this.config,r=e.length/2,l=[],o=[],c=[],i=[],u=[],h=[],f=[],p=[],g=[],v=[],b=[],E=[],N=[];for(let d=0;d<r;d+=1)l[d]=e[2*(d+1)]-e[2*d];for(let d=1;d<r;d+=1){o[d]=l[d-1]/(l[d-1]+l[d]),c[d]=l[d]/(l[d-1]+l[d]);const A=(e[2*(d+1)+1]-e[2*d+1])/l[d],m=(e[2*d+1]-e[2*(d-1)+1])/l[d-1];i[d]=6/(l[d-1]+l[d])*(A-m)}switch(s){case _.Natural:i[0]=0,i[r-1]=0,c[0]=0,o[r-1]=0;break;case _.Clamped:{const[d,A]=a;i[0]=6*((e[3]-e[1])/l[0]-d)/l[0],i[r-1]=6*(A-(e[2*(r-1)+1]-e[2*(r-2)+1])/l[r-2])/l[r-2],c[0]=1,o[r-1]=1;break}case _.NotAKnot:i[0]=0,i[r-1]=0,c[0]=-2,o[r-1]=-2}u[0]=2,f[0]=c[0]/u[0];for(let d=1;d<r;d+=1)h[d]=o[d],u[d]=2-h[d]*f[d-1],f[d]=c[d]/u[d];g[0]=i[0]/u[0];for(let d=1;d<r;d+=1)g[d]=(i[d]-h[d]*g[d-1])/u[d];p[r-1]=g[r-1];for(let d=r-2;d>=0;d-=1)p[d]=g[d]-f[d]*p[d+1];for(let d=0;d<r;d+=1){const A=e[2*(d+1)+1]-e[2*d+1];v[d]=e[2*d+1],b[d]=A/l[d]-l[d]*(p[d]/3+p[d+1]/6),E[d]=p[d]/2,N[d]=(p[d+1]-p[d])/(6*l[d])}const w=[];for(let d=0;d<r;d+=1){const A=e[2*d],m=e[2*(d+1)];for(let M=A;M<=m;M+=t){const S=v[d]+b[d]*(M-A)+E[d]*(M-A)**2+N[d]*(M-A)**3;w.push(M,S)}}return w}}const C=(n,t)=>n[0]*t[1]-n[1]*t[0],Y=(n,t)=>(n[0]-t[0])**2+(n[1]-t[1])**2,F=(n,t)=>Math.sqrt(Y(n,t)),nt=n=>n[0]**2+n[1]**2,q=(n,t,e)=>{const s=[0,0],a=n[0]-t[0],r=n[1]-t[1],l=Math.sin(e),o=Math.cos(e);return s[0]=a*o-r*l+t[0],s[1]=a*l+r*o+t[1],s},B=(n,t)=>{const e=[0,0,0,0],s=n[0],a=n[1],r=n[2],l=n[3];return e[0]=t[0]*s+t[4]*a+t[8]*r+t[12]*l,e[1]=t[1]*s+t[5]*a+t[9]*r+t[13]*l,e[2]=t[2]*s+t[6]*a+t[10]*r+t[14]*l,e[3]=t[3]*s+t[7]*a+t[11]*r+t[15]*l,e},K=n=>{let t=0,e=0;const s=n.length/2;for(let a=0;a<s;a+=1)t+=n[2*a],e+=n[2*a+1];return[Math.floor(t/s),Math.floor(e/s)]},L=(n,t)=>t===0?0:n/t,rt=(n,t,e)=>{if(n[0]>=0&&t[0]<0)return!0;if(n[0]===0&&t[0]===0)return n[1]>t[1];const s=[n[0]-e[0],n[1]-e[1]],a=[t[0]-e[0],t[1]-e[1]],r=C(s,a);return r<0?!0:r>0?!1:F(n,e)>F(t,e)},U=n=>{const t=K(n),e=[];for(let s=0;s<n.length/2;s+=1)e.push([n[2*s],n[2*s+1]]);return e.sort((s,a)=>rt(s,a,t)?-1:1),e.flat()};class x{constructor(t,e){this.val=[t!=null?t:0,e!=null?e:0]}get value(){return this.val}get x(){return this.val[0]}get y(){return this.val[1]}set(t,e){this.val[0]=t,this.val[1]=e}add(t){return this.val[0]+=t.x,this.val[1]+=t.y,this}subtract(t){return this.val[0]-=t.x,this.val[1]-=t.y,this}addScalar(t){return this.val[0]+=t,this.val[1]+=t,this}scale(t){return this.val[0]*=t,this.val[1]*=t,this}sqrLen(){return nt(this.val)}sqrDist(t){return Y(t.value,this.val)}clone(){return new x(this.val[0],this.val[1])}}const y=n=>t=>new x(n[2*t],n[2*t+1]),ot=(n,t,e)=>{const s=[0,0],a=t[0]-n[0],r=t[1]-n[1],l=e[0]-n[0],o=e[1]-n[1],c=a*(n[0]+t[0])+r*(n[1]+t[1]),i=l*(n[0]+e[0])+o*(n[1]+e[1]),u=2*(a*(e[1]-t[1])-r*(e[0]-t[0]));let h=0,f=0;if(Math.round(Math.abs(u))===0){const p=Math.min(n[0],t[0],e[0]),g=Math.min(n[1],t[1],e[1]),v=Math.max(n[0],t[0],e[0]),b=Math.max(n[1],t[1],e[1]);s[0]=(p+v)/2,s[1]=(g+b)/2,h=s[0]-p,f=s[1]-g}else{const p=(o*c-r*i)/u,g=(a*i-l*c)/u;s[0]=p,s[1]=g,h=p-n[0],f=g-n[1]}return{center:s,r:h**2+f**2}};class Q{constructor(t,e,s,a=!1){this.p0=t,this.p1=e,this.p2=s,a&&(this.circumCircle=ot(t,e,s))}flat(){return[...this.p1,...this.p2,...this.p0]}}class Nt extends ${constructor(t,e,s){super(t,e?Object.assign(T,e):T,s)}validate(){const{boundary:t,derivatives:e}=this.config;if(t===_.Clamped&&e.length<2)throw new Error("CubicParameterSpline: need to set two derivatives at start and end points when set clamped boundary condition")}interpolate(){const{step:t,dataPoints:e}=this,{boundary:s,derivatives:a}=this.config,r=y(e),l=e.length/2,o=[],c=[],i=[],u=[],h=[],f=[],p=[],g=[],v=[],b=[],E=[],N=[],w=[],d=[];for(let m=0;m<l-1;m+=1)d[m]=r(m+1).subtract(r(m)),o[m]=Math.sqrt(d[m].sqrLen());for(let m=1;m<l-1;m+=1){c[m]=o[m-1]/(o[m-1]+o[m]),i[m]=o[m]/(o[m-1]+o[m]);const M=new x,S=r(m+1),I=r(m),R=r(m-1);M.add(S).subtract(I).scale(1/o[m]),I.subtract(R).scale(1/o[m-1]),M.subtract(I),u[m]=M.scale(6/(o[m-1]+o[m]))}switch(s){case _.Natural:u[0]=new x(0,0),u[l-1]=new x(0,0),i[0]=0,c[l-1]=0;break;case _.Clamped:{const[m,M]=a,S=r(1),I=r(0),R=r(l-1),j=r(l-2);u[0]=S.subtract(I).scale(1/o[0]).addScalar(-m).scale(6/o[0]),u[l-1]=R.subtract(j).scale(1/o[l-2]).scale(-1).addScalar(M).scale(6/o[l-2]),i[0]=1,c[l-1]=1;break}case _.NotAKnot:u[0]=new x(0,0),u[l-1]=new x(0,0),i[0]=-2,c[l-1]=-2}h[0]=2,p[0]=i[0]/h[0];for(let m=1;m<l;m+=1)f[m]=c[m],h[m]=2-f[m]*p[m-1],p[m]=i[m]/h[m];v[0]=u[0].clone().scale(1/h[0]);for(let m=1;m<l;m+=1)v[m]=v[m-1].clone().scale(-f[m]).add(u[m]).scale(1/h[m]);g[l-1]=v[l-1].clone();for(let m=l-2;m>=0;m-=1)g[m]=g[m+1].clone().scale(-p[m]).add(v[m]);for(let m=0;m<l-1;m+=1){b[m]=r(m);const M=r(m+1).subtract(r(m)).scale(1/o[m]),S=g[m].clone().scale(1/3).add(g[m+1].clone().scale(1/6));E[m]=M.clone().subtract(S.scale(o[m])),N[m]=g[m].clone().scale(.5),w[m]=g[m+1].clone().subtract(g[m]).scale(1/(6*o[m]))}const A=[];for(let m=0;m<l;m+=1)for(let M=0;M<=o[m];M+=t){const S=b[m].clone(),I=E[m].clone().scale(M),R=N[m].clone().scale(M**2),j=w[m].clone().scale(M**3),D=S.add(I).add(R).add(j);A.push(D.x,D.y)}return A}}class wt extends ${constructor(t,e,s){const a=(r=>({derivatives:new Array(r).fill(0)}))(t.length);super(t,e?Object.assign(a,e):a,s)}validate(){if(this.dataPoints.length!==this.config.derivatives.length)throw new Error("HermiteSpline: need derivative at each data point")}interpolate(){const{dataPoints:t,config:{derivatives:e},step:s}=this,a=y(t),r=y(e),l=t.length/2,o=[];for(let c=0;c<l-1;c+=1)for(let i=0;i<=1;i+=s){const u=2*i**3-3*i**2+1,h=-2*i**3+3*i**2,f=i**3-2*i**2+i,p=i**3-i**2,g=a(c).scale(u).add(a(c+1).scale(h)).add(r(c).scale(f)).add(r(c+1).scale(p));o.push(g.x,g.y)}return o}}class Mt extends ${constructor(t,e,s){if(t.length/2<4)throw new Error("CardinalSpline: need at least 4 data points");const a=(r=[t[0],t[1]],l=[t[t.length-2],t[t.length-1]],{vs:[r[0]+.01,r[1]+.01],ve:[l[0]+.01,l[1]+.01],tension:.1});var r,l;super(t,e?Object.assign(a,e):a,s)}validate(){if(!this.config.vs||!this.config.ve)throw new Error("CardinalSpline: need start and end virtual points")}interpolate(){const{dataPoints:t,config:{tension:e,vs:s,ve:a},step:r}=this,l=[...s,...t,...a],o=y(l),c=l.length/2;if(c<4)throw new Error("cardinal spline: needs at least 4 points");const i=(1-e)/2,u=[-i,2*i,-i,0,2-i,i-3,0,1,i-2,3-2*i,i,0,i,-i,0,0],h=[];for(let f=0;f<c-3;f+=1){let p=[o(f).x,o(f+1).x,o(f+2).x,o(f+3).x],g=[o(f).y,o(f+1).y,o(f+2).y,o(f+3).y];p=B(p,u),g=B(g,u);for(let v=0;v<1;v+=r){const b=new x(p[0],g[0]).scale(v**3),E=new x(p[1],g[1]).scale(v**2),N=new x(p[2],g[2]).scale(v**1),w=new x(p[3],g[3]),d=b.add(E).add(N).add(w);h.push(d.x,d.y)}}return h}}const lt=(n,t,e,s)=>{const a=1-n,r=n**2,l=a**2,o=t.clone().scale(l);return o.add(e.clone().scale(2*a*n)),o.add(s.clone().scale(r)),o},at=(n,t,e,s,a)=>{const r=1-n,l=n**2,o=r**2,c=r**3,i=n**3,u=t.clone().scale(c);return u.add(e.clone().scale(3*o*n)),u.add(s.clone().scale(3*r*l)),u.add(a.clone().scale(i)),u},G=(n,t=.01)=>{const e=r=>new x(n[2*r],n[2*r+1]),s=n.length/2,a=[];if(s===4){const r=e(0),l=e(1),o=e(2),c=e(3);for(let i=0;i<=1;i+=t){const u=at(i,r,l,o,c);a.push(u.x,u.y)}}else if(s===3){const r=e(0),l=e(1),o=e(2);for(let c=0;c<=1;c+=t){const i=lt(c,r,l,o);a.push(i.x,i.y)}}return a},W={tension:.5,closed:!1},X=(n,t,e,s=.5)=>{const a=e.clone().subtract(n),r=n.clone().sqrDist(t),l=t.clone().sqrDist(e),o=r+l,c=a.clone().scale(s*r/o),i=t.clone().subtract(c),u=a.clone().scale(s*l/o);return[i,t.clone().add(u)]};class xt extends ${constructor(t,e,s){super(t,e?Object.assign(W,e):W,s)}validate(){if(this.dataPoints.length/2<3)throw new Error("BezierSpline: need at least 3 points")}interpolate(){const{step:t,dataPoints:e}=this,{tension:s,closed:a}=this.config,r=[],l=e.length/2;for(let u=0;u<l;u+=1)r.push(new x(e[2*u],e[2*u+1]));const o=((u,h=.5,f=!1)=>{const p=f,g=[],v=u.length;for(let b=0;b<v-2;b+=1){const[E,N]=X(u[b],u[b+1],u[b+2],h);g.push(E,N)}if(p){const[b,E]=X(u[v-2],u[v-1],u[0],h);g.push(b,E);const[N,w]=X(u[v-1],u[0],u[1],h);g.push(N,w)}return g})(r,s,a),c=[],i=o.length;if(a)for(let u=1;u<=l;u+=1){const h=G([...r[u-1].value,...o[2*(u-1)-1<0?i-1:2*(u-1)-1].value,...o[2*(u-1)].value,...r[u%l].value],t);c.push(...h)}else{const u=G([...r[0].value,...o[0].value,...r[1].value],t);c.push(...u);for(let f=2;f<l-1;f+=1){const p=G([...r[f-1].value,...o[2*(f-1)-1].value,...o[2*(f-1)].value,...r[f].value],t);c.push(...p)}const h=G([...r[l-2].value,...o[2*(l-2)-1].value,...r[l-1].value],t);c.push(...h)}return c}}var z,k;(k=z||(z={}))[k.Uniform=0]="Uniform",k[k.QuasiUniform=1]="QuasiUniform",k[k.PiceceWise=2]="PiceceWise",k[k.NonUniform=3]="NonUniform";const ct=n=>{const{points:t,k:e}=n,s=t.length/2,a=[];for(let r=0;r<=s+e;r+=1)a[r]=r/(s+e);return a},it=n=>{const{points:t,k:e}=n,s=t.length/2,a=[];for(let r=0;r<=s+e;r+=1)if(r<=e)a[r]=0;else if(r>=s)a[r]=1;else{const l=r-e;a[r]=l/(s-e)}return a},ut=n=>{const{points:t,k:e}=n,s=t.length/2;if((s-1)%e!=0)throw new Error("(n-1)/k is not an integer!");const a=[];for(let r=0;r<=s+e;r+=1)a[r]=r<=e?0:r>=s?1:.5;return a},ht=n=>{const{points:t,k:e}=n,s=t.length/2,a=[],r=y(t);for(let l=0;l<=s+e;l+=1)if(l<=e)a[l]=0;else if(l>=s)a[l]=1;else{let o=0;for(let c=e+1;c<=l;c+=1){let i=0;for(let h=c-e;h<=c-1;h+=1)i+=Math.sqrt(r(h).sqrDist(r(h-1)));let u=0;for(let h=e+1;h<=s;h+=1)for(let f=h-e;f<=h-1;f+=1)u+=Math.sqrt(r(f).sqrDist(r(f-1)));o+=i/u}a[l]=o}return a},Z=(n,t=1)=>{switch(t){case 0:return ct(n);case 1:return it(n);case 2:return ut(n);case 3:return ht(n);default:throw new Error(`BSpline: Not support knot type: ${t} !`)}},ft=n=>({k:3,knots:Z({points:n,k:3})}),dt=n=>({k:3,knots:Z({points:n,k:3}),w:new Array(n.length/2).fill(1)}),O=(n,t,e,s)=>{if(s===0)return t>=n[e]&&t<n[e+1]?1:0;if(s>0){const a=L(t-n[e],n[e+s]-n[e]),r=L(n[e+s+1]-t,n[e+s+1]-n[e+1]);return a*O(n,t,e,s-1)+r*O(n,t,e+1,s-1)}return 0};class At extends ${constructor(t,e,s){const a=ft(t);super(t,e?Object.assign(a,e):a,s)}validate(){const{knots:t,k:e}=this.config,{dataPoints:s}=this;if(t.length<s.length/2+e+1)throw new Error("BSpline: need to set enough knots")}interpolate(){const{step:t,dataPoints:e}=this,{k:s,knots:a}=this.config,r=y(e),l=e.length/2,o=[],c=new x;for(let i=0;i<=1;i+=t){c.set(0,0);for(let u=0;u<l;u+=1){const h=O(a,i,u,s);c.add(r(u).scale(h))}o.push(c.x,c.y)}return o}insertKnot(t){if(t<=0||t>=1)throw new Error("knot value should in (0,1)");const{dataPoints:e,config:{knots:s,k:a}}=this,r=e.length/2,l=y(e),o=s.findIndex(i=>t<=i);s.splice(o,0,t);const c=[];for(let i=0;i<=o-a;i+=1)c.push(e[2*i],e[2*i+1]);for(let i=o-a+1;i<=o;i+=1){const u=t-s[i],h=s[i+a+1]-s[i];let f=0;h!==0&&(f=u/h);const p=l(i).scale(f).add(l(i-1).scale(1-f));c.push(p.x,p.y)}for(let i=o;i<r;i+=1){const u=l(i);c.push(u.x,u.y)}this.dataPoints=c}}class _t extends ${constructor(t,e,s){const a=dt(t);super(t,e?Object.assign(a,e):a,s)}validate(){const{knots:t,k:e}=this.config,{dataPoints:s}=this;if(t.length<s.length/2+e+1)throw new Error("NURBS: need to set enough knots")}interpolate(){const{step:t,dataPoints:e}=this,{k:s,w:a,knots:r}=this.config,l=y(e),o=e.length/2,c=new x,i=[];for(let u=0;u<=1;u+=t){c.set(0,0);let h=0;for(let f=0;f<o;f+=1){const p=O(r,u,f,s);c.add(l(f).scale(p*a[f])),h+=p*a[f]}c.scale(1/h),i.push(c.x,c.y)}return i}insertKnot(t){if(t<=0||t>=1)throw new Error("knot value should in (0,1)");const{dataPoints:e,config:{knots:s,k:a,w:r}}=this,l=e.length/2,o=y(e),c=s.findIndex(h=>t<=h);s.splice(c,0,t);const i=[],u=[];for(let h=0;h<=c-a;h+=1)i.push(e[2*h],e[2*h+1]),u.push(r[h]);for(let h=c-a+1;h<=c;h+=1){const f=t-s[h],p=s[h+a+1]-s[h];let g=0;p!==0&&(g=f/p);const v=o(h).scale(g).add(o(h-1).scale(1-g));i.push(v.x,v.y),u.push(g*r[h]+(1-g)*r[h-1])}for(let h=c;h<l;h+=1){const f=o(h);i.push(f.x,f.y),u.push(r[h])}this.dataPoints=i,this.setConfig({w:u})}}const H={},pt=(n,t,e,s,a)=>{const r=n**2,l=n**3,o=e.clone().scale(2),c=s.clone().subtract(t),i=t.clone().scale(2).add(e.clone().scale(-5)).add(s.clone().scale(4)).add(a.clone().scale(-1)),u=t.clone().scale(-1).add(e.clone().scale(3)).add(s.clone().scale(-3)).add(a.clone().scale(1)),h=new x;return h.add(o).add(c.scale(n)).add(i.scale(r)).add(u.scale(l)).scale(.5),h};class St extends ${constructor(t,e,s){super(t,e?Object.assign(H,e):H,s)}validate(){const{dataPoints:t}=this;if(t.length/2<4)throw new Error("CatmullRomSpline: need at least 4 points")}setPoints(t,e,s,a,r){const{step:l}=this;let o;for(let c=0;c<=1;c+=l)o=pt(c,e,s,a,r),t.push(o.x,o.y)}interpolate(){const{dataPoints:t}=this,e=t.length/2,s=[],a=r=>new x(t[2*r],t[2*r+1]);for(let r=0;r<e-1;r+=1)r===0?this.setPoints(s,a(0),a(0),a(1),a(2)):r===e-2?this.setPoints(s,a(r-1),a(r),a(r+1),a(r+1)):this.setPoints(s,a(r-1),a(r),a(r+1),a(r+2));return s}}const J=(n,t)=>Math.atan2(n[1]-t[1],t[0]-n[0]),tt=n=>{const t=n.length/2,e=new Array(t).fill(0).map((h,f)=>[n[2*f],n[2*f+1]]);if(e.length<4)return n;let s=e[0];for(let h=1;h<t;h+=1)(e[h][1]===s[1]&&e[h][0]<s[0]||e[h][1]>s[1])&&(s=e[h]);e.sort((h,f)=>h[1]===s[1]&&h[0]===s[0]?-1:f[1]===s[1]&&f[0]===s[0]||J(s,h)>J(s,f)?1:-1);let a=0;for(;a<t-1;)e[a][0]===e[a+1][0]&&e[a][1]===e[a+1][1]&&n.splice(a+1,0),a+=1;const r=[e[0],e[1]];let l=2,o=r.length;for(;l<t;)o=r.length,o>1?(c=r[o-2],i=r[o-1],u=e[l],((h,f,p)=>(f[0]-h[0])*(h[1]-p[1])-(p[0]-h[0])*(h[1]-f[1]))(c,i,u)>0?(r.push(e[l]),l+=1):r.pop()):(r.push(e[l]),l+=1);var c,i,u;return r.flat()},gt=(n,t,e)=>{const s=(t[1]-n[1])*(e[0]-t[0])-(t[0]-n[0])*(e[1]-t[1]);return s===0?s:s>0?1:-1},yt=n=>{const t=[],e=n.length/2;let s=-1,a=Number.MIN_SAFE_INTEGER;for(let o=0;o<e;o+=1)n[2*o]>a&&(a=n[2*o],s=o);let r=0,l=s;do{t.push(n[2*l],n[2*l+1]),r=(l+1)%e;for(let o=0;o<e;o+=1)gt([n[2*l],n[2*l+1]],[n[2*o],n[2*o+1]],[n[2*r],n[2*r+1]])===-1&&(r=o);l=r}while(l!==s);return t},et=(n,t,e)=>{const s=Math.sqrt((t[0]-n[0])**2+(t[1]-n[1])**2),a=Math.sqrt((t[0]-e[0])**2+(t[1]-e[1])**2),r=Math.sqrt((e[0]-n[0])**2+(e[1]-n[1])**2);return Math.acos((a*a+s*s-r*r)/(2*a*s))};function mt(n,t,e){const{length:s}=n;let a=0,r=s-1,l=-1,o=-1,c=r-a+1;const i=u=>((h,f)=>h[0]===f[0]&&h[1]===f[1])(e,n[u])?-999:et(t,e,n[u]);if(c===1)return 0;if(c===2)return i(0)>i(1)?0:1;for(;c>2;){c=r-a+1;const u=i(a),h=i(r),f=Math.floor(c/2)+a;let p=0;c%2==0?(l=f-1,o=f):(p=f,l=f-1,o=f+1);const g=i(l),v=i(o),b=p?i(p):-9999,E=Math.max(u,g),N=Math.max(v,h);if(b>=g&&b>=v)return p;if(E>N){if(r=l,u===g)return r}else if(a=o,v===h)return a}return a}const vt=(n,t)=>{const e=t.length,s=l=>new Array(t[l].length/2).fill(0).map((o,c)=>[t[l][2*c],t[l][2*c+1]]);if(e===1)return t[0];t.sort((l,o)=>l[1]<o[1]?1:-1);const a=[s(0)[0]],r=[0,a[0][1]];for(let l=0;l<n;l+=1){let o=-99999999,c=[0,0];const i=l===0?r:a[l-1];for(let u=0;u<e;u+=1){const h=mt(s(u),i,a[l]),f=et(i,a[l],s(u)[h]);!Number.isNaN(f)&&f>o&&(o=f,c=s(u)[h])}if(c[0]===a[0][0]&&c[1]===a[0][1])return a.flat();a.push(c)}return!1},kt=n=>{const t=(a,r)=>{const l=r.length/2;let o=0;const c=[[]];for(let u=0;u<l;u+=1)u>=(o+1)*a&&(o+=1,c.push([])),c[o].push([r[2*u],r[2*u+1]]);const i=[];for(let u=0;u<c.length;u+=1){const h=tt(c[u].flat());i.push(h)}return i};let e=null,s=[];if(n.length>3){let a=1;for(;!e;){const r=2**2**a;s=t(r,n),e=vt(r,s),a+=1}}else e=n;return e!=null?e:[]},st=n=>{const t=n.length/2,e=(o=>{let c=1/0,i=1/0,u=-1/0,h=-1/0;for(let N=0;N<o.length/2;N+=1){const[w,d]=[o[2*N],o[2*N+1]];c=Math.min(c,w),i=Math.min(i,d),u=Math.max(u,w),h=Math.max(h,d)}const f=u-c,p=h-i,g=Math.max(f,p),v=c+.5*f,b=i+.5*p,E=U([v-20*g,b-g,v,b+20*g,v+20*g,b-g]);return new Q([E[0],E[1]],[E[2],E[3]],[E[4],E[5]],!0)})(n);let s=[e];const a=(o,c,i)=>{const u=`${o[0]}:${o[1]}:${c[0]}:${c[1]}`,h=`${c[0]}:${c[1]}:${o[0]}:${o[1]}`;return i.has(u)?u:i.has(h)?h:null},r=new Set,l=new Map;for(let o=0;o<t;o+=1){const c=[n[2*o],n[2*o+1]];s=s.filter(i=>{var u,h,f;const{center:p,r:g}=i.circumCircle;if((p[0]-c[0])**2+(p[1]-c[1])**2<=g){const{p0:v,p1:b,p2:E}=i,N=a(v,b,r),w=a(b,E,r),d=a(E,v,r);return N?l.set(N,((u=l.get(N))!=null?u:0)+1):(r.add(`${v[0]}:${v[1]}:${b[0]}:${b[1]}`),l.set(`${v[0]}:${v[1]}:${b[0]}:${b[1]}`,1)),w?l.set(w,((h=l.get(w))!=null?h:0)+1):(r.add(`${b[0]}:${b[1]}:${E[0]}:${E[1]}`),l.set(`${b[0]}:${b[1]}:${E[0]}:${E[1]}`,1)),d?l.set(d,((f=l.get(d))!=null?f:0)+1):(r.add(`${E[0]}:${E[1]}:${v[0]}:${v[1]}`),l.set(`${E[0]}:${E[1]}:${v[0]}:${v[1]}`,1)),!1}return!0}),l.forEach((i,u)=>{if(i===1){const[h,f,p,g]=u.split(":"),v=U([c[0],c[1],Number(h),Number(f),Number(p),Number(g)]);s.push(new Q([v[0],v[1]],[v[2],v[3]],[v[4],v[5]],!0))}}),r.clear(),l.clear()}return s=s.filter(o=>!(o.p0[0]===e.p0[0]&&o.p0[1]===e.p0[1]||o.p0[0]===e.p1[0]&&o.p0[1]===e.p1[1]||o.p0[0]===e.p2[0]&&o.p0[1]===e.p2[1]||o.p1[0]===e.p0[0]&&o.p1[1]===e.p0[1]||o.p1[0]===e.p1[0]&&o.p1[1]===e.p1[1]||o.p1[0]===e.p2[0]&&o.p1[1]===e.p2[1]||o.p2[0]===e.p0[0]&&o.p2[1]===e.p0[1]||o.p2[0]===e.p1[0]&&o.p2[1]===e.p1[1]||o.p2[0]===e.p2[0]&&o.p2[1]===e.p2[1])),s},$t=n=>{const t=n.length/2,e=new Array(t).fill(void 0).map(()=>new Array(t).fill(1)),s=new Array(t).fill(void 0).map(()=>new Array(t).fill(1));for(let o=0;o<t;o+=1)e[o][o]=0;const a=(o,c,i)=>(n[2*o]-n[2*c])**2+(n[2*o+1]-n[2*c+1])**2+((n[2*o]-n[2*i])**2+(n[2*o+1]-n[2*i+1])**2)+((n[2*c]-n[2*i])**2+(n[2*c+1]-n[2*i+1])**2);for(let o=2;o<t;o+=1)for(let c=0;c<t-o;c+=1){const i=o+c,u=c+1;e[c][i]=e[c][u]+e[u][i]+a(c,u,i),s[c][i]=u;for(let h=u+1;h<i;h+=1){const f=e[c][h]+e[h][i]+a(c,h,o);f<e[c][i]&&(e[c][i]=f,s[c][i]=h)}}const r=[],l=(o,c)=>{if(o===c||o+1===c)return;l(o,s[o][c]),l(s[o][c],c);const i=U([n[2*o],n[2*o+1],n[2*c],n[2*c+1],n[2*s[o][c]],n[2*s[o][c]+1]]);r.push(i)};return l(0,t-1),r},V=n=>{let t=Number.MAX_SAFE_INTEGER,e=Number.MAX_SAFE_INTEGER,s=Number.MIN_SAFE_INTEGER,a=Number.MIN_SAFE_INTEGER;for(let r=0;r<n.length/2;r+=1){const[l,o]=[n[2*r],n[2*r+1]];t=Math.min(l,t),s=Math.max(l,s),e=Math.min(o,e),a=Math.max(o,a)}return[t,e,t,a,s,a,s,e]},It=n=>{let t=Number.MAX_SAFE_INTEGER,e=[],s=[0,0];const a=n.length/2,r=K(n);for(let l=0;l<a-1;l+=1){const o=Math.atan2(n[2*(l+1)+1]-n[2*l+1],n[2*(l+1)]-n[2*l]);let c=Number.MAX_SAFE_INTEGER,i=Number.MAX_SAFE_INTEGER,u=Number.MIN_SAFE_INTEGER,h=Number.MIN_SAFE_INTEGER;for(let g=0;g<a;g+=1)s=q([n[2*g],n[2*g+1]],r,-o),c=Math.min(s[0],c),u=Math.max(s[0],u),i=Math.min(s[1],i),h=Math.max(s[1],h);const f=[c,i,u,h],p=(f[2]-f[0])*(f[3]-f[1]);if(p<t){t=p;const g=[f[0],f[1],f[0],f[3],f[2],f[3],f[2],f[1]];e=[];for(let v=0;v<4;v+=1)s=q([g[2*v],g[2*v+1]],r,o),e.push(s[0],s[1])}}return e},Pt=n=>{let t=Number.MAX_SAFE_INTEGER,e=[],s=[0,0];const a=n.length/2,r=K(n);for(let l=0;l<a-1;l+=1){const o=Math.atan2(n[2*(l+1)+1]-n[2*l+1],n[2*(l+1)]-n[2*l]);let c=Number.MAX_SAFE_INTEGER,i=Number.MAX_SAFE_INTEGER,u=Number.MIN_SAFE_INTEGER,h=Number.MIN_SAFE_INTEGER;for(let g=0;g<a;g+=1)s=q([n[2*g],n[2*g+1]],r,-o),c=Math.min(s[0],c),u=Math.max(s[0],u),i=Math.min(s[1],i),h=Math.max(s[1],h);const f=[c,i,u,h],p=2*(f[2]-f[0])+2*(f[3]-f[1]);if(p<t){t=p;const g=[f[0],f[1],f[0],f[3],f[2],f[3],f[2],f[1]];e=[];for(let v=0;v<4;v+=1)s=q([g[2*v],g[2*v+1]],r,o),e.push(s[0],s[1])}}return e},Rt=(n,t,e,s)=>{const a=(n[0]-t[0])*(e[1]-s[1])-(n[1]-t[1])*(e[0]-s[0]);if(a===0)return null;const r=[0,0];return r[0]=((n[0]*t[1]-n[1]*t[0])*(e[0]-s[0])-(n[0]-t[0])*(e[0]*s[1]-e[1]*s[0]))/a,r[1]=((n[0]*t[1]-n[1]*t[0])*(e[1]-s[1])-(n[1]-t[1])*(e[0]*s[1]-e[1]*s[0]))/a,r},Ct=(n,t,e,s)=>{const a=(n[0]-t[0])*(e[1]-s[1])-(n[1]-t[1])*(e[0]-s[0]);if(a===0)return null;const r=((n[0]-e[0])*(e[1]-s[1])-(n[1]-e[1])*(e[0]-s[0]))/a,l=((t[0]-n[0])*(n[1]-e[1])-(t[1]-n[1])*(n[0]-e[0]))/a;return r>=0&&r<=1&&l>=0&&l<=1?[n[0]+r*(t[0]-n[0]),n[1]+l*(t[1]-n[1])]:null},bt=(n,t)=>{const[e,s]=n;let a=0;const r=t.length/2;for(let l=0;l<r;l+=1){const[o,c]=[t[2*l],t[2*l+1]],[i,u]=[t[(l+1)%r*2],t[(l+1)%r*2+1]],h=C([i-o,u-c],[e-o,s-c]);c<=s?u>s&&h>0&&(a+=1):u<=s&&h<0&&(a-=1)}return a!==0},Ft=(n,t)=>{const e=n.length/2,s=t.length/2,a=V(n),r=V(t);if(a[2]<r[0]||r[2]<a[0]||a[3]<r[1]||r[3]<a[1])return!1;for(let o=0;o<e-1;o+=1)for(let c=0;c<s-1;c+=1){const i=[n[2*o],n[2*o+1]],u=[n[2*(o+1)],n[2*(o+1)+1]],h=[t[2*o],t[2*o+1]],f=[t[2*(o+1)],t[2*(o+1)+1]],p=[f[0]-h[0],f[1]-h[1]],g=[i[0]-h[0],i[1]-h[1]],v=[u[0]-h[0],u[1]-h[1]],b=g[0]*p[1]-p[0]*g[1],E=v[0]*p[1]-p[0]*v[1],N=[u[0]-i[0],u[1]-i[1]],w=[h[0]-i[0],h[1]-i[1]],d=[f[0]-i[0],f[1]-i[1]],A=w[0]*N[1]-N[0]*w[1],m=d[0]*N[1]-N[0]*d[1];if(b*E<0&&A*m<0)return!0}let l=0;for(let o=0;o<e-1;o+=1)bt([n[2*o],n[2*o+1]],t)&&(l+=1);return l===e-1},Gt=n=>{const t=[],e=n.length/2;for(let l=0;l<e;l+=1)t.push([n[2*l],n[2*l+1],l]);t.sort((l,o)=>l[0]-o[0]>0?1:-1);let s=[],a=Number.MAX_SAFE_INTEGER;const r=(l,o)=>{if(l===o)return Number.MAX_SAFE_INTEGER;if(l+1===o){const p=F([t[l][0],t[l][1]],[t[o][0],t[o][1]]);return p<a&&(a=p,s=[t[l][2],t[o][2]]),p}const c=Math.round((l+o)/2),i=r(l,c),u=r(c+1,o);let h=Math.min(i,u);const f=[];for(let p=l;p<=o;p+=1)Math.abs(t[p][0]-t[c][0])<h&&f.push([t[p][0],t[p][1],p]);f.sort((p,g)=>p[1]-g[1]>0?1:-1);for(let p=0;p<f.length-1;p+=1)for(let g=p+1;g<f.length&&f[g][1]-f[p][1]<h;g+=1){const v=F([f[p][0],f[p][1]],[f[g][0],f[g][1]]);v<h&&(h=v,h<a&&(a=h,s=[t[f[p][2]][2],t[f[g][2]][2]]))}return h};return r(0,e-1),{distance:a,begin:[n[2*s[0]],n[2*s[0]+1]],end:[n[2*s[1]],n[2*s[1]+1]]}},Tt=n=>{const t=tt(n),e=t.length/2;let s=2,a=Number.MIN_SAFE_INTEGER,r=[];for(let l=0;l<e-1;l+=1){const o=[t[2*l],t[2*l+1]],c=[t[2*(l+1)],t[2*(l+1)+1]];for(;;){const u=[t[2*s],t[2*s+1]],h=[t[2*(s+1)],t[2*(s+1)+1]];if(!(Math.abs(C([o[0]-u[0],o[1]-u[1]],[c[0]-u[0],c[1]-u[1]]))<=Math.abs(C([o[0]-h[0],o[1]-h[1]],[c[0]-h[0],c[1]-h[1]]))))break;s+=1,s>e-1&&(s=0)}const i=F([t[2*l],t[2*l+1]],[t[2*s],t[2*s+1]]);i>a&&(a=i,r=[l,s])}return{distance:a,begin:[t[2*r[0]],t[2*r[0]+1]],end:[t[2*r[1]],t[2*r[1]+1]]}},qt=n=>{const t=n.length/2;let e=0;for(let s=0;s<t;s+=1)e+=n[2*s]*n[(s+1)%t*2+1],e-=n[(s+1)%t*2]*n[2*s+1];return Math.abs(e/2)},Ot=n=>{const t=st(n),e=[],s=new Map;return t.forEach((a,r)=>{const l=[a.p0,a.p1].sort((i,u)=>i[0]-u[0]>0?1:-1).flat().join(":"),o=[a.p1,a.p2].sort((i,u)=>i[0]-u[0]>0?1:-1).flat().join(":"),c=[a.p2,a.p0].sort((i,u)=>i[0]-u[0]>0?1:-1).flat().join(":");s.has(l)?s.get(l).push(r):s.set(l,[r]),s.has(o)?s.get(o).push(r):s.set(o,[r]),s.has(c)?s.get(c).push(r):s.set(c,[r])}),s.forEach((a,r)=>{if(a.length===2)e.push(a.map(l=>t[l].circumCircle.center));else if(a.length===1){const[l,o,c,i]=r.split(":");let u=[Number(l),Number(o)],h=[Number(c),Number(i)];const f=t[a[0]],p=f.circumCircle.center,g=f.flat();g.indexOf(u[0])===4&&g.indexOf(h[0])===0||g.indexOf(h[0])-g.indexOf(u[0])==2||(h=[Number(l),Number(o)],u=[Number(c),Number(i)]);const v=[(u[0]+h[0])/2,(u[1]+h[1])/2],b=p,E=[h[0]-u[0],h[1]-u[1]],N=[p[0]-u[0],p[1]-u[1]],w=C(E,N)<0?1:-1,d=[p[0]+w*(v[0]-p[0])*1e5,p[1]+w*(v[1]-p[1])*1e5];e.push([b,d])}}),e},jt=n=>{const t=st(n);let e={r:1,center:[0,0]},s=Number.MIN_SAFE_INTEGER;return t.forEach(a=>{const r=a.circumCircle;r&&r.r>s&&(s=r.r,e={r:r.r,center:r.center})}),e.r=Math.sqrt(e.r),e};export{wt as A,At as B,qt as E,it as F,_t as K,Ot as M,jt as N,xt as P,tt as Q,yt as V,St as W,Mt as _,Gt as b,$t as c,_ as e,Rt as f,bt as g,Pt as h,V as i,Ft as m,st as n,Ct as p,ht as q,Et as r,kt as t,It as u,Tt as v,Nt as x};
