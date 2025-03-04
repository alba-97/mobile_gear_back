# Fake Data Generation Script

## Overview
This script generates realistic fake data for the Mobile Gear E-Commerce platform. It populates the database with:
- Users (including admin and regular users)
- Products across various mobile device and accessory categories
- Orders with multiple items

## Features
- Generates up to 50 users (5 admins, 45 regular users)
- Creates 100 unique products
- Generates 200 sample orders
- Uses realistic data from Faker library
- Handles database transactions safely

## Usage
To generate fake data, run:
```bash
npm run generate:data
```

## Data Generation Details
### Users
- Emails generated with first and last names
- Default password: `password123`
- 5 admin users, rest are regular users

### Products
- Categories: Smartphones, Tablets, Smartwatches, Phone Cases, Screen Protectors, Chargers, Wireless Earbuds, Power Banks
- Random prices between $10 and $1000
- Stock quantities between 10 and 500
- Unique product names and descriptions
- Random product images

### Orders
- Linked to random users
- 1-5 products per order
- Random order statuses
- Realistic shipping addresses

## Caution
- This script is for development and testing purposes only
- Do not run on production databases
- Always backup your data before generating fake data
