const  program  = require('commander');
const api=require('./index.js')
program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');
program
  .command('add <taskName>')
  .description('add a task')
  .action((taskName) => {
    api.add()
    console.log(`add ${taskName}`);
  });
program
  .command('clear [destination]')
  .description('clear  tasks')
  .action((...args) => {
    console.log(args[1].args);
  });

program.parse(process.argv);
if (program.debug) console.log(program.opts());
console.log('pizza details:');
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);