<template>
    <div class ="app">
        <h2>Страница постов</h2>
        <div class="block">
            <custom-input v-model="searchQuery" placeholder="Поиск постов"/>
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
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
        @remove="removePost"/>
        <div v-else>
            <h3>
                <strong>Список постов</strong>
            </h3>
            <v-progress-linear color="teal" indeterminate></v-progress-linear>
        </div>
        <div class="page_wrapper">
            <div class="page"
            v-for="pageNumber in totalPages" 
            :key="pageNumber"
            :class="{'current_page': page === pageNumber}"
            @click="ChangePage(pageNumber)">
                {{ pageNumber }} 
            </div>
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
                searchQuery: '',

                page: 5,
                limit: 10,
                totalPages: 0,

                posts: [],
                sortOptions:[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                    {value: Number, name: 'По id'},

                ]
            }
        },
        methods: {
            createPost(post)
            {
                // console.log(post);
                this.posts.push (post);
                this.dialogVisible = false;
            },
            removePost(post){
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            showDialog()
            {
                this.dialogVisible = true;
            },
            ChangePage(pageNumber)
            {
                this.page = pageNumber;
                
            },
            async fetchPosts() 
            {
                try {
                    this.isPostsLoading = true;
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params:{
                            _page: this.page,
                            _limit: this.limit
                        }
                    });
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
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
        watch:{
            page()
            {
                this.fetchPosts();
            }
        },
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
            sortedAndSearchedPosts(){
                return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        width: 100%;
        box-sizing: border-box;
    }
    .app{
        padding: 20px;
    }
    .block{
        display: grid;

        grid-template-columns: 3fr 1fr 1fr;

        align-items: baseline ;
        gap: 0.5em;
        padding: 15px 0px 15px;
    }
    .page_wrapper{
        display: flex;
        gap: 0.5em;
        
        margin-top: 15px;
        justify-content: center;
    }
    .page{
        border: 2px solid teal;
        width: auto;
        padding: 5px;
    }
    .current_page{
        color: teal;
    }
</style>