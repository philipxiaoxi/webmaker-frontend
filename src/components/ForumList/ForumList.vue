<template>
    <div>
        <forum-item
        v-for="item in data"
        :key="item.id"
        :title="item.title"
        :author="item.author"
        :topic="item.topic"
        :preface="item.preface"
        :replyNum="item.replyNum"
        :showPreface="item.showPreface"
        :identity="item.identity"
        @click="click(item)"
        ></forum-item>
    </div>
</template>

<script>
import ForumItem from './ForumItem.vue'
export default {
    components: { ForumItem },
    props: {
        data: {
            type: Array,
            default: () => { return [] }
        }
    },
    methods: {
        click(item) {
            this.$emit('click', item)
        }
    }
}
</script>

<style>

</style>
