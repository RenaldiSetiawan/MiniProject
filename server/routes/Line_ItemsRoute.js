import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.post("/", IndexCtrl.Line_ItemsCtrl.create);
router.get("/", IndexCtrl.Line_ItemsCtrl.findAll);
router.get("/:id", IndexCtrl.Line_ItemsCtrl.findOne);
router.put("/:id", IndexCtrl.Line_ItemsCtrl.update);
router.delete("/:id", IndexCtrl.Line_ItemsCtrl.remove);

router.post("/item/:id", IndexCtrl.UsersCtrl.cekUser,
                        IndexCtrl.Tours_CartCtrl.cekCart,
                        IndexCtrl.Tours_CartCtrl.create,
                        IndexCtrl.ToursCtrl.findOut,
                        IndexCtrl.Line_ItemsCtrl.create)

export default router;
