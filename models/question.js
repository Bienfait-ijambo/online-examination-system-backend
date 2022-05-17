'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.Exam,{foreignKey:'id'})
    }
  };
  Question.init({
    examId: DataTypes.INTEGER,
    question_title: DataTypes.STRING,
    answer_option: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};