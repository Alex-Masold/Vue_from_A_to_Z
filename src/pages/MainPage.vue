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
        <footer v-intersection="() => fetching(1)" class="observer">
        </footer>
    </div>
</template>

<script>
import usePosts from '../hooks/usePosts';
import useSortedAndSearchedPosts from '../hooks/useSortedAndSearchedPosts';
import useSortedPosts from '../hooks/useSortedPosts';
import PostForm from '/src/components/PostForm.vue';
import PostList from '/src/components/PostList.vue';

  export default {
      components:{
          PostForm, 
          PostList,
      },
      data() {
          return {
              dialogVisible: false,

              limit: 10,

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
          
      },
      mounted(){
          console.log(this.$refs.observer);

      },

      setup(props) {
        const {posts, isPostsLoading, totalPages, fetching } = usePosts(10);
        const {selectedSort, sortedPosts} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

        return [
            posts,
            isPostsLoading,
            totalPages,
            fetching,
            selectedSort,
            sortedPosts,
            searchQuery,
            sortedAndSearchedPosts
        ]
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