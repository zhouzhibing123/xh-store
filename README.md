# xh-store

#### 前言：xh-store主要用于数据共享，可以用于不同模块之间的数据共享

- install 

  ```
  npm install xh-store
  yarn add xh-store
  ```

- Useing

  1. 使用import或者require引入XHcreateStore

     ```javascript
     import { XHcreateStore } from 'xh-store'
     ```

  2. 创建一个store实例

     ```javascript
     const store = XHcreateStore({
         state(){
             return {
                 ...
             }
         },
         mutations:{
             ...
         },
         action:{
             ...
         }
     })
     ```

  3. 如何在实际开发中使用？

     ```javascript
     /// store.js
     const store = XHcreateStore({
         state(){
             return {
                 age: 15
             }
         },
         mutations:{
             setAge(state,payload){
                 state.age = payload
             }
         },
         action:{
             setAge({ state,commit,dispatch },payload){
                 setTimeout(function(){    
                 	// 情况一：
                 	state.age = payload;
                 	// 情况二，调用mutation修改（推荐）
                 	commit('setAge',payload)
                     
                     // 如果需要调用其他action 
                     dispatch('xxx',参数)
                 },1000)
             }
         }
     })
     export default store
     ```

     ```javascript 
     // index.js
     import store from 'store.js'
     // 获取state
     console.log(store.state.age)
     // 调用mutation
     store.commit('setAge',20)
     // 调用action
     store.dispatch('setAge',30)
     ```

  4. 如何实现响应式？

     我们在实际开发中，时常会需要状态管理中心有一个可以将数据变化响应到各个页面或者依赖的需求，就像常见的Vuex一样，但是由于Vuex和vue的响应式系统依赖性非常大，也导致Vuex无法像redux一样脱离父结构而单独存在且可以被使用，xh-store库虽然并没有实现像vue一样的庞大的响应式系统（也实现不了），但是它结合了vue收集依赖的思想与redux的subscribe订阅发布者模式完成了几乎相同的需求，如下：

     ```javascript
     // index.js
     // 和上面的案例一样，如果我们这样写，是不会有响应式的
     console.log(store.state.age)
     // 使用subscribe
     // 当store中的数据，也就是state发生变化的时候，传入的回调会被执行，并且参数为最新的state
     store.subscribe(state=>{
         console.log(state)
     })
     ```

     ​