import UsersHelper from "../helpers/UsersHelper";
import config from "../../config/config";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

// untuk upload file 
import formidable from "formidable";
// untuk Creat file direktori
import fs from "fs";

//1.declare pathDir untuk menyimpan image di local storage
const pathDir = __dirname + "../../../uploads/";

// find = select * from Table
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

// create user with hash & salt and Img to form-data POSTMAN
const signup = async (req, res, next) => {

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
      // Jika Error IMG tidak bisa di upload
      if (err) {
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

const register = async (req, res, next) => {
  const {
    user_name,
    user_email,
    user_password,
    user_birthdate,
    user_gender, user_type
  } = req.body;

  const { dataValues } = new req.context.models.Users(req.body);
  const salt = UsersHelper.makeSalt();
  const hashPassword = UsersHelper.hashPassword(dataValues.user_password, salt);

    const users = await req.context.models.Users.create({
     user_name: dataValues.user_name,
     user_email: dataValues.user_email,
     user_password: hashPassword,
     user_salt: salt,
     user_birthdate: dataValues.user_birthdate,
     user_gender: dataValues.user_gender,
     user_type: dataValues.user_type
    });
    return res.send(users);
  
};

//  Where Id
const update = async (req, res) => {
  const { dataValues } = await req.context.models.Users.findOne({
    where: { user_id: req.params.id },
  });

  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  const form = formidable({
    multiples: true,
    uploadDir: pathDir,
    keepExtensions: true,
  });

  form
    .on("fileBegin", (name, file) => {
      file.path = pathDir + file.name;

      if (dataValues.user_avatar) {
        fs.unlinkSync(pathDir + "//" + dataValues.user_avatar);
      }
    })
    .parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({
          message: "Image tidak bisa diupload",
        });
      }

      let users = new req.context.models.Users(fields);

      if (users.user_password) {
        users.user_salt = Auth.makeSalt();
        users.user_password = Auth.hashPassword(
          users.user_password,
          users.user_salt
        );
      }

      if (!users.user_id) {
        users.user_id = req.params.id;
      }

      if (files.user_avatar) {
        users.user_avatar = files.user_avatar.name;
      }

      try {
        const result = await req.context.models.Users.update(users.dataValues, {
          returning: true,
          where: { user_id: req.params.id },
        });

        if (result[0]) {
          return res.send("Update Done");
        } else {
          return res.send("Update Failed");
        }
      } catch (error) {
        res.send(error.message);
      }
    });
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
    message: "signed out successful",
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
  return res.send("Delete User was Successful");
};

const cekUser = async (req, res, next) => {
  try {
    if (req.params.id === undefined || isNaN(req.params.id)) res.status(400).send({ message: "User Id Wrong" })
    const users = await req.context.models.Users.findOne({
      include: [{
        all: true
      }],
      where: { user_id: req.params.id }
    })
    req.cekUser = users
    next()
  } catch (error) {
    return res.status(500).send({message:`User ${error}`})
  }
}

// const checkL = async (req, res, next) => {
//   try {
//     const data = await req.context.models.Users.findOne({
//       where: { user_id: req.params.id },
//     });
//     req.user = data;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// }
// Gunakan export default agar semua function bisa dipakai di file lain.
export default {
  findAll,
  findOne,
  signup,
  register,
  update,
  signin,
  requireSignin,
  signout,
  remove,
  cekUser,
  // checkL
};
