import { Op } from "sequelize";

const minMaxFilter = (min?: number | Date, max?: number | Date) => {
  let options = {};
  switch (true) {
    case !!min && !!max:
      options = { [Op.between]: [min, max] };
      break;
    case !!min:
      options = { [Op.gte]: min };
      break;
    case !!max:
      options = { [Op.lte]: max };
      break;
    default:
      options = { [Op.gte]: 0 };
      break;
  }
  return options;
};

export default minMaxFilter;
