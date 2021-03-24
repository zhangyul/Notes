# vue
### 笔记 [demo](demo/index.html)  
`v-text`可替换`{{}}`,无闪烁问题，但会覆盖元素本身内容    
`v-html`解析html表达式  
`v-bind:`绑定属性，可简写为`: `,`v-bind`中可以写入合法的表达式，只能实现**单向绑定M->V**  
`v-on` 用于绑定事件，可简写为`@`,`@click="function(参数)"`,类似于小程序`bindtap`    
`methods`定义vue实例中可用方法，function中若想拿到data中数据需要通过this.来获取。vue实例会监听自己data的改变，一旦发生改变即可同步到页面中【优点：只需要关心数据，不需要关心页面渲染】  
**事件修饰符**  
- `.stop  @click.stop` 阻止冒泡 `catchtap`
- `.prevent`阻止默认行为
- `.capture`添加监听器时使用捕获模式（先触发外层后触发内层，需要写到外层元素上）
-  `.self`只有事件在该元素本身（比如不是子元素）触发时触发回调 非冒泡、非捕获事件
- `.once`事件只触发一次  

`.self`只阻止自身事件的冒泡,并不会阻止全部冒泡  
`v-mode`双向数据绑定,只适用于表单

**样式绑定**  
- `:class="['','']"` 数组形式
- `:class="[a?'':'']"`在数组中使用三元表达式
- `:class="[{'':a}]"`在数组中使用对象代替三元表达式
- `:class="[{'类名':是否生效}]"`直接使用对象，对象的属性为类名  
** :style **
- `:style="{color:'red'}"` 对象
- `:style="[{color:'red',...},{color:'green',... }]"` 数组


`v-for key` 迭代数组类似`wx:for wx:key`  
``` html
<ul id="example-1">
  <li v-for="(别名,index) in 源数据数组(也可以是一个方法)" :key="index">
    {{ 别名.message }}
  </li>
</ul>

<view wx:for="源数据数组" wx:for-item="别名" wx:key="index" wx:for-index="index"> 
    {{ 别名.message }}
</view>
```
`v-if v-else v-else-if` 条件渲染类似 `wx:if wx:else wx:elif`每次都会重新删除或创建元素     
`v-show`根据条件展示元素的选项,不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换 display：none
> `v-show` 不支持 `<template>` 元素，也不支持 `v-else `    
  
若元素涉及到频繁切换不建议使用`v-show`,若元素永远不会被显示则推荐使用`v-if`   

**过滤器**  
可被用于一些**常见的文本格式化**。过滤器可以用在两个地方：**双花括号插值**和 **v-bind** 表达式，过滤器可以多次调用，从左往右依次执行，返回最终结果    
```js
{{ value | capitalize(a,b) | test }}
// <div v-bind:id="value | capitalize"></div>
// 全局定义
Vue.filter('capitalize', function (value,a,b) {
    return value + "123";
}
Vue.filter('test', function (value) {
    return value + "123";
}
// 私有过滤器
new Vue({
    filters:{
        test:function(){}
    }
})
// 过滤器采用就近原则，若全局过滤器和私有过滤器名称一致，优先调用私有过滤器
```
#### [v-cloak](demo/v-cloak.html)  
这个指令保持在元素上直到关联实例结束编译。和 CSS 规则[v-cloak] { display: none } ，可以防止页面闪烁。 

#### 自定义按键修饰符
```js
Vue.config.keyCodes.f2=113;
@keyup.f2=""
@keyup.113=""
// 均为操作f2触发的事件
```
#### 全局指令
vue中所有指令都以`v-指令名称`调用  
```js
// 全局的指令
Vue.directive(指令名称,{}="指令相关函数，可以在特定阶段，指定相关操作")
Vue.directive('focus', {
    // 指令绑定到元素上，只会执行一次
    bind:functin(el,binding){
        // 样式的初始化 
    },
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        //  和js相关的操作，防止js行为失效
        // 聚焦元素，el是DOM对象
        el.focus()
     },
    // VNode更新时，会触发多次
    update:functin(){},
})
// 私有指令
new Vue({
    directives:{
        test:function(){}
    }
})

// 简写
Vue.directive('focus', {
    bind:functin(el,binding){},
    update:functin(){},
});
// 在bind和update上做重复工作
Vue.directive('focus', function(){})
```

#### 生命周期  
![](https://cn.vuejs.org/images/lifecycle.png)  
`beforeCreate(){}`实例还未创建此时，data和methods还未被初始化  
`created(){}`data和methods已被初始化  
`beforeMount`之前`created`后，开始编译模版，执行vue中代码，最终在内存中形成一个编译好的模版字符串，将模版渲染渲染为内存中的DOM，并未挂在到页面中    
`beforeMount(){}`模版已经在内存中编译完成，但并未渲染到页面中，页面中元素还未替换，只是模版字符串  
`mounted(){}`将模版挂载到页面中，页面已渲染完成,操作DOM最早在这里操作。此时组件已脱离创建阶段，进入到运行阶段      
当数据发生改变执行`beforeUpdate`和`updated`  
`beforeUpdate(){}`数据为最新数据，页面未渲染  
`updated(){}`页面已渲染为最新数据    
`beforeDestory(){}`还未进入销毁状态，所有数据函数等均可用  
`destoryed`所有组件和数据等均已销毁

#### vue中数据请求 vue-resource 
`this.$http.get`

#### vue 组件
组件指向的模版必须包含在一个标签中  
1. `Vue.extend`创建全局组件 
   ```js
   var 组件模版对象 = Vue.extend({
       template:'<h3>组件模版</h3>',
       // 组件可以有自己data，但必须为一个返回对象的方法，使用和实例中的使用方法相同
       data:function(){
           return {};
       }，
       methods:{
           // 组件方法
           a(){}
       }
   })
   Vue.component(组件名称,组件模版对象);
   // 引用组件,若组件名称驼峰命名需要用，大写字母换为-小写字母
   <组件名称></组件名称>
   ```
2. `Vue.component`创建全局组件 
   ```js
    Vue.component(组件名称,{
       template:'<h3>组件模版</h3>'
   });
    // 引用组件,若组件名称驼峰命名需要用，大写字母换为-小写字母
   <组件名称></组件名称>
   ```
3. 通过`<template>`在外部定义，创建全局组件  
   ```html
   <div id="app"></div>
   <!-- 在控制器之外定义template -->
   <template id="tmp"></template>
    <script>
        Vue.component(组件名称,{
            template:'#tmp'
        });
    </script>
   ```
4. 在`component(){}`创建局部组件  
   ```js
   new Vue({
       components(){
           a:{
               template:'<h3>私有组件</h3>'
           },
           b:{
              template:'#tmp'
           }
       }
    })    
   ```  
组件切换  
1. 使用`v-if` `v-else`
2. `<component :is="'组件名称'"></component>` component为占位符   

父组件向子组件传值，方法  
1. 引用子组件时通过属性绑定传值`v-bind:`
2. 通过事件绑定机制为子组件传递方法`v-on`
   ```html
   <script>
   var a = Vue.extend({
       template:'<h3>{{data}}</h3>',
       // 组件可以有自己data，但必须为一个返回对象的方法，使用和实例中的使用方法相同
       data:function(){
           return {};
       }，
       methods:{
           // 组件方法
           myFun(){
               // 调用父组件传递进来的方法，emit为触发，类似小程序this.triggerEvent()
               this.$emit('func','传参1','传参2',...);
           }
       },
       // 接收父组件传值 
       props:['data']
   })
   Vue.component(test,a);
   </script>
   <test v-bind:data='message' v-on:func="show"></test>
   ```

使用ref获取DOM`this.$efs.`   

#### 路由
```html
<div id="app">
    <!-- 去往指定页面 Link -->
    <router-link to="/" tag="渲染的标签，默认为a">home</router-link>
    <!-- 将路由规则匹配到的组件展示到页面中 -->
    <router-view></router-view>
</div>
 <script>
    // 创建路由对象
    var routerObj = new VueRouter({
        // 路由匹配规则,routes多个匹配规则
        routes: [
            {
                path: "监听路由链接地址",
                redirect: "/链接"
                // 重定向到指定hash
            },
            {
                path: "监听路由链接地址",
                component: "展示页面"
            }
        ],
        linkActiveClass: "链接激活时class类名"
    })
    var vue = new Vue({
        // 将路由规则注册到vm实例上
        router: routerObj
    })
</script>
```
路由规则中定义参数  
get 方法传参不需要修改 path 属性,通过`this.$route.query`获取参数   
params 方式传参 path 中定义/:参数名,通过`this.$route.params`获取参数

```js
    new Vue({
        render:function(createElements){// createElements function,将指定模版渲染成html
           return (createElements('组件模版'))
           // return 替换容器
        }
    })
```