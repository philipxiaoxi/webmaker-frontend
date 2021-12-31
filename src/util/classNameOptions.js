/*
 * @Ahthor: xiaoxi
 */
const classNameOptions = [
    {
        label: 'flex布局相关',
        options: [
            {
                label: 'flex'
            },
            {
                label: 'flex-col'
            },
            {
                label: 'flex-row'
            },
            {
                label: 'flex-wrap'
            },
            {
                label: 'flex-1'
            },
            {
                label: 'flex-auto'
            },
            {
                label: 'flex-none'
            },
            {
                label: 'flex-grow'
            },
            {
                label: 'flex-grow-0'
            },
            {
                label: 'flex-shrink-0'
            },
            {
                label: 'flex-shrink'
            }
        ]
    },
    {
        label: '主轴相关',
        options: [
            {
                label: 'jc-between'
            },
            {
                label: 'jc-around'
            },
            {
                label: 'jc-center'
            },
            {
                label: 'jc-end'
            }
        ]
    },
    {
        label: '交叉轴相关',
        options: [
            {
                label: 'ai-center'
            },
            {
                label: 'ai-stretch'
            },
            {
                label: 'ai-end'
            },
            {
                label: 'ai-baseline'
            },
            {
                label: 'ac-center'
            },
            {
                label: 'ac-end'
            },
            {
                label: 'ac-stretch'
            },
            {
                label: 'ac-between'
            },
            {
                label: 'ac-around'
            }
        ]
    },
    {
        label: '宽度相关',
        options: [
            {
                label: 'w-full'
            },
            {
                label: 'w-0'
            }
        ]
    },
    {
        label: '字体相关',
        options: [
            {
                label: 'text-lg'
            },
            {
                label: 'text-md'
            },
            {
                label: 'text-sm'
            },
            {
                label: 'font-bold'
            },
            {
                label: 'tracking-sm'
            },
            {
                label: 'tracking-md'
            },
            {
                label: 'tracking-lg'
            },
            {
                label: 'leading-sm'
            },
            {
                label: 'leading-relaxed'
            },
            {
                label: 'leading-md'
            },
            {
                label: 'leading-lg'
            },
            {
                label: 'text-center'
            },
            {
                label: 'text-justify'
            },
            {
                label: 'text-right'
            },
            {
                label: 'truncate'
            }
        ]
    },
    {
        label: '边框圆角',
        options: [
            {
                label: 'rounded-sm'
            },
            {
                label: 'rounded-md'
            },
            {
                label: 'rounded-lg'
            },
            {
                label: 'rounded'
            },
            {
                label: 'mw1144'
            }
        ]
    },
    {
        label: '边框厚度',
        options: [
            {
                label: 'border-sm'
            },
            {
                label: 'border-md'
            },
            {
                label: 'border-lg'
            },
            {
                label: 'border'
            }
        ]
    },
    {
        label: '边框颜色',
        options: [
            {
                label: 'border-gray-sm'
            },
            {
                label: 'border-gray-md'
            },
            {
                label: 'border-gray-lg'
            }
        ]
    },
    {
        label: '边框样式',
        options: [
            {
                label: 'border-solid'
            },
            {
                label: 'border-dashed'
            },
            {
                label: 'border-dotted'
            }
        ]
    },
    {
        label: '分割线',
        options: [
            {
                label: 'divide-x'
            },
            {
                label: 'divide-x-sm'
            },
            {
                label: 'divide-x-md'
            },
            {
                label: 'divide-x-lg'
            },
            {
                label: 'divide-y'
            },
            {
                label: 'divide-y-sm'
            },
            {
                label: 'divide-y-md'
            },
            {
                label: 'divide-y-lg'
            }
        ]
    },
    {
        label: '分割线样式',
        options: [
            {
                label: 'divide-solid'
            },
            {
                label: 'divide-dashed'
            },
            {
                label: 'divide-dotted'
            }
        ]
    },
    {
        label: '盒阴影',
        options: [
            {
                label: 'shadow-sm'
            },
            {
                label: 'shadow-md'
            },
            {
                label: 'shadow-lg'
            }
        ]
    },
    {
        label: 'grid布局快速搭建样式',
        options: [
            {
                label: 'grid-cols-1'
            },
            {
                label: 'grid-cols-2'
            },
            {
                label: 'grid-cols-3'
            },
            {
                label: 'grid-cols-4'
            },
            {
                label: 'grid-cols-5'
            },
            {
                label: 'grid-cols-6'
            },
            {
                label: 'grid-cols-7'
            },
            {
                label: 'grid-cols-8'
            },
            {
                label: 'grid-cols-9'
            },
            {
                label: 'grid-cols-10'
            },
            {
                label: 'grid-cols-11'
            },
            {
                label: 'grid-cols-12'
            },
            {
                label: 'gap-lg'
            },
            {
                label: 'gap-md'
            },
            {
                label: 'gap-sm'
            }
        ]
    },
    {
        label: '内边距',
        options: [
            {
                label: 'p-10'
            },
            {
                label: 'p-20'
            },
            {
                label: 'p-lg'
            },
            {
                label: 'p-md'
            },
            {
                label: 'p-sm'
            },
            {
                label: 'px-10'
            },
            {
                label: 'px-20'
            },
            {
                label: 'px-lg'
            },
            {
                label: 'px-md'
            },
            {
                label: 'px-sm'
            },
            {
                label: 'py-10'
            },
            {
                label: 'py-20'
            },
            {
                label: 'py-lg'
            },
            {
                label: 'py-md'
            },
            {
                label: 'py-sm'
            }
        ]
    },
    {
        label: '外边距',
        options: [
            {
                label: 'm-10'
            },
            {
                label: 'm-20'
            },
            {
                label: 'm-lg'
            },
            {
                label: 'm-md'
            },
            {
                label: 'm-sm'
            },
            {
                label: 'mx-10'
            },
            {
                label: 'mx-20'
            },
            {
                label: 'mx-lg'
            },
            {
                label: 'mx-md'
            },
            {
                label: 'mx-sm'
            },
            {
                label: 'my-10'
            },
            {
                label: 'my-20'
            },
            {
                label: 'my-lg'
            },
            {
                label: 'my-md'
            },
            {
                label: 'my-sm'
            }
        ]
    },
    {
        label: '动画相关',
        options: [
            {
                label: 'animate-spin'
            },
            {
                label: 'animate-ping'
            },
            {
                label: 'animate-bounce'
            }
        ]
    }
]
export default classNameOptions
