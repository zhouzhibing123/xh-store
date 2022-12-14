/*
 * @Author: ZhouZhiBing123 3030639099@QQ.COM
 * @Date: 2022-12-14 19:00:24
 * @LastEditors: ZhouZhiBing123 3030639099@QQ.COM
 * @LastEditTime: 2022-12-14 19:01:33
 * @FilePath: \xh-store\src\utils\throwError.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * 
 */

function XHError(message, type = '') {
    if (type === 'TypeError') throw new TypeError(message)
    throw new Error(message)
}

module.exports = {
    XHError
}