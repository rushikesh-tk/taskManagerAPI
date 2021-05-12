import bcrypt from "bcryptjs";

const users = [
  {
    name: "Rushikesh",
    email: "rushikesh@gmail.com",
    password: bcrypt.hashSync("Rushikesh", 10),
    tasks: [
      {
        title: "Shopping List",
        content: "Brush, Paste",
      },
      {
        title: "Exams Pending",
        content: "SC, DAA, RM",
      },
    ],
  },
  {
    name: "Karan",
    email: "karan@gmail.com",
    password: bcrypt.hashSync("karan", 10),
    tasks: [
      {
        title: "Seminar to attend",
        content: "On 15th may @6PM",
      },
      {
        title: "Viva Pending",
        content: "SC, RM",
      },
    ],
  },
  {
    name: "Harsh",
    email: "harsh@gmail.com",
    password: bcrypt.hashSync("harsh", 10),
    tasks: [
      {
        title: "Update github",
        content: "Fix bug on TODO App",
      },
      {
        title: "Workout to do",
        content: "40 normal pushups, 40 wide arm pushups, 20 diamond pushups",
      },
      {
        title: "Report Pending",
        content: "RM Report",
      },
    ],
  },
];

export default users;
