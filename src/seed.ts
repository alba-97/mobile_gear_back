import { Brand, Category, Delivery, Order, Product, User } from "./models";
import ProductOrder from "./models/ProductOrder";
import products from "./products.json";

const seeder = async () => {
  await Category.create({ name: "default" });

  for (let i = 0; i < products.length; i++) {
    let { name, price, type, brand, productImg, stock, discount } = products[i];
    let _brand = await Brand.findOrCreate({ where: { name: brand } });
    let category = await Category.findOrCreate({
      where: { name: type },
    });

    const product = {
      name,
      price,
      categoryId: category[0].id,
      brandId: _brand[0].id,
      productImg,
      stock,
      discount,
    };
    await Product.create(product);
  }

  await User.create({
    isAdmin: true,
    username: "admin",
    email: "mobilegearadmin@protonmail.com",
    password: "1234",
  });

  await User.create({
    isAdmin: false,
    username: "user",
    email: "mobilegeartest@protonmail.com",
    password: "1234",
  });

  await Delivery.create({
    type: "home delivery",
    value: 1799,
  });
  await Delivery.create({
    type: "pick up",
    value: 1499,
  });

  await Order.create({
    status: "purchased",
    deliveryId: 1,
  });
  await Order.create({
    status: "purchased",
    deliveryId: 2,
  });

  await ProductOrder.create({
    orderId: 1,
    productId: 1,
    userId: 2,
    qty: 2,
  });
  await ProductOrder.create({
    orderId: 1,
    productId: 2,
    userId: 2,
    qty: 3,
  });
  await ProductOrder.create({
    orderId: 2,
    productId: 4,
    userId: 1,
    qty: 1,
  });
};

export default seeder;
