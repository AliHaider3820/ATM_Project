import inquirer from "inquirer";

interface User {
  id: number;
  pin: number;
  balance: number;
}

const users: User[] = [
  { id: 123456, pin: 1111, balance: 1000 },
  { id: 789012, pin: 2222, balance: 5000 },
  { id: 345678, pin: 3333, balance: 2500 },
];

const atm = async () => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Enter your user id:",
    },
    {
      type: "password",
      name: "pin",
      message: "Enter your user pin:",
      mask: "*",
    },
  ]);

  const user = users.find(
    (u) => u.id === Number(answer.id) && u.pin === Number(answer.pin)
  );

  if (!user) {
    console.log("Invalid user id or user pin!");
    atm();
    return;
  }

  console.log(`Welcome, User ${user.id}!`);

  const actionAnswer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        { name: "Check balance", value: "balance" },
        { name: "Withdraw money", value: "withdraw" },
        { name: "Exit", value: "exit" },
      ],
    },
  ]);

  switch (actionAnswer.action) {
    case "balance":
      console.log(`Your current balance is ${user.balance}.`);
      break;

    case "withdraw":
      const amountAnswer = await inquirer.prompt([
        {
          type: "number",
          name: "amount",
          message: "Enter the amount to withdraw:",
        },
      ]);

      if (amountAnswer.amount > user.balance) {
        console.log("Insufficient balance!");
      } else {
        user.balance -= amountAnswer.amount;
        console.log(`You withdrew ${amountAnswer.amount}.`);
        console.log(`Your current balance is ${user.balance}.`);
      }

      break;

    case "exit":
      console.log("Exiting...");
      process.exit();
      break;

    default:
      console.log("Invalid action!");
      break;
  }

  atm();
};

atm();
