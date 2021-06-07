import bcrypt from "bcryptjs";

const users = [
  {
    name: "Rushikesh",
    email: "rushikesh@gmail.com",
    password: bcrypt.hashSync("Rushikesh", 10),
  },
  {
    name: "Karan",
    email: "karan@gmail.com",
    password: bcrypt.hashSync("karan", 10),
  },
  {
    name: "Harsh",
    email: "harsh@gmail.com",
    password: bcrypt.hashSync("harsh", 10),
  },
];

export default users;
