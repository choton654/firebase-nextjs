const { db, admin } = require('../utils/admin');

exports.getPosts = (req, res) => {
  db.collection('posts')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) =>
        posts.push({
          postId: doc.id,
          text: doc.data().text,
          userHandel: doc.data().userHandel,
          createdAt: doc.data().createdAt,
        }),
      );
      return res.json(posts);
    })
    .catch((err) => console.error(err));
};

exports.createPosts = (req, res) => {
  const newPost = {
    text: req.body.text,
    userHandel: req.body.userHandel,
    createdAt: new Date().toISOString(),
  };
  db.collection('posts')
    .add(newPost)
    .then((doc) => res.json({ msg: `doc created of id ${doc.id}` }))
    .catch((err) => console.error(err));
};
