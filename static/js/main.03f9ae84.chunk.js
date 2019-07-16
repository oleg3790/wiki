(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{215:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(59),c=n.n(i),o=(n(74),n(8)),s=n.n(o),l=n(18),u=n(3),h=n(15),d=n(12),m=n(6),p=n(10),f=(n(27),n(16)),v=n(31),b=(n(76),n(60)),g=n(42),w=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e)))._handleCollapseToggle=function(e){n.setState({collapsed:!n.state.collapsed})},n.recurseChildren=function(e){return e.map(function(e){return a.createElement(t,{key:e.name,node:e,className:"pl-4 ".concat(n.state.collapsed&&"tv-collapsed")})})},n.state={collapsed:!1},n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props,t=e.node,n=e.className,r=this.state.collapsed;return t?a.createElement("ul",{key:t.name,className:"nav-item disable-selection ".concat(n)},a.createElement("div",{className:"row no-gutters pt-1 pb-1"},a.createElement("span",{className:"col-1 text-center",onClick:this._handleCollapseToggle},t.children&&t.children.length?a.createElement(b.a,{icon:r?g.b:g.a,size:"sm"}):null),a.createElement(v.b,{className:"col-11 nav-link pt-0 pb-1",to:"/".concat(t.urlPath)},t.name)),t.children&&t.children.length?this.recurseChildren(t.children):null):null}}]),t}(a.Component),k=function(e){var t=e.contentTree;return a.createElement("div",null,t&&t.children&&t.children.length?function(e){return e.children.map(function(e){return a.createElement(w,{key:e.name,node:e,className:"pl-0"})})}(t):null)},E=function(e){return r.a.createElement("div",{id:"navigation"},r.a.createElement("ul",{className:"nav flex-column"},r.a.createElement(k,{contentTree:e.contentTree})))},y=n(63),x=n.n(y),j=(n(83),function(e){return a.createElement("div",{id:"busy-mask"},a.createElement("div",{className:"lds-ellipsis"},a.createElement("div",null),a.createElement("div",null),a.createElement("div",null),a.createElement("div",null)))});function N(e){return r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{id:"main-banner",className:"row"},r.a.createElement("div",{className:"col-6 p-1 pl-5"},r.a.createElement("img",{id:"main-logo",src:x.a,width:"50px",height:"50px",alt:"logo"}),r.a.createElement("h3",{id:"main-title",className:"d-inline-block"},"Technological Wiki"))),e.isBusy?r.a.createElement(j,null):r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-xl-3 col-sm-5"},r.a.createElement(E,{contentTree:e.contentTree})),r.a.createElement("div",{className:" col-xl-9 col-sm-7 mt-3 pt-3"},e.children)))}var O=n(64),_=n.n(O),T=function e(t){Object(u.a)(this,e),this.DownloadUrl=void 0,this.GitUrl=void 0,this.HTMLUrl=void 0,this.Name=void 0,this.Path=void 0,this.SHA=void 0,this.Size=void 0,this.Type=void 0,this.URL=void 0,this.Links=void 0,this.DownloadUrl=t.download_url,this.GitUrl=t.git_url,this.HTMLUrl=t.html_url,this.Name=t.name,this.Path=t.path,this.SHA=t.sha,this.Size=t.size,this.Type=t.type,this.URL=t.url,this.Links={Git:t._links.git,HTML:t._links.html,Self:t._links.self}},C=function e(){Object(u.a)(this,e),this.name=null,this.downloadUrl=null,this.urlPath=null,this.children=[]},U=function(){function e(){Object(u.a)(this,e),this._octokit=void 0,this._owner="oleg3790",this._repo="wiki",this._octokit=new _.a({auth:"",userAgent:"wiki",baseUrl:"https://api.github.com"})}return Object(h.a)(e,[{key:"getSiteContentTree",value:function(){var e=Object(l.a)(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getContentNodes("wiki",0,[]);case 2:return t=e.sent,e.abrupt("return",t.length>0?this._buildContentTree(t):null);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"_getContentNodes",value:function(){var e=Object(l.a)(s.a.mark(function e(t,n,a){var r,i,c,o,l,u=this;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._octokit.repos.getContents({owner:this._owner,repo:this._repo,path:"".concat(t,"?ref=site-content")});case 3:if(200!==(r=e.sent).status){e.next=23;break}if(i=[],c=!1,Array.isArray(r.data)?i=r.data:"object"===typeof r.data&&i.push(r.data),i.forEach(function(e){var t=new T(e);u._contentNodeExists(a,t)?c=!0:a.push(new T(e))}),!c){e.next=11;break}return e.abrupt("return",a);case 11:o=n;case 12:if(!(o<a.length)){e.next=21;break}if("file"===a[o].Type){e.next=18;break}return l=encodeURIComponent(a[o].Path),e.next=17,this._getContentNodes(l,o+1,a);case 17:return e.abrupt("return",e.sent);case 18:o++,e.next=12;break;case 21:e.next=24;break;case 23:console.log("GitHub API responded with ".concat(r.status," with ").concat(r.data.length," data elements"));case 24:return e.abrupt("return",a);case 27:return e.prev=27,e.t0=e.catch(0),console.log("GitHubContentService.doGetContents Error - ".concat(e.t0.message)),e.abrupt("return",[]);case 31:case"end":return e.stop()}},e,this,[[0,27]])}));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"_buildContentTree",value:function(e){var t=this,n=new C;return e.filter(function(e){return"file"===e.Type}).forEach(function(e){var a=e.Path.split("/"),r=a.pop();r&&r.match(/index\.md/i)&&a.reduce(function(n,r,i){if(a.length-i-1){if(n.children&&n.children.length)return n.children.find(function(e){return e.name===r})||n;n.name=n.name||r,n.children=n.children||[]}else n.children.push({name:r,children:[],downloadUrl:e.DownloadUrl,urlPath:t._toUrlSafePath(r)});return n},n)}),n}},{key:"_contentNodeExists",value:function(e,t){return e.filter(function(e){return e.Path===t.Path}).length>0}},{key:"_toUrlSafePath",value:function(e){return[{from:/c#/g,to:"c-sharp"},{from:/\.+/g,to:"dot"},{from:/\s{2,}/g,to:" "},{from:/[\s\/\\]+/g,to:"-"},{from:/[()+~=!@#$%^&*{}?]+/g,to:""}].forEach(function(t){e=e.toLowerCase().replace(t.from,t.to)}),e}}]),e}(),P=n(68),S=n.n(P),B=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={content:null},n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(s.a.mark(function e(){var t;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.props.contentUrl){e.next=10;break}return e.next=3,fetch(this.props.contentUrl);case 3:return t=e.sent,e.t0=this,e.next=7,t.text();case 7:e.t1=e.sent,e.t2={content:e.t1},e.t0.setState.call(e.t0,e.t2);case 10:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"node-details"},this.state.content&&r.a.createElement(S.a,{source:this.state.content,escapeHtml:!1}))}}]),t}(r.a.Component),H=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).toggleIsBusy=function(){n.setState({isBusy:!n.state.isBusy})},n.mapRoutes=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e.children.forEach(function(e){return e.downloadUrl&&e.urlPath&&t.push(r.a.createElement(f.a,{key:e.urlPath,path:"/".concat(e.urlPath),render:function(t){return r.a.createElement(B,Object.assign({},t,{contentUrl:e.downloadUrl}))}})),n.mapRoutes(e,t)}),t},n.state={contentTree:null,isBusy:!1},n}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(s.a.mark(function e(){var t,n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.toggleIsBusy(),t=new U,e.next=4,t.getSiteContentTree();case 4:n=e.sent,this.setState({contentTree:n}),this.toggleIsBusy();case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.contentTree,n=e.isBusy;return r.a.createElement(v.a,{basename:"/"},r.a.createElement(N,{contentTree:t,isBusy:n},r.a.createElement("div",null,t&&this.mapRoutes(t))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},27:function(e,t,n){},63:function(e,t,n){e.exports=n.p+"static/media/logo.1e842800.png"},69:function(e,t,n){e.exports=n(215)},74:function(e,t,n){},76:function(e,t,n){},83:function(e,t,n){}},[[69,1,2]]]);
//# sourceMappingURL=main.03f9ae84.chunk.js.map