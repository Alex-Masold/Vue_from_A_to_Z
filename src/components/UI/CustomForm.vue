<template>
    <div>
        <form class="form">
            <slot></slot>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'custom-form',
    }
</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
    }
</style>