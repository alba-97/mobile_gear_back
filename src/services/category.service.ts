import { Categories, Products } from "../models";

const listCategories = async () => {
  return await Categories.findAll();
};

const addCategory = async (name: string) => {
  return await Categories.findOrCreate({ where: { name } });
};

const editCategory = async (id: number, name: string) => {
  return await Categories.update({ name }, { where: { id } });
};

const deleteCategory = async (id: number) => {
  await Products.update({ categoryId: 1 }, { where: { categoryId: id } });
  return await Categories.destroy({ where: { id } });
};

export default { listCategories, addCategory, editCategory, deleteCategory };
