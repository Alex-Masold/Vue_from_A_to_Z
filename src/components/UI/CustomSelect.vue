<template>
    <div>
        <select class="select"
        :value="modelValue" 
        @change="changeOptions">
            <option disabled value="">Выберите из списка</option>
            <option 
            v-for="option in options"
            :key="option.value" 
            :value="option.value">
                {{ option.name }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name:'custom-select',
        props:{
            modelValue:{
                type: String
            },
            options:{
                type: Array,
                default: () => []
            }
        },
        methods:{
            changeOptions(event){
                this.$emit('update:modelValue', event.target.value)
            }
        },
    }
</script>

<style scoped>
    .select{
        color: teal;
        background-color:#242424;
        border: 2px solid teal;
        padding: 10px 15px;
        text-align: center;
    }
</style>