/**
 * 语法分析
 */
const esprima = require('esprima')
const GA = {
    /**
     * while for 循环加入熔断函数
     * @Ahthor: xiaoxi
     * @param {*} code
     */
    addLoopFusing(code) {
        let whiles = []
        // 暂时处理，含有class的代码无法解析AST树
        if (code.includes('class')) return code
        esprima.parseScript(code, {}, function(node, meta) {
            if (node.type == 'WhileStatement' || node.type == 'ForStatement') {
                whiles.push({
                    start: meta.start.offset,
                    end: meta.end.offset
                })
            }
        })
        whiles = whiles.sort((a, b) => { return b.end - a.end })
        for (const w of whiles) {
            console.log(w)
            let pre = code.slice(0, w.end)
            pre = pre.substring(0, pre.length - 1)
            pre = pre + 'cs.fus() }'
            code = pre + code.slice(w.end + 1)
        }
        return code
    }
}
export default GA
