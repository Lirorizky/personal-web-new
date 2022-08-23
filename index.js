const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'hbs'); //set hbs to be used

app.use('/assets', express.static(__dirname + '/assets')); //folder path

app.use(express.urlencoded({ extended: false })); 
  //to show the results inside the console

const isLogin = true;
let dataBlog = [];

// get routes start

app.get('/', (req, res) => {
  res.render('index', {isLogin});
})

app.get('/home', (req, res) => {
  console.log(dataBlog);

  res.render('index', {isLogin, dataBlog});
})

app.get('/add-project', (req, res) => {
  res.render('project');
})

app.get('/contact', (req, res) => {
  res.render('contact-form');
})

app.get('/project-detail/:id', (req, res) => {
  
  let id = req.params.id

  // console.log(id);
  
  res.render('project-detail', {
    id,
    title: 'Dumbways Mobile App',
      start_date: '18 July 2022',
      end_date: '25 July 2022',
      duration: '3 months',
      tech1_img: '../assets/icons/playstore-color.png',
      tech2_img: '../assets/icons/android-color.png',
      tech3_img: '../assets/icons/javacolor.png',
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia,
          eius. Maxime incidunt excepturi numquam voluptates omnis ea suscipit
          odit quia nisi reiciendis explicabo inventore deserunt, dolor
          voluptatem ex nemo dolore laborum, alias tenetur, quam in. Non, vitae
          optio! Dolore assumenda quae dignissimos quos libero quod voluptas
          impedit earum modi nesciunt! Et, doloremque repellendus ipsum tempore
          dignissimos optio error corporis est, quos ad dolore odio eum
          voluptates nemo, sequi ipsam totam rerum eos. Eligendi deserunt
          corporis nobis tenetur voluptatibus, optio laborum excepturi eius
          incidunt sed labore nihil recusandae atque vel eveniet nisi maiores
          culpa unde! Quae vel vero perspiciatis fugit, incidunt repellendus
          omnis reiciendis recusandae accusantium rerum esse ad in aspernatur
          error fugiat culpa voluptates laudantium et beatae nihil quisquam,
          doloribus unde. Placeat nisi officia assumenda doloribus fugit
          suscipit culpa soluta id in reprehenderit impedit quibusdam,
          consequuntur non corporis exercitationem corrupti hic harum quo
          distinctio repudiandae! Sunt suscipit nisi tenetur perspiciatis culpa
          maxime commodi, temporibus atque quibusdam qui quam laudantium
          consequuntur possimus vero libero deleniti saepe dolorum esse autem
          aperiam repudiandae delectus animi distinctio facere! Minus, maiores.
          Nisi mollitia voluptatem dolores, inventore a architecto neque
          voluptatum ex! Voluptate odio natus temporibus accusamus esse tenetur
          eum dolores atque? Unde suscipit, saepe molestias ut, numquam eligendi
          atque sunt perferendis, autem doloremque quisquam? Numquam ipsum
          dolorem impedit labore expedita vitae, sunt non repellat autem tenetur
          consequuntur quibusdam alias perspiciatis nemo recusandae beatae nulla
          ex voluptate, molestias similique quidem quisquam velit. Cumque iure
          necessitatibus fugiat consequuntur beatae tempore iusto, corporis
          perspiciatis est expedita quo! Officia consectetur incidunt dolorum.
          Eligendi totam fuga mollitia voluptatibus perferendis voluptatem
          officia enim, vitae culpa ab quis laboriosam repellat voluptates
          perspiciatis a quia dolorem quas adipisci numquam, unde eum iusto
          minus? Doloremque at ipsam accusamus veniam, nesciunt, id repellat
          dignissimos, accusantium explicabo fugiat doloribus aut beatae
          excepturi corrupti voluptatibus.`
  });
})

// -- post routes --

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
  // console.log(projectUploadImage);

  let projectInput = {
    projectName,
    startDate,
    endDate,
    projectDescription,
    techCheckbox,
    projectUploadImage
  }

  dataBlog.push(projectInput)

  res.redirect('/home');
})


app.listen(port, () => {
  console.log(`listening on port ${port}`);
})