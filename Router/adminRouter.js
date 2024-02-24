const express = require("express");
const Router = express.Router();
const controller = require("../Controller/index");
const schema = require("../Model/index");
const validation = require("../Middleware/validationFunctions");

// authorization
const authorization = async (req, res, next) => {
  try {
    const get_token = await req.headers.authorization; // get user authorization token
    if (get_token) {
      const getuser = await schema.admin.findOne({
        accessToken: get_token,
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

// Login
Router.get("/login", validation.adminLogin, async (req, res) => {
  try {
    const adminLogin = await controller.adminController.admin_login(req.body);
    res.status(200).send(adminLogin);
  } catch (err) {
    res.status(400).send(err);
  }
});

// LogOut
Router.put("/logout", authorization, async (req, res) => {
  try {
    const logout = await controller.adminController.logout(req.user);
    res.status(200).send(logout);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Onboarding
Router.post("/createOnboarding", authorization, async (req, res) => {
  try {
    const createOnboarding = await controller.adminController.createonBoarding(
      req.body
    );
    res.status(200).send(createOnboarding);
  } catch (err) {
    res.status(400).send(err);
  }
});

// deleteOnboarding
Router.get("/deleteOnboarding", authorization, async (req, res) => {
  try {
    const deleteOnboarding = await controller.adminController.deleteOnboarding(
      req.body
    );
    res.status(200).send(deleteOnboarding);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Edit Terms & Condtions
Router.post("/termsConditions", authorization, async (req, res) => {
  try {
    const list = await controller.adminController.updateTermsConditions(
      req.body
    );
    res.status(200).send(list);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Edit privacyPolicy
Router.post("/privacyPolicy", authorization, async (req, res) => {
  try {
    const list = await controller.adminController.updateprivacyPolicy(req.body);
    res.status(200).send(list);
  } catch (err) {
    res.status(400).send(err);
  }
});

// delete user
Router.post("/deleteUser", authorization, async (req, res) => {
  try {
    const deleteUser = await controller.adminController.delete_user(req.body);
    res.status(200).send(deleteUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
// delete user
Router.post("/deletepost", authorization, async (req, res) => {
  try {
    const postUser = await controller.adminController.delete_post(req.body);
    res.status(200).send(postUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
// block user
Router.post("/blockUser", authorization, async (req, res) => {
  try {
    const blockUser = await controller.adminController.block_user(req.body);
    res.status(200).send(blockUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// user specific post listing using aggrigation
Router.get("/userpostlist", authorization, async (req, res) => {
  try {
    const postDetails = await controller.adminController.userList(
      req.body,
      req.user
    );
    res.status(200).send(postDetails);
  } catch (err) {
    res.status(400).send(err);
  }
});

//
Router.get("/postDetails", authorization, async (req, res) => {
  try {
    get_user = req.user;
    const postDetails = await controller.adminController.postList(
      req.body,
      get_user
    );
    res.status(200).send(postDetails);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = Router;
