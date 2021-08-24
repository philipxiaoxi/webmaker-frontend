<template>
    <div>
        <comment-item
        v-for="item in data"
        :key="item.id"
        :name="item.name"
        :time="item.time"
        :replyName="item.replyName"
        :content="item.content"
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
    }
}
</script>

<style>

</style>
