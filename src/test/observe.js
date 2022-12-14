// 测试用例

// 发布监听（如果需要让所有修改state的操作全部进行响应式，则需要使用这个）
// 但是如果全部打开，则会造成无论何种方式都会引起依赖发放，这样做的话在某些情况
// 下会使逻辑没有达到预想效果
function observer(state) {
    state = new Proxy(state, {
        set: (target, key, newValue) => {
            target[key] = newValue
            this.send(this.callBack)
        }
    })
    return state;
}