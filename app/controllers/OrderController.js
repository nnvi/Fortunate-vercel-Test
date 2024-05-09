const { Op } = require('sequelize');
const { scheduleJob, cancelJob } = require('node-schedule');
const ApplicationController = require('./ApplicationController');

class OrderController extends ApplicationController {
  constructor({ adminModel, orderModel }) {
    super();
    this.adminModel = adminModel;
    this.orderModel = orderModel;
    // Bind the deleteScheduledOrders method
    // Schedule job to delete orders with status 0 after 15 minutes
    scheduleJob('*/1 * * * *', () => this.handleDeleteScheduledOrder());
  }

  handleCreateOrder = async (req, res) => {
    try {
      const {
        cust_name,
        table_number,
        order_status,
        admin_acc_id
      } = req.body;

      const adminAcc = await this.adminModel.findOne({
        where: { admin_acc_id: admin_acc_id }
      });

      if(!adminAcc) {
        return res.status(400).json({ error: { message: "Admin not found." } });
      }

      const order = await this.orderModel.create({
        cust_name,
        table_number,
        order_status,
        admin_acc_id
      });

      res.status(201).json(order);
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      })
    }
  }

  handleGetOrder = async (req, res) => {
    const order = await this.getOrderFromRequest(req);

    res.status(200).json(order);
  }

  handleUpdateOrder = async (req, res) => {
    try {
      const {
        order_status
      } = req.body;
  
      const order = await this.getOrderFromRequest(req);
  
      if (order.order_status == 1) {
        return res.status(400).json({ error: { message: "Order has already been completed." } });
      }
  
      // Mengecek jika status yang akan diupdate adalah dari 0 ke 1
      if (order_status === 1) {
        await order.update({ order_status });
        res.status(200).json(order);
      } else {
        return res.status(400).json({ error: { message: "Invalid status update." } });
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

  handleDeleteScheduledOrder = async () => {
    try {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

      const ordersToDelete = await this.orderModel.findAll({
        where: {
          order_status: '0', // Status 0 (belum selesai)
          createdAt: { [Op.lt]: fifteenMinutesAgo } // Dibuat lebih dari 15 menit yang lalu
        }
      });

      if (ordersToDelete.length > '0') {
        // Hapus pesanan yang memenuhi kondisi
        for (const order of ordersToDelete) {
          await order.destroy();
          console.log(`Order with ID ${order.order_id} has been deleted.`);
        }
        // Simpan status operasi keberhasilan
        this.lastScheduledDeleteStatus = { success: true, message: "Scheduled orders deleted successfully." };
      } else {
        // Simpan status operasi gagal
        this.lastScheduledDeleteStatus = { success: false, message: "No orders found to delete." };
      }
    } catch (error) {
      console.error("Error deleting scheduled orders:", error);
      // Simpan status operasi gagal
      this.lastScheduledDeleteStatus = { success: false, message: "Internal server error." };
    }
  }

  handleListOrder = async (req, res) => {
    const order = await this.orderModel.findAll()

    res.status(200).json(order)
  }

  getOrderFromRequest = async (req) => {
    return this.orderModel.findByPk(req.params.id);
  }
}

module.exports = OrderController;