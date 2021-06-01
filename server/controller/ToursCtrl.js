// findAll = select * table
const findAll = async (req, res) => {
  const tours = await req.context.models.Tours.findAll({

   /*  Join 1 Tabel
    include: [
      {
        model: req.context.models.Users
      },
    ], */
    
  });
  return res.send(tours);
};

// find region by id
const findOne = async (req, res) => {
  const tours = await req.context.models.Tours.findOne({
    include: [
      {
        all: true,
      },
    ],
    where: { tour_id: req.params.id },
  });
  return res.send(tours);
};

// Create new Table
const create = async (req, res) => {
  const tours = await req.context.models.Tours.create({
    tour_id: req.body.tour_id,
    tour_name: req.body.tour_name,
    tour_route: req.body.tour_route,
    tour_package: req.body.tour_package,
    tour_schedule: req.body.tour_schedule,
    tour_price: req.body.tour_price,
    tour_hotel: req.body.tour_hotel,
    tour_pesawat: req.body.tour_pesawat,
    tour_description: req.body.tour_description,
    tour_user_id: req.body.tour_user_id,
  });
  return res.send(tours);
};

// UPDATE
const update = async (req, res) => {
  const {
    tour_name,
    tour_route,
    tour_package,
    tour_schedule,
    tour_price,
    tour_hotel,
    tour_pesawat,
    tour_description,
  } = req.body;

  const tours = await req.context.models.Tours.update(
    //nama atribut yang akan di update
    {
      tour_name: tour_name,
      tour_route: tour_route,
      tour_package: tour_package,
      tour_schedule: tour_schedule,
      tour_price: tour_price,
      tour_hotel: tour_hotel,
      tour_pesawat: tour_pesawat,
      tour_description: tour_description,
    },
    { returning: true, where: { tour_id: req.params.id } }
  );
  return res.send(tours);
};

// DELETE
const remove = async (req, res) => {
  const tours = await req.context.models.Tours.destroy({
    where: { tour_id: req.params.id },
  });
  return res.send("Delete Tours was Successful");
};

const findOut = async (req, res, next) => {
  try{
    const tours = await req.context.models.Tours.findOne({
      where: {tour_id: req.body.tour_id}
    })
    req.tours = tours;
    next()
  } catch (error) {
    return res.status(500).send({message:`find tour ${erro}`})
  }
}


export default {
  findAll,
  findOne,
  create,
  update,
  remove,
  findOut
};
