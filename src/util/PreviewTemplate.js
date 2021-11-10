import Decorator from '../util/Decorator'
import GA from '../util/GrammarAnalysis'
import API from '../api/'
function makeJsPreview(script) {
    // 循环添加熔断函数
    script = GA.addLoopFusing(script)
    // 注解式注入转换器
    script = Decorator.autowired.transform(script)
    const code = `
        <head>
        <link href="${window.location.origin}/css/webMakerPreviewUtils.css" rel="stylesheet" type="text/css" />
        </head>
        <body>
            <div id='124106_codeshare_utils_c'></div>
        </body>
        <script src="${window.location.origin}/js/webMakerPreviewUtils.js"></script>
        <script>
            const cs = new Cs(document.getElementById('124106_codeshare_utils_c'), true , 13)
        </script>
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

function makeHtmlPreview(script, itemId) {
    const code = `
        <base href="${API.getServer()}common/getSnippetProjectFile/${itemId}/" />
        <link href="${window.location.origin}/css/webMakerPreviewUtils.css" rel="stylesheet" type="text/css" />
        <div id='124106_codeshare_utils_c'></div>
        <script src="${window.location.origin}/js/webMakerPreviewUtils.js"></script>
        <script>
            const cs = new Cs(document.getElementById('124106_codeshare_utils_c'), false, 8)
        </script>
        ${script}
    `
    return code
}

const PreviewTemplate = {
    makeJsPreview: makeJsPreview,
    makeHtmlPreview: makeHtmlPreview
}

export default PreviewTemplate
