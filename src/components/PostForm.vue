<template>
    <custom-form @submit.prevent>
        <h4>Создание Поста</h4>
        <custom-input type="text" 
            placeholder="Название"
            v-model="post.title"
            v-focus
        />
        <custom-input type="text" 
            placeholder="Описание"
            v-model="post.body"
        />
        <custom-button  
            class="createButton"
            @click="createPost"
            >
            Создать
        </custom-button>
    </custom-form>
</template>

<script>
export default{
    data() {
        return {
            post:{
                title: '',
                body: '',
            }
        }
    },
    methods: {
        createPost()
        {
            this.post.id = Date.now();
            this.$emit('create', this.post)

            this.post = {
                title: '',
                body: ''
            }

        },
    },
}
</script>
    
<style scoped>
    .form {
        display: flex;
        flex-direction: column;
    }
    .createButton{
        margin-top: 15px;
    }
</style>