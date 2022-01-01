const httpStatus = require("http-status");
const OrderModel = require("../models/order.model");
const Exception = require("../utils/exception");
const handleSuccess = require("../utils/successfulHandler");
const AdminModel = require("../models/admin.model");

const doStatisticMonthlyRevenue = async (req, res, next) => {
  try {
    const { year } = req.query;
    const { adminId } = req.query;

    const admin = await AdminModel.findOne({ _id: adminId });
    if (!admin) {
      throw new Exception(httpStatus.UNAUTHORIZED, 'Not permission');
    }
    // lấy danh sách đơn hàng trong năm thống kê (Chỉ lấy đơn hàng đã thanh toán)
    const thisYearOrder = await OrderModel.find({
      createdAt: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`),
      },
      orderStatus: 6,
    });

    // lấy danh sách đơn hàng năm trước đó
    const lastYearOrder = await OrderModel.find({
      createdAt: {
        $gte: new Date(`${parseInt(year) - 1}-01-01`),
        $lte: new Date(`${parseInt(year) - 1}-12-31`),
      },
      orderStatus: 6,
    });

    // kết quả sau thống kê
    let thisYear = [...Array(12).fill(0)],
      lastYear = [...Array(12).fill(0)];

    // thống kê
    if (thisYearOrder) {
      thisYearOrder.forEach((item) => {
        const month = new Date(item.createdAt).getMonth();

        thisYear[month] += item.total;
      });
    }
    if (lastYearOrder) {
      lastYearOrder.forEach((item) => {
        const month = new Date(item.createdAt).getMonth();
        lastYear[month] += item.total;
      });
    }

    if (thisYearOrder && lastYearOrder)
      return handleSuccess(res, { thisYear, lastYear }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

const doStatisticAnnualRevenue = async (req, res, next) => {
  try {
    const { startYear, endYear } = req.query;
    const { adminId } = req.query;

    const admin = await AdminModel.findOne({ _id: adminId });
    if (!admin) {
      throw new Exception(httpStatus.UNAUTHORIZED, 'Not permission');
    }
    // lấy danh sách đơn hàng trong năm thống kê (Chỉ lấy đơn hàng đã thanh toán)
    const orderList = await OrderModel.find({
      createdAt: {
        $gte: new Date(`${startYear}-01-01`),
        $lte: new Date(`${endYear}-12-31`),
      },
      orderStatus: 6,
    });

    let result = [
      ...Array(parseInt(endYear) + 1 - parseInt(startYear)).fill(0),
    ];
    if (orderList) {
      orderList.forEach((item) => {
        const resIndex = new Date(item.createdAt).getFullYear() - parseInt(startYear);
        result[resIndex] += item.total;
      });
    }
    if (orderList)
      return handleSuccess(res, { data: result }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = { doStatisticMonthlyRevenue, doStatisticAnnualRevenue }
