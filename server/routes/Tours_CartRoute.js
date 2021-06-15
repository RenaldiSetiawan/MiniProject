import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.post("/", IndexCtrl.Tours_CartCtrl.create);
router.get("/", IndexCtrl.Tours_CartCtrl.findAll);
router.get("/:id", IndexCtrl.Tours_CartCtrl.findOne);
router.put("/:id", IndexCtrl.Tours_CartCtrl.update);
router.delete("/:id", IndexCtrl.Tours_CartCtrl.remove);

// router.post("/lite/id", IndexCtrl.UsersCtrl.checkL,
//                         IndexCtrl.ToursCtrl.findOne,
//                         IndexCtrl.Tours_CartCtrl.createc,
//                         IndexCtrl.Line_ItemsCtrl.createlite);

// router.post("/chartLine", IndexCtrl.Tours_CartCtrl.findCreateCart,
//                           IndexCtrl.Line_ItemsCtrl.createlineItem);

// router.get("/findAllOpen", IndexCtrl.Tours_CartCtrl.findAllOpen)

export default router;
