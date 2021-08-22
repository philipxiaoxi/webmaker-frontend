<template>
    <div style="width: 100%;height:100%;">
        <mavon-editor v-model="value" style="width: 100%;height:100%;" @input="$emit('input', $event.target.value)" ></mavon-editor>
    </div>
</template>

<script>
export default {
    name: 'Note',
    components: {},
    props: {
        value: {
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
    watch: {
    }
}
</script>

<style>

</style>
