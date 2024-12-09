# Mobile Gear - Backend

E-commerce for mobile devices and accessories.

### Dependencies:

- @faker-js/faker
- bcrypt
- cookie-parser
- cors
- dotenv
- express
- jsonwebtoken
- nodemailer
- nodemon
- pg
- pg-hstore
- sequelize

### Installation:

- Clone the repository.
- In the terminal, navigate to the root directory.
- Run `npm i` to install all dependencies.
- Make sure you have a properly configured `.env` file with the required data.
- Start the server with `npm start`.

### Data Models

- **Brands**: Represents the brands of mobile devices and accessories.
- **Categories**: Describes the categories into which products are classified.
- **Deliverys**: Manages the shipping of orders.
- **Orders**: Handles the execution of cart orders.
- **PaymentInfo**: Records user payment information.
- **Payments**: Defines the type of payment used in transactions.
- **ProductOrders**: Establishes the relationship between products and orders.
- **Products**: Contains information about the available products.
- **Users**: Stores data about registered users.

![Copy of Copy of Untitled Diagram](https://github.com/sheinken88/mobile_gear_back/assets/125990977/9e2fb09e-eb7d-4a88-9892-0589fd048e08)

### Routes

- **admin**: Allows administrative operations, such as managing products and users.
- **cart**: Manages user shopping carts.
- **orders**: Facilitates and manages cart sales.
- **products**: Provides functionalities for managing products, such as creation, updating, and retrieving product details.
- **users**: Enables user registration, login, and logout.
