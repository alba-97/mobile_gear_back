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
import CartItemService from "./services/cart-item.service";
import UserService from "./services/user.service";
import {
  CategoryRepository,
  DeliveryRepository,
  EmailRepository,
  OrderRepository,
  CartItemRepository,
  ProductRepository,
  UserRepository,
} from "./repositories";
import PaymentRepository from "./repositories/payment.repository";

const container = createContainer();

container.register({
  paymentRepository: asClass(PaymentRepository).scoped(),
  categoryRepository: asClass(CategoryRepository).scoped(),
  userRepository: asClass(UserRepository).scoped(),
  productRepository: asClass(ProductRepository).scoped(),
  cartItemRepository: asClass(CartItemRepository).scoped(),
  emailRepository: asClass(EmailRepository).scoped(),
  orderRepository: asClass(OrderRepository).scoped(),
  deliveryRepository: asClass(DeliveryRepository).scoped(),

  authService: asClass(AuthService).scoped(),
  userService: asClass(UserService).scoped(),
  categoryService: asClass(CategoryService).scoped(),
  deliveryService: asClass(DeliveryService).scoped(),
  orderService: asClass(OrderService).scoped(),
  productService: asClass(ProductService).scoped(),
  cartItemService: asClass(CartItemService).scoped(),

  userController: asClass(UserController).scoped(),
  categoryController: asClass(CategoryController).scoped(),
  orderController: asClass(OrderController).scoped(),
  productController: asClass(ProductController).scoped(),
});

export default container;
