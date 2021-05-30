import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.post("/", IndexCtrl.ToursCtrl.create);
router.get("/", IndexCtrl.ToursCtrl.findAll); 
router.get("/:id", IndexCtrl.ToursCtrl.findOne); // BY Id
router.put("/:id", IndexCtrl.ToursCtrl.update); // Update by Id
router.delete("/:id", IndexCtrl.ToursCtrl.remove);

export default router;
