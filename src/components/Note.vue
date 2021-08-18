<template>
    <div style="width: 100%;height:100%;">
        <mavon-editor style="width: 100%;height:100%;" v-model="content" ></mavon-editor>
    </div>
</template>

<script>
export default {
    name: 'Note',
    components: {},
    props: {
        note: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            content: '',
            editorOption: {}
        }
    },
    computed: {
    },
    mounted() {
        this.content = this.note
    }
}
</script>

<style>

</style>
