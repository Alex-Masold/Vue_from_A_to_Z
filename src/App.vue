<template>
    <div class ="app">
        <custom-button
        @click="showDialog">
            Создать пост
        </custom-button>
        <custom-dialog v-model:show="dialogVisible">
            <post-form
            @create="createPost"/>
        </custom-dialog>
        <post-list 
        :posts="posts"
        @remove="removePost"/>
    </div>
</template>

<script>
import PostForm from '/src/components/PostForm.vue';
import PostList from '/src/components/PostList.vue';
    export default {
        components:{
            PostForm, 
            PostList
        },
        data() {
            return {
                dialogVisible: false,

                posts: [
                    {
                        id: 1, 
                        title: 'Post 1', 
                        body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa autem ratione eius, aperiam necessitatibus sunt earum quas impedit. Nulla molestiae ipsam delectus facilis veritatis sit veniam atque ut a nostrum.'
                    },
                    {
                        id: 2,
                        title: 'Post 2',
                        body: 'Doloribus dicta autem excepturi similique culpa natus non, quidem voluptatibus atque aspernatur voluptate incidunt magnam veniam nam nemo repellat accusamus nulla quis quasi fugiat. Eos odit nostrum molestiae illum porro?'
                    },
                    {
                        id: 3,
                        title: 'Post 3',
                        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, ipsa voluptatibus itaque consequuntur quos possimus accusantium reprehenderit repellendus ipsam sint cupiditate, consectetur dolor in blanditiis deleniti ducimus rem nostrum soluta.'
                    },
                ]
            }
        },
        methods: {
            createPost(post)
            {
                // console.log(post);
                this.posts.push(post);
                this.dialogVisible = false;
            },
            removePost(post){
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showDialog()
            {
                this.dialogVisible = true;
            }
        },
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .app{
        padding: 20px;
    }
    
</style>