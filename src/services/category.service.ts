import { Category, Product } from "../models";

const listCategories = async () => {
  return await Category.findAll();
};

const addCategory = async (name: string) => {
  return await Category.findOrCreate({ where: { name } });
};

const editCategory = async (id: number, name: string) => {
  return await Category.update({ name }, { where: { id } });
};

const deleteCategory = async (id: number) => {
  await Product.update({ categoryId: 1 }, { where: { categoryId: id } });
  return await Category.destroy({ where: { id } });
};

export default { listCategories, addCategory, editCategory, deleteCategory };
