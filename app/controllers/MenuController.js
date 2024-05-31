const ApplicationController = require('./ApplicationController');
const imagekit = require('../lib/imageKitConfig');
const { Op } = require('sequelize');

class MenuController extends ApplicationController {
  constructor({ categoryModel, menuModel }) {
    super();
    this.categoryModel = categoryModel;
    this.menuModel = menuModel;
  }

  handleCreateMenu = async (req, res) => {
    try {
      const {
        category_id,
        menu_name,
        menu_price,
        menu_image,
        menu_desc
      } = req.body;
      let imageUrl = menu_image;

      const categoryId = await this.categoryModel.findOne({
        where: { category_id: category_id }
      });

      if (!categoryId) {
        return res.status(404).json({ error: { message: "Category not found." } });
      }

      if (req.file) {
        const imageName = req.file.originalname;
        const img = await imagekit.upload({
          file: req.file.buffer,
          fileName: imageName,
          folder: "/Fortunate_Coffee/Menu"
        });
        imageUrl = img.url;
      }

      const menu = await this.menuModel.create({
        category_id,
        menu_name,
        menu_price,
        menu_image: imageUrl,
        menu_desc
      });

      res.status(201).json({
        status: 'success',
        message: 'Menu created successfully',
        data: menu
      });
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      })
    }
  }

  handleGetMenu = async (req, res) => {
    const menu = await this.getMenuFromRequest(req);

    res.status(200).json(menu);
  }

  handleUpdateMenu = async (req, res) => {
    try {
      const {
        category_id,
        menu_name,
        menu_price,
        menu_image,
        menu_desc
      } = req.body;

      const categoryId = await this.categoryModel.findOne({
        where: { category_id: category_id }
      });

      if (!categoryId) {
        return res.status(404).json({ error: { message: "Category not found." } });
      }

      const menu = await this.getMenuFromRequest(req);

      if(req.file) {
        const imageName = req.file.originalname;
        const img = await imagekit.upload({
          file: req.file.buffer,
          fileName: imageName,
          folder: "/Fortunate_Coffee/Menu"
        });
        await menu.update({
          category_id,
          menu_name,
          menu_price,
          menu_image: img.url,
          menu_desc
        });
        return res.status(200).json({
          status: 'success',
          message: 'Menu updated successfully',
          data: {
            category_id,
            menu_name,
            menu_price,
            menu_image: img.url,
            menu_desc
          }
        })
      } else {
        await menu.update({
          category_id,
          menu_name,
          menu_price,
          menu_image,
          menu_desc
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

  handleDeleteMenu = async (req, res) => {
    const menu = await this.getMenuFromRequest(req);
    await menu.destroy();
    res.status(204).json(menu).end();
  }

  handleListMenu = async (req, res) => {
    const menu = await this.menuModel.findAll({
      include: this.categoryModel
    })

    res.status(200).json(menu)
  }

  handleGetMenuByCategoryId = async (req, res) => {
    try {
      const { id } = req.params;
      const menus = await this.menuModel.findAll({
        where: { category_id: id },
        include: this.categoryModel
      });

      if (menus.length === 0) {
        return res.status(404).json({ error: 'No menus found for this category' });
      }

      res.status(200).json(menus);
    } catch (error) {
      console.error('Error getting menus by category ID:', error);
      res.status(500).json({ error: error.message });
    }
  }

  handleSearch = async (req, res) => {
    try {
      const { query } = req.query;
      console.log(`Received search query: ${query}`);
  
      // Check for menu
      const menu = await this.menuModel.findOne({
        where: { menu_name: { [Op.like]: `%${query}%` } },
        include: this.categoryModel
      });
  
      if (menu) {
        console.log('Menu found:', menu);

        // Fetch the category details by ID
        const category = await this.categoryModel.findByPk(menu.category_id);

        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json({
          type: 'menu',
          data: {
            menu: menu,
            category: category
          }
        });
      }
  
      console.log('No results found for query:', query);
      return res.status(404).json({ error: 'No results found' });
    } catch (error) {
      console.error('Error during search:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  getMenuFromRequest(req) {
    return this.menuModel.findByPk(req.params.id);
  }
}

module.exports = MenuController;