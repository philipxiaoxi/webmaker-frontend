<template>
    <div>
        <div class="codes">
            <code-card
            :headimg="'https://cravatar.cn/avatar/' + item.email"
            @hoverPreview="codePreview(item)"
            @hoverPreviewCancel="hoverPreviewCancel(item)"
            @clickCard="goTo(item)"
            :identity="item.identity"
            :id="item.id"
            :title="item.title"
            :author="item.name"
            v-for="item in cards"
            :key="item.id"
            ></code-card>
        </div>
        <div class="obItem" style="margin-top:20px;opacity: 0;"><el-button type="primary" round @click="getAllSnippet">继续加载</el-button></div>
        <code-quick-preview
        :top='codeQuickPreview.top'
        :left='codeQuickPreview.left'
        v-show="codeQuickPreview.show"
        @mouseover.native="codeQuickPreview.show = true"
        @mouseleave.native="codeQuickPreview.show = false"
        ref='codeQuickPreview'
        ></code-quick-preview>
    </div>
</template>

<script>
import CodeCard from '../components/CodeCard.vue'
import API from '../api/'
import CodeQuickPreview from './CodeQuickPreview.vue'
import md5 from 'md5'
export default {
    components: { CodeCard, CodeQuickPreview },
    data() {
        return {
            pageCount: 1,
            pageIndex: 0,
            cards: [],
            codePreviewDialogVisible: false,
            item: {},
            codeQuickPreview: {
                top: 0,
                left: 0,
                show: false
            },
            index: 0
        }
    },
    computed: {
        getEmailHash() {
            return md5(this.$store.state.userInfo.email)
        }
    },
    props: {
        type: {
            type: String,
            default: 'common'
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            // 创建一个监听者
            const observer = new IntersectionObserver((entries, observer) => {
                if (entries[0].intersectionRatio > 0) {
                    console.log('进入可视区域')
                    switch (this.type) {
                    case 'common':
                        this.getAllSnippet()
                        break
                    case 'mycodes':
                        this.getSnippetByUserid()
                        break
                    default:
                        break
                    }
                } else {
                    console.log('移出可视区域')
                }
            })
            // 指定监听元素
            const target = document.querySelector('.obItem')
            observer.observe(target)
        },
        async getCodeimg(item) {
            const res = await this.axios.get(`/common/getSnippetImg/${item.id}`)
            return res.data.data
        },
        getAllSnippet() {
            this.pageIndex = this.pageIndex + 1
            if (this.pageIndex > this.pageCount) {
                return
            }
            this.axios(API.snippet.getAllSnippet(this.pageIndex)).then(res => {
                this.cards = this.cards.concat(res.data.data.list)
                this.pageCount = res.data.data.lastPage
            }).catch((e) => {
                console.log(e)
            })
        },
        getSearchSnippet(searchKeyWord) {
            this.pageIndex = 1
            this.axios(API.snippet.getSearchSnippet(this.pageIndex, searchKeyWord)).then(res => {
                console.log(res.data)
                this.cards = res.data.data.list
                this.pageCount = res.data.data.lastPage
            }).catch((e) => {
                console.log(e)
            })
        },
        getSnippetByUserid() {
            this.pageIndex = this.pageIndex + 1
            if (this.pageIndex > this.pageCount) {
                return
            }
            this.axios(API.snippet.getSnippetByUserid(this.pageIndex)).then(res => {
                console.log(res.data)
                this.cards = this.cards.concat(res.data.data.list)
                this.pageCount = res.data.data.lastPage
            }).catch((e) => {
                console.log(e)
                this.$root.$emit('showLogin', true)
                this.pageIndex = 0
                this.pageCount = 1
            })
        },
        goTo(item) {
            this.$router.push({ path: '/editor', query: { id: item.id } })
        },
        codePreview(item) {
            console.log(window.event)
            this.codeQuickPreview.top = (window.event.clientY + 200 > window.innerHeight ? window.innerHeight - 200 : window.event.clientY) - 10
            this.codeQuickPreview.left = (window.event.clientX + 350 > window.innerWidth ? window.innerWidth - 350 : window.event.clientX) - 10
            this.codeQuickPreview.show = true
            if (this.item != item) {
                this.$refs.codeQuickPreview.goPreview(item)
            }
            this.item = item
        },
        hoverPreviewCancel() {
            this.codeQuickPreview.show = false
        }
    }
}
</script>

<style lang='less' scoped>
.codes {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(350px,1fr));
    align-items: start;
    grid-gap: 1rem 1rem;
}
</style>
