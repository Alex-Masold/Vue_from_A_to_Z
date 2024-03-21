<template>
    <form @submit.prevent>
        <h4>Создание Поста</h4>
        <custom-input        
            v-model="post.title"
            class="input" 
            type="text" 
            placeholder="Название"
        />
        <custom-input 
            v-model="post.body"
            class="input" 
            type="text" 
            placeholder="Описание"
        />
        <custom-button  
            class="createButton"
            @click="createPost"
            >
            Создать
        </custom-button>
    </form>
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
    form {
        display: flex;
        flex-direction: column;
    }
    .createButton{
        margin-top: 15px;
    }
</style>