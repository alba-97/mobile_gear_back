import db from "./db";
import seeder from "./db/seed";

db.sync({ force: true })
  .then(function () {
    seeder();
    console.log("Fake data created");
  })
  .catch((error: Error) => console.log(error));
