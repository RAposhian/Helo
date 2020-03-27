const bcrypt = require('bcryptjs');

module.exports = {
   register: async (req, res) => {
      const {password, username} = req.body;
      const db = req.app.get('db');

      let user = await db.auth.check_user(username);
      if (user[0]) {
         return res.status(400).send('User already exists')
      }

      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(password, salt);

      let newUser = await db.auth.register_user({password: hash, username});
      req.session.user = newUser[0];
      res.status(201).send(req.session.user);
   },
   login: async (req, res) => {
      const {username, password} = req.body;
      const db = req.app.get('db');
      
      let user = await db.auth.check_user(username);
      if(!user[0]) {
         return res.status(400).send('User does not exist');
      }

      let authenticated = bcrypt.compareSync(password, user[0].password);
      if(!authenticated){
         return res.status(401).send('Password is incorrect');
      }

      delete user[0].password;

      req.session.user = user[0]
      res.status(202).send(req.session.user);
   },
   logout: (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
   },
   getPosts: (req, res) => {
      const {userPosts, searchInput} = req.body;
      const {id} = req.params;
      const db = req.app.get('db');

      if (userPosts === true && searchInput !== '') {
         let posts = db.post.get_posts(id);
         let filterPost = posts.filter(e => e.includes(searchInput));
         return res.status(200).send(filterPost)
      } 
      if (userPosts === false && searchInput === '') {
         let allPosts = db.post.get_all_posts();
         let filtered = allPosts.filter(e => (e.author_id !== id)? e : null)
         return res.status(200).send(filtered)
      } 
      if (userPosts === false && searchInput !== '') {
         let postAll = db.post.get_all_posts();
         let postsFiltered = postAll.filter(e => e.includes(searchInput));
         res.status(200).send(postsFiltered); 
      }
      if (userPosts === true && searchInput === '') {
         let getAllPosts = db.post.get_all_post();
      }

   }
}
