const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// router.get('/',(req,res) => {
//     res.send("It is user Routes");
// });

//Update a User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).json("User detail updated successfully! ");
    } catch(err) {
        res.status(500).json(err);
    }
  } else {
    res.status(404).json("You can only update your own details! ");
  }
});

//Delete a User
router.delete('/:id', async (req,res) => {
    if( req.body.userId == req.params.id || req.body.isAdmin )
    {
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Your account has been successfully deleted! ");
        }catch(err){
            res.status(500).json(err);
        }
    } else {
        res.status(404).json("Sorry you cannot delete other user's account! ");
    }
});


//Get a User
router.get('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password,updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err);
    }
});


//Follow a User
router.put('/:id/follow', async (req,res) => {
    if(req.params.id !== req.body.userId) {
        try{
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userId}});
                await currUser.updateOne({ $push: {followings: req.params.id}});
                res.status(200).json("You started following this user!");
            }else{
                res.status(403).json("You already follow this user!");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else {
        res.status(403).json("You cannot follow yourself!");
    }
});

//Unfollow a User
router.put('/:id/unfollow', async (req,res) => {
    if(req.params.id !== req.body.userId) {
        try{
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userId}});
                await currUser.updateOne({ $pull: {followings: req.params.id}});
                res.status(200).json("You unfollowed this user!");
            }else{
                res.status(403).json("You don't follow this user!");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else {
        res.status(403).json("You cannot unfollow yourself!");
    }
});


module.exports = router;
