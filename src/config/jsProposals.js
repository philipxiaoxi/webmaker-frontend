export default {
    getProposals(monaco) {
        return [
            {
                label: 'cs.setExample',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: 'cs判题系统：设置输入输出的用例',
                insertText: 'cs.setExample([\n\t{ key: \'\', value: \'\' },\n])'
            },
            {
                label: 'cs.runCode',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: 'cs判题系统：用户的解答过程函数',
                insertText: 'cs.runCode=(key)=>{\n\treturn key\n}'
            },
            {
                label: 'cs.judge',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: 'cs判题系统：执行判断题目是否正确',
                insertText: 'cs.judge()'
            },
            {
                label: 'cs.setLogContainerFontSize',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: 'cs控制台设置字体大小',
                insertText: 'cs.setLogContainerFontSize(\'20px\')'
            },
            {
                label: 'cs.setStyle',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: 'cs控制台设置黑暗模式',
                insertText: 'cs.setStyle(\'black\')'
            },
            {
                label: 'cs.dynamicLoadCss',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: '动态加载css文件',
                insertText: 'cs.dynamicLoadCss(url)'
            },
            {
                label: 'cs.dynamicLoadJs',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: '动态加载js文件',
                insertText: 'cs.dynamicLoadJs(url)'
            },
            {
                label: 'cs.fus',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: '熔断器，当循环出现死循环时执行熔断',
                insertText: 'cs.fus() // 当循环出现死循环时执行熔断'
            },
            {
                label: 'mjt',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: '彩蛋：涛哥-https://blog.xiaotao233.top/',
                insertText: '/**\n* 欢迎访问涛哥的博客\n* https://blog.xiaotao233.top/\n*/\n'
            }
        ]
    }
}
