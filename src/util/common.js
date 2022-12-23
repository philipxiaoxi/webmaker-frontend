const common = {
    copy(value) {
        const oInput = document.createElement('input')
        oInput.value = value
        document.body.appendChild(oInput)
        oInput.select()
        document.execCommand('copy')
        oInput.remove()
        return true
    },
    debounce(fn, delay) {
        let timer = null
        return () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn()
            }, delay)
        }
    },
    getIconClassName(fileName) {
        const className = 'icon-file'
        const type = fileName.split('.')[1]
        const iconMap = {
            ts: 'icon-typescript',
            js: 'icon-javascript',
            html: 'icon-html',
            css: 'icon-css',
            json: 'icon-json',
            jpg: 'icon-image',
            jpeg: 'icon-image',
            png: 'icon-image',
            gif: 'icon-image'
        }
        return `iconfont ${iconMap[type] || className}`
    }
}
module.exports = common
