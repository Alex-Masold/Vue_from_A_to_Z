<template>
    <div class="dialog" 
    v-if="show" 
    @click.stop="hideDialog">
        <div  
        class="content"
        @click.stop>
            <slot></slot>
        </div>
    </div>
</template>
  
<script>
import toggleMixin from '../../mixins/toggleMixin';

  
    export default {
        name: 'custom-dialog',
        mixins:[toggleMixin],
    }
</script>
  
<style scoped>
    .dialog {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        display: flex;  
    }

    .content {
        margin: auto;
        background-color: #242424;
        border-radius: 12px;
        min-height: 50px;
        min-width: 300px;
        padding: 20px;
    }
</style>
  