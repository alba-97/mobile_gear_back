import Brand from "./Brand";
import Category from "./Category";
import Delivery from "./Delivery";
import Order from "./Order";
import PaymentInfo from "./PaymentInfo";
import Payments from "./Payment";
import ProductOrder from "./ProductOrder";
import Product from "./Product";
import User from "./User";

User.belongsTo(PaymentInfo);
User.belongsToMany(Order, { through: "orderhistory" });

ProductOrder.belongsTo(Product);
ProductOrder.belongsTo(User);
ProductOrder.belongsTo(Order);

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
  ProductOrder,
};
