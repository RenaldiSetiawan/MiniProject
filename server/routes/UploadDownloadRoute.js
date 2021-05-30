import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.post("/", IndexCtrl.UploadDownloadCtrl.upload);
router.post("/multipart/", IndexCtrl.UploadDownloadCtrl.uploadMultipart);
router.get("/:filename", IndexCtrl.UploadDownloadCtrl.download);

export default router;
