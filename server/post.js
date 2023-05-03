const Schema = require("./schema");

module.exports = class post {
  static async CreateSchema(data) {
    try {
      const newPosition = {
        flow: data.flow,
      };
      const response = await new Schema(newPosition).save();

      return response;
    } catch (error) {
      console.log("error");
    }
  }
};
