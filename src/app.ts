import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { router as blogRoutes } from './routes/blogRoutes';

// express app
const port = process.env.PORT || 3000;
const app = express();

// connect to MondoDB
const dbURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/test';
// 'mongodb+srv://ninja-blog-app-main-db-0fa82df5f8a:bB9Eb5w24j6rB8538uYUYcSfWU85XB@prod-us-central1-1.lfuy1.mongodb.net/ninja-blog-app-main-db-0fa82df5f8a';
// 'mongodb+srv://harpica:3141592b6@firstcluster.pvf75lv.mongodb.net/node-tut?retryWrites=true&w=majority'; // don't forget to write user, password, clusterName and collectionName(before ?)
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log('connected to db');
    // start listening for requiests only after connection to DB
    app.listen(port);
  }) // local host
  .catch((err) => {
    console.log(err);
  }); // async task

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views'); // where to find views (folder)

//middleware & static files (public, access by browser)
app.use(express.static('public')); // everything in puplic folder is avaliable in frontend

// app.use((req, res, next: Function) => {
//   console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   // allows browser to move to the next line of code
//   next();
// });
app.use(express.urlencoded({ extended: true })); // take all the data from form and put it into object
app.use(morgan('dev')); // HTTP request logger middleware for node.js

// kind of exanple how to communicate with db
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog',
//     snippet: 'about my new blog',
//     body: 'more about my new blog',
//   }); // creating new Blog
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err)); // to save to db, async
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err)); // should not create new Blog, could use the method of the model. Send result to browser
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('639c7422262f2256c42aeb4e')
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

// routes
app.get('/', (req, res) => {
  //   res.send(); // automatically setHead, status code
  //   res.sendFile('./views/index.html', { root: __dirname }); // to show where relative path should start
  // const blogs = [
  //   { title: '123', snippet: '123-snip' },
  //   { title: '124', snippet: '124-snip' },
  //   { title: '125', snippet: '125-snip' },
  // ];

  // res.render('index', { title: 'Home', blogs }); //  in {} is data that we send with page (we can access it in ejs file)

  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  //   res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

// app.get('/about-us', (req, res) => {
//   // redirect
//   res.redirect('/about');
// });

// blog routs
app.use('/blogs', blogRoutes);

app.use((req, res) => {
  //   res.status(404).sendFile('./views/404.html', { root: __dirname }); // while reaching this line an a code - throw 404
  res.status(404).render('404', { title: 'Not Found' });
});
