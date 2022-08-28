const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'hbs'); //set hbs to be used

app.use('/assets', express.static(__dirname + '/assets')); //folder path

app.use(express.urlencoded({ extended: false })); 
  //to show the results inside the console

const isLogin = true; //simple login condition

let dataProject = [
  {
    projectName: "dummytitle",
    projectDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    duration: "Duration : 3 Months",
    projectUploadImage: "coding.jpg",
  }
];

// -- GET ROUTES START -- --

app.get('/', (req, res) => {
  res.render('index', {isLogin});
})

app.get('/home', (req, res) => {
  console.log(dataProject);

  let data = dataProject.map(function(item){
    return {
      ...item,
      isLogin: isLogin,
    }
  })

  res.render('index', {isLogin, project: data});
})

app.get('/add-project', (req, res) => {
  res.render('project');
})

app.get('/delete-project/:id', (req, res) => {
  let id = req.params.id;

  dataProject.splice(id, 1);

  res.redirect('/home');
})

app.get('/edit-project/:id', (req, res) => {
  let id = req.params.id;

  let data = {
    projectName: dataProject[id].projectName,
    startDate: dataProject[id].startDate,
    endDate: dataProject[id].endDate, 
    projectDescription: dataProject[id].projectDescription,
    techCheckbox: dataProject[id].techCheckbox, 
    projectUploadImage: dataProject[id].projectUploadImage,
  }

  res.render('edit-project', {id, data});
})

app.get('/contact', (req, res) => {
  res.render('contact-form');
})

app.get('/project-detail/:id', (req, res) => {
  
  let id = req.params.id

  let data = dataProject[id];

  res.render('project-detail', {
    data,
    tech1_img: '../assets/icons/playstore-color.png',
    tech2_img: '../assets/icons/android-color.png',
    tech3_img: '../assets/icons/javacolor.png',
  });
  
  // res.render('project-detail', {
  //   id,
  //   title: 'Dumbways Mobile App',
  //     start_date: '18 July 2022',
  //     end_date: '25 July 2022',
  //     duration: '3 months',
  //     tech1_img: '../assets/icons/playstore-color.png',
  //     tech2_img: '../assets/icons/android-color.png',
  //     tech3_img: '../assets/icons/javacolor.png',
  //     content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia,
  //         eius. Maxime incidunt excepturi numquam voluptates omnis ea suscipit
  //         odit quia nisi reiciendis explicabo inventore deserunt, dolor
  //         voluptatem ex nemo dolore laborum, alias tenetur, quam in. Non, vitae
  //         optio! Dolore assumenda quae dignissimos quos libero quod voluptas
  //         impedit earum modi nesciunt! Et, doloremque repellendus ipsum tempore
  //         dignissimos optio error corporis est, quos ad dolore odio eum
  //         voluptates nemo, sequi ipsam totam rerum eos. Eligendi deserunt
  //         corporis nobis tenetur voluptatibus, optio laborum excepturi eius
  //         incidunt sed labore nihil recusandae atque vel eveniet nisi maiores
  //         culpa unde! Quae vel vero perspiciatis fugit, incidunt repellendus
  //         omnis reiciendis recusandae accusantium rerum esse ad in aspernatur
  //         error fugiat culpa voluptates laudantium et beatae nihil quisquam,
  //         doloribus unde. Placeat nisi officia assumenda doloribus fugit
  //         suscipit culpa soluta id in reprehenderit impedit quibusdam,
  //         consequuntur non corporis exercitationem corrupti hic harum quo
  //         distinctio repudiandae! Sunt suscipit nisi tenetur perspiciatis culpa
  //         maxime commodi, temporibus atque quibusdam qui quam laudantium
  //         consequuntur possimus vero libero deleniti saepe dolorum esse autem
  //         aperiam repudiandae delectus animi distinctio facere! Minus, maiores.
  //         Nisi mollitia voluptatem dolores, inventore a architecto neque
  //         voluptatum ex! Voluptate odio natus temporibus accusamus esse tenetur
  //         eum dolores atque? Unde suscipit, saepe molestias ut, numquam eligendi
  //         atque sunt perferendis, autem doloremque quisquam? Numquam ipsum
  //         dolorem impedit labore expedita vitae, sunt non repellat autem tenetur
  //         consequuntur quibusdam alias perspiciatis nemo recusandae beatae nulla
  //         ex voluptate, molestias similique quidem quisquam velit. Cumque iure
  //         necessitatibus fugiat consequuntur beatae tempore iusto, corporis
  //         perspiciatis est expedita quo! Officia consectetur incidunt dolorum.
  //         Eligendi totam fuga mollitia voluptatibus perferendis voluptatem
  //         officia enim, vitae culpa ab quis laboriosam repellat voluptates
  //         perspiciatis a quia dolorem quas adipisci numquam, unde eum iusto
  //         minus? Doloremque at ipsam accusamus veniam, nesciunt, id repellat
  //         dignissimos, accusantium explicabo fugiat doloribus aut beatae
  //         excepturi corrupti voluptatibus.`
  // });
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
  
  // console.log(projectName);
  // console.log(startDate);
  // console.log(endDate);
  // console.log(projectDescription);
  // console.log(techCheckbox);
  console.log(projectUploadImage);

  let duration = projectDurationTime(startDate, endDate);

  let projectInput = {
    projectName,
    startDate,
    endDate,
    duration,
    projectDescription,
    techCheckbox,
    projectUploadImage,
  }

  dataProject.push(projectInput)

  res.redirect('/home');
})

app.post('/edit-project/:id', (req, res) => {

  let id = req.params.id;

  // let projectName = req.body.projectName
  // let startDate = req.body.projectStartDate
  // let endDate = req.body.projectEndDate
  // let projectDescription = req.body.projectDescription
  // let techCheckbox = req.body.techCheckbox
  // let projectUploadImage = req.body.projectUploadImage

  dataProject[id].projectName = req.body.projectName;
  dataProject[id].startDate = req.body.startDate;
  dataProject[id].endDate = req.body.endDate;
  dataProject[id].projectDescription = req.body.projectDescription;
  dataProject[id].techCheckbox = req.body.techCheckbox;
  dataProject[id].projectUploadImage = req.body.projectUploadImage;

  res.redirect('/home');
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