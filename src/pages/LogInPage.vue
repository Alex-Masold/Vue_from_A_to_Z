<template>
    <div class="wrapper">
        <div class="content">
            <h4>Авторизация</h4>
            <custom-input type="text"
                v-model="user.name" 
                placeholder="Имя пользователя"
                v-focus/>

            <custom-input type="text"
                v-model="user.password" 
                placeholder="Пароль"
                v-focus/>

            <custom-button id="login"
                @click="CheckLogin">
                Log in
            </custom-button>    
        </div>
    </div>
</template>

<script>
import CustomButton from '../components/UI/CustomButton.vue'
import CustomForm from '../components/UI/CustomForm.vue'
import CustomInput from '../components/UI/CustomInput.vue'

import axios from 'axios'
import router from '../router'
import store from '../store'
    export default {
	components: { CustomForm, CustomInput, CustomButton },
        data(){
            return{
                user:{
                    name: '',
                    password: '',
                }, 

                users: [
                    // {name: 'Bret', password: '92998'},
                    // {name: 'Antonette', password: '90566'},
                    // {name: 'Samantha', password: '59590'},
                    // {name: 'Karianne', password: '53919'},
                    // {name: 'Kamren', password: '33263'},
                ],
            }
        },
        methods:{
            async fetchUSers() 
            {
                try {
                    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                    response.data.forEach(user => this.users.push(
                        {
                            name: user.username, 
                            password: user.address.zipcode.slice(0, 5)
                        }
                    ));
                    console.log(this.users);
                }
              catch (err) {
                  alert('error')
              }
              finally{
              }
            },
            
            CheckLogin(){
                this.users.forEach(user => {
                    if (this.user.name === user.name &&
                        this.user.password === user.password)
                    {
                        store.commit('setAuth');
                        router.push('/Main')
                    }
                })
            }
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
        display: flex;
        flex-direction: column;

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