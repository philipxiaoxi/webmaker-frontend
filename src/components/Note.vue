<template>
    <div style="width: 100%;height:100%;">
        <mavon-editor style="width: 100%;height:100%;" v-model="$parent.$parent.item.note" ></mavon-editor>
    </div>
</template>

<script>
export default {
    name: 'Note',
    components: {},
    props: {
    },
    data() {
        return {
            content: '',
            editorOption: {}
        }
    },
    computed: {
    },
    watch: {
    }
}
</script>

<style>

</style>
