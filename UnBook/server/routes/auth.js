import express from "express";

const router = express.Router();

//middleware
import { requireSignin, canDeleteUser, isAdmin } from "../middlewares";

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
    searchUser,
    getUser,
    deleteUser,
    users,
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

router.get("/search_user/:query", searchUser);
router.get("/user/:username", getUser);

router.get("/current-admin", requireSignin, isAdmin, currentUser);

router.get("/users", users);

router.delete("/admin/delete-user/:_id", requireSignin, isAdmin, deleteUser);
router.delete(
  "/delete-user/:_id", 
  requireSignin, 
  canDeleteUser, 
  deleteUser
  );

module.exports = router;

