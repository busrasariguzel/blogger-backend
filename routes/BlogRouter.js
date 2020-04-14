var express = require('express');
var router = express.Router();
const Blog = require('./models/Blog');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

// get blogs

router.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    return res.status(200).json({ message: 'Success', blogs });
  }).catch(err=>res.status(500).json({message: 'Server Error', err}))
});



//post a blog
router.post('/', (req, res) => {

  Blog.findOne({ blog: req.body.title })
    .then((blog) => {
      if (blog) {
        return res
          .status(500)
          .json({ message: 'Blog is already in the blog' });
      }

      const newBlog = new Blog();
      newBlog.title = req.body.title;
      newBlog.author = req.body.author;
      newBlog.subject = req.body.subject;
      newBlog.article = req.body.article;

      newBlog
        .save()
        .then((blog) => {
          return res.status(200).json({ message: 'Success', blog });
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json({ message: 'Server Error' }, err));
});

// delete a blog
router.delete('/:title', (req, res) => {
  Blog.findOneAndDelete({ title: req.params.title })
    .then(blog => {
      if(blog) {
        return res.status(200).json({ message: 'Blog deleted', blog });
      }else {
        return res.status(200).json({message: 'blog not found'});
      }
      })
    .catch(err => res.status(500).json({ message: 'cannot delete the blog', err }));
});

// find a blog 
router.get('/:title', (req, res) => {
  Blog.findOne({ title: req.params.title }).then(blog => {
    if(blog) {
      return res.status(200).json({ blog });
    }else {
      return res.status(200).json({message: 'blog not found'});
    }
    })
  .catch(err => res.status(500).json({ message: 'cannot view the blog', err }));
});



module.exports = router;
