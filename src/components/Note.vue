<template>
    <div style="width: 100%;height:100%;">
        <mavon-editor style="width: 100%;height:100%;"   v-on="$listeners" v-bind="$attrs" ></mavon-editor>
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
    },
    methods: {
    }
}
</script>

<style>

</style>
