<template>
    <Table :rows="rows" v-on:refresh-table="getPeople"></Table>
</template>
<script>
    import Table from '../components/Table';

    export default {
        name: 'PeopleTableContainer',
        components: {
           Table
        },
        data() {
            return {
               rows: []
            }
        },
        mounted() {
            this.getPeople()
        },
        methods: {
            getPeople: function() {

                let scope = this;
                fetch('/getPeople').then(res => {
                    return console.log(res.json())
                }).then(data => {
                    scope.rows = data;
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>