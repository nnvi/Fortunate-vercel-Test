const ApplicationController = require('./ApplicationController');

class MenuController extends ApplicationController {
  constructor({ menuModel }) {
    super();
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

      const menu = await this.menuModel.create({
        category_id,
        menu_name,
        menu_price,
        menu_image,
        menu_desc
      });

      res.status(201).json(menu);
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

      const menu = await this.getMenuFromRequest(req);

      await menu.update({
        category_id,
        menu_name,
        menu_price,
        menu_image,
        menu_desc
      });

      res.status(200).json(menu);
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
    const menu = await this.menuModel.findAll()

    res.status(200).json(menu)
  }

  getMenuFromRequest(req) {
    return this.menuModel.findByPk(req.params.id);
  }
}

module.exports = MenuController;