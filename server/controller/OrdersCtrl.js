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
  return res.send(true);
};

export default {
  findAll,
  findOne,
  create,
  update,
  remove,
};
