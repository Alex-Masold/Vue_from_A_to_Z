export const postModule = {
    state: () => ({
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
    }),
    getters: {
        sortedPosts(state){
            if (state.selectedSort === 'id') //как отсортировать по id
            {
                
            }
            else
            {
                return[...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
                })
            }
        },   
        sortedAndSearchedPosts(state, getters){
            return getters.sortedPosts.filter(
                post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            )
        }
    },
    mutations: {
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },

        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setSearchedQuery(state, searchQuery){
            state.searchQuery = searchQuery
        },

        setPage(state, page) {
            state.page = page
        },
        setTotalpages(state, totalPages) {
            state.totalPages = totalPages
        },

        setPosts(state, posts) {
            state.posts = posts;
        },
    },
    actions: {
        async fetchPosts({state, commit}, n) 
        {
            try {
                commit('setPage', state.page + n)
                if(n === 0){
                    commit('setLoading', true)
                }
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params:{
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalpages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data])
            }
            catch (err) {
                alert('error')
            }
            finally{
                if (n === 0){
                    commit('setLoading', true)
                }
            }
        },
    },
    namespaced: true
}