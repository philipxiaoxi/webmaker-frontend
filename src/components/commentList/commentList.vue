<template>
    <div>
        <comment-item
        v-for="(item, index) in data"
        :key="item.id"
        :name="item.name"
        :time="item.time"
        :identity='item.identity'
        :replyName="item.replyName"
        :content="item.content"
        :index="index"
        :replyId="item.replyId"
        @click="click(item)"
        ></comment-item>
    </div>
</template>

<script>
import commentItem from './commentItem.vue'
export default {
    components: { commentItem },
    props: {
        data: {
            type: Array,
            default: () => { return [] }
        }
    },
    methods: {
        click(item) {
            this.$emit('replyClick', item)
        }
    }
}
</script>

<style>

</style>
