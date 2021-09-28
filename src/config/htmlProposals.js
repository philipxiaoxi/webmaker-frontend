import { html5 } from './h5Template'

export default {
    getProposals(monaco) {
        return [
            {
                label: 'html:5',
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: 'html5模板',
                insertText: html5
            }
        ]
    }
}
