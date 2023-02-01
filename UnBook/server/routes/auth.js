import express from "express";

const router = express.Router();

//middleware
import { requireSignin }  from "../middlewares";

// controllers
import { 
    register,
    login, 
    currentUser,
    forgotPassword,
    profileUpdate,
    findPeople,
    addFollower,
    userFollow,
    userFollowing,
    removeFollower,
    userUnfollow,
 } from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignin, currentUser);
router.get("/forgot-password", forgotPassword);

router.put("/profile-update", requireSignin, profileUpdate);
router.get("/find-people", requireSignin, findPeople);

router.put("/user-follow", requireSignin, addFollower, userFollow);
router.get("/user-following", requireSignin, userFollowing);
router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow);

module.exports = router;

