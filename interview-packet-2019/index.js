
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
app.use(express.json())



// Setup the DB
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

// list of people, gender, age, name, email, address
db.serialize(function () {
    // Add additional DB setup inside this function
    db.run('CREATE TABLE score_data (name TEXT, score INT)')
    var stmt = db.prepare('INSERT INTO score_data VALUES (?, ?)')

    data = [['Kyle', 1], ['Danny', 5], ['Drew', 0], ['Duane', 1], ['Jacob', 2], ['Michael', 2]];
    data.forEach(x => {
        stmt.run(x[0], x[1])
    });


    stmt.finalize()

    db.each('SELECT rowid AS id, name, score FROM score_data', function (err, row) {
        console.log(row)
    })

    //creating the people_data table
    db.run('CREATE TABLE people_data (gender TEXT, nametitle TEXT, namefirst TEXT, namelast TEXT, dobdate TEXT, dobage INT, phone TEXT)')
    stmt =  db.prepare('INSERT INTO people_data VALUES (?, ?, ?, ?, ?, ?, ?)')



    //Load the provided data.csv into the database table
    //read the data.csv file and store it all in a string variable 
    //seperate each attribute by a comma (,) and new-line \n
    //convert dobage to an int
    //finally once data has been properly parsed store it in sqlite table
    fs.readFile("data.csv", 'utf8', (err, peopleData)=>{
        if (err){
            console.log(err)
        }
        peopleRecord = peopleData.split(/[,\n]/)//regex splits CSV on newlines and commas
        

        //first record spans from index 7-13; index 12 is the age. 
        for (i = 7; i < (peopleRecord.length-1); i = i + 7){
            stmt.run(peopleRecord[i], peopleRecord[(i+1)], peopleRecord[(i+2)], peopleRecord[(i+3)], peopleRecord[(i+4)], Number(peopleRecord[(i+5)]), peopleRecord[(i+6)]) 
        }

    })

    console.log("\n\n")

    

})




//aggregates gender data
app.get('/countGender', (req, res) => {//query result will be stored at countGender -> http://localhost:3000/countGender
    db.all('SELECT gender, COUNT(gender) as total FROM people_data GROUP BY gender', (err, rows) => {
        if (err) {
            console.log('DB Error ', err);
            res.send('[]')
        } else {
            //format to chart.js input
            const labels = [];
            const dataset = {
                data: [],
                backgroundColor: []
            };
            rows.forEach(row => {
                labels.push(row.gender);
                dataset.data.push(row.total);
                dataset.backgroundColor.push(row.gender.toLowerCase() === 'male' ? '#26c6da' : '#ef5350');
            });

            const result = {
                labels: labels,
                datasets: [dataset]
            };
            res.json(result);
        }
    })
});

//aggregating age groups 
app.get('/countAgeGroup', (req, res) => {
    db.all('SELECT \
	case\
    	when (0 < dobage and dobage <= 14) then "0-14"\
        when (14 < dobage and dobage <= 28) then "14-28"\
        when (28 < dobage and dobage <= 42) then "28-42"\
        when (42 < dobage and dobage <= 56) then "42-56"\
        when (56 < dobage and dobage <= 70) then "56-70"\
        when (70 < dobage and dobage <= 84) then "70-84"\
    end as age_groups, COUNT(*) as total\
        FROM people_data group by age_groups', (err, rows) => {
            if (err){
                console.log('DB Error ', err);
                res.send('[]')
            }
            else{
                //format to chart.js input
                const labels = [];
                const dataset = {
                    data: [],
                    backgroundColor: []
                };
                //hardcoded the 0-14 label, since SQL doesn't display a record with count = 0
                labels.splice(0, 0, "0-14");
                dataset.data.push(0);
                dataset.backgroundColor.push('#26c6da');
                
                //setting the label for the chart
                dataset.label =  'Number of People in Age Group';
                
                rows.forEach(row => {
                    labels.push(row.age_groups);
                    dataset.data.push(row.total);
                    dataset.backgroundColor.push('#26c6da');
                });

                if (labels[1].trim() === labels[0].trim()){
                    //hardcoded placeholder can be removed, since the count is no longer 0
                    labels.splice(0, 1);
                    dataset.data.splice(0, 1);
                    dataset.backgroundColor.splice(0, 1);
                    
                }
                
        
                    
                const result = {
                
                    labels: labels,
                    datasets: [dataset]
                };
                res.json(result);
            }
    })
});


//inserts a row into the people_data table
app.post('/addPerson', (req, res) => {
    console.log(req.body)
    db.run("INSERT INTO people_data ('gender', 'namefirst', 'namelast', 'dobage', 'nametitle', 'dobdate', 'phone') VALUES (?, ?, ?, ?, ?, ?, ?)", [req.body.gender, req.body.firstName, req.body.lastName, req.body.age, req.body.title, req.body.date, req.body.phone], function (err, row) {
            if (err) {
                res.json(false)
            } else {
                res.json(true)
            }
        }
    )
})

app.get('/getPeople', (req, res) => {
    db.all('SELECT * FROM people_data', function (err, rows) {
        if (err) {
            console.log('DB Error ', err)
            res.json([]);
        } else {
            res.json(rows)
        }
    })
})

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => res.redirect('/index.html'))
app.get('/scores', (req, res) => {
    db.all('SELECT rowid as id, name, score from score_data', (err, rows) => {
        if (err) {
            console.log('DB Error ', err)
            // send an empty list to not error out the client that is expecting json
            res.send('[]')
        } else {
            res.send(JSON.stringify(rows))
        }
    })
});

app.use(express.static('frontend/dist/'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// db.close()
