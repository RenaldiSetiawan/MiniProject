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
const update = async(req,res,next) =>{    
  try {
  const user = req.cekUser
  const cekorder = req.cekOrd
      if(cekorder){
      const order = await req.context.models.Orders.update({
          order_payt_trx_number:req.body.order_payt_trx_number,
          order_status:'paid'
      },{where: { order_user_id: user.user_id,order_name:cekorder.order_name}})
      req.orders = order
  }
  next()
  } catch (error) {
      return res.status(500).json({message : "Order Error"+error})
  }
}

// DELETE
const remove = async (req, res) => {
  const orders = await req.context.models.Orders.destroy({
    where: { order_name: req.params.id },
  });
  return res.send("Delete Order Success");
};

const payment = async (req, res, next) => {
  const prices = req.cekCart
  const payment = {}
  let price = 0
  let discount = 0
  let tax = 0
  let due = 0
  let qty = 0

  for (const data of prices.line_items) {
    try {
      price += parseInt(data.price)
      qty += parseInt(data.lite_qty) 
      if (req.all.qty > 1) {
        discount = 0.05 * price
      }
    
      tax = (price - discount) * 0.1
      due = price - discount + tax
      payment['price'] = price
      payment['discount'] = discount
      payment['tax'] = tax
      payment['due'] = due
      payment['qty'] = qty 
      
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
        order_total_qty: req.payment.qty,
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

export default {
  findAll,
  findOne,
  create,
  update,
  remove,
  payment,
  cekOrd,
  createOrd
};
