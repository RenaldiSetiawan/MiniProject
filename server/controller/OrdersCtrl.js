// findAll = select * from tour_commnents
const findAll = async (req, res) => {
  const orders = await req.context.models.Orders.findAll();
  return res.send(orders);
};

// find region by id
const findOne = async (req, res) => {
  const orders = await req.context.models.Orders.findOne({
    where: { order_name: req.params.id },
  });
  return res.send(orders);
};

// Create new Table
const create = async (req, res) => {
  const orders = await req.context.models.Orders.create({
    order_name: req.body.order_name,
    order_created_on: req.body.order_created_on,
    order_total_children: req.body.order_total_children,
    order_discount: req.body.order_discount,
    order_tax: req.body.order_tax,
    order_total_due: req.body.order_total_due,
    order_total_qty: req.body.order_total_qty,
    order_payt_trx_number: req.body.order_payt_trx_number,
    order_city: req.body.order_city,
    order_address: req.body.order_address,
    order_status: req.body.order_status,
    order_user_id: req.body.order_user_id,
  });
  return res.send(orders);
};

// UPDATE
const update = async (req, res) => {
  const {
    order_created_on,
    order_total_children,
    order_discount,
    order_tax,
    order_total_due,
    order_total_qty,
    order_payt_trx_number,
    order_city,
    order_address,
    order_status,
  } = req.body;
  const orders = await req.context.models.Orders.update(
    //nama atribut yang akan di update
    {
      order_created_on: order_created_on,
      order_total_children: order_total_children,
      order_discount: order_discount,
      order_tax: order_tax,
      order_total_due: order_total_due,
      order_total_qty: order_total_qty,
      order_payt_trx_number: order_payt_trx_number,
      order_city: order_city,
      order_addres: order_address,
      order_status: order_status,
    },
    { returning: true, where: { order_name: req.params.id } }
  );
  return res.send(orders);
};

// DELETE
const remove = async (req, res) => {
  const orders = await req.context.models.Orders.destroy({
    where: { order_name: req.params.id },
  });
  return res.send("Delete Order Success");
};

const payment = async (req, res, next) => {
  const prices = req.cekUser
  const qty = req.all.qty
  const payment = {}
  let price = 0
  let discount = 0
  let tax = 0
  let due = 0
  for (const data of prices.tours) {
    try {
      price += parseInt(data.tour_price)
      if (qty > 1) {
        discount = 0.05 * price
      }
      tax = (price - discount) * 0.1
      due = price - discount + tax
      payment['price'] = price
      payment['discount'] = discount
      payment['tax'] = tax
      payment['due'] = due
    } catch (error) {
      return res.status(500).json({ message: "Orders Error" + error })
    }
  }
  req.payment = payment
  next()
}

const cekOrd = async (req, res, next) => {
  const users = req.cekUser
  try {
    const orders = await req.context.models.Orders.findOne({
      where: {
        order_user_id: users.user_id,
        order_status: 'open'
      },
    });
    req.cekOrd = orders
    next()
  } catch (error) {
    return res.status(500).json({ message: "Input Error" + error })
  }
}

const createOrd = async (req, res, next) => {
  try {
    const users = req.cekUser
    const cekorder = req.cekOrd
    if (!cekorder) {
      const orders = await req.context.models.Orders.create({
        order_total_children: req.payment.price,
        order_discount: req.payment.discount,
        order_tax: req.payment.tax,
        order_total_due: req.payment.due,
        order_total_qty: req.all.qty,
        order_city: req.body.order_city,
        order_address: req.body.order_address,
        order_status: 'open',
        order_user_id: users.user_id
      })
      req.orders = orders
    }
    next()
  } catch (error) {
    return res.status(500).json({ message: "Orders Error" + error })
  }
}

/* const checkout = async(req, res)=>{
  try {
      const body = {
          user_id: req.users.id,
          order_name: req.body.order_name,
          order_created_on: req.order_created_on,
          tours_cart: req.body.tours_cart,
          order_status: req.body.order_status,
      }
      await usecase.checkout(body)
      res.status(200).json({
          message: "success"
      })
  } catch (error) {
      console.log("error", error)
      res.status(500).json(error)
  }
} */

/* const getAllOrdersByUsersId= async(req, res)=>{
  try {
      const data = await req.context.models.Orders.getAllOrdersByUsersId(req.users.id)
      res.send(data)
  } catch (error) {
      console.log("asdf", error)
      res.statusCode = 500
      res.send(error)
  }
} */

export default {
  findAll,
  findOne,
  create,
  update,
  remove,
  payment,
  cekOrd,
  createOrd
  /* checkout,
  getAllOrdersByUsersId */
};
