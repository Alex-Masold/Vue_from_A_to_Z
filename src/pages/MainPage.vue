<template>
    <div class ="app">
        <header class="header">
            <h1>Страница постов</h1>
            <h2>{{ $store.state.isAuthorized }}</h2>
        </header>
        <div class="block">
            <custom-input id="Search" v-focus v-model="searchQuery" placeholder="Поиск постов"/>
            <custom-button id="Create"
            @click="showDialog">
                Создать пост
            </custom-button>

            <custom-select id="Sort"
                v-model="selectedSort"
                :options="sortOptions"/>
        </div>
        <custom-dialog v-model:show="dialogVisible">
            <post-form
            @create="createPost"/>
        </custom-dialog>
        <div v-if="!isPostsLoading">
        <post-list 
        :posts="sortedAndSearchedPosts"
        @remove="removePost"/>
        </div>
        <div v-else>
            <h3>
                <strong>Список постов</strong>
            </h3>
            <v-progress-linear color="teal" indeterminate></v-progress-linear>
        </div>
        <footer v-intersection="() => fetchPosts(1)" class="observer">
        </footer>
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

              page: 1,
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
          async fetchPosts(n) 
          {
              try {
                  this.page += n;

                  if(n === 0){
                      this.isPostsLoading = true;
                  }
                  const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                      params:{
                          _page: this.page,
                          _limit: this.limit
                      }
                  });
                  this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                  this.posts = [...this.posts, ...response.data];
              }
              catch (err) {
                  alert('error')
              }
              finally{
                  if (n === 0){
                      this.isPostsLoading = false;
                  }
              }
          },
      },
      mounted(){
          this.fetchPosts(0);
          console.log(this.$refs.observer);
       
      }, 
      watch:{

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
    .block{
      display: flex;
      

      align-items: baseline ;
      gap: 0.5em;
      padding: 15px 0px 15px;
    }   

    .observer{
      height: 20px;
      background: tan;
      visibility: hidden;
    }
    .header{
        text-align: center;
    }
    #Search{
        flex-grow: 1;
    }
    #Create{
    }
    #Sort{
    }
</style>