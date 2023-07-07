const { generateToken, validateToken } = require("../config/tokens");
const { Users } = require("../models");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: { email },
    });
    if (!user) return res.sendStatus(401);
    const isValid = await user.validatePassword(password);
    if (!isValid) return res.sendStatus(401);

    const payload = {
      email: user.email,
      password: user.password,
      isAdmin: user.is_admin,
    };

    const token = generateToken(payload);
    res.cookie("token", token).send(user);
  } catch (err) {
    res.status(404).send(err);
  }
};

const signup = async (req, res) => {
  try {
    await Users.create(req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

const me = async (req, res) => {
  const user = await Users.findOne({
    attributes: { exclude: ["password", "salt"] },
  });
  res.send(user);
};

const listUsers = async (req, res) => {
  try {
    if (req.user.is_admin) {
      const users = await Users.findAll({
        attributes: { exclude: ["password", "salt"] },
      });
      res.send(users);
    } else {
      res.status(403).json({ mensaje: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const switchPrivileges = async (req, res) => {
  try {
    if (req.user.is_admin && Number(req.params.id) != req.user.id) {
      const user = await Users.findByPk(Number(req.params.id));
      await Users.update(
        { is_admin: !user.is_admin },
        { where: { id: user.id } }
      );
      res.sendStatus(200);
    } else {
      res.status(403).json({ mensaje: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

const removeUser = async (req, res) => {
  try {
    if (req.user.is_admin) {
      await Users.destroy({ where: { id: Number(req.params.id) } });
      res.sendStatus(200);
    } else {
      res.status(403).json({ mensaje: "Acceso denegado" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  login,
  signup,
  logout,
  secret,
  me,
  listUsers,
  switchPrivileges,
  removeUser,
};
