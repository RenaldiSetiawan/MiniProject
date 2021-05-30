import UsersHelper from "../helpers/UsersHelper";
import config from "../../config/config";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import formidable from "formidable"; // untuk upload file 
import fs from "fs"; // untuk Creat file direktori

//1.declare pathDir untuk menyimpan image di local storage
const pathDir = __dirname + "../../../uploads/";


// FINDALL = select * from users
const findAll = async (req, res) => {
  const users = await req.context.models.Users.findAll({
    attributes: { exclude: ["user_password", "user_salt"] },
  });
  return res.send(users);
};

// find region by id
const findOne = async (req, res) => {
  const users = await req.context.models.Users.findOne({
     //Join one to many
     include: [
      {
        all: true,
      },
    ],
    
    where: { user_id: req.params.id },
  });
  return res.send(users);
};

// create user with hash & salt and Img WITH FORM DATA POSTMAN
const signup = async (req, res) => {

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

      let users = new req.context.models.Users(fields);
      const salt = UsersHelper.makeSalt();
      const hashPassword = UsersHelper.hashPassword(users.user_password, salt);
      users.user_salt = salt;
      users.user_password = hashPassword;

      if (files) {
        users.user_avatar = files.user_avatar.name;
        console.log(users);
      }

      try {
        const result = await req.context.models.Users.create(users.dataValues);
        return res.send(result)
      } catch (error) {
        res.send(error.message)
      }
    });
};

// UPDATE From BODY-RAW Where Id
const update = async (req, res) => {
  const {
    user_name,
    user_email,
    user_birthdate,
    user_gender
  } = req.body;

  const users = await req.context.models.Users.update(
    //nama atribut yang akan di update
    {
      user_name: user_name,
      user_email: user_email,
      user_birthdate: user_birthdate,
      user_gender: user_gender
    },
    { returning: true, where: { user_id: req.params.id } }
  );
  return res.send(users);
};

// filter find by user_email
const signin = async (req, res) => {
  //1. extract values from request body
  const { user_email, user_password } = req.body;

  //2. gunakan try catch, agar jika terjadi error misal table ga bisa diakses bisa munculkan error message
  try {
    // idem : select * from users where user_email = :user_email
    const users = await req.context.models.Users.findOne({
      where: { user_email: user_email },
    });

    //3. jika user tidak ketemu munculkan error
    if (!users) {
      return res.status("400").json({
        error: "User not found",
      });
    }

    //3. check apakah user_password di table === user_passowrd yg di entry dari body,
    // tambahkan salt
    if (
      !UsersHelper.authenticate(
        user_password,
        users.dataValues.user_password,
        users.dataValues.user_salt
      )
    ) {
      return res.status("401").send({
        error: "Email and password doesn't match.",
      });
    }

    //4. generate token jwt, jangan lupa tambahkan jwtSecret value di file config.js
    const token = jwt.sign({ _id: users.user_id }, config.jwtSecret);

    //5. set expire cookie
    res.cookie("t", token, {
      expire: new Date() + 9999,
    });

    //6. exclude value user_password & user_salt, agar tidak tampil di front-end
    // lalu send dengan include token, it's done
    return res.json({
      token,
      users: {
        user_id: users.dataValues.user_id,
        user_name: users.dataValues.user_name,
        user_email: users.dataValues.user_email,
        user_type: users.dataValues.user_type,
      },
    });
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["sha1", "RS256", "HS256"],
});

// DELETE
const remove = async (req, res) => {
  const users = await req.context.models.Users.destroy({
    where: { user_id: req.params.id },
  });
  return res.send(true);
};

// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
  findAll,
  findOne,
  signup,
  update,
  signin,
  requireSignin,
  signout,
  remove,
};
