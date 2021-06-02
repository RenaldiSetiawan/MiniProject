import formidable from "formidable"; // untuk upload file 
import fs from "fs"; // untuk Creat file direktori

//1.declare pathDir untuk menyimpan image di local storage

const pathDir = __dirname + "../../../uploads/";
// findAll = select * from tour_commnents
const findAll = async (req, res) => {
  const tours_images = await req.context.models.Tours_Images.findAll();
  return res.send(tours_images);
};

// find region by id
const findOne = async (req, res) => {
  const tours_images = await req.context.models.Tours_Images.findOne({
    where: { toim_id: req.params.id },
  });
  return res.send(tours_images);
};

// DELETE
const remove = async (req, res) => {
  const tours_images = await req.context.models.Tours_Images.destroy({
    where: { toim_id: req.params.id },
  });
  return res.send("Delete TourImages Success");
};

// UPDATE FIELD
const update = async (req, res) => {
  const { toim_filename, toim_filesize, toim_filetype, toim_primary } =
    req.body;

  const tours_images = await req.context.models.Tours_Images.update(
    //nama atribut yang akan di update
    {
      toim_filename: toim_filename,
      toim_filesize: toim_filesize,
      toim_filetype: toim_filetype,
      toim_primary: toim_primary,
    },
    { returning: true, where: { toim_id: req.params.id } }
  );
  return res.send(tours_images);
};

// Create MULTIP
const createFileType = async (req, res) => {
/* Jika blum ada Folder Upload maka Folder Upload dibuat Otomatis
Jika sudah maka keluar dari Kondisi */
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  const form = formidable({
    multiples: true, 
    uploadDir: pathDir, 
    keepExtensions: true,
  });

  form
    .on("fileBegin", function (name, file) {
      //rename the incoming file to the file's name
      file.path = pathDir + file.name;
    })
    .parse(req, async (err, fields, files) => {
      if (err) { // Jika Error IMG tidak bisa di upload
        res.status(400).json({
          message: "Image tidak bisa diupload",
        });
      }

      let tours_images = new req.context.models.Tours_Images(fields);
      if (files) {
        
        tours_images.toim_filename = files.toim_filetype.name;
        tours_images.toim_filesize = files.toim_filetype.size;
        tours_images.toim_filetype = files.toim_filetype.type;
     
        console.log(tours_images);
      }

      try {
        const result = await req.context.models.Tours_Images.create(tours_images.dataValues);
        return res.send(result)
    } catch (error) {
        res.send(error.message)
    }

});
}

export default {
  findAll,
  findOne,
  remove,
  update,
  createFileType
};
