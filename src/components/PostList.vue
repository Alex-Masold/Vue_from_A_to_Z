<template>
    <div>
        <h3>
            <strong>Список постов</strong>
        </h3>
        <PostItem 
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove', post)"
        />
    </div>
</template>

<script>
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
 .createButton {
        align-self: flex-end;

        border: 2px solid teal;
        margin-top: 15px;
        padding: 10px 15px;

        background: none;
        color: teal;
    }
</style>