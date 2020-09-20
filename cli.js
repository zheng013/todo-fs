const program = require("commander");

const api = require("./index.js");
program
  .option("-d, --debug", "output extra debugging")
  .option("-s, --small", "small pizza size")
  .option("-p, --pizza-type <type>", "flavour of pizza");
if (process.argv.length === 2) {
  api.showAll();
  return;
}
program
  .command("add <taskName>")
  .description("add a task")
  .action((taskName) => {
    api.add(taskName);
    console.log(`add ${taskName}`);
  });
program
  .command("clear [destination]")
  .description("clear  tasks")
  .action((...args) => {
    api.clear();
  });
program.parse(process.argv);

if (program.debug) console.log(program.opts());
if (program.small) console.log("- small pizza size");

if (program.pizzaType) console.log(`- ${program.pizzaType}`);
if (program.cli) console.log(`cli`);
