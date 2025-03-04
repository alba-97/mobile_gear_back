import db from "../db/database";

const createOne = async () => {
  const transaction = await db.transaction();
  return transaction;
};

export default {
  createOne,
};
