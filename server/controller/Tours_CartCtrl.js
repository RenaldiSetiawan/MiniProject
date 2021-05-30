// findAll = select * from tour_commnents
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
const create = async (req, res) => {
  const tours_cart = await req.context.models.Tours_Cart.create({
    toca_id: req.body.toca_id,
    toca_created_on: req.body.toca_created_on,
    toca_status: req.body.toca_status,
    toca_user_id: req.body.toca_user_id,
  });
  return res.send(tours_cart);
};

// UPDATE
const update = async (req, res) => {
  const { toca_created_on, toca_status } = req.body;

  const tours_cart = await req.context.models.Tours_Cart.update(
    //nama atribut yang akan di update
    {
      toca_created_on: toca_created_on,
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
  return res.send(true);
};

export default {
  findAll,
  findOne,
  create,
  update,
  remove,
};
