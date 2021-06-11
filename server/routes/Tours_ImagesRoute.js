import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.get("/", IndexCtrl.Tours_ImagesCtrl.findAll);
router.get("/:id", IndexCtrl.Tours_ImagesCtrl.findOne);
router.put("/:id", IndexCtrl.Tours_ImagesCtrl.update);
router.delete("/:id", IndexCtrl.Tours_ImagesCtrl.remove);
router.post("/multipart", IndexCtrl.Tours_ImagesCtrl.createFileType);
router.get('/photo/:filename', IndexCtrl.UploadDownloadCtrl.download,
                                IndexCtrl.Tours_ImagesCtrl.defaultPhoto);

export default router;
