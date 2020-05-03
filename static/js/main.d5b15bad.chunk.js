(this.webpackJsonpwiki=this.webpackJsonpwiki||[]).push([[0],{216:function(e,t,n){"use strict";n.r(t);var a,r=n(0),o=n.n(r),s=n(61),i=n.n(s),c=n(7),l=n.n(c),u=n(17),h=n(3),d=n(14),m=n(9),p=n(11),f=(n(46),n(15)),v=n(31),g=n(62),b=n(42);!function(e){e.NavNodesCollapsedState="nav-nodes-collapsed-state"}(a||(a={}));var k=function(e,t){var n=localStorage.getItem(e),a=(n?JSON.parse(n):{})['"'.concat(t,'"')];return void 0===a?null:a},w=function(e,t,n){var a=localStorage.getItem(e),r=a?JSON.parse(a):{};r['"'.concat(t,'"')]=n,localStorage.setItem(e,JSON.stringify(r))},E=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(e){var o;return Object(h.a)(this,n),(o=t.call(this,e)).handleCollapseToggle=function(e){var t,n;t=o.props.node.name,n=!o.state.collapsed,w(a.NavNodesCollapsedState,t,n),o.setState({collapsed:!o.state.collapsed})},o.recurseChildren=function(e){return e.map((function(e){return r.createElement(n,{key:e.name,node:e,className:"pl-4 ".concat(o.state.collapsed&&"nav-collapsed")})}))},o.state={collapsed:!0},o}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e,t=(e=this.props.node.name,k(a.NavNodesCollapsedState,e));this.setState({collapsed:null===t?this.state.collapsed:t})}},{key:"render",value:function(){var e=this.props,t=e.node,n=e.className,a=this.state.collapsed;return t?r.createElement("ul",{key:t.name,className:"nav-item disable-selection ".concat(n)},r.createElement("div",{className:"row no-gutters pt-1 pb-1"},r.createElement("span",{className:"col-1 text-center pointer",onClick:this.handleCollapseToggle},t.children&&t.children.length?r.createElement(g.a,{icon:a?b.b:b.a,size:"sm"}):null),r.createElement(v.b,{className:"col-11 nav-link pt-0 pb-1",activeClassName:"selected-nav-link",to:"/".concat(t.urlPath)},t.name)),t.children&&t.children.length?this.recurseChildren(t.children):null):null}}]),n}(r.Component),y=function(e){var t=e.contentTree;return r.createElement("div",null,t&&t.children&&t.children.length?function(e){return e.children.map((function(e){return r.createElement(E,{key:e.name,node:e,className:"pl-0"})}))}(t):null)},x=function(e){return o.a.createElement("div",{id:"navigation"},o.a.createElement("ul",{className:"nav flex-column"},o.a.createElement(y,{contentTree:e.contentTree})))},N=n(65),C=n.n(N),S=(n(83),function(e){return r.createElement("div",{id:"busy-mask"},r.createElement("div",{className:"lds-ellipsis"},r.createElement("div",null),r.createElement("div",null),r.createElement("div",null),r.createElement("div",null)))});function T(e){return o.a.createElement("div",{className:"container-fluid"},o.a.createElement("div",{id:"main-banner",className:"row"},o.a.createElement("div",{className:"col-6 p-1 pl-5"},o.a.createElement("img",{id:"main-logo",src:C.a,width:"50px",height:"50px",alt:"logo"}),o.a.createElement("h3",{id:"main-title",className:"d-inline-block"},"Technological Wiki"))),e.isBusy?o.a.createElement(S,null):o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-xl-3 col-sm-5"},o.a.createElement(x,{contentTree:e.contentTree})),o.a.createElement("div",{className:" col-xl-9 col-sm-7 mt-3 pt-3"},e.children)))}var O=n(66),j=n.n(O),_=function e(t){Object(h.a)(this,e),this.DownloadUrl=void 0,this.GitUrl=void 0,this.HTMLUrl=void 0,this.Name=void 0,this.Path=void 0,this.SHA=void 0,this.Size=void 0,this.Type=void 0,this.URL=void 0,this.Links=void 0,this.DownloadUrl=t.download_url,this.GitUrl=t.git_url,this.HTMLUrl=t.html_url,this.Name=t.name,this.Path=t.path,this.SHA=t.sha,this.Size=t.size,this.Type=t.type,this.URL=t.url,this.Links={Git:t._links.git,HTML:t._links.html,Self:t._links.self}},U=function e(){Object(h.a)(this,e),this.name=null,this.downloadUrl=null,this.urlPath=null,this.children=[]},P=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";Object(h.a)(this,e),this._octokit=void 0,this._owner="oleg3790",this._repo="wiki",this._octokit=new j.a({auth:t,userAgent:"wiki",baseUrl:"https://api.github.com"})}return Object(d.a)(e,[{key:"getSiteContentTree",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._getContentNodes("wiki",0,[]);case 2:return t=e.sent,e.abrupt("return",t.length>0?this._buildContentTree(t):null);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_getContentNodes",value:function(){var e=Object(u.a)(l.a.mark((function e(t,n,a){var r,o,s,i,c,u=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this._octokit.repos.getContents({owner:this._owner,repo:this._repo,path:"".concat(t,"?ref=site-content")});case 3:if(200!==(r=e.sent).status){e.next=23;break}if(o=[],s=!1,Array.isArray(r.data)?o=r.data:"object"===typeof r.data&&o.push(r.data),o.forEach((function(e){var t=new _(e);u._contentNodeExists(a,t)?s=!0:a.push(new _(e))})),!s){e.next=11;break}return e.abrupt("return",a);case 11:i=n;case 12:if(!(i<a.length)){e.next=21;break}if("file"===a[i].Type){e.next=18;break}return c=encodeURIComponent(a[i].Path),e.next=17,this._getContentNodes(c,i+1,a);case 17:return e.abrupt("return",e.sent);case 18:i++,e.next=12;break;case 21:e.next=24;break;case 23:console.log("GitHub API responded with ".concat(r.status," with ").concat(r.data.length," data elements"));case 24:return e.abrupt("return",a);case 27:return e.prev=27,e.t0=e.catch(0),console.log("GitHubContentService.doGetContents Error - ".concat(e.t0.message)),e.abrupt("return",[]);case 31:case"end":return e.stop()}}),e,this,[[0,27]])})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"_buildContentTree",value:function(e){var t=this,n=new U;return e.filter((function(e){return"file"===e.Type})).forEach((function(e){var a=e.Path.split("/"),r=a.pop();r&&r.match(/index\.md/i)&&a.reduce((function(n,r,o){if(a.length-o-1){if(n.children&&n.children.length)return n.children.find((function(e){return e.name===r}))||n;n.name=n.name||r,n.children=n.children||[]}else n.children.push({name:r,children:[],downloadUrl:e.DownloadUrl,urlPath:t._toUrlSafePath(r)});return n}),n)})),n}},{key:"_contentNodeExists",value:function(e,t){return e.filter((function(e){return e.Path===t.Path})).length>0}},{key:"_toUrlSafePath",value:function(e){return[{from:/c#/g,to:"c-sharp"},{from:/\.+/g,to:"dot"},{from:/\s{2,}/g,to:" "},{from:/[\s/\\]+/g,to:"-"},{from:/[()+~=!@#$%^&*{}?]+/g,to:""}].forEach((function(t){e=e.toLowerCase().replace(t.from,t.to)})),e}}]),e}(),I=n(70),B=n.n(I),H=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(h.a)(this,n),(a=t.call(this,e)).state={content:null},a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.props.contentUrl){e.next=10;break}return e.next=3,fetch(this.props.contentUrl);case 3:return t=e.sent,e.t0=this,e.next=7,t.text();case 7:e.t1=e.sent,e.t2={content:e.t1},e.t0.setState.call(e.t0,e.t2);case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return o.a.createElement("div",{className:"nav-details"},this.state.content&&o.a.createElement(B.a,{source:this.state.content,escapeHtml:!1}))}}]),n}(o.a.Component),G=function(e){Object(m.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(h.a)(this,n),(a=t.call(this,e)).toggleIsBusy=function(){a.setState({isBusy:!a.state.isBusy})},a.mapRoutes=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e.children.forEach((function(e){return e.downloadUrl&&e.urlPath&&t.push(o.a.createElement(f.a,{key:e.urlPath,path:"/".concat(e.urlPath),render:function(t){return o.a.createElement(H,Object.assign({},t,{contentUrl:e.downloadUrl}))}})),a.mapRoutes(e,t)})),t},a.state={contentTree:null,isError:!1,isBusy:!1},a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.toggleIsBusy(),e.prev=1,t=localStorage.getItem("auth")||""){e.next=16;break}return e.next=6,fetch("http://olegkrysko-wiki-auth.azurewebsites.net/api/key",{method:"GET",headers:{"Request-Item":"ghKey","Content-Type":"text/plain"}});case 6:if(200!=(n=e.sent).status){e.next=15;break}return e.next=10,n.text();case 10:t=e.sent,localStorage.setItem("auth",t),console.debug("auth retrieved successfully"),e.next=16;break;case 15:console.log("Could not get auth for gh repo, requests to GH API will be limited");case 16:return a=new P(t),e.next=19,a.getSiteContentTree();case 19:if(null!=(r=e.sent)){e.next=23;break}throw console.log("No tree content could be loaded"),null;case 23:this.setState({contentTree:r}),e.next=29;break;case 26:e.prev=26,e.t0=e.catch(1),this.setState({isError:!0});case 29:this.toggleIsBusy();case 30:case"end":return e.stop()}}),e,this,[[1,26]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.contentTree,n=e.isBusy,a=e.isError;return o.a.createElement(v.a,{basename:"/"},o.a.createElement(T,{contentTree:t,isBusy:n},o.a.createElement("div",null,a?o.a.createElement("h6",{className:"text-danger"},"Could not load content, try again later"):t&&this.mapRoutes(t))))}}]),n}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},46:function(e,t,n){},65:function(e,t,n){e.exports=n.p+"static/media/logo.1e842800.png"},71:function(e,t,n){e.exports=n(216)},83:function(e,t,n){}},[[71,1,2]]]);
//# sourceMappingURL=main.d5b15bad.chunk.js.map