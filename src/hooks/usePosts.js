import axios from "axios";
import { onMounted, ref } from "vue";

export default function usePosts(limit) {
    const posts = ref([]);

    const page = ref(0);
    const totalPages = ref(0);

    const isPostsLoading = ref(false);

    const fetching = async (n = 0) =>{
        try {
            page.value += n;
    
            if(n === 0){
                isPostsLoading.value = true;
            }
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params:{
                    _page: page,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            posts.value = [...posts.value, ...response.data];
        }
        catch (err) {
            alert('error')
        }
        finally{
            if (n === 0){
                isPostsLoading.value = false;
            }
        }
    }

    onMounted(() => fetching());

    return{
        posts, 
        totalPages, 
        isPostsLoading,
        fetching
    }
}