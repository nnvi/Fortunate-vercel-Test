const ApplicationController = require('./ApplicationController');

class CategoryController extends ApplicationController {
  constructor({ categoryModel }) {
    super();
    this.categoryModel = categoryModel;
  }

  handleCreateCategory = async (req, res) => {
    try {
      const {
        category_name,
        category_image
      } = req.body;

      const category = await this.categoryModel.create({
        category_name,
        category_image
      });

      res.status(201).json(category);
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      })
    }
  }

  handleGetCategory = async (req, res) => {
    const category = await this.getCategoryFromRequest(req);

    res.status(200).json(category);
  }

  handleUpdateCategory = async (req, res) => {
    try {
      const {
        category_name,
        category_image
      } = req.body;

      const category = await this.getCategoryFromRequest(req);

      await category.update({
        category_name,
        category_image
      });

      res.status(200).json(category);
    } catch (err) {
      res.status(422).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  }

  handleDeleteCategory = async (req, res) => {
    const category = await this.getCategoryFromRequest(req);
    await category.destroy();
    res.status(204).json(category).end();
  }

  handleListCategory = async (req, res) => {
    const category = await this.categoryModel.findAll()

    res.status(200).json(category)
  }

  getCategoryFromRequest(req) {
    return this.categoryModel.findByPk(req.params.id);
  }
}

module.exports = CategoryController;