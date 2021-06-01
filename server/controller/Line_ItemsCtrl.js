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

// UPDATE
const update = async (req, res) => {
  const { lite_qty, lite_status } = req.body;

  const line_items = await req.context.models.Line_Items.update(
    //nama atribut yang akan di update
    {
      lite_qty: lite_qty,
      lite_status: lite_status,
    },
    { returning: true, where: { lite_id: req.params.id } }
  );
  return res.send(line_items);
};

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
  create,
  update,
  remove
};
