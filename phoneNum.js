let phoneNum = '18812345678'
// 使用正则分组，第一第二组保持不变，中间用****替代
let newPhoneNum = phoneNum.replace(
    /(\d{3})\d{4}(\d{4})/,
    '$1****$2'
)
console.log(newPhoneNum)
