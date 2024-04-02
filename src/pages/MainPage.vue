<template>
    <div class ="app">
        <header class="header">
            <h1>Страница постов</h1>
            <h2>{{ $store.state.isAuthorized }}</h2>
        </header>
        <div class="block">
            <custom-input id="Search" 
                placeholder="Поиск постов"
                :model-value="searchQuery"
                @update:model-value="setSearchQuery"
                v-focus />
            <custom-button id="Create"
            @click="showDialog">
                Создать пост
            </custom-button>

            <custom-select id="Sort"
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
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
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import axios from 'axios'

  export default {
      components:{
          PostForm, 
          PostList,
      },
      data() {
          return {
              dialogVisible: false,
          }
      },
      methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            fetchPosts: 'post/fetchPosts',
        }),
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
          this.fetchPosts(0);
      }, 
      computed:{
        ...mapState({
            isPostsLoading: state => state.post.isPostsLoading,

            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,

            posts: state => state.post.posts,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
        })
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