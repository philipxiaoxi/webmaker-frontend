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
    }
}
</script>

<style>

</style>
