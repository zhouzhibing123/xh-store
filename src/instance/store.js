const { XHError } = require("../utils/throwError")

class XHStore {
    constructor(initInfo) {
        if (!initInfo || !initInfo.state) XHError('请至少传入state参数')
        if (typeof initInfo.state != 'function') XHError('state需要传入一个回调函数')

        this.state = this._observer(initInfo.state())
        this.mutation = initInfo.mutations
        this.action = initInfo.actions
        this.getters = initInfo.getters

        this.callBack = []
    }

    // 建立依赖发放
    _observer(state, deep = true) {
        // 深度监听
        if (deep) {
            Object.keys(state).forEach(key => {
                if (typeof state[key] === 'object') {
                    state[key] = this._observer(state[key])
                }
            })
        }

        return new Proxy(state, {
            set: (target, key, newValue) => {
                target[key] = newValue
                this.send()
            }
        })
    }

    // 触发mutation 
    commit(key, ...payload) {
        if (!this.mutation || !this.mutation[key]) XHError(`mutation ${key}不存在`)
        this.mutation[key].call(this, this.state, ...payload)
    }

    // 触发action 
    dispatch(key, ...payload) {
        if (!this.action || !this.action[key]) XHError(`action ${key}不存在`)

        const { commit, dispatch, state } = this;

        this.action[key].call(this, {
            commit: commit.bind(this),
            dispatch: dispatch.bind(this),
            state
        }, ...payload)
    }

    // 订阅
    subscribe(callBack) {
        if (typeof callBack !== 'function') XHError('subscribe需要传入一个回调函数', 'TypeError')
            // 默认调用一次
        callBack(this.state)
        this.callBack.push(callBack)
    }

    // 发布
    send() {
        this.callBack.forEach(effect => {
            typeof effect === 'function' && effect(this.state)
        })
    }
}

module.exports = {
    XHStore
}