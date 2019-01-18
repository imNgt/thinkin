webpackJsonp([13],{370:function(n,s,a){"use strict";function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function e(n,s){if(!(n instanceof s))throw new TypeError("Cannot call a class as a function")}function i(n,s){for(var a=0;a<s.length;a++){var t=s[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}function r(n,s,a){return s&&i(n.prototype,s),a&&i(n,a),n}function p(n,s){return!s||"object"!==t(s)&&"function"!=typeof s?l(n):s}function l(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function c(n){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function o(n,s){if("function"!=typeof s&&null!==s)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(s&&s.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),s&&h(n,s)}function h(n,s){return(h=Object.setPrototypeOf||function(n,s){return n.__proto__=s,n})(n,s)}Object.defineProperty(s,"__esModule",{value:!0});var u=a(6),f=a.n(u),b=function(n){function s(n){return e(this,s),p(this,c(s).call(this,n))}return o(s,n),r(s,[{key:"rawMarkup",value:function(){return{__html:'<h1 id="webkit-">Webkit 缓存加载机制</h1>\n<p>网络和资源加载是页面渲染的第一步，缓存机制可以对网络资源进行高效管理，加快页面渲染速度。下面开始探究 Webkit 缓存加载机制。</p>\n<h3 id="-">资源缓存</h3>\n<p>Webkit 的基本思想是建立一个资源的缓存池，当 WebKit 需要请求资源的时候，先从资源池中查找是否存在相应的资源。如果有，WebKit 则取出以便使用；如果没有，WebKit 创建一个新的 CachedResource 子类的对象并发送真正的请求给服务器，CachedResource 类是 JavaScript、css、image 等资源的公共基类。WebKit 收到资源后将其设置到该资源类的对象中去，以便于缓存后下次使用。其运行机制如下图：</p>\n<p><a href="https://api.superbed.cn/pic/5bf50a52c4ff9e05833a053e"><img src="https://api.superbed.cn/pic/5bf50a52c4ff9e05833a053e" alt=""></a></p>\n<p>网络获取资源是一个非常耗时的过程，通常一些资源的加载是异步执行的，也就是说资源的获取和加载不会阻碍当前 WebKit 的渲染过程，例如图片、CSS 文件。当然，网页也存在某些特别的资源会阻碍主线程的渲染过程，例如 JavaScript 代码文件。这会严重影响 WebKit 下载资源的效率，因为后面可能还有许多需要下载的资源，WebKit 怎么做呢？</p>\n<p>因为主线程被阻碍了，后面的解析工作没有办法继续往下进行，所以对于 HTML 网页中后面使用的资源也没有办法知道并发送下载请求。当遇到这种情况的时候，WebKit 的做法是这样的：当前的主线程被阻碍时，WebKit 会启动另外一个线程去遍历后面的 HTML 网页，收集需要的资源 URL，然后发送请求，这样就可以避免被阻碍。</p>\n<h3 id="-">资源的生命周期</h3>\n<p>当一个资源加载后，通常它会被放入资源池，以便之后使用。问题是，WebKit 如何判断下次使用的时候是否需要更新该资源从而对服务器重新请求呢？因为服务器可能在某段时间之后更新了该资源。</p>\n<p>WebKit 的方案是，首先判断资源是否在资源池中，如果不是，WebKit 申请下载最新的资源内容；如果是，那么发送一个 HTTP 请求给服务器，说明该资源在本地的一些信息，例如 HTTP 头字段中的 etag 和 last-modified。last-modified 表明资源最后修改的时间。ETag 是一个不透明的标识符，由 Web 服务器根据 URL 上的资源的特定版本而指定。如果那个 URL 上的资源内容改变，一个新的不一样的 ETag 就会被分配。用这种方法使用 ETag 即类似于指纹。服务器则根据信息作判断，如果没有更新，服务器则返回状态码 Status Code: 304 （Not Modified），表明无需更新，那么直接利用资源池中原来的资源。</p>\n<p>还有一种方案是，直接使用资源池中的缓存，做到极致的优化。服务端通过设置 HTTP 头字段的 cache-control/expires 告知客户端在某段时间内资源是最新的，无需向服务端发出请求。服务器则返回状态码 Status Code: 200 (from memory cache)。</p>\n<p>Cache-Control 有以下常用参数：</p>\n<ul>\n<li>Public/Private 私有缓存/共有缓存</li>\n<li>no-cache：不建议使用本地缓存，但仍然会缓存到本地</li>\n<li>no-store：不会在客户端缓存任何数据</li>\n<li>max-age：比较特殊，是一个混合属性，替代了 Expires 的过期时间</li>\n</ul>\n<p><a href="https://api.superbed.cn/pic/5bf51ae9c4ff9e058245fdfc"><img src="https://api.superbed.cn/pic/5bf51ae9c4ff9e058245fdfc" alt=""></a></p>\n<h3 id="etag-">Etag 生成算法（扩展）</h3>\n<p>Etag 是用来描述文件特征的值，类似于文件的 md5 值（查看方法：md5sum file）,md5 是 hash 算法生成的 128 位散列值,Etag 又是怎么生成的呢？</p>\n<p>举个例子，QINIU Etag 生成算法：</p>\n<h5 id="-4m-">小于或等于 4M 的文件</h5>\n<ol>\n<li>对文件内容做 sha1 计算；</li>\n<li>在 sha1 值（20 字节）前拼上单个字节，值为 0x16；</li>\n<li>对拼接好的 21 字节的二进制数据做 url_safe_base64 计算，所得结果即为 ETag 值。</li>\n</ol>\n<pre><code>  +---------------+\n  |<span className="hljs-string">     &lt;=4MB     </span>|\n  +---------------+\n         |<span class="hljs-string">      /\n       sha1()  /\n         </span>|<span class="hljs-string">    /\n         V   /\n    +--+-----+\n    </span>|<span class="hljs-string">1B</span>|<span class="hljs-string"> 20B </span>|<span class="hljs-string">              // 在sha1值（20字节）前拼上单个字节，值为0x16；\n    +--+-----+\n     </span>|<span class="hljs-string">  </span>|\n     |<span class="hljs-string">  --- 文件内容的sha1值\n     </span>|\n     ------ 固定为0x16\n</code></pre><h5 id="-4m-">大于 4M 的文件</h5>\n<ol>\n<li>对文件内容按 4M 大小切块；</li>\n<li>对每个块做 sha1 计算；；</li>\n<li>对所有的 sha1 值拼接后做二次 sha1，然后在二次 sha1 值前拼上单个字节，值为 0x96；</li>\n<li>对拼接好的 21 字节的二进制数据做 url_safe_base64 计算，所得结果即为 ETag 值。</li>\n</ol>\n<pre><code>         +----------+----------+-------\n         |<span class="hljs-string">    4MB   </span>|<span class="hljs-string">   4MB    </span>|<span class="hljs-string"> ...\n         +----------+----------+-------\n              </span>|<span class="hljs-string">    </span>|<span class="hljs-string">   </span>|<span class="hljs-string">     /\n            sha1() </span>|<span class="hljs-string"> sha1() /\n              </span>|<span class="hljs-string">    </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   /\n              V    </span>|<span class="hljs-string">   V  /\n              +-----+-----+-------\n              </span>|<span class="hljs-string"> 20B </span>|<span class="hljs-string"> 20B </span>|<span class="hljs-string"> ...\n              +-----+-----+-------\n                     </span>|<span class="hljs-string">      /\n                   sha1()  /\n                     </span>|<span class="hljs-string">    /\n                     V   /\n                +--+-----+\n                </span>|<span class="hljs-string">1B</span>|<span class="hljs-string"> 20B </span>|<span class="hljs-string">      3. 对所有的 sha1 值拼接后做二次 sha1，\n                +--+-----+         然后在二次 sha1 值前拼上单个字节，值为0x96；\n                 </span>|<span class="hljs-string">  </span>|\n                 |<span class="hljs-string">  ---- 二次sha1的值\n                 ------- 固定为0x96</span>\n</code></pre>'}}},{key:"render",value:function(){return f.a.createElement("div",{dangerouslySetInnerHTML:this.rawMarkup()})}}]),s}(u.Component);s.default=b}});