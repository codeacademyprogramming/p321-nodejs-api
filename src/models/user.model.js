module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    avatar: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    birthdate: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
