import { createContainer, asClass } from "awilix";
import {
  CategoryController,
  OrderController,
  ProductController,
  UserController,
} from "./controllers";
import AuthService from "./services/auth.service";
import CategoryService from "./services/category.service";
import DeliveryService from "./services/delivery.service";
import OrderService from "./services/order.service";
import ProductService from "./services/product.service";
import ProductOrderService from "./services/product-order.service";
import UserService from "./services/user.service";
import {
  CategoryRepository,
  DeliveryRepository,
  EmailRepository,
  OrderRepository,
  ProductOrderRepository,
  ProductRepository,
  UserRepository,
} from "./repositories";

const container = createContainer();

container.register({
  categoryRepository: asClass(CategoryRepository).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  productRepository: asClass(ProductRepository).scoped(),
  productOrderRepository: asClass(ProductOrderRepository).scoped(),
  emailRepository: asClass(EmailRepository).scoped(),
  orderRepository: asClass(OrderRepository).scoped(),
  deliveryRepository: asClass(DeliveryRepository).scoped(),

  authService: asClass(AuthService).scoped(),
  userService: asClass(UserService).scoped(),
  categoryService: asClass(CategoryService).scoped(),
  deliveryService: asClass(DeliveryService).scoped(),
  orderService: asClass(OrderService).scoped(),
  productService: asClass(ProductService).scoped(),
  productOrderService: asClass(ProductOrderService).scoped(),

  userController: asClass(UserController).scoped(),
  categoryController: asClass(CategoryController).scoped(),
  orderController: asClass(OrderController).scoped(),
  productController: asClass(ProductController).scoped(),
});

export default container;
