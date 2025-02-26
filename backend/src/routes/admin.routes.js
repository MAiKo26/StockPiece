import express from "express";
import {
  createAdmin,
  createCharacterStock,
  adminLogin,
  deleteCharacterStockTemp,
  deleteAdmin,
  adminLogout,
  updateStockImage,
  getErrorLogs,
  getUserByUsername,
  getTopTradersByChapter,
} from "../controllers/admin.controllers.js";
import { verifyAdminJWT } from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.middlewares.js";

const adminRouter = express.Router();

adminRouter.route("/auth/login").post(adminLogin);

//protected routes
adminRouter.use(verifyAdminJWT);

adminRouter.route("/admins").post(createAdmin).delete(deleteAdmin);

adminRouter.route("/auth/logout").post(adminLogout);
adminRouter
  .route("/character-stocks")
  .post(upload.single("imageURL"), createCharacterStock)
  .delete(deleteCharacterStockTemp);

adminRouter
  .route("/character-stocks/image")
  .patch(upload.single("imageURL"), updateStockImage);

adminRouter.route("/users").get(getUserByUsername);

adminRouter.route("/errors").get(getErrorLogs);

adminRouter.route("/top-traders").get(getTopTradersByChapter);

export default adminRouter;
