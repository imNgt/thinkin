webpackJsonp([1],{444:function(s,n,a){"use strict";function e(s){return s&&s.__esModule?s:{default:s}}function l(s,n){if(!(s instanceof n))throw new TypeError("Cannot call a class as a function")}function p(s,n){if(!s)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?s:n}function r(s,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);s.prototype=Object.create(n&&n.prototype,{constructor:{value:s,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(s,n):s.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var t=function(){function s(s,n){for(var a=0;a<n.length;a++){var e=n[a];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(s,e.key,e)}}return function(n,a,e){return a&&s(n.prototype,a),e&&s(n,e),n}}(),c=a(6),o=e(c),i=a(446),h=(e(i),a(447)),u=(e(h),function(s){function n(s){return l(this,n),p(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,s))}return r(n,s),t(n,[{key:"render",value:function(){return o.default.createElement("div",null,"Index")}}]),n}(c.Component));n.default=u},446:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.default='\n\t<h1 id="-">竞赛小程序</h1>\n<h2 id="-">页面构成</h2>\n<p>小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。</p>\n<ul>\n<li>JSON 配置</li>\n<li>WXML 模板</li>\n<li>WXSS 样式</li>\n<li>JS 逻辑交互</li>\n</ul>\n<h2 id="-">逻辑层</h2>\n<p>逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈，由 JavaScript 编写。</p>\n<ul>\n<li>每个页面有独立的作用域，并提供模块化能力。</li>\n<li>由于框架并非运行在浏览器中，所以 JavaScript 在 web 中一些能力都无法使用，如 document，window 等。</li>\n<li>开发者写的所有代码最终将会打包成一份 JavaScript，并在小程序启动的时候运行，直到小程序销毁。</li>\n</ul>\n<h2 id="-">视图层</h2>\n<p>视图层负责 UI 显示，由 WXML 与 WXSS 构成。将逻辑层的数据反应成视图，同时将视图层的事件发送给逻辑层。</p>\n<h2 id="-">运行环境</h2>\n<p>在开发工具上， 小程序的 javascript 代码是运行在 nwjs 中，是由 Chrome Webview 来渲染的。</p>\n<p>NW.js 基于 Chromium 内核与 Node.js。\nNW.js 让您在编写应用时可以使用 Node.js 及其 modules 与 web 开发技术。而且，您可以非常容易的将一个 WEB 应用打包成一个原生应用。</p>\n<p>Html5 的界面是由浏览器内核渲染出来的，小程序代码经过微信 App 内的引擎处理，最终会把界面翻译成系统原生的控件，体验比 HTML5 好。</p>\n<h2 id="-">内部构架</h2>\n<p>小程序自身分为两个主要部分独立运行：view 模块和 service 模块。</p>\n<p>view 模块负责 UI 显示，它由开发者编写的 wxml 和 wxss 转换后代码以及微信提供相关辅助模块组成。 一个 view 模块对应一个 webview 组件。</p>\n<p>service 模块负责应用的后台逻辑，它由小程序的 js 代码以及微信提供的相关辅助模块组成。 一个应用只有一个 service 进程，它在程序生命周期内后台运行。</p>\n<div align="center"><img width="400" height="400" src="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/app1.jpg"/></div>\n\n<p>一个典型的交互流程：</p>\n<ol>\n<li>用户点击界面触发事件</li>\n<li>对应 view 模块接收事件后将事件封装成所需格式后发送到 nwjs</li>\n<li>nwjs 运行环境将数据处理后发送给 service 模块</li>\n<li>service 模块依据传来数据找到对应 view 模块后执行对应的事件处理函数</li>\n<li>事件处理函数调用 this.setData({}) 改变 data，serivce 层计算该页面 data 后向 WX 后台发送</li>\n<li>WX 后台再将数据进行简单封装， 最后转发给到 view 层</li>\n<li>view 层接收到数据，将 data 与现有页面 data 合并， 然后 virtual dom 模块进行 diff 计算改变视图</li>\n</ol>\n<h2 id="promise-sequence-">Promise 的顺序执行（sequence）</h2>\n<pre><code className="lang-javascript"><span class="hljs-comment">/**\n * @param {*promise任务队列} tasks\n */</span>\n<span class="hljs-keyword">const</span> sequenceTasks = <span class="hljs-function"><span class="hljs-params">tasks</span> =&gt;</span> {\n    <span class="hljs-keyword">const</span> recordValue = <span class="hljs-function">(<span class="hljs-params">results, value</span>) =&gt;</span> {\n        results.push(value);\n        <span class="hljs-keyword">return</span> results;\n    };\n    <span class="hljs-keyword">const</span> pushValue = recordValue.bind(<span class="hljs-literal">null</span>, []);\n\n    <span class="hljs-keyword">return</span> tasks.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promise, task</span>) </span>{\n        <span class="hljs-keyword">return</span> promise.then(task).then(pushValue);\n    }, <span class="hljs-built_in">Promise</span>.resolve());\n\n    <span class="hljs-comment">//task 返回值是promise，每次循环会新建一个promise对象</span>\n    <span class="hljs-comment">// let promise = Promise.resolve();</span>\n    <span class="hljs-comment">// for (let i = 0; i &lt; tasks.length; i++) {</span>\n    <span class="hljs-comment">//     let task = tasks[i];</span>\n    <span class="hljs-comment">//     promise = promise.then(task).then(pushValue);</span>\n    <span class="hljs-comment">// }</span>\n    <span class="hljs-comment">// return promise;</span>\n};\n\n<span class="hljs-keyword">const</span> promise1 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>\n    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> {\n        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise1 resolve"</span>);\n            resolve(<span class="hljs-string">"promise1"</span>);\n        }, <span class="hljs-number">1000</span>);\n    });\n\n<span class="hljs-keyword">const</span> promise2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>\n    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> {\n        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise2 resolve"</span>);\n            resolve(<span class="hljs-string">"promise2"</span>);\n        }, <span class="hljs-number">1</span>);\n    });\n\n<span class="hljs-keyword">const</span> tasks = [promise1, promise2];\nsequenceTasks(tasks).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {\n    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"res"</span>, res);\n});\n\n<span class="hljs-comment">//promise1 resolve</span>\n<span class="hljs-comment">//promise2 resolve</span>\n<span class="hljs-comment">//res ["promise1", "promise2"]</span>\n</code></pre>\n<p>##</p>\n<h2 id="-">待优化</h2>\n'},447:function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.default='\n\t<h1 id="promise-">Promise 顺序执行</h1>\n<h3 id="-">起源</h3>\n<p>JavaScript 在处理异步任务时，经常用到的手段是回调函数。奈何，面对多个需要顺序执行的异步任务很容易造成回调地狱(Callback Hell):</p>\n<pre><code className="lang-javascript">request(a, <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> {\n    request(b, <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {\n        request(c, <span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> {\n            <span class="hljs-comment">//...</span>\n        });\n    });\n});\n</code></pre>\n<p>Promise 是 Callback Hell 的一种解决方案，并且得到了非常广泛的应用,比如 axios 就是利用 Promise 编写的 http 客户端。</p>\n<h3 id="promise-">Promise 顺序执行异步任务</h3>\n<p>将异步任务改写成 Promise 的形式，然后在上一个 promise 的状态变为 resolved 调用下一个 promise。\nPromise 处理异步任务的优雅的实现方式应该是这样：</p>\n<pre><code class="lang-javascript"><span class="hljs-keyword">const</span> A = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(a, resolve));\n\n<span class="hljs-keyword">const</span> B = <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(b, resolve));\n\n<span class="hljs-keyword">const</span> C = <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> request(c, resolve));\n\nA(a)\n    .then(B)\n    .then(C)\n    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {\n        <span class="hljs-built_in">console</span>.log(e);\n    });\n</code></pre>\n<p>基于以上结果我们可以进一步将其封装成进行顺序处理的函数,此函数接受异步任务数组作为参数，顺序执行后返回结果。顺序处理的函数的实现方式：</p>\n<pre><code class="lang-javascript"><span class="hljs-comment">/**\n * @param {*promise任务队列} tasks\n */</span>\n<span class="hljs-keyword">const</span> sequenceTasks = <span class="hljs-function"><span class="hljs-params">tasks</span> =&gt;</span> {\n    <span class="hljs-keyword">const</span> recordValue = <span class="hljs-function">(<span class="hljs-params">results, value</span>) =&gt;</span> {\n        results.push(value);\n        <span class="hljs-keyword">return</span> results;\n    };\n    <span class="hljs-keyword">const</span> pushValue = recordValue.bind(<span class="hljs-literal">null</span>, []);\n\n    <span class="hljs-keyword">return</span> tasks.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">promise, task</span>) </span>{\n        <span class="hljs-keyword">return</span> promise.then(task).then(pushValue);\n    }, <span class="hljs-built_in">Promise</span>.resolve());\n};\n\n<span class="hljs-keyword">const</span> promise1 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>\n    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> {\n        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise1 resolve"</span>);\n            resolve(<span class="hljs-string">"promise1"</span>);\n        }, <span class="hljs-number">1000</span>);\n    });\n\n<span class="hljs-keyword">const</span> promise2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>\n    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, rejecrt</span>) =&gt;</span> {\n        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {\n            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise2 resolve"</span>);\n            resolve(<span class="hljs-string">"promise2"</span>);\n        }, <span class="hljs-number">1</span>);\n    });\n\n<span class="hljs-keyword">const</span> tasks = [promise1, promise2];\nsequenceTasks(tasks)\n    .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {\n        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"res"</span>, res);\n    })\n    .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {\n        <span class="hljs-built_in">console</span>.log(e);\n    });\n<span class="hljs-comment">/**\n * 输出结果：\n * promise1 resolve\n * promise2 resolve\n * res ["promise1", "promise2"]\n */</span>\n</code></pre>\n<p>在 reduce 中第一个参数中被 return 的值,利用 reduce 方法使下一个 promise 指向 promise.then(task).then(pushValue)，从而实现 promise 链。</p>\n'}});
//# sourceMappingURL=1-176584.js.map