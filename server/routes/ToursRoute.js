import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.post("/", IndexCtrl.ToursCtrl.create,
                 IndexCtrl.ToursCtrl.defaultPhoto);
                 
router.get("/", IndexCtrl.ToursCtrl.findAll); 
router.get("/:id", IndexCtrl.ToursCtrl.findOne); 
router.put("/:id", IndexCtrl.ToursCtrl.update); 
router.delete("/:id", IndexCtrl.ToursCtrl.remove);


export default router;
