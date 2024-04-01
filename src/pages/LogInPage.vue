<template>
    <div class="wrapper">
        <div class="content">
            <custom-form>
                <h4>Авторизация</h4>
                <custom-input type="text" 
                    placeholder="Имя пользователя"
                    v-focus/>

                <custom-input type="text" 
                placeholder="Пароль"
                v-focus/>

                <custom-button id="login">
                    Log in
                </custom-button>
            </custom-form>
        </div>
    </div>
</template>

<script>
import { loadConfigFromFile } from 'vite'
import CustomButton from '../components/UI/CustomButton.vue'
import CustomForm from '../components/UI/CustomForm.vue'
import CustomInput from '../components/UI/CustomInput.vue'
    export default {
	components: { CustomForm, CustomInput, CustomButton },
        data(){
            return{
                user:{
                    name: '',
                    password: '',
                }, 

                users: [
                    {name: 'Bret', password: '92998'},
                    {name: 'Antonette', password: '90566'},
                    {name: 'Samantha', password: '59590'},
                    {name: 'Karianne', password: '53919'},
                    {name: 'Kamren', password: '33263'},
            ],
            }
        },
        methods:{
            async fetchUSers() 
            {
                try {
                    // const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                    // console.log(response.data);
              }
              catch (err) {
                  alert('error')
              }
              finally{
              }
            }, 
        },
        mounted(){
          this.fetchUSers();
        },
    }
</script>
<style scoped>
    .wrapper {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: fixed;
        display: flex;  
    }

    .content {
        margin: auto;
        background-color: #242424;
        border: 2px solid teal;
        min-height: 50px;
        min-width: 300px;
        padding: 20px;
    }

    #login{
        margin-top: 15px; 
    }
</style>