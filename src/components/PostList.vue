<template>
    <div class="post" v-for="post in posts">
        <div>
            <strong>Название: </strong>
            <i>{{ post.title }}</i>
        </div>
        <div>
            <strong>Описание: </strong>
            {{ post.body }}
        </div>
    </div>
</template>

<script>
export default{
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
    .post {
            padding: 0.5em;
            border: 3px solid teal;
            margin-top: 15px;
        }
</style>