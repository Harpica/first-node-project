import express from 'express';
import morgan from 'morgan';

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
app.set('views', 'views'); // where to find views (folder)

// listen for requiests
app.listen(3000); // local host

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

app.use(morgan('dev'));

app.get('/', (req, res) => {
  //   res.send(); // automatically setHead, status code
  //   res.sendFile('./views/index.html', { root: __dirname }); // to show where relative path should start
  const blogs = [
    { title: '123', snippet: '123-snip' },
    { title: '124', snippet: '124-snip' },
    { title: '125', snippet: '125-snip' },
  ];

  res.render('index', { title: 'Home', blogs }); //  in {} is data that we send with page (we can access it in ejs file)
});

app.get('/about', (req, res) => {
  //   res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'About' });
});

// app.get('/about-us', (req, res) => {
//   // redirect
//   res.redirect('/about');
// });

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'New Blog' });
});

app.use((req, res) => {
  //   res.status(404).sendFile('./views/404.html', { root: __dirname }); // while reaching this line an a code - throw 404
  res.status(404).render('404', { title: 'Not Found' });
});
