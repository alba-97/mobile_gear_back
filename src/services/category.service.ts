import CategoryRepository from "../repositories/category.repository";
import ProductRepository from "../repositories/product.repository";
import { HttpError } from "../utils/httpError";

export default class CategoryService {
  private categoryRepository: CategoryRepository;
  private productRepository: ProductRepository;

  constructor({ 
    categoryRepository, 
    productRepository 
  }: { 
    categoryRepository: CategoryRepository, 
    productRepository: ProductRepository 
  }) {
    this.categoryRepository = categoryRepository;
    this.productRepository = productRepository;
  }

  async listCategories() {
    return await this.categoryRepository.getAll();
  }

  async addCategory(name: string) {
    const existingCategory = await this.categoryRepository.getOne({ name });
    if (existingCategory) throw new HttpError(409, "Category already exists");
    return await this.categoryRepository.createOne({ name });
  }

  async editCategory(id: number, name: string) {
    return await this.categoryRepository.updateOneById(id, { name });
  }

  async deleteCategory(id: number) {
    await this.productRepository.updateCategories(id);
    await this.categoryRepository.deleteOneById(id);
  }
}
