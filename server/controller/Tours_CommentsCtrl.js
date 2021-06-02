const findAll = async (req, res) => {
  const tours_comments = await req.context.models.Tours_Comments.findAll();
  return res.send(tours_comments);
};

// find region by id
const findOne = async (req, res) => {
  const tours_comments = await req.context.models.Tours_Comments.findOne({
    where: { toco_id: req.params.id },
  });
  return res.send(tours_comments);
};

// Create new Table
const create = async (req, res) => {
  const tours_comments = await req.context.models.Tours_Comments.create({
    toco_id: req.body.toco_id,
    toco_comments: req.body.toco_comments,
    toco_created_on: new Date(),
    toco_rating: req.body.toco_rating,
    toco_tour_id: req.body.toco_tour_id,
    toco_user_id: req.body.toco_user_id,
  });
  return res.send(tours_comments);
};

// UPDATE
const update = async (req, res) => {
  const { toco_comments, toco_created_on, toco_rating } = req.body;
  const tours_comments = await req.context.models.Tours_Comments.update(
    //nama atribut yang akan di update
    {
      toco_comments: toco_comments,
      toco_created_on: new Date(),
      toco_rating: toco_rating,
    },
    { returning: true, where: { toco_id: req.params.id } }
  );
  return res.send(tours_comments);
};

// DELETE
const remove = async (req, res) => {
  const tours_comments = await req.context.models.Tours_Comments.destroy({
    where: { toco_id: req.params.id },
  });
  return res.send("Delete ToursComments was Successful");
};

export default {
  findAll,
  findOne,
  create,
  update,
  remove,
};
