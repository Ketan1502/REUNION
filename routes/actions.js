const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

//like a post
router.put('/like/:id', async (req,res) => {

});

//unlike a post
router.put('/unlike/:id', async (req,res) => {

});

//comment on a post
router.put('/comment/:id', async (req,res) => {

});

//get all_posts
router.get('/all_posts', async (req,res) => {

});


module.exports = router;