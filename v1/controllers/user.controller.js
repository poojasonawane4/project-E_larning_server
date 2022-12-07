const { result } = require("lodash");
const _ = require("lodash");
// const _ = require("mongoose-sequence");
const { encrypt } = require("../../helpers/encryption");
const UserModel = require("../models/user.model");
const fs = require("fs");

class UserCtrl {
  static pickUser(user) {
    //use this code for showing specific fields from received User obj and hide sensitive info to show at client side
    return _.pick(user, [
      "_id",
      "name",
      "mobile",
      "email",
      "quiz",
      "avatar",
      "status",
      "gender",
      "idDoc",
      "address",
      "createdAt",
      "role",
      "userId",
      "dob",
      "demoId",
      "courseId",
      "admission",

    ]);
  }

  static createUser(req, res) {
    const user = req.body;

    console.log("file", req.file);
    console.log("files", req.files);

    // encrypt the password if available
    if (user.password) user.password = encrypt(user.password);

    //save the filename if available
    if (req.files.avatar) {
      const ava = req?.files.avatar[0];
      user.avatar = `users-avatar/${ava?.filename}`;
    }

    if (req.files.idDoc) {
      const ava = req?.files.idDoc[0];
      user.idDoc = `users-id/${ava?.filename}`;
    }

    new UserModel(user)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: "User created", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "User not created", error: err });
      });
  }

  static updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;

    //encrypt password if available
    if (user.password) user.password = encrypt(user.password);

    //save the filename if available
    if (req.files.avatar) {
      const ava = req?.files.avatar[0];
      user.avatar = `users-avatar/${ava?.filename}`;
    }

    if (req.files.idDoc) {
      const ava = req?.files.idDoc[0];
      user.idDoc = `users-id/${ava?.filename}`;
    }

    UserModel.findOneAndUpdate({ _id: id }, user, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User updated", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "User not updated", error: err });
      });
  } //16-9

  static deleteUser(req, res) {
    const { id } = req.params;

    UserModel.findOneAndUpdate({ _id: id }, { status: 2 })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User deleted", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "User not deleted", error: err });
      });
  }

  static fetchOneUser(req, res) {
    const { id } = req.params;
    UserModel.findOne({ _id: id })
      .then((result) => {
        res
          .status(200)
          .send({ message: "user document", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "User not found", error: err });
      });
  }

  static fetchAllUser(req, res) {
    const { role } = req.query;

    const filter = { $or: [{ status: 0 }, { status: 1 }] }; //$or is the syntax of mongodb, we either want status 0 or status 1 users

    if (role) filter.role = role;

    UserModel.find(filter)
      .then((result) => {
        res.status(200).send({
          message: "User List",
          data: _.map(result, (user) => UserCtrl.pickUser(user)), //this map method we are calling on lodash, it taking variable and callback function defined format
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "users not available", error: err });
      });
  }

  static updateDeleteImages(req, res) {
    const { existingAvatar, existingIdDoc } = req.body; // here we will get last time uploaded file
    const { id } = req.params;

    const user = {};

    if (req.files.avatar) {
      const ava = req?.files.avatar[0];
      user.avatar = `users-avatar/${ava?.filename}`;
      fs.unlink(`uploads/${existingAvatar}`, () => {
        console.log("update deleted" + existingAvatar);
      });
    } else if (existingAvatar) {
      fs.unlink(`uploads/${existingAvatar}`, () => {
        console.log("update deleted" + existingAvatar);
      });
      user.avatar = ""; //delete from db
    }

    if (req.files.idDoc) {
      const ava = req?.files.idDoc[0];
      user.idDoc = `users-id/${ava?.filename}`;
      fs.unlink(`uploads/${existingIdDoc}`, () => {
        console.log("update deleted" + existingIdDoc);
      });
    } else if (existingIdDoc) {
      fs.unlink(`uploads/${existingIdDoc}`, () => {
        console.log("update deleted" + existingIdDoc);
      });
      user.idDoc = ""; //delete from db
    }
    //delete from db and folder
    UserModel.findOneAndUpdate({ _id: id }, user, { new: true }) //{ new: true } - this will return updated data
      .then((result) => {
        res
          .status(200)
          .send({ message: "Image changed", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({ message: "Image not changed", error: err });
      });
  }

  //dashboard related code
  static async userStatistics(req, res) {
    const { role = "customer" } = req.query;

    const inactive = await UserModel.countDocuments({ status: 0, role });
    const active = await UserModel.countDocuments({ status: 1, role });
    const deleted = await UserModel.countDocuments({ status: 2, role });

    res.status(200).send({
      message: `${role} details`,
      data: { active, inactive, deleted },
    });
  }
}

module.exports = UserCtrl;
