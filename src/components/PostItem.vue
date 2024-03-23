<template>
    <div class="post">
        <div>
            <div>
                <strong>Название: </strong>
                <i>{{ post.title }}</i>
            </div>
            <div>
                <strong>Описание: </strong>
                {{ post.body }}
            </div>
        </div>
        <div class="postButtons">
            <custom-button
            @click="$emit('remove', post)">
            Удалить</custom-button>
        </div>
        
    </div>
</template>

<script>
    export default {
        props:{
            post:{
                type: Object,
                require: true,
            }
        }
    }
</script>

<style scoped>   
    .post {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        gap: 0.5em;
        padding: 0.5em;
        border: 3px solid teal;
        margin-top: 15px;
    }
</style>