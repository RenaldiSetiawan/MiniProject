// findAll = select * from tour_commnents
const findAll = async (req, res) => {
  const line_items = await req.context.models.Line_Items.findAll();
  return res.send(line_items);
};

// find region by id
const findOne = async (req, res) => {
  const line_items = await req.context.models.Line_Items.findOne({
    where: { lite_id: req.params.id },
  });
  return res.send(line_items);
};

const cekLine = async (req, res, next) => {
  const orders = req.orders || req.cekOrd
  const closes = req.cekCart

  for (const data of closes.line_items) {
    try {
      await req.context.models.Line_Items.update({
        lite_status: 'checkout',
        lite_order_name: orders.order_name
      },
        { return: true, where: { lite_id: data.lite_id } })
    } catch (error) {
      return res.send(error)
    }
  }
  return res.send(orders)
}

const cekLite = async (req, res, next) => {
  const cekLiteCart = req.tocart || req.cekCart
  const cekTours = req.tours
  try {
    const item = await req.context.models.Line_Items.findOne({
      where: {
        lite_tour_id: cekTours.tour_id,
        lite_toca_id: cekLiteCart.toca_id,
        lite_status: 'cart'
      },
    });
    req.liteitem = item
    next()
  } catch (error) {
    return res.status(500).json({ message: "Input Error" + error })
  }
}

const updateLite = async (req, res) => {
  try {
    const cekLite = req.liteitem
    const cekTours = req.tours
    const item = await req.context.models.Line_Items.update({
      lite_qty: req.body.lite_qty,
    }, { returning: true, where: { lite_id: cekLite.lite_id } })
    return res.send(item)
  } catch (error) {
    return res.send(error)
  }
}

const create = async (req, res) => {
  const tours = req.tours
  let tours_cart;
  if (req.cekCart) {
    tours_cart = req.cekCart
  } else {
    tours_cart = req.tocart
  }

  try {
    const item = await req.context.models.Line_Items.create(
      {
        lite_qty: req.body.lite_qty,
        lite_status: 'cart',
        lite_tour_id: tours.tour_id,
        lite_toca_id: tours_cart.toca_id,
      })
    return res.send(item)
  } catch (error) {
    return res.send(error);
  }
}

// DELETE
const remove = async (req, res) => {
  const line_items = await req.context.models.Line_Items.destroy({
    where: { lite_id: req.params.id },
  });
  return res.send("Delete LineItems was Successful");
};

const createlite = async (req, res) => {
  const cart = req.cart;
  const tours = req.tours;
  try {

    const item = await req.context.models.Line_Items.create(
      {
        lite_qty: req.body.lite_qty,
        lite_status: "open",
        lite_tour_id: tours.tale_id,
        lite_toca_id: cart.toca_id,
      },
      { returning: true, where: { lite_id: req.params.id } }
    );

    return res.send(item);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

// const createlineItem = async (req, res) => {
//   try {
//     const item = await req.context.models.Line_Items.create(
//       {
//         lite_qty: req.body.lite_qty,
//         lite_status: "open",
//         lite_tour_id: req.body.lite_tour_id,
//         lite_toca_id: req.dataLine.toca_id,
//         price: req.body.price,
//       },
//       { returning: true, where: { lite_id: req.params.id } }
//     );

//     return res.send(item);
//   } catch (error) {
//     console.log(error);
//     return res.send(error);
//   }
// };

export default {
  findAll,
  findOne,
  cekLite,
  cekLine,
  updateLite,
  create,
  remove,
  // createlite,
  // createlineItem
};
