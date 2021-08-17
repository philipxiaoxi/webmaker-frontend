<template>
    <div>
        <div class="codes">
            <code-card></code-card>
            <code-card></code-card>
            <code-card></code-card>
            <code-card></code-card>
            <code-card></code-card>
            <code-card></code-card>
        </div>

    </div>
</template>

<script>
import CodeCard from '../components/CodeCard.vue'
export default {
    components: { CodeCard }

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
