require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      ctrl = require('./controller'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      app = express();

app.use(express.json());

app.use(session({
   resave: false ,
   saveUninitialized: true,
   secret: SESSION_SECRET,
   cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
   connectionString: CONNECTION_STRING,
   ssl: {rejectUnauthorized: false}
})
.then(db => {
   app.set('db', db);
   console.log('DB connected')
   app.listen(port, () => console.log(`Server is running on Port: ${port}`))
});

//auth endpoints
app.post('/auth/register', ctrl.register);
app.post(`/auth/login`, ctrl.login);
app.post('/auth/logout', ctrl.logout)

//post endpoints
app.get('/api/posts', ctrl.getPosts);
app.get('/api/post/:id', ctrl.getSinglePost);
app.post('/api/posted/', ctrl.addPost);
app.delete('/api/post/:id', ctrl.deletePost);

//session endpoints
app.get('/api/auth/me', ctrl.userInfo)