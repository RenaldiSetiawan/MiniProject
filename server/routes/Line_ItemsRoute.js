import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.post("/", IndexCtrl.Line_ItemsCtrl.create);
router.get("/", IndexCtrl.Line_ItemsCtrl.findAll);
router.get("/:id", IndexCtrl.Line_ItemsCtrl.findOne);
// router.put("/:id", IndexCtrl.Line_ItemsCtrl.update);
// router.delete("/:id", IndexCtrl.Line_ItemsCtrl.remove);

export default router;
