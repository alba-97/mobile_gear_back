import Brands from "./Brands";
import Categories from "./Categories";
import Deliverys from "./Deliverys";
import Orders from "./Orders";
import PaymentInfo from "./PaymentInfo";
import Payments from "./Payments";
import ProductOrders from "./ProductOrders";
import Products from "./Products";
import Users from "./Users";

Users.belongsTo(PaymentInfo);
Users.belongsToMany(Orders, { through: "orderhistory" });

ProductOrders.belongsTo(Products);
ProductOrders.belongsTo(Users);
ProductOrders.belongsTo(Orders);

Orders.belongsTo(Payments);
Orders.belongsTo(Deliverys);
Orders.belongsToMany(Users, { through: "orderhistory" });

Products.belongsTo(Brands);
Products.belongsTo(Categories);

export { Brands, Categories, Deliverys, Orders, PaymentInfo, Products, Users };
