import categoryRepository from "../repositories/category.repository";
import productRepository from "../repositories/product.repository";
import { HttpError } from "../utils/httpError";

const listCategories = async () => {
  return await categoryRepository.getAll();
};

const addCategory = async (name: string) => {
  const existingCategory = await categoryRepository.getOne({ name });
  if (existingCategory) throw new HttpError(409, "Category already exists");
  return await categoryRepository.createOne({ name });
};

const editCategory = async (id: number, name: string) => {
  return await categoryRepository.updateOneById(id, { name });
};

const deleteCategory = async (id: number) => {
  await productRepository.updateCategories(id);
  await categoryRepository.deleteOneById(id);
};

export default { listCategories, addCategory, editCategory, deleteCategory };
