<template>
    <h3>
        <strong>Список постов</strong>
    </h3>
    <div v-if="posts.length > 0">
       
        <div>
            <post-item 
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </div>
          
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
</style>