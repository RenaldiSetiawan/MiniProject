import { sequelize } from "../../config/config-db"

const findAll = async (req, res) => {
  const tours_cart = await req.context.models.Tours_Cart.findAll({
  });
  return res.send(tours_cart);
};

// find region by id
const findOne = async (req, res) => {
  const tours_cart = await req.context.models.Tours_Cart.findOne({
    include: [
      {
        all: true,
      },
    ],
    where: { toca_id: req.params.id },
  });
  return res.send(tours_cart);
};

// Create new Table
/* const create = async (req, res) => {
  const tours_cart = await req.context.models.Tours_Cart.create({
    toca_created_on: new Date(),
    toca_status: "open",
    toca_user_id: req.body.toca_user_id,
  });
  return res.send(tours_cart);
}; */

const cekCart = async (req, res, next) => {
  const users = req.cekUser

  try {
    const tours_cart = await req.context.models.Tours_Cart.findOne({
      include: [{
        all: true
      }],
      where: {
        toca_user_id: users.user_id,
        toca_status: 'open'
      },
    });
    req.cekCart = tours_cart
    next()
  } catch (error) {
    return res.status(500).json({ message: "Input Error" + error })
  }
}

const closeCart = async (req, res, next) => {
  const orders = req.orders || req.cekOrd
  try {
    await req.context.models.Tours_Cart.update({
      toca_status: 'close'
    }, { returning: true, where: { toca_user_id: orders.order_user_id } })
    next()
  } catch (error) {
    return res.send(error)
  }
}

//create cart next
const create = async (req, res, next) => {
  const tours_cart = req.cekCart
  const users = req.cekUser
  try {
    if (!tours_cart) {
      const result = await req.context.models.Tours_Cart.create({
        toca_created_on: new Date(),
        toca_status: "open",
        toca_user_id: users.user_id
      })
      // return res.status(200).json({ message: "Input Data Berhasil" })
      req.tocart = result
    }
    next()
  } catch (error) {
    return res.status(500).json({ message: "Input Error" + error })
  }
}

const findQty = async (req, res, next) => {
  const query = req.cekCart
  try {
    const sum = await sequelize.query(
      'select count (lite_tour_id) as qty from line_items where (lite_toca_id=:liteid)',
      {
        replacements: { liteid: parseInt(query.toca_id) },
        type: sequelize.QueryTypes.SELECT
      }
    )
    req.all = sum[0]
    next()
  } catch (error) {
    return res.status(500).json({ message: "Find Error" + error })
  }
}

// UPDATE
const update = async (req, res) => {
  const { toca_created_on, toca_status } = req.body;

  const tours_cart = await req.context.models.Tours_Cart.update(
    //nama atribut yang akan di update
    {
      toca_created_on: new Date(),
      toca_status: toca_status,
    },
    { returning: true, where: { toca_id: req.params.id } }
  );
  return res.send(tours_cart);
};

// DELETE
const remove = async (req, res) => {
  const tours_cart = await req.context.models.Tours_Cart.destroy({
    where: { toca_id: req.params.id },
  });
  return res.send("Delete Cart was Successful");
};

export default {
  findAll,
  findOne,
  create,
  findQty,
  cekCart,
  closeCart,
  update,
  remove
};
