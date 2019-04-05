<template>
    <div class="home">
        <h1> People Form & List </h1>
        <div class="people">
            <!-- container has all the form inputs needed for a new record -->
            <PersonFormContainer></PersonFormContainer>
            
            <!-- container has the refresh button -->
            <PeopleTableContainer></PeopleTableContainer>
            
            <div class="mytable">
                <br><br><br>
                <table>
                    <thead>
                    <tr>
                        <td> Gender </td>
                        <td> Title </td>
                        <td> First Name </td>
                        <td> Last Name </td>
                        <td> Date Of Birth </td> 
                        <td> Age </td>
                        <td> Phone Number </td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in peoples">
                            <td> {{row.gender}}</td>
                            <td> {{row.nametitle}} </td>
                            <td> {{row.namefirst}} </td>
                            <td> {{row.namelast}}</td>
                            <td> {{row.dobdate}} </td>
                            <td> {{row.dobage}} </td>
                            <td> {{row.phone}} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import PersonFormContainer from '../containers/PersonFormContainer'
    import PeopleTableContainer from '../containers/PeopleTableContainer'

    export default {

        data: function () {
            fetch('/getPeople').then((peopless) =>{
                return peopless.json()
            }).then((sc) =>{
                this.peoples = sc
            }).catch((err) => {
            })
            return {
                peoples: [{gender:'male',nametitle:'mr',namefirst:'test',namelast:'tester',dobdate:'1983-11-04T11:19:23Z',dobage:35,phone:'(140)-552-4961'}]
            }
        },
        components: {
            PeopleTableContainer,
            PersonFormContainer
        },
        name: 'People',
    }
</script>

<style scoped>
    .people {
        display: inline-block
    }

    table{
        width: auto;
        border: none;
        border-collapse: collapse;
    }
    
    thead tr{
        font-weight: bold;
        
    }
    tbody tr:nth-child(even){
        background-color: #90caf9
        
    }
    tbody tr:nth-child(odd){
        background-color: #e2f1f8;
    }


</style>