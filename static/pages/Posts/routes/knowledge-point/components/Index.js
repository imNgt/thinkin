import React, { Component } from "react";

const article=`<h1 id="javascript-knowledge-point">Javascript Knowledge Point</h1>
<h3 id="1-undefined-and-null">1、undefined and null</h3>
<p>JavaScript 的最初版本是这样区分的：<b>null 是一个表示&quot;无&quot;的对象，转为数值时为 0；undefined 是一个表示&quot;无&quot;的原始值，转为数值时为 NaN</b>。</p>
<p>目前的用法：
<b>null 表示&quot;没有对象&quot;，即该处不应该有值</b>。典型用法是：</p>
<ol>
<li>作为函数的参数，表示该函数的参数不是对象。</li>
<li>作为原型链的终点。</li>
</ol>
<pre><code><span className="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Object</span>.prototype)
<span class="hljs-comment">// null</span>
</code></pre><p><b>undefined 表示&quot;缺少值&quot;，就是此处应该有一个值，但是还没有定义</b>。典型用法是：</p>
<ol>
<li>变量被声明，但没有被赋值，其值就是 undefined。</li>
<li>调用函数时，没有提供对应的参数，该参数就等于 undefined。</li>
<li>对象没有赋值的属性，其值就是 undefined。</li>
<li>函数没有返回值时，默认返回 undefined。</li>
</ol>
<h3 id="2-event-loop-">2、浏览器 Event loop 事件循环</h3>
<h4 id="-heap-">堆（heap）</h4>
<p>程序运行时申请的动态内存，在 JS 运行时用来存放对象。</p>
<h4 id="-stack-">栈（stack）</h4>
<p>JS 种的基本数据类型与指向对象的地址存放在栈内存中，此外还有一块栈内存用来执行 JS 主线程--执行栈（execution context stack）。</p>
<p>浏览器中的 Event loop：</p>
<ul>
<li>所有同步任务都在主线程上执行，形成一个执行栈。</li>
<li>主任务之外，还存在任务队列。<ul>
<li>任务队列分为 macro-task(宏任务)和 micro-task(微任务)。</li>
<li>macro-task(宏任务): setTimeout, setInterval, setImmediate, I/O 等</li>
<li>micro-task(微任务): process.nextTick, Promise, MutationObserver 等</li>
</ul>
</li>
</ul>
<p>整个最基本的 Event Loop 如图所示：</p>
<div align="center">&lt;img width=&quot;600&quot;src=&quot;<a href="http://p42jcfxfo.bkt.clouddn.com/images/thinkin/eventloop.png&quot;/&gt;">http://p42jcfxfo.bkt.clouddn.com/images/thinkin/eventloop.png&quot;/&gt;</a></div>

<p>具体过程：</p>
<ol>
<li><p>浏览器中，先执行当前栈，执行完主执行线程中的任务。</p>
</li>
<li><p>取出 Microtask 微任务队列中任务执行直到清空。</p>
</li>
<li><p>取出 Macrotask 宏任务中 一个 任务执行。</p>
</li>
<li><p>检查 Microtask 微任务中有没有任务，如果有任务执行直到清空。</p>
</li>
<li><p>重复 3 和 4。</p>
</li>
</ol>
<h3 id="3-">3、对象深拷贝</h3>
<pre><code><span class="hljs-comment">/*缺点：如果需要属性值是函数或者是undefined，就会被过滤掉 */</span>
<span class="hljs-keyword">const</span> clone=<span class="hljs-function">(<span class="hljs-params">obj</span>)=&gt;</span>{
    <span class="hljs-keyword">let</span> _obj=<span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(obj))
}  
</code></pre><pre><code><span class="hljs-keyword">const</span> clone=<span class="hljs-function">(<span class="hljs-params">obj</span>)=&gt;</span>{
  <span class="hljs-keyword">if</span>(!obj&amp;&amp; <span class="hljs-keyword">typeof</span> obj!== <span class="hljs-string">'object'</span>){
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-keyword">let</span> result=obj.constructor===<span class="hljs-built_in">Object</span>?{}:[];
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> obj){
    result[key] =(obj[key]&amp;&amp;<span class="hljs-keyword">typeof</span> obj[key]===<span class="hljs-string">'object'</span>)?clone(obj[key]):obj[key];
  }
  <span class="hljs-keyword">return</span> result;
}
</code></pre><h3 id="jsonp-">JSONP 跨域原理</h3>
<p>在同源策略下，在某个服务器下的页面是无法获取到该服务器以外的数据的，但 img、iframe、script 等标签是个例外，这些标签可以通过 src 属性请求到其他服务器上的数据。利用 script 标签的开放策略，我们可以实现跨域请求数据，当然，也需要服务端的配合。当我们正常地请求一个 JSON 数据的时候，服务端返回的是一串 JSON 类型的数据，而我们使用 JSONP 模式来请求数据的时候，服务端返回的是一段可执行的 JavaScript 代码。例如：</p>
<p>客户端请求,并指定回调函数的名字：</p>
<pre><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">appendScript</span>(<span class="hljs-params">src</span>)</span>{
    <span class="hljs-keyword">let</span> script=<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"script"</span>);
    script.src=src;
    <span class="hljs-built_in">document</span>.appendChild(script)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">somefun</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"data:"</span>,data)
}

appdendScript(<span class="hljs-string">"http://a.com&amp;callback=somefun"</span>);
</code></pre><p>服务端返回 Javascript 代码：</p>
<pre><code>"<span class="hljs-selector-tag">somefun</span>({<span class="hljs-attribute">key</span>:somevalue});"
</code></pre><h3 id="-">正则表达式之后向引用</h3>
<h4 id="-">分组</h4>
<p>组的定义：</p>
<p>正则表达式通过使用括号将表达式分为不同的分组，识别的方法是通过从左至右搜寻左半括号，遇到第一个左半括号时，则该左半括号与对应的右半括号所包含的内容即为第一分组，以此类推 。例如，在表达式((A)(B(C)))，有四个这样的组：((A)(B(C)))、(A)、(B(C))、(C)</p>
<h4 id="-">位置类元数据</h4>
<p>即像^、$、\b、\B 这样的元字符，是用来表示一个位置。作为一个判断条件，匹配的字符需要满足这样的位置信息，但最终匹配的字符串中并不会包含这个样的位置信息。</p>
<h4 id="-">零宽断言</h4>
<p>\b,^,$那样用于指定一个位置，这个位置应该满足一定的条件（即断言），因此它们也被称为零宽断言。</p>
<ul>
<li>(?=exp) 匹配 exp 前面的位置，比如\b\w+(?=ing\b)，匹配以 ing 结尾的单词的前面部分(除了 ing 以外的部分)</li>
<li>(?&lt;=exp) 匹配 exp 后面的位置，比如(?&lt;=\bre)\w+\b 会匹配以 re 开头的单词的后半部分(除了 re 以外的部分)</li>
<li>(?!exp) 匹配后面跟的不是 exp 的位置</li>
<li>(?&lt;!exp) 匹配前面不是 exp 的位置</li>
</ul>
<h4 id="-">贪婪与懒惰</h4>
<p>当正则表达式中包含能接受重复的限定符时，通常的行为是（在使整个表达式能得到匹配的前提下）匹配尽可能多的字符。以这个表达式为例：a.*b，它将会匹配最长的以 a 开始，以 b 结束的字符串。被称为贪婪匹配。</p>
<p>有时，我们更需要懒惰匹配，也就是匹配尽可能少的字符。要在它后面加上一个问号?。这样.*?就意味着匹配任意数量的重复，但是在能使整个匹配成功的前提下使用最少的重复。</p>
<p>例子：</p>
<pre><code>let str = `
  <span class="hljs-attribute">&lt;p&gt;</span>第一个<span class="hljs-attribute">&lt;/p&gt;</span>
  <span class="hljs-attribute">&lt;pre&gt;</span><span class="hljs-attribute">&lt;code&gt;</span>console.log(1);<span class="hljs-attribute">&lt;/code&gt;</span><span class="hljs-attribute">&lt;/pre&gt;</span>
  <span class="hljs-attribute">&lt;p&gt;</span>第二个<span class="hljs-attribute">&lt;/p&gt;</span>
  <span class="hljs-attribute">&lt;pre&gt;</span><span class="hljs-attribute">&lt;code&gt;</span>console.log(2);<span class="hljs-attribute">&lt;/code&gt;</span><span class="hljs-attribute">&lt;/pre&gt;</span>`;

str.match(/(?<span class="hljs-attribute">&lt;=&lt;pre&gt;</span><span class="hljs-attribute">&lt;code&gt;</span>)[\s\S]*?(?=<span class="hljs-attribute">&lt;\/code&gt;</span><span class="hljs-attribute">&lt;\/pre&gt;</span>)/gi);  // 获得,/somePattern*?/是懒惰匹配。

str.replace(/(?<span class="hljs-attribute">&lt;=&lt;pre&gt;</span><span class="hljs-attribute">&lt;code&gt;</span>)[\s\S]*?(?=<span class="hljs-attribute">&lt;\/code&gt;</span><span class="hljs-attribute">&lt;\/pre&gt;</span>)/gi, 'asdf');  // 替换
</code></pre><h3 id="react-vue-">React/Vue 不同组件之间的通信方式</h3>
<h4 id="vue">Vue</h4>
<ul>
<li>父子组件用 Props 通信</li>
<li>非父子组件用 Event Bus 通信</li>
<li>如果项目够复杂,可能需要 Vuex 等全局状态管理库通信</li>
<li>$dispatch(已经废除)和$broadcast(已经废除)</li>
</ul>
<h4 id="react">React</h4>
<ul>
<li>父子组件,父-&gt;子直接用 Props,子-&gt;父用 callback 回调</li>
<li>非父子组件,用发布订阅模式的 Event 模块</li>
<li>项目复杂的话用 Redux、Mobx 等全局状态管理管库</li>
<li>用新的 Context Api</li>
</ul>
<h3 id="thunk-">Thunk 函数</h3>
<p>将多参数函数替换成单参数的版本，且只接受回调函数作为参数。</p>
<pre><code><span class="hljs-keyword">const</span> Thunk=<span class="hljs-function">(<span class="hljs-params">fn</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>)=&gt;</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">callback</span>)=&gt;</span>{
            fn.call(<span class="hljs-keyword">this</span>,...args,callback)
        }
    }
}

<span class="hljs-keyword">const</span> readFileThunk = Thunk(fs.readFile);
readFileThunk(path)(callback);
</code></pre><h3 id="this-">this 指向</h3>
<ul>
<li>纯粹的函数调用,this 就代表全局对象 Global</li>
<li>作为对象方法的调用,this 就指向上级对象</li>
<li>作为构造函数调用,this 就指向新对象</li>
<li>apply/call 调用,this 指向第一个参数提供的对象</li>
</ul>
<h3 id="cookie">Cookie</h3>
<p>功能：按照一定规范来储存这些信息，并在随后的请求中将这些信息发送至服务器，cookie 的值被存储在名为 Cookie 的 HTTP 消息头中。</p>
<p>给 document 赋值并不会覆盖原有的值。</p>
<pre><code>const setCookie=<span class="hljs-function"><span class="hljs-params">(key,value,expires)</span>=&gt;</span>{
    <span class="hljs-built_in">document</span>.cookie=!expires?
        `<span class="javascript">${key}=${value}</span>`:
        `<span class="javascript">${key}=${value};expires=${</span>`expires`<span class="javascript">};

}

<span class="hljs-keyword">const</span> getCookie=<span class="hljs-function">(<span class="hljs-params">key</span>)=&gt;</span>{
    <span class="hljs-keyword">const</span> reg =<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(</span>`(?&lt;=${key}=)(\w)+(?=\;)`<span class="javascript">,<span class="hljs-string">'g'</span>);
    <span class="hljs-keyword">let</span> result=<span class="hljs-string">""</span>;
    <span class="hljs-keyword">let</span> cookie=<span class="hljs-built_in">document</span>.cookie;
    <span class="hljs-keyword">if</span>(cookie){
        result=cookie.match(r)[<span class="hljs-number">0</span>]
    }

    <span class="hljs-keyword">return</span> result;

}</span>
</code></pre><h3 id="-">快速排序</h3>
<p>算法思想：</p>
<ul>
<li><p>在数据集之中，选择一个元素作为&quot;基准&quot;（pivot）。</p>
</li>
<li><p>所有小于&quot;基准&quot;的元素，都移到&quot;基准&quot;的左边；所有大于&quot;基准&quot;的元素，都移到&quot;基准&quot;的右边。</p>
</li>
<li><p>对&quot;基准&quot;左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。</p>
</li>
</ul>
<p>实现：</p>
<pre><code><span class="hljs-built_in">quickSort</span> = (arr)=&gt; {
    <span class="hljs-keyword">let</span> mid= arr.splice(<span class="hljs-type">Math</span>.floor(arr.length/<span class="hljs-number">2</span>),<span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">left</span> =[],<span class="hljs-keyword">right</span>=[];

    arr.forEach((v,i)=&gt;{
        <span class="hljs-keyword">if</span>(v&gt;mid){
            <span class="hljs-keyword">right</span>.push(v)
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">left</span>.push(v)
        }
    })
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">left</span>.length&gt;<span class="hljs-number">1</span>) <span class="hljs-keyword">left</span> = <span class="hljs-built_in">quickSort</span>(<span class="hljs-keyword">left</span>)
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">right</span>.length&gt;<span class="hljs-number">1</span>) <span class="hljs-keyword">right</span> = <span class="hljs-built_in">quickSort</span>(<span class="hljs-keyword">right</span>)




    <span class="hljs-keyword">return</span> [...<span class="hljs-keyword">left</span>,mid,...<span class="hljs-keyword">right</span>]

};

<span class="hljs-built_in">quickSort</span>([<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">0</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">8</span>,<span class="hljs-number">1</span>,<span class="hljs-number">9</span>,<span class="hljs-number">7</span>,<span class="hljs-number">6</span>,<span class="hljs-number">2</span>])
</code></pre><h3 id="-execution-context-">执行上下文(Execution Context)</h3>
<p>js 的运行有三种环境：</p>
<ul>
<li>Global Code, JavaScript 代码开始运行的默认环境</li>
<li>Function Code, 代码进入一个 JavaScript 函数</li>
<li>Eval Code, 使用 eval()执行代码</li>
</ul>
<p>为了表示不同的运行环境，JavaScript 中有一个执行上下文（Execution context，EC）的概念。也就是说，当 JavaScript 代码执行的时候，会进入不同的执行上下文，这些执行上下文就构成了一个执行上下文栈（Execution context stack，ECS）。</p>
<p>执行上下文有三个重要的属性:</p>
<ul>
<li>变量对象（Variable object，VO）,进入一个执行上下文时被激活（Activation object，AO）</li>
<li>作用域链（Scope chain）</li>
<li>this</li>
</ul>
<p>解释器执行代码的伪逻辑:</p>
<ol>
<li>查找调用函数的代码</li>
<li>执行代码之前，先进入创建上下文阶段<ul>
<li>分析形参</li>
<li>扫描上下文的函数声明<ul>
<li>为发现的每一个函数，在变量对象上创建一个属性——确切的说是函数的名字——其有一个指向函数在内存中的引用</li>
<li>如果函数的名字已经存在，引用指针将被重写</li>
</ul>
</li>
<li>扫描上下文的变量声明<ul>
<li>为发现的每个变量声明，在变量对象上创建一个属性——就是变量的名字，并且将变量的值初始化为 undefined</li>
<li>如果变量的名字已经在变量对象里存在，将不会进行任何操作并继续扫描。</li>
</ul>
</li>
<li>求出上下文内部“this”的值。</li>
</ul>
</li>
<li>执行代码阶段<ul>
<li>在当前上下文上运行/解释函数代码，并随着代码一行行执行指派变量的值。</li>
</ul>
</li>
</ol>
<p>VO 对应第二阶段，AO 对应第三阶段。</p>
<h3 id="promise-">Promise 的实现</h3>
<pre><code><span class="hljs-keyword">var</span> PENDING = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> FULFILLED = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> REJECTED = <span class="hljs-number">2</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Promise</span></span>{

    <span class="hljs-keyword">constructor</span>(fn){
        <span class="hljs-comment">//promise的状态</span>
        <span class="hljs-keyword">this</span>.state=PENDING; <span class="hljs-comment">//[PENDING,FULFILLED,REJECTED]</span>
        <span class="hljs-comment">//FULFILLED 或者 REJECTED 时的返回值</span>
        <span class="hljs-keyword">this</span>.value=<span class="hljs-literal">null</span>;
        <span class="hljs-comment">//回调函数</span>
        <span class="hljs-keyword">this</span>.handlers=[];
        <span class="hljs-keyword">this</span>.resolve=<span class="hljs-keyword">this</span>.resolve.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.reject=<span class="hljs-keyword">this</span>.reject.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.done=<span class="hljs-keyword">this</span>.done.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.handle=<span class="hljs-keyword">this</span>.handle.bind(<span class="hljs-keyword">this</span>);



        doResolve(fn, <span class="hljs-keyword">this</span>.resolve, <span class="hljs-keyword">this</span>.reject);
    }

    fulfill(value){
        <span class="hljs-keyword">this</span>.state=FULFILLED;
        <span class="hljs-keyword">this</span>.value=value;
        <span class="hljs-comment">//执行回调</span>
        <span class="hljs-keyword">this</span>.handlers.forEach(<span class="hljs-keyword">this</span>.handle)
        <span class="hljs-keyword">this</span>.handlers=<span class="hljs-literal">null</span>
        console.log(<span class="hljs-string">"fulfill: value"</span>,value,<span class="hljs-string">"state"</span>,<span class="hljs-keyword">this</span>.state)
    }

    reject(error){
        <span class="hljs-keyword">this</span>.state=REJECTED;
        <span class="hljs-keyword">this</span>.value=error;
        <span class="hljs-comment">//执行回调</span>
        <span class="hljs-keyword">this</span>.handlers.forEach(<span class="hljs-keyword">this</span>.handle)
        <span class="hljs-keyword">this</span>.handlers=<span class="hljs-literal">null</span>
        console.log(<span class="hljs-string">"reject"</span>,error)
    }

    <span class="hljs-comment">//相当于发布者</span>
    resolve(value){
        console.log(<span class="hljs-string">"in resolve"</span>)
        <span class="hljs-keyword">try</span>{
            <span class="hljs-comment">//若value为 Promise 则返回该 Promise 的 then 方法，即value.then</span>
            <span class="hljs-keyword">var</span> then =getThen(value);
            <span class="hljs-keyword">if</span>(then){
                 console.log(<span class="hljs-string">"value is promise"</span>)
                 <span class="hljs-comment">//若value为promise，递归 resolve 待解析的 Promise</span>
                 doResolve(then.bind(value),<span class="hljs-keyword">this</span>.resolve,<span class="hljs-keyword">this</span>.reject);
                 <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-keyword">this</span>.fulfill(value);
        }<span class="hljs-keyword">catch</span>(e){
            console.log(e)
            <span class="hljs-keyword">this</span>.reject(e);
        }

    }

    <span class="hljs-comment">//观察者接口</span>
    then(onFulfilled, onRejected) {
         const self = <span class="hljs-keyword">this</span>

        <span class="hljs-keyword">return</span> new Promise(function (resolve, reject) {

        <span class="hljs-keyword">return</span> self.done.call(self,function (result) {
          <span class="hljs-keyword">if</span> (typeof onFulfilled === <span class="hljs-string">'function'</span>) {
            <span class="hljs-keyword">try</span> {
              <span class="hljs-keyword">return</span> resolve(onFulfilled(result))
            } <span class="hljs-keyword">catch</span> (ex) {
              <span class="hljs-keyword">return</span> reject(ex)
            }
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> resolve(result)
        }, function (error) {
          <span class="hljs-keyword">if</span> (typeof onRejected === <span class="hljs-string">'function'</span>) {
            <span class="hljs-keyword">try</span> {
              <span class="hljs-keyword">return</span> resolve(onRejected(error))
            } <span class="hljs-keyword">catch</span> (ex) {
              <span class="hljs-keyword">return</span> reject(ex)
            }
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> reject(error)
        })
      })
    }

    <span class="hljs-comment">//观察者接口</span>
    done(onFulfilled, onRejected){
        <span class="hljs-comment">// 保证 done 总是异步执行</span>
        setTimeout(() =&gt;{
            <span class="hljs-keyword">this</span>.handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            })
        }, <span class="hljs-number">0</span>)
    }

     <span class="hljs-comment">// 保证 done 中回调的执行</span>
    handle (handler) {

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state === PENDING) {
          <span class="hljs-keyword">this</span>.handlers.push(handler)
          console.log(<span class="hljs-string">"push to handlers"</span>,<span class="hljs-keyword">this</span>.handlers)
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state === FULFILLED &amp;&amp;
            typeof handler.onFulfilled === <span class="hljs-string">'function'</span>) {
            handler.onFulfilled(<span class="hljs-keyword">this</span>.value)
          }
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state === REJECTED &amp;&amp;
            typeof handler.onRejected === <span class="hljs-string">'function'</span>) {
            handler.onRejected(<span class="hljs-keyword">this</span>.value)
          }
        }
    }

    <span class="hljs-keyword">catch</span>(callback){


    }
}

function getThen(value) {
  <span class="hljs-keyword">var</span> t = typeof value;
  <span class="hljs-keyword">if</span> (value &amp;&amp; (t === <span class="hljs-string">'object'</span> || t === <span class="hljs-string">'function'</span>)) {
    <span class="hljs-keyword">var</span> then = value.then;
    <span class="hljs-keyword">if</span> (typeof then === <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">return</span> then;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

function doResolve(fn, onFulfilled, onRejected) {
  <span class="hljs-keyword">var</span> done = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">try</span> {
    fn(function (value) {
      <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>
      done = <span class="hljs-literal">true</span>
      onFulfilled(value)
    }, function (reason) {
      <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>
      done = <span class="hljs-literal">true</span>
      onRejected(reason)
    })
  } <span class="hljs-keyword">catch</span> (e) {
    console.log(<span class="hljs-string">"doResolve"</span>,e)
    <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">return</span>
    done = <span class="hljs-literal">true</span>
    onRejected(e)
  }
}




p1 =new Promise((resolve,reject)=&gt;{
    console.log(<span class="hljs-string">"1"</span>)
    setTimeout(()=&gt;{
        resolve(<span class="hljs-string">"p1"</span>)
    },<span class="hljs-number">1500</span>)

})


p1.then(res=&gt;{
    console.log(<span class="hljs-string">"res"</span>,res)
    <span class="hljs-keyword">return</span> <span class="hljs-string">"then--res"</span>
})
</code></pre><h3 id="-">闭包</h3>
<p>闭包是即使被外部函数返回，依然可以访问到外部（封闭）函数作用域的函数。</p>
<h3 id="-vs-">事件捕获 vs 事件冒泡</h3>
<ul>
<li>事件冒泡：事件从内层元素开始触发，向外层传播，直到 document。</li>
<li>事件捕获：事件从外层元素（document）开始触发，向内层传播，直到 目标元素（target）。</li>
</ul>
<p>事件冒泡是由微软提出的，而事件捕获是由网景公司提出的，后来 w3c 制定了统一的方案：先捕获再冒泡。</p>
<p>对于当事件捕获和事件冒泡一起存在的情况，事件触发过程如下：</p>
<ol>
<li><p>document 往 target 节点，捕获前进，遇到注册的捕获事件立即触发执行</p>
</li>
<li><p>到达 target 节点，触发事件（对于 target 节点上，是先捕获还是先冒泡则捕获事件和冒泡事件的注册顺序，先注册先执行）</p>
</li>
<li><p>target 节点 往 document 方向，冒泡前进，遇到注册的冒泡事件立即触发</p>
</li>
</ol>
<p>事件捕获与事件冒泡的用用--事件代理</p>
<h3 id="-">服务端渲染</h3>
<p>在后端将数据拼接到 HTML 字符串上发送给客户端，浏览器从服务器接收 HTML 并渲染。服务端渲染的优势:</p>
<ul>
<li>SEO<ul>
<li>爬虫可以抓取页面的关键字等信息</li>
</ul>
</li>
<li>首屏直出<ul>
<li>减少首屏渲染时间</li>
</ul>
</li>
</ul>
<h3 id="-">浮点数知识</h3>
<p>根据国际标准 IEEE 754，任意一个二进制浮点数 V 可以表示成下面的形式：
V=(-1)<sup>s</sup><em>M</em>2<sup>E</sup></p>
<ul>
<li>(-1)^s 表示符号位</li>
<li>表示有效数字，大于等于 1，小于 2</li>
<li>2^E 表示指数位</li>
</ul>
<p>对于 32 位的浮点数，最高的 1 位是符号位 s，接着的 8 位是指数 E，剩下的 23 位为有效数字 M。</p>
<p>Javascript 浮点数运算会先把十进制数转化为二进制数（乘二取整），然而有可能得到无限循环二进制数，然后再进行运算，然后再将结果转化为十进制数返回。</p>
<h3 id="const-let-">const 、let、块级作用域</h3>
<h4 id="-">暂时性死区</h4>
<p>ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。</p>
<p>总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。</p>
<pre><code><span class="hljs-keyword">var</span> tmp = <span class="hljs-number">123</span>;

<span class="hljs-keyword">if</span> (<span class="hljs-literal">true</span>) {
  tmp = <span class="hljs-string">'abc'</span>; <span class="hljs-comment">// ReferenceError</span>
  <span class="hljs-keyword">let</span> tmp;
}
</code></pre><h4 id="-">块级作用域与函数声明</h4>
<p>ES6 规定，块级作用域之中，函数声明语句的行为类似于 let，在块级作用域之外不可引用。但是在 ES6 环境的浏览器（或者 nodejs 环境）可以有自己的行为：</p>
<ul>
<li>允许在块级作用域内声明函数。</li>
<li>函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。</li>
<li>同时，函数声明还会提升到所在的块级作用域的头部。</li>
</ul>
<pre><code><span class="hljs-comment">// 浏览器的 ES6 环境</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am outside!'</span>); }
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> f = <span class="hljs-literal">undefined</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">false</span>) {
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'I am inside!'</span>); }
  }

  f();
}());
</code></pre><p>考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。</p>
<h4 id="const-">const 的本质</h4>
<p>const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const 只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。</p>
<pre><code><span class="hljs-keyword">const</span> foo = {};

<span class="hljs-comment">// 为 foo 添加一个属性，可以成功</span>
foo.<span class="hljs-keyword">prop</span> = 123;
foo.<span class="hljs-keyword">prop</span> <span class="hljs-comment">// 123</span>

<span class="hljs-comment">// 将 foo 指向另一个对象，就会报错</span>
foo = {}; <span class="hljs-comment">// TypeError: "foo" is read-only</span>
</code></pre><h3 id="documentfragment">DocumentFragment</h3>
<p>The DocumentFragment interface represents a minimal document object that has no parent. It is used as a lightweight version of Document that stores a segment of a document structure comprised of nodes just like a standard document. The key difference is that because the document fragment isn&#39;t part of the active document tree structure, changes made to the fragment don&#39;t affect the document, cause reflow, or incur any performance impact that can occur when changes are made.</p>
<p>example:</p>
<pre><code>const fragment = document.createDocumentFragment()<span class="hljs-comment">;</span>
const liItem = document.createElement(<span class="hljs-string">"li"</span>)<span class="hljs-comment">;</span>
liItem.innerText = <span class="hljs-string">"hello"</span><span class="hljs-comment">;</span>
fragment.appendChild(liItem)<span class="hljs-comment">;</span>
document.body.appendChild(fragment)<span class="hljs-comment">;</span>
</code></pre><h3 id="-">同源策咯</h3>
<p>同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。</p>
<p>同源是指：从协议、域名到端口都必须相同。</p>
<p>限制范围包括：</p>
<ul>
<li>Cookie<ul>
<li>Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。</li>
</ul>
</li>
<li><p>iframe</p>
<ul>
<li>如果两个网页不同源，就无法拿到对方的 DOM。</li>
</ul>
</li>
<li><p>AJAX</p>
<ul>
<li>同源政策规定，AJAX 请求只能发给同源的网址，否则就报错。可以使用 JSONP、WebSocket、CORS 等技术解决问题。</li>
</ul>
</li>
</ul>
<h3 id="-">事件循环</h3>
<p>&quot;Event Loop 是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）&quot;</p>
<p>简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为&quot;主线程&quot;；另一个负责主线程与其他进程（主要是各种 I/O 操作）的通信，被称为&quot;Event Loop 线程&quot;（可以译为&quot;消息线程&quot;）。</p>
<p>每当遇到 I/O 的时候，主线程就让 Event Loop 线程去通知相应的 I/O 程序，然后接着往后运行，所以不存在红色的等待时间。等到 I/O 程序完成操作，Event Loop 线程再把结果返回主线程。主线程就调用事先设定的回调函数，完成整个任务。</p>
<p>js 引擎遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当一个异步事件返回结果后，js 会将这个事件加入与当前执行栈不同的另一个队列，我们称之为事件队列。被放入事件队列不会立刻执行其回调，而是等待当前执行栈中的所有任务都执行完毕， 主线程处于闲置状态时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。</p>
<p>当前执行栈执行完毕时会立刻先处理所有微任务队列（Promise）中的事件，然后再去宏任务队列（setTimeout）中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。
<a href="https://zhuanlan.zhihu.com/p/33058983">https://zhuanlan.zhihu.com/p/33058983</a></p>
`


class Index extends Component {
    constructor(props) {
        super(props);
    }
    rawMarkup() {
        return { __html: article };
    }
    render() {
        return <div dangerouslySetInnerHTML={this.rawMarkup()} />;
    }
}

export default Index 