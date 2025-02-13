import Brand from "./Brand";
import Category from "./Category";
import Delivery from "./Delivery";
import Order from "./Order";
import PaymentInfo from "./PaymentInfo";
import Payments from "./Payment";
import Product from "./Product";
import User from "./User";
import CartItem from "./CartItem";

User.belongsTo(PaymentInfo);
User.belongsToMany(Order, { through: "orderhistory" });

CartItem.belongsTo(Product);
CartItem.belongsTo(User);
CartItem.belongsTo(Order);

Order.belongsTo(Payments);
Order.belongsTo(Delivery);
Order.belongsToMany(User, { through: "orderhistory" });

Product.belongsTo(Brand);
Product.belongsTo(Category);

export {
  Brand,
  Category,
  Delivery,
  Order,
  PaymentInfo,
  Product,
  User,
  CartItem,
};
