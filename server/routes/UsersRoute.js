// 1. import module Router
import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.UsersCtrl.requireSignin, IndexCtrl.UsersCtrl.findAll);
router.get("/:id", IndexCtrl.UsersCtrl.findOne);
router.post("/signup/", IndexCtrl.UsersCtrl.signup);
router.post("/signin", IndexCtrl.UsersCtrl.signin); // login
router.put("/:id", IndexCtrl.UsersCtrl.update);
router.delete("/:id", IndexCtrl.UsersCtrl.remove);


export default router;
