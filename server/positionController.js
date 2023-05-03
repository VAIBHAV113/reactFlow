const Post = require("./Post");
const schema = require("./schema");

module.exports = class posotionController {
  static async apiCreateSchema(req, res) {
    let position = await position.getOneSchema(req.body.flow);

    const CreatedSchema = await position.CreateSchema(req.body);

    if (CreatedSchema != null) {
      res.json(CreatedSchema);
    } else {
      res.status(412).send({
        message: "Invalid Input",
        status: false,
      });
    }
  }
  catch(error) {
    res.status(500).json({ error: error });
  }
};
