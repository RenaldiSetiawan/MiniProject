import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.post("/", IndexCtrl.Tours_CartCtrl.create);
router.get("/", IndexCtrl.Tours_CartCtrl.findAll);
router.get("/:id", IndexCtrl.Tours_CartCtrl.findOne);
router.put("/:id", IndexCtrl.Tours_CartCtrl.update);
router.delete("/:id", IndexCtrl.Tours_CartCtrl.remove);

export default router;
