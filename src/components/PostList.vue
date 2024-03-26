<template>
    <h3>
        <strong>Список постов</strong>
    </h3>
    <div v-if="posts.length > 0">
       <transition-group name="post-list">
            <post-item 
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
       </transition-group>     
    </div>
    <div v-else>
        <div
            class="emptyList">
            список пуст
        </div>
    </div>
    
</template>

<script>
import { VProgressLinear } from 'vuetify/lib/components/index.mjs';
import PostItem from './PostItem.vue';

export default{
    components:{
        PostItem
    },
    props:
    {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
    .emptyList {
        padding: 0.5em;
        border: 3px solid teal;
        margin-top: 15px;
        text-align: center;
        color: teal;;
    }
    
    .post-list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .post-list-enter-active,
    .post-list-leave-active {
        transition: all 0.5s ease;
    }
    .post-list-enter-from,
    .post-list-leave-to {
        opacity: 0;
        transform: translateX(130px);
    }
    .post-list-move {
  transition: transform 0.4s ease;
}
</style>