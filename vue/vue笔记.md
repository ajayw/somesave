原blog：http://blog.csdn.net/fungleo/article/details/77575077
个人在Windows下修改总结得：
一、
1.安装node.js
2.安装Vue-cli 脚手架工具
npm install -g vue-cli
查看Vue版本  vue -V（大V）
3.创建项目（名为vue-blogs-cnodejs）
vue init webpack vue-blogs-cnodejs
cd vue-blogs-cnodejs
npm install (可以镜像全局安装cnpm再'cnpm install'：npm install -g cnpm --registry=https://registry.npm.taobao.org)
npm run dev
二、
1.vue-blogs-cnodejs项目建立如下目录
├── README.md                       // 项目说明文档
├── node_modules                    // 项目依赖包文件夹
├── build                           // 编译配置文件，一般不用管
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config                          // 项目基本设置文件夹
│   ├── dev.env.js              // 开发配置文件
│   ├── index.js                    // 配置主文件
│   └── prod.env.js             // 编译配置文件
├── index.html                      // 项目入口文件
├── package-lock.json           // npm5 新增文件，优化性能
├── package.json                    // 项目依赖包配置文件
├── src                             // 我们的项目的源码编写文件
│   ├── App.vue                 // APP入口文件
│   ├── assets                      // 初始项目资源目录，回头删掉
│   │   └── logo.png
│   ├── components              // 组件目录
│   │   └── Hello.vue           // 测试组件，回头删除
│   ├── main.js                 // 主配置文件
│   └── router                      // 路由配置文件夹
│       └── index.js            // 路由配置文件
└── static                          // 资源放置目录

2.配置src目录
├── App.vue                         // APP入口文件
├── api                             // 接口调用工具文件夹
│   └── index.js                    // 接口调用工具
├── components                      // 组件文件夹，目前为空
├── config                          // 项目配置文件夹
│   └── index.js                    // 项目配置文件
├── frame                           // 子路由文件夹
│   └── frame.vue                   // 默认子路由文件
├── main.js                         // 项目配置文件
├── page                                // 我们的页面组件文件夹
│   ├── content.vue             // 准备些 cnodejs 的内容页面
│   └── index.vue                   // 准备些 cnodejs 的列表页面
├── router                          // 路由配置文件夹
│   └── index.js                    // 路由配置文件
├── style                           // scss 样式存放目录
│   ├── base                        // 基础样式存放目录
│   │   ├── _base.scss          // 基础样式文件
│   │   ├── _color.scss     // 项目颜色配置变量文件
│   │   ├── _mixin.scss     // scss 混入文件
│   │   └── _reset.scss     // 浏览器初始化文件
│   ├── scss                        // 页面样式文件夹
│   │   ├── _content.scss       // 内容页面样式文件
│   │   └── _index.scss     // 列表样式文件
│   └── style.scss              // 主样式文件
└── utils                           // 常用工具文件夹
    └── index.js                    // 常用工具文件

3.配置static目录
├── css             // 放一些第三方的样式文件
├── font                // 放字体图标文件
├── image           // 放图片文件，如果是复杂项目，可以在这里面再分门别类
└── js              // 放一些第三方的JS文件，如 jquery
三、
1.调整App.vue文件
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "./style/style.scss";
</style>
scss 中，引用文件，是可以省略 .scss 这个后缀名的。 
并且，我们某个不用编译成 css 的文件，我们给文件命名为 _xxx.scss 其中，文件名前缀的下划线，也是可以省略的。

2.使用scss文件预编译，安装scss和npm包
vue-blogs-cnodejs下输入命令,需要翻墙就用cnpm install sass..
npm install node-sass -D
npm install sass-loader -D

3.给page中文件添加内容
index.vue

<template>
  <div>index page</div>
</template>

content.vue

<template>
  <div>content page</div>
</template>

4.调整router路由文件，将默认的js改为
import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    }, {
      path: '/content/:id',
      component: Content
    }
  ]
})

5.执行项目
npm run dev

四、vue 本身是不支持 ajax 接口请求的，所以我们需要安装一个接口请求的 npm 包，来使我们的项目拥有这个功能。
1.封装axios工具，编辑src/api/index.js文件
npm install axios -D

2.src/api/index.js添加内容
// 配置API接口地址
var root = 'https://cnodejs.org/api/v1'
// 引用axios
var axios = require('axios')
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  })
  .then(function (res) {
    if (res.data.success === true) {
      if (success) {
        success(res.data)
      }
    } else {
      if (failure) {
        failure(res.data)
      } else {
        window.alert('error: ' + JSON.stringify(res.data))
      }
    }
  })
  .catch(function (err) {
    let res = err.response
    if (err) {
      window.alert('api error, HTTP CODE: ' + res.status)
      return //报错，添加res后正常，即return res
    }
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}

2.调整main.js绑定api/index.js文件
添加内容：
// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

3.修改src/page/index.vue文件，测试调通
添加内容：
<script>
export default {
  created () {
    this.$api.get('topics', null, r => {
      console.log(r)
    })
  }
}
</script>
//这里是调用 cnodejs.org 的 topics 列表接口，并且将结果打印出来。

五、
1.配置webpack将接口代理到本地，打开浏览器限制，实现跨域请求
打开config/index.js文件找到‘proxyTable: {}’, 这一行，就是给我们配置代理的，调整为：
proxyTable: {
  '/api/v1/**': {
    target: 'https://cnodejs.org', // 你接口的域名
    secure: false,
    changeOrigin: false,
  }
}
（如果我们采用这种代理模式，那么就没有必要那么做了。因为我们的系统放到生产环境的时候，一般是没有这个跨域问题的。这个问题一般仅仅是存在于我们的开发环境下面。cnodejs.org 的这套接口是没有跨域问题的，也就是说，本来我们是不需要代理到本地的。但是我们在实际的工作开发中，接口基本上是有跨域问题的，所以我们需要利用代理的方式来解决问题。）

2.重新配置src/api/index.js文件
// 配置API接口地址
var root = '/api/v1'
重启项目npm run dev

3.我们打开浏览器控制台，切换到 network 选项卡中，选中我们调用的接口 topics 接口，我们可以清晰的看到，我们读取的接口地址是我们的本地代理过来的地址。
状态码为 304 代表这个数据没有发生变化，直接读取本地缓存了
我们再看一下数据是不是正常的过来了。切换到 Previdw 选项卡查看：

六、正式开发代码
1.认识*.vue文件
*.vue 文件，是一个自定义的文件类型，用类 HTML 语法描述一个 Vue 组件。每个 .vue文件包含三种类型的顶级语言块 <template>, <script> 和 <style>。这三个部分分别代表了 html,js,css。//</script>

2.常见vue文件结构
<template>
  <div>
    <Header></Header>
    <div class="article_list">
      <ul>
        <li></li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
export default {
  components: { Header, Footer },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('topics', null, r => {
        console.log(r)
      })
    }
  }
}
</script>
<style>
  .article_list {margin: auto;}
</style>

3.template
我们不是说把代码包裹在 <template></template> 中就可以了，而是必须在里面方式一个 html 标签来包裹所有的代码。 本例子中，我们采用了 <div></div> 标签。
我们在其他地方写好了一个组件，比如：<Header></Header>、<Footer></Footer>然后就可以用这种方式引入进来。

4.script
我们需要两个自定义组件，我们先引用进来。如下格式，比较好理解吧。
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'

除了引用的文件，我们将所有的代码包裹于如下的代码中间：

export default {
  // 这里写你的代码，外面要包起来。
}

好，我们再说说这里面的内容。

  components: { Header, Footer },
如上，我们先引入了 Header 和 Footer 这两个组件的源文件，这里，我们要把引用的组件给申明到 components 里面去。这样，我们就可以在 template 里面使用了。

  data () {
    return {
      list: []
    }
  },

这里，是我们的数据。我们的演示代码，给了一个 list 的空数组数据。在 template 中，我们可以使用 this.list 来使用我们的数据。这个我们后面的文章中会讲到，这里不去深入，认识它就可以了。

  created () {
    this.getData()
  },

这里，表示当我们的组件加载完成时，需要执行的内容。比如这里，我们就让组件在加载完成时，执行一个叫 this.getData() 的函数。

  methods: {
    getData () {
      this.$api.get('topics', null, r => {
        console.log(r)
      })
    }
  }

这里，是我们的这个组件的方法，也可以说是函数。比如，上面的代码就表示，我们的组件自定义了一个叫 getData() 的方法函数。

5.style
<style>
  .article_list {margin: auto;}
</style>
就是给我们的 .article_list 元素随便加了一个样式。

七、尝试渲染列表
1.制作header.vue 和 footer.vue组件文件
当时保留了一个 components 的空文件夹，其实就是准备放我们的自定义组件的。
先创建header.vue 和 footer.vue文件、
header.vue
<template>
  <header class="header">
    <h1 class="logo">Vue demo by FungLeo</h1>
  </header>
</template>

footer.vue
<template>
  <footer class="copy">
    Copy &copy; FungLeo
  </footer>
</template>

2.编写src/page/index.vue文件,覆盖原文件
<template>
  <div>
    <Header></Header>
    <div class="article_list">
      <ul>
        <li v-for="i in list">
          <time v-text="i.create_at"></time>
          <router-link :to="'/content/' + i.id">
          //router-link 是 VueRouter2 “声明式导航”的写法，在实际转换为 html 标签的时候，会转化为 <a></a>
            {{ i.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
export default {
  components: { Header, Footer },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('topics', null, r => {
        this.list = r.data
      })
      //相当于
      var v = this
      v.$api.get('topics', null, function (r) {
        v.list = r.data
      })
      //我们从接口拿到了 r.data 的数据，让我们自己定义的 this.list 等于这个数据，然后我们在模板中就可以用 list 进行渲染了
    }
  }
}
</script>

3.写一个公用的时间处理工具函数，将标准时间处理后再渲染出来
直接在 getData () {...} 后面再写一个方法即可，独立写一个方法，然后在所有地方都可以使用。
这里用上src/utils/index.js这个文件，直接添加如下，然后必须在main.js中绑定：
export default {
  goodTime (str) {
    let now = new Date().getTime()
    let oldTime = new Date(str).getTime()
    let difference = now - oldTime
    let result = ''
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let year = month * 12
    let _year = difference / year
    let _month = difference / month
    let _week = difference / (7 * day)
    let _day = difference / day
    let _hour = difference / hour
    let _min = difference / minute

    if (_year >= 1) {
      result = '发表于 ' + ~~(_year) + ' 年前'
    } else if (_month >= 1) {
      result = '发表于 ' + ~~(_month) + ' 个月前'
    } else if (_week >= 1) {
      result = '发表于 ' + ~~(_week) + ' 周前'
    } else if (_day >= 1) {
      result = '发表于 ' + ~~(_day) + ' 天前'
    } else if (_hour >= 1) {
      result = '发表于 ' + ~~(_hour) + ' 个小时前'
    } else if (_min >= 1) {
      result = '发表于 ' + ~~(_min) + ' 分钟前'
    } else {
      result = '刚刚'
    }
    return result
  }
}

在main.js中绑定，即添加：（！！！特别注意：import语句代码统一放到最前，绑定全局操作放到import之后，否则报错）

// 引用工具文件
import utils from './utils/index.js'
// 将工具方法绑定到全局
Vue.prototype.$utils = utils、

再修改index.vue代码
<time v-text="$utils.goodTime(i.create_at)"></time>

八、编写内容详细页面
1.这边把代码写进 src/page/content.vue 文件。
<template>
  <div>
    <myHeader></myHeader>
    <h2 v-text="dat.title"></h2>
    <p>作者：{{dat.author.loginname}}　　发表于：{{$utils.goodTime(dat.create_at)}}</p>
    <hr>
    <article v-html="dat.content"></article>
    <h3>网友回复：</h3>
    <ul>
      <li v-for="i in dat.replies">
        <p>评论者：{{i.author.loginname}}　　评论于：{{$utils.goodTime(i.create_at)}}</p>
        <article v-html="i.content"></article>
      </li>
    </ul>
    <myFooter></myFooter>
  </div>
</template>
<script>
import myHeader from '../components/header.vue'
import myFooter from '../components/footer.vue'
export default {
  components: { myHeader, myFooter },
  data () {
    return {
      id: this.$route.params.id,
      dat: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('topic/' + this.id, null, r => {
        this.dat = r.data
      })
      //我们的请求的接口地址是根据 id 进行变化的。所以，我这边采用了字符串拼接的方法，'topic/' + this.id 来得到我们真正想要请求的接口数据。
    }
  }
}
</script>

2.说明
HTML部分
用自定义标签<myheader></myheader>代替<header></header>

script部分
$route.params.id中的id是vuerouter的早为我们做好的解决方法，打印：
console.log(this.$route)

九、打包项目
1.进入项目位置vue-blogs-cnodejs
2.运行打包：npm run build，文件打包位置于项目目录里面的 dist 文件夹内。
3.打包之后会生成.map大文件，去掉这些文件：编辑 /config/index.js 文件中
productionSourceMap: true,
修改为：
productionSourceMap: false,
重新打包：npm run build

4.打包出来的文件，tip告诉我们，必须在 http 服务中运行，否则，不会工作。
你或许已经到 apache 里面去进行配置去了，但不用那么麻烦，我们有 nodejs 环境，只要全局安装一个 http-server 服务就好了呀。
进入 dist 文件夹，cd dist,然后启动一个 http 服务，来看看可以不可以访问。

显示-bash: http-server: command not found 错误，因为nodejs 的程序执行路径，没有添加到环境变量中去。
根据自己安装路径（从安装http服务命令行link看，link/usr/local/Cellar/node/7.6.0/bin/http-server...）：
echo 'export PATH="$PATH:/usr/local/Cellar/node/7.6.0/bin/"' >> ~/.bash_profile 
. ~/.bash_profile
也可以直接编辑 ~/.bash_profile 文件，把上面命令中的单引号里面的内容插入到文件最后面，然后执行第二个命令生效。

cd dist
http-server -p 3000
在浏览器中输入 http://127.0.0.1:3000 就应该可以访问了。

当然，会报错，说是接口找不到，404错误。
因为示例的接口的问题。实际开发你还要按照我的这个做。只不过，最终代码放到真实的服务器环境去和后端接口在一个 http 服务下面的话，就不存在这个问题了。

5.将项目打包到子目录
编辑config/index.js文件，找到：
assetsPublicPath:'/',
把'/'修改为相应子目录，这里为/dist/目录，
assetsPublicPath:'/dist/',
重新运行打包，npm run build

进入dist目录，npm run dev 开启http服务，查看URL：
localhost：8080/#/变成了localhost:8080/dist/#/

关于项目打包时，图片等资源的处理，请查看博文 http://blog.csdn.net/fungleo/article/details/77799057

十、结合jQuery
1.下载 jQuery 文件到我们的 /static/js/ 目录。
2.然后，在 /src/main.js 合适位置插入下面的代码：
// import 'jquery'
import '../static/js/jquery-1.8.3.js'

虽然引用了 jQuery 但是你真正去写的时候，会报这个错误。我们首先需要关闭掉这个错误。
我们编辑 /.eslintrc.js 文件
env: {
    browser: true,
    jquery: true
  },
重新跑一下系统 npm run dev 就应该可以看到我们想要的效果了。


最后忠告：
用Linux系统或黑苹果！
