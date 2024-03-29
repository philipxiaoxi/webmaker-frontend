import Decorator from '../util/Decorator'
import GA from '../util/GrammarAnalysis'
import API from '../api/'

const MARKDOWN_CSS = `
<link href="${window.location.origin}/css/markdown.css" rel="stylesheet" type="text/css" />
`
const PREVIEW_UTILS_CSS = `
<link href="${window.location.origin}/css/webMakerPreviewUtils.css" rel="stylesheet" type="text/css" />
`

function getCss(markdown = false) {
    return `
<head>
${PREVIEW_UTILS_CSS}
${markdown ? MARKDOWN_CSS : ''}
</head>
    `
}

// ${isMarkDown ? `< link rel="stylesheet" src="${window.location.origin}/css/markdown.css" >` : ''}

function getPreviewUTtilsJs(selfShow = true, lineOffset = 0) {
    return `
    <script src="${window.location.origin}/js/webMakerPreviewUtils.js"></script>
    <script>
    try { window.cs = new Cs(document.getElementById('124106_codeshare_utils_c'), ${selfShow} , ${lineOffset}) } catch (e) { console.log('离线模式，资源加载错误，输出信息无法为你捕获。') }
    </script>
    `
}

function makeJsPreview(script) {
    // 循环添加熔断函数
    script = GA.addLoopFusing(script)
    // 注解式注入转换器
    script = Decorator.autowired.transform(script)
    const code = `
        ${getCss()}
        <body>
            <div id='124106_codeshare_utils_c'></div>
        </body>
        ${getPreviewUTtilsJs(true, 18)}
        <script>
            let xiaoxiUtils_preview_1241060595_start = window.performance.now()
            ${script}
            let xiaoxiUtils_preview_1241060595_end = window.performance.now()
            window.time = xiaoxiUtils_preview_1241060595_end - xiaoxiUtils_preview_1241060595_start
            document.getElementById('cs_console_container_time').innerText = '代码耗时'+ time + 'ms'
        </script>
    `
    return code
}

function makeHtmlPreview(script, itemId, isMarkDown = false) {
    const code = `
        ${getCss(isMarkDown)}
        <base href="${API.getServer()}common/getSnippetProjectFile/${itemId}/" />
        <div id='124106_codeshare_utils_c'></div>
        ${getPreviewUTtilsJs(false, 14)}
        ${script}
    `
    return code
}

const PreviewTemplate = {
    makeJsPreview: makeJsPreview,
    makeHtmlPreview: makeHtmlPreview
}

export default PreviewTemplate
