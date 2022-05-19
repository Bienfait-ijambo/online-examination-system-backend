'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exam.belongsTo(models.Subject,{foreignKey:'courseId'})
      // Exam.hasMany(models.Question,{foreignKey:'examId'})

    }
  };
  Exam.init({
    courseId: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    total_question: DataTypes.INTEGER,
    right_question: DataTypes.INTEGER,
    bad_question: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exam',
  });
  return Exam;
};