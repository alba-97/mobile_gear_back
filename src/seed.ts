import {
  Brands,
  Categories,
  Deliverys,
  Orders,
  Products,
  Users,
} from "./models";
import ProductOrders from "./models/ProductOrders";
import products from "./products.json";

const seeder = async () => {
  await Categories.create({ name: "default" });

  for (let i = 0; i < products.length; i++) {
    let { name, price, type, brand, product_img, stock, discount } =
      products[i];
    let _brand = await Brands.findOrCreate({ where: { name: brand } });
    let category = await Categories.findOrCreate({
      where: { name: type },
    });

    const product = {
      name,
      price,
      categoryId: category[0].id,
      brandId: _brand[0].id,
      product_img,
      stock,
      discount,
    };
    await Products.create(product);
  }

  await Users.create({
    is_admin: true,
    username: "admin",
    email: "mobilegearadmin@protonmail.com",
    password: "1234",
  });

  await Users.create({
    is_admin: false,
    username: "user",
    email: "mobilegeartest@protonmail.com",
    password: "1234",
  });

  await Deliverys.create({
    type: "envio a domicilio",
    value: 1799,
  });
  await Deliverys.create({
    type: "retirar por correo",
    value: 1499,
  });

  await Orders.create({
    status: "purchased",
    deliveryId: 1,
  });
  await Orders.create({
    status: "purchased",
    deliveryId: 2,
  });

  await ProductOrders.create({
    orderId: 1,
    productId: 1,
    userId: 2,
    qty: 2,
  });
  await ProductOrders.create({
    orderId: 1,
    productId: 2,
    userId: 2,
    qty: 3,
  });

  await ProductOrders.create({
    orderId: 2,
    productId: 4,
    userId: 1,
    qty: 1,
  });
};

export default seeder;
