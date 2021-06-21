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

const create = async (req, res, next) => {
 
  try {
    const tours = req.tours
    const tours_cart= req.tocart || req.cekCart
    const cekLite = req.liteitem
    const price = tours.tour_price * req.body.lite_qty
    if (!cekLite) { 
    const item = await req.context.models.Line_Items.create(
      {
        lite_qty: req.body.lite_qty,
        lite_status: 'cart',
        lite_tour_id: tours.tour_id,
        lite_toca_id: tours_cart.toca_id,
        price: price
      })
      return res.send(item)
    }
    return res.send("item Done")
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


export default {
  findAll,
  findOne,
  cekLite,
  cekLine,
  updateLite,
  create,
  remove,
 
};
