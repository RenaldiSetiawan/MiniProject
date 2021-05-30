import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.post("/", IndexCtrl.Tours_ImagesCtrl.create);
router.get("/", IndexCtrl.Tours_ImagesCtrl.findAll);
router.get("/:id", IndexCtrl.Tours_ImagesCtrl.findOne);
router.put("/:id", IndexCtrl.Tours_ImagesCtrl.update); //update Field
router.delete("/:id", IndexCtrl.Tours_ImagesCtrl.remove);

//Create
router.post("/multipart", IndexCtrl.Tours_ImagesCtrl.createFileType); 




export default router;
