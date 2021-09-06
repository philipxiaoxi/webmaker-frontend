module.exports = {
    base: '/doc/',
    title: 'Hello CodeShare',
    description: '代码分享中心',
    themeConfig: {
        sidebar: [
            {
                title: 'Guide',   // 必要的
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    ['/guide/Intro', 'CodeShare介绍'],
                    ['/guide/CodeSquare', '片段广场'],
                    ['/guide/Editor', '代码编辑器']
                ]
            },
            {
                title: 'Dev',
                children: [
                    ['/dev/Intro', '前言']
                ]
            }
        ]
    }
}