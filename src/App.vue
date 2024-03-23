<template>
    <div class ="app">
        <h2>Страница постов</h2>
        <div class="block">
            <custom-button
            @click="showDialog">
                Создать пост
            </custom-button>
            <custom-select 
            v-model="selectedSort"
            :options="sortOptions"/>
        </div>
        <custom-dialog v-model:show="dialogVisible">
            <post-form
            @create="createPost"/>
        </custom-dialog>
        <post-list 
        :posts="sortedPosts"
        v-if="!isPostsLoading"
        @remove="removePost"/>
        <div v-else>
            <h3>
                <strong>Список постов</strong>
            </h3>
            <v-progress-linear color="teal" indeterminate></v-progress-linear>
        </div>
    </div>
</template>

<script>
import PostForm from '/src/components/PostForm.vue';
import PostList from '/src/components/PostList.vue';
import axios from 'axios'

    export default {
        components:{
            PostForm, 
            PostList,
        },
        data() {
            return {
                dialogVisible: false,
                isPostsLoading: false,

                selectedSort: '',

                posts: [],
                sortOptions:[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                    {value: 'id', name: 'По id'},

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
            },
            async fetchPosts() 
            {
                try {
                    this.isPostsLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
                    this.posts = response.data;
                }
                catch (err) {
                    alert('error')
                }
                finally{
                    this.isPostsLoading = false;
                }
            },
        },
        mounted(){
            this.fetchPosts();
        }, 
        // watch:{
        //     selectedSort(value)
        //     {
        //         this.posts.sort((post1, post2) => {
        //             return post1[value]?.localeCompare(post2[value])
        //         })
        //     }
        // },
        computed:{
            sortedPosts(){
                if (this.selectedSort === 'id') //как отсортировать по id
                {
                    
                }
                else
                {
                    return[...this.posts].sort((post1, post2) => {
                    return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                    })
                }
            },   
        }
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
    .block{
        display: flex;
        justify-content: space-between;
        gap: 0.5em;
        padding: 15px 0px 15px;
    }
</style>