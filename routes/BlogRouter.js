var express = require('express');
var router = express.Router();
const Blog = require('./models/Blog');


// get blogs
router.get('/blogs', (req, res) => {
  Blog.find({}).then(blogs => {
    return res.status(200).json({ message: 'Success', blogs });
  }).catch(err=>res.status(500).json({message: 'Server Error', err}))
});

//post a blog
router.post('/blogs', (req, res) => {

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

// update a blog
router.put('/update/:id', (req, res) => {
  Blog.findById({ _id: req.params.id}).then(blog => {
    if (blog) {
      blog.title = req.body.title
        ? req.body.title
        : blog.title;

      blog
        .save()
        .then(updated => {
          return res
            .status(200)
            .json({ message: 'Blog Updated', updated });
        })
        .catch(err =>
          res.status(500).json({ message: 'Unable to update the blog', err })
        );
    } else {
      return res.status(200).json({ message: 'Cannot find the blog' });
    }
  }).catch(err=> res.status(500).json({message: 'Server Error', err}));
});

// delete a blog
router.delete('/delete/:id', (req, res) => {
  Blog.findByIdAndDelete({ _id: req.params.id })
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
router.get('/blogs/:id', (req, res) => {
  Blog.findById({ _id: req.params.id }).then(blog => {
    if(blog) {
      return res.status(200).json({ blog });
    }else {
      return res.status(200).json({message: 'blog not found'});
    }
    })
  .catch(err => res.status(500).json({ message: 'cannot view the blog', err }));
});



module.exports = router;
