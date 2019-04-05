<template>
<PersonForm v-on:submit-person-form="insertData"></PersonForm>
</template>
<script>
import PersonForm from '../components/PersonForm'
    export default {
        name: 'PersonFormContainer',
        data: function(){
            return {}
        },
        components: {
         PersonForm
        },
        methods: {
           insertData: function(person) {
               person.age = Number(person.age);
               if(person.firstName.length > 0 && person.lastName.length > 0 && person.age >= 0 && (person.gender === 'male' || person.gender === 'female') && (person.title === 'miss' || person.title === 'mrs' || person.title === 'mr') && person.date.length > 0 && person.phone.length > 0)  {
                   //make a POST request to http://localhost:3000/addPerson
                   fetch('/addPerson', {
                       method: 'POST',
                       headers: {
                           "Content-Type": "application/json",
                       },
                       body: JSON.stringify(person)

                   })
                   
                   .then((response) => response.json())
                   
                   .then((data) => console.log(data))
                   .catch(error => console.error('Error:', error));
               }
               else{
                   alert("Please fill all fields appropriately");
               }
           }
        }
    }
</script>