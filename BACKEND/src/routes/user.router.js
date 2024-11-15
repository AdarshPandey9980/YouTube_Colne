import { Router } from "express";
import {registerUser, login, logoutUser, refreshAccessToken} from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import {verifyJwt} from "../middleware/auth.middleware.js"

const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxcount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(login)

router.route("/logout").post(
  verifyJwt,logoutUser
)

router.route("/refresh-token").post(refreshAccessToken)

export default router;
