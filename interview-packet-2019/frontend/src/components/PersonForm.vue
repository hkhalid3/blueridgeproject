<template>
    <div class="insertForm">
        <div id="genderBlock">
            <label class="labels">Gender: </label>
            <input type="radio" id="gender" name="gender" value="male" v-model="personData.gender"/> male
            
                <input type="radio" name="gender" value="female" v-model="personData.gender"/> female<br>
            
        </div>

        <label class="labels" for="titleSelect">Title: </label>
        <select id="titleSelect" class="inputFields" v-model="personData.title">
            <option value="mr">mr</option>
            <option value="miss" selected="selected">miss</option>
            <option value="mrs">mrs</option>
        </select>
        <br>
        <label class="labels" for="firstName">First Name: </label>
        <input id="firstName" class="inputFields" type="text" v-model="personData.firstName"/><br>
        <label class="labels" for="lastName">Last Name: </label>
        <input id="lastName" type="text" class="inputFields" v-model="personData.lastName"/><br>
        <label class="labels" for="dob">Date of Birth: </label>
        <input id="dob" type="date" class="inputFields" placeholder="YYYY-MM-DD" v-model="personData.date"/><br>
        <label class="labels" for="age">Age: </label>
        <input id="age" class="inputFields" type="number" v-model="personData.age"/><br>
        <label for="phone" class="labels">Phone: </label>
        <input id="phone" type="number" class="inputFields" placeholder="(XXX)-XXX-XXXX" v-model="personData.phone"/>
        <button v-on:click="submitForm" id="submit">Submit</button>
    
    </div>
</template>
<script>
    export default {
        name: 'PersonForm',
        data: function () {
            return {
                personData: {
                    gender: '',
                    title: '',
                    firstName: '',
                    lastName: '',
                    date: '',
                    age: '',
                    phone: ''
                }
            }
        },
        methods: {
            submitForm: function() {
                this.$emit('submit-person-form', this.personData);
            }
        }
    }
</script>

<style scoped>

    .labels{
        font-weight: bold;
        display: inline-block;
        float: left;
        clear: left;
        width: 250px;
        text-align: right;
        padding-bottom: 15px;
        padding-right: 7px;
    }

    #submit{
        display: inline-block;
        float: left;
        margin-left: 20px;
        
    }

    #genderBlock{
        display: inline-block;
        float: left;
        
    }

    .inputFields{
        display: inline-block;
        float: left;
        padding-left: 15px;
    }

    .insertForm{
        padding-bottom: 147px;
    }

</style>