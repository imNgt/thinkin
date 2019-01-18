webpackJsonp([12],{374:function(n,t,e){"use strict";function s(n){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function o(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function r(n,t){for(var e=0;e<t.length;e++){var s=t[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(n,s.key,s)}}function p(n,t,e){return t&&r(n.prototype,t),e&&r(n,e),n}function a(n,t){return!t||"object"!==s(t)&&"function"!=typeof t?i(n):t}function i(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function l(n){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}function c(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&u(n,t)}function u(n,t){return(u=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}Object.defineProperty(t,"__esModule",{value:!0});var h=e(6),f=e.n(h),m=function(n){function t(n){return o(this,t),a(this,l(t).call(this,n))}return c(t,n),p(t,[{key:"rawMarkup",value:function(){return{__html:'<h3 id="dns-">DNS 预读取</h3>\n<h3 id="-dns-">如何获取 DNS 解析所花费的时间</h3>\n<p>DNS 服务器将域名解析为对应的 IP 地址需要一定的时间。如何获取 DNS 解析所花费的时间？</p>\n<p><a href="http://velocity.oreilly.com.cn/2011/index.php?func=session&amp;name=%E7%A7%BB%E5%8A%A8%E4%BA%92%E8%81%94%E7%BD%91%E5%BA%94%E7%94%A8%E7%9A%84%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96">DavidWei</a> 提出的方案：</p>\n<pre><code>a &lt;= &lt;random number&gt;\nt1 <span className="hljs-string">http:</span><span class="hljs-comment">//a-doppler.facebook.com/test_pixel?HTTP1.0&amp;t=1&amp;size=0k</span>\nt2 <span class="hljs-string">http:</span><span class="hljs-comment">//a-doppler.facebook.com/test_pixel?HTTP1.1&amp;t=2&amp;size=0k</span>\nt3 <span class="hljs-string">http:</span><span class="hljs-comment">//a-doppler.facebook.com/test_pixel?HTTP1.1&amp;t=3&amp;size=0k</span>\nt4 <span class="hljs-string">http:</span><span class="hljs-comment">//a-doppler.facebook.com/test_pixel?HTTP1.1&amp;t=4&amp;size=10k</span>\nt1 = DNS + New Connection +RTT\nt2 = New Connection + RTT\nt3 = RTT\n<span class="hljs-number">10</span>k /(t4–t3)~TCP bandwidth\n</code></pre><ul>\n<li>浏览器、操作系统、Local DNS、根域名服务器都对 DNS 结果做一定程度的缓存，为了避免各种 DNS 缓存，每组请求必须用一个从来没被用过的全新 N 级域名。这就要求你的域名支持泛解析</li>\n<li>每组的第一个请求响应必须以 HTTP/1.0 返回,这样才可以确保后面的请求会重建 Connection。</li>\n<li>t2 和 t1 指向同一个域名，且都需要重新建立连接，所以 t2-t1 是 DNS 解析时间;t2 返回 Connection: Keep-Alive，t3 是在 Keep-Alive 指定的 timeout 时间内发起的新请求，且返回内容为空，所以是 RTT(Round-Trip Time);t4 在 t3 的基础上只是把返回内容大小由 0k 变成 10k，所以 t4-t3 是加载这 10k 资源花费的时间，这就可以得到网络带宽了。为了减少网络波动，也可以多测几次取平均值。</li>\n</ul>\n<p>chrome developer tools 也提供了查看 dns 查询时间的方法：</p>\n<div align="center"><img   width=\'500\' src="http://cdn.inoongt.tech/images/thinkin/dns_lookup.png"/></div>\n\n<h3 id="-dns-">如何减小 DNS 解析时间</h3>\n<p>HTML5 提供了 DNS 预读取（dns-prefetch）的功能，让浏览器在空闲时将某些域名预先解析为对于的 IP 地址。无论是 HTML 文档中的图片，CSS ，还是 JavaScript 等其他用户能够点击的 URL，都可以通过 DNS 预读取使浏览器主动去执行域名解析。</p>\n<h4 id="-">应用场景</h4>\n<ol>\n<li>我们的静态资源分布在不同的 DNS 中，可以对 DNS 域名进行预读取。</li>\n<li>当我们可以根据用户的行为预测他接下来需要获取的资源，我们可以对这些资源进行 dns-prefetch 。</li>\n</ol>\n<h4 id="-">使用方法</h4>\n<p>通过在服务器端发送 X-DNS-Prefetch-Control 报头，或是在文档中使用值为 http-equiv 的 <meta> 标签</p>\n<pre><code>&lt;meta <span class="hljs-attribute">http-equiv</span>=<span class="hljs-string">"x-dns-prefetch-control"</span> <span class="hljs-attribute">content</span>=<span class="hljs-string">"on"</span>&gt;\n</code></pre><p>使用 rel 属性值为 link type 中的 dns-prefetch 的 <link> 标签来对特定域名进行预读取：</p>\n<pre><code class="lang-html">&lt;link <span class="hljs-attribute">rel</span>=<span class="hljs-string">"dns-prefetch"</span> <span class="hljs-attribute">href</span>=<span class="hljs-string">"//www.spreadfirefox.com"</span>&gt;\n</code></pre>\n<p>可以使用不完整的 URL 的主机名来标记预读取，但这些主机名前必需要有双斜线。</p>\n'}}},{key:"render",value:function(){return f.a.createElement("div",{dangerouslySetInnerHTML:this.rawMarkup()})}}]),t}(h.Component);t.default=m}});