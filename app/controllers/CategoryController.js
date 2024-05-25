const ApplicationController = require('./ApplicationController');
const imagekit = require('../lib/imageKitConfig');

class CategoryController extends ApplicationController {
  constructor({ categoryModel }) {
    super();
    this.categoryModel = categoryModel;
  }

  handleCreateCategory = async (req, res) => {
    try {
      const { category_name, category_image } = req.body;
      let imageUrl = category_image;

      if (req.file) {
        const imageName = req.file.originalname;
        const img = await imagekit.upload({
          file: req.file.buffer,
          fileName: imageName,
          folder: "/Fortunate_Coffee/Category"
        });
        imageUrl = img.url;
      }

      const category = await this.categoryModel.create({
        category_name,
        category_image: imageUrl
      });

      res.status(201).json({
        status: 'success',
        message: 'Category created successfully',
        data: category
      });
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      });
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

      if(req.file) {
        const imageName = req.file.originalname;
        const img = await imagekit.upload({
          file: req.file.buffer,
          fileName: imageName,
          folder: "/Fortunate_Coffee/Category"
        });
        await category.update({
          category_name,
          category_image: img.url,
        });
        res.status(200).json({
          status: 'success',
          message: 'Category updated successfully',
          data: {
            category_name,
            category_image: img.url,
          }
        })
      } else {
        await category.update({
          category_name,
          category_image,
        });
      }
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