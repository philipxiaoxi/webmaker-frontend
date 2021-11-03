import { vue2Templete, vue3Templete, elementPlus, elementUi, html5 } from './h5Template'

export default {
    getProposals(monaco) {
        return [
            {
                label: 'html:5',
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: 'html5模板',
                insertText: html5
            },
            {
                label: 'vue2-templete',
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: 'vue2模板',
                insertText: vue2Templete
            },
            {
                label: 'vue3-templete',
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: 'vue3模板',
                insertText: vue3Templete
            },
            {
                label: 'vue3-elementPlus',
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: 'vue3-elementPlus模板',
                insertText: elementPlus
            },
            {
                label: 'vue2-elementUi',
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: 'vue3-elementUi模板',
                insertText: elementUi
            }
        ]
    }
}
