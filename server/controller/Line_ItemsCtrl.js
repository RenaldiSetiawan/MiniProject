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

// Create new Table
const create = async (req, res) => {
  const line_items = await req.context.models.Line_Items.create({
    lite_id: req.body.lite_id,
    lite_qty: req.body.lite_qty,
    lite_status: req.body.lite_status,
    lite_tour_id: req.body.lite_tour_id,
    lite_toca_id: req.body.lite_toca_id,
    lite_order_name: req.body.lite_order_name,
    lite_toca_id: req.body.lite_toca_id,
    lite_tour_id: req.body.lite_tour_id

  });
  return res.send(line_items);
};

// UPDATE
// const update = async (req, res) => {
//   const { toca_created_on, toca_status } = req.body;

//   const tours_cart = await req.context.models.Tours_Cart.update(
//     //nama atribut yang akan di update
//     {
//       toca_created_on: toca_created_on,
//       toca_status: toca_status,
//     },
//     { returning: true, where: { toca_id: req.params.id } }
//   );
//   return res.send(tours_cart);
// };

// // DELETE
// const remove = async (req, res) => {
//   const tours_cart = await req.context.models.Tours_Cart.destroy({
//     where: { toca_id: req.params.id },
//   });
//   return res.send(true);
// };

export default {
  findAll,
  findOne,
  create,
  // update,
  // remove,
};
