const { response } = require('express');
const express = require('express');
const dbPool = require('./connection/db');
const app = express();
const port = 3000;
const db = require('./connection/db')

app.set('view engine', 'hbs'); //set hbs to be used

app.use('/assets', express.static(__dirname + '/assets')); //folder path

app.use(express.urlencoded({ extended: false })); 
  //to show the results inside the console

const isLogin = true; //simple login condition


// -- GET ROUTES START -- --

app.get('/', (req, res) => {
  res.render('index', {isLogin});
})

app.get('/home', (req, res) => {

  db.connect(function(err, client, done){
    if (err) throw err

    client.query('SELECT * FROM tb_projects', function(err, result){
      if (err) throw err
      
      console.log(result.rows);
      let data = result.rows;

      let dataProject = data.map((item) => {
        return {
          ...item,
          isLogin: isLogin,
          duration: projectDurationTime(item.start_date, item.end_date),
          technologies: item.technologies,
        }
      })

      res.render('index', {isLogin, project: dataProject});
    })
  })
})

app.get('/add-project', (req, res) => {
  res.render('project');
})

app.get('/delete-project/:id', (req, res) => {

  let id = req.params.id;

  db.connect(function(err, client, done){
    if (err) throw err

    let query = `DELETE FROM tb_projects WHERE id=${id}`

    client.query(query, function(err, result){
      if (err) throw err

      res.redirect('/home');
    })
  })

})

app.get('/edit-project/:id', (req, res) => {

  let id = req.params.id;

  db.connect(function(err, client, done){
    if (err) throw err

    let query = `SELECT * FROM tb_projects WHERE id=${id}`

    client.query(query, function(err, result){
      if (err) throw err

      let data = result.rows

      res.render('edit-project', { data: data[0] });
    })
  })
})

app.get('/contact', (req, res) => {
  res.render('contact-form');
})

app.get('/project-detail/:id', (req, res) => {

  let id = req.params.id;
  
  db.connect(function(err, client, done){
    if (err) throw err

    let query = `SELECT * FROM tb_projects WHERE id=${id}`

    client.query(query, function(err, result){
      if (err) throw err

      let data = result.rows;
      console.log(data);

      let dataProject = data.map((item) => {
        return {
          ...item,
          duration: projectDurationTime(item.start_date, item.end_date),
          start_date: getFullTime(item.start_date),
          end_date: getFullTime(item.end_date),
        }
      })
        res.render('project-detail', {
          project: dataProject[0],
          tech1_img: '../assets/icons/playstore-color.png',
          tech2_img: '../assets/icons/android-color.png',
          tech3_img: '../assets/icons/javacolor.png',
          isLogin: isLogin,
        });
    })
  })
})

// -- POST ROUTES START -- --

app.post('/add-project', (req, res) => {
  // console.log(req.body);

  let projectName = req.body.projectName
  let startDate = req.body.projectStartDate
  let endDate = req.body.projectEndDate
  let projectDescription = req.body.projectDescription
  let techCheckbox = req.body.techCheckbox
  let projectUploadImage = req.body.projectUploadImage

  db.connect(function(err, client, done){
    if (err) throw err

    let query = `INSERT INTO tb_projects (project_name, start_date, end_date, description, image) VALUES ('${projectName}', '${startDate}', '${endDate}', '${projectDescription}', '${projectUploadImage}')`

    client.query(query, function(err, result){
      if (err) throw err

      res.redirect('/home');
    })
  })

})

app.post('/edit-project/:id', (req, res) => {

  let id = req.params.id;

  
  let projectName = req.body.projectName
  let startDate = req.body.projectStartDate
  let endDate = req.body.projectEndDate
  let projectDescription = req.body.projectDescription
  let techCheckbox = req.body.techCheckbox
  let projectUploadImage = req.body.projectUploadImage

  db.connect(function(err, client, done){
    if (err) throw err

    let query = `UPDATE tb_projects SET project_name = '${projectName}', start_date = '${startDate}', end_date = '${endDate}', description = '${projectDescription}', image = '${projectUploadImage}' WHERE id=${id}`

    client.query(query, function(err, result){
      if (err) throw err

      res.redirect('/home');
    })
  })



})

// -- node listen --

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

// project duration

function projectDurationTime(a, b){
  let projectStartAt = new Date(a);
  let projectEndAt = new Date(b);

  let duration = projectEndAt - projectStartAt;

  //day duration
  
  let yearDuration = Math.floor(duration / (1000 * 60 * 60 * 24 * 30 * 12));

  if(yearDuration > 0){
    return `Duration: ${yearDuration} years`;
  } else {
    let monthDuration = Math.floor(duration / (1000 * 60 * 60 * 24 * 30));

    if (monthDuration > 0) {
      return `Duration: ${monthDuration} months`;
    } else {
      let weeksDuration = Math.floor(duration / (1000 * 60 * 60 * 24 * 7));

      if(weeksDuration > 0) {
        return `Duration: ${weeksDuration} weeks`;
      } else {
        let dayDuration = Math.floor(duration / (1000 * 60 * 60 * 24));

        if(dayDuration > 0) {
          return `Duration: ${dayDuration} days`;
        }
      }
    }
  }

  
}

function getFullTime(time) {

    let month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"]

    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let hours = time.getHours()
    let minutes = time.getMinutes()

    if (hours < 10) {
        hours = "0" + hours
    } else if (minutes < 10) {
        minutes = "0" + minutes
    }

    // 12 Agustus 2022 09.04
    let fullTime = `${date} ${month[monthIndex]} ${year}`
    // console.log(fullTime);
    return fullTime
}