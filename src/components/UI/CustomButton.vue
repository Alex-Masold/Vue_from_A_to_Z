<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'custom-button'
}
</script>

<style scoped>
    button {
        align-self: flex-end;

        border: 2px solid teal;
        padding: 10px 15px;
        background: none;
        color: teal;
    }
</style>