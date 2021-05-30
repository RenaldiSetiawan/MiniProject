import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.post("/", IndexCtrl.Tours_CommentsCtrl.create);
router.get("/", IndexCtrl.Tours_CommentsCtrl.findAll);
router.get("/:id", IndexCtrl.Tours_CommentsCtrl.findOne);
router.put("/:id", IndexCtrl.Tours_CommentsCtrl.update);
router.delete("/:id", IndexCtrl.Tours_CommentsCtrl.remove);

export default router;
