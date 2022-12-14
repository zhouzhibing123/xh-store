/*
 * @Author: ZhouZhiBing123 3030639099@QQ.COM
 * @Date: 2022-12-14 16:53:34
 * @LastEditors: ZhouZhiBing123 3030639099@QQ.COM
 * @LastEditTime: 2022-12-14 16:53:42
 * @FilePath: \xh-store\src\scripts\createStore.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const { XHStore } = require("../instance/store")

function XHcreateStore(initInfo) {
    return new XHStore(initInfo)
}

module.exports = {
    XHcreateStore
}