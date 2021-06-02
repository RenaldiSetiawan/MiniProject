import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();
router.post("/", IndexCtrl.OrdersCtrl.create);
router.get("/", IndexCtrl.OrdersCtrl.findAll);
router.get("/:id", IndexCtrl.OrdersCtrl.findOne);
router.put("/:id", IndexCtrl.OrdersCtrl.update);
router.delete("/:id", IndexCtrl.OrdersCtrl.remove);

router.post('/ord/:id', IndexCtrl.UsersCtrl.cekUser,
                        IndexCtrl.Tours_CartCtrl.cekCart,
                        IndexCtrl.Tours_CartCtrl.findQty,
                        IndexCtrl.OrdersCtrl.payment,
                        IndexCtrl.OrdersCtrl.cekOrd,
                        IndexCtrl.OrdersCtrl.createOrd,
                        IndexCtrl.Tours_CartCtrl.closeCart,
                        IndexCtrl.Line_ItemsCtrl.cekLine);

// router.get("/:id", IndexCtrl.OrdersCtrl.getAllOrdersByUsersId);

export default router;
