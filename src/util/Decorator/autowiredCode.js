const autowiredCode =
`
/**
 * WebMaker 自动注入预设函数
 * 2021-11-08
 */
Autowired = {
    // 格式化时间
    dateFormater(formater, time) {
        if(formater==null) {
            return new Date()
        }
        let date = time ? new Date(time) : new Date(),
        Y = date.getFullYear() + '',
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    return formater.replace(/YYYY|yyyy/g, Y)
        .replace(/YY|yy/g, Y.substr(2, 2))
        .replace(/MM/g,(M<10 ? '0' : '') + M)
        .replace(/DD/g,(D<10 ? '0' : '') + D)
        .replace(/HH|hh/g,(H<10 ? '0' : '') + H)
        .replace(/mm/g,(m<10 ? '0' : '') + m)
        .replace(/ss/g,(s<10 ? '0' : '') + s)
    },
    // 洗牌算法
    arrScrambling(arr){
        let len = arr.length
        while(len){
            let idx = parseInt(Math.random()*len)
            temp = arr[len - 1]
            arr[len - 1] = arr[idx]
            arr[idx] = temp
            len--
        }
        return arr
    },
    // 数组扁平化
    arrFlatten(arr) {
        while(arr.some(item=>Array.isArray(item))) {
            arr = [].concat(...arr)
        }
        return arr
    },
    // 金钱大写(中文)
    digitUppercase(n) {
        const fraction = ['角', '分']
        const digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ]
        const unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ]
        n = Math.abs(n)
        let s = ''
        for (let i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
        }
        s = s || '整'
        n = Math.floor(n);
        for (let i = 0; i < unit[0].length && n > 0; i++) {
            let p = '';
            for (let j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
        }
        return s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整')
    },
    // 获取url参数
    getParams(url) {
        let str = url.split("?")[1]
        let params = str.split("&")
        let data = []
        for(let temp of params) {
            let item = temp.split("=")
            let obj = {}
            obj[item[0]] = item[1]
            data.push(obj)
        }
        return data
    },
    // 随机字符串
    randomString(len) {
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
        let strLen = chars.length
        let randomStr = ''
        for (let i = 0; i < len; i++) {
            randomStr += chars.charAt(Math.floor(Math.random() * strLen))
        }
        return randomStr
    },
    // 获取指定随机数
    randomNum (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}`

module.exports = autowiredCode
