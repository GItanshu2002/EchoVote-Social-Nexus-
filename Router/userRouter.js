const express = require("express");
const Router = express.Router();
const controller = require("../Controller/index");
const validation = require("../Middleware/validationFunctions");
const schema = require("../Model/index");

// authorization
const authorization = async (req, res, next) => {
  try {
    const get_id = await req.headers.authorization; // get user authorization token
    if (get_id) {
      const getuser = await schema.user.findOne({
        accessToken: get_id,
      });
      if (getuser) {
        req.user = getuser;
        next();
      } else {
        res.status(400).send("Unauthorize user");
      }
    } else {
      res.status(400).send("Authorization required");
    }
  } catch (err) {
    throw err;
  }
};

// SignUp
Router.post("/Login_signUp", validation.validLogin, async (req, res) => {
  try {
    const LoginSignUp = await controller.userController.Login_signUp(req.body);
    res.status(200).send(LoginSignUp);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Social Login
Router.post("/socialLogin", async (req, res) => {
  try {
    const socialLogin = await controller.userController.social_login(req.body);
    res.status(200).send(socialLogin);
  } catch (err) {
    res.status(400).send(err);
  }
});

// LogOut
Router.put("/logout", authorization, async (req, res) => {
  try {
    const logout = await controller.userController.logout(req.user);
    res.status(200).send(logout);
  } catch (err) {
    res.status(400).send(err);
  }
});

// OTP verification
Router.get("/otpVerification", async (req, res) => {
  try {
    const otpValid = await controller.userController.verifyOtp(req.body);
    res.status(200).send(otpValid);
  } catch (err) {
    res.status(400).send(err);
  }
});

// profile setup
Router.put(
  "/setUp_Profile",
  validation.validProfileFormat,
  authorization,
  async (req, res) => {
    try {
      let getUser = req.user;
      const setUpProfile = await controller.userController.setUp_Profile(
        req.body,
        getUser
      );
      res.status(200).send(setUpProfile);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// edit profile
Router.put(
  "/edit_profile",
  validation.validEditProfileFormat,
  authorization,
  async (req, res) => {
    try {
      let getUser = req.user;
      const editProfile = await controller.userController.edit_Profile(
        req.body,
        getUser
      );
      res.status(200).send(editProfile);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// View Onboarding
Router.get("/viewOnboarding", async (req, res) => {
  try {
    const viewOnboarding = await controller.userController.viewonBoarding(
      req.body
    );
    res.status(200).send(viewOnboarding);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Terms & Condtions
Router.get("/termsConditions", async (req, res) => {
  try {
    const list = await controller.userController.get_termsConditions(req.body);
    res.status(200).send(list);
  } catch (err) {
    res.status(400).send(err);
  }
});

// privacyPolicy
Router.get("/privacyPolicy", async (req, res) => {
  try {
    const list = await controller.userController.get_privacyPolicy(req.body);
    res.status(200).send(list);
  } catch (err) {
    res.status(400).send(err);
  }
});

//suggest_username
Router.get("/suggestion", authorization, async (req, res) => {
  try {
    let get_user = req.user;
    const list = await controller.userController.suggest_username(get_user);
    res.status(200).send(list);
  } catch (err) {
    res.status(400).send(err);
  }
});

//add_edit_post
Router.post(
  "/add_edit_post",
  validation.validPostFormat,
  authorization,
  async (req, res) => {
    try {
      let get_user = req.user;
      const addeditPost = await controller.userController.add_edit_post(
        req.body,
        get_user
      );
      res.status(200).send(addeditPost);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

// delete post
Router.get("/delete_post", authorization, async (req, res) => {
  try {
    const getPost = await controller.userController.delete_posts(
      req.body,
      req.user
    );
    res.status(200).send(getPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

//send friend req
Router.post("/send_friendreq", authorization, async (req, res) => {
  try {
    let get_user = req.user;
    const addeditPost = await controller.userController.send_friendreq(
      req.body,
      get_user
    );
    res.status(200).send(addeditPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

// approve friend req
Router.post("/respond_to_friend_req", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const approveReq = await controller.userController.respond_to_friend_req(
      req.body,
      get_user
    );
    res.status(200).send(approveReq);
  } catch (err) {
    res.status(400).send(err);
  }
});

// remove friend
Router.get("/removeFriend", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const removeFriend = await controller.userController.remove_friend(
      req.body,
      get_user
    );
    res.status(200).send(removeFriend);
  } catch (err) {
    res.status(400).send(err);
  }
});

// user friend list
Router.get("/userfriendList", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const userfriendList = await controller.userController.userfriendList(
      req.body,
      get_user
    );
    res.status(200).send(userfriendList);
  } catch (err) {
    res.status(400).send(err);
  }
});

// homePage
Router.get("/homepage", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const list = await controller.userController.homepage_posts(
      req.body,
      get_user
    );
    res.status(200).send(list);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// reply_to_post
Router.post(
  "/postReply",
  validation.validPostInteraction,
  authorization,
  async (req, res) => {
    try {
      const postReply = await controller.userController.reply_to_post(
        req.body,
        req.user
      );
      res.status(200).send(postReply);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// comment post
Router.post(
  "/comment",
  validation.validPostComment,
  authorization,
  async (req, res) => {
    try {
      const comment = await controller.userController.comment(
        req.body,
        req.user
      );
      res.status(200).send(comment);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// reply to comment post
Router.post(
  "/commentreply",
  validation.validCommentReply,
  authorization,
  async (req, res) => {
    try {
      const commentreply = await controller.userController.reply_to_comment(
        req.body,
        req.user
      );
      res.status(200).send(commentreply);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// join a post
Router.put(
  "/participant_post_upload",
  validation.validPostInteraction,
  authorization,
  async (req, res) => {
    try {
      let get_user = req.user;
      const uploadjoinPost =
        await controller.userController.participant_post_upload(
          req.body,
          get_user
        );
      res.status(200).send(uploadjoinPost);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// add post follower
Router.post("/followPost", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const addfollower = await controller.userController.save_post_followers(
      req.body,
      get_user
    );
    res.status(200).send(addfollower);
  } catch (err) {
    res.status(400).send(err);
  }
});

// add post follower
Router.get("/followedPostList", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const getList = await controller.userController.get_followed_posts(
      req.body,
      get_user
    );
    res.status(200).send(getList);
  } catch (err) {
    res.status(400).send(err);
  }
});

// vote
Router.post("/vote", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const vote = await controller.userController.vote(req.body, get_user);
    res.status(200).send(vote);
  } catch (err) {
    res.status(400).send(err);
  }
});

// vote
Router.get("/postResult", async (req, res) => {
  try {
    const postResult = await controller.userController.post_result(req.body);
    res.status(200).send(postResult);
  } catch (err) {
    res.status(400).send(err);
  }
});

// search
Router.get("/search", async (req, res) => {
  try {
    const search = await controller.userController.search_user(req.body);
    res.status(200).send(search);
  } catch (err) {
    res.status(400).send(err);
  }
});

// search friend
Router.get("/searchfriend", authorization, async (req, res) => {
  try {
    const search = await controller.userController.search_friend(
      req.body,
      req.user
    );
    res.status(200).send(search);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Result listing
Router.get("/resultlisting", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const resultlist = await controller.userController.getResultList(
      req.body,
      get_user
    );
    res.status(200).send(resultlist);
  } catch (err) {
    res.status(400).send(err);
  }
});

// view user profile when other view
Router.get("/view_userprofile", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const viewprofile = await controller.userController.viewprofile(
      req.body,
      get_user
    );
    res.status(200).send(viewprofile);
  } catch (err) {
    res.status(400).send(err);
  }
});

// view user profile when user himself view
Router.get("/myprofile", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const myprofile = await controller.userController.myprofile(
      req.body,
      get_user
    );
    res.status(200).send(myprofile);
  } catch (err) {
    res.status(400).send(err);
  }
});

// user specific post listing using aggrigation
Router.get("/winList", authorization, async (req, res) => {
  try {
    const resultList = await controller.userController.winList(
      req.body,
      req.user
    );
    res.status(200).send(resultList);
  } catch (err) {
    res.status(400).send(err);
  }
});
Router.get("/losseList", authorization, async (req, res) => {
  try {
    const resultList = await controller.userController.losseList(
      req.body,
      req.user
    );
    res.status(200).send(resultList);
  } catch (err) {
    res.status(400).send(err);
  }
});
Router.get("/tieList", authorization, async (req, res) => {
  try {
    const resultList = await controller.userController.tieList(
      req.body,
      req.user
    );
    res.status(200).send(resultList);
  } catch (err) {
    res.status(400).send(err);
  }
});

// My notifications
Router.get("/notifications", authorization, async (req, res) => {
  try {
    const List = await controller.userController.myNotifications(req.user);
    res.status(200).send(List);
  } catch (err) {
    res.status(400).send(err);
  }
});

// view post
// Router.get("/viewinvitedPost", authorization, async (req, res) => {
//   try {
//     get_user = req.user;
//     const list = await controller.userController.view_invited_posts(
//       req.body,
//       get_user
//     );
//     res.status(200).send(list);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// view post
// Router.get("/userController", async (req, res) => {
//   try {
//     const list = await controller.userController.view_all_posts(req.body);
//     res.status(200).send(list);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

module.exports = Router;
