const  program  = require('commander');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program
  .command('add <taskName>')
  .description('add a task')
  .action((taskName) => {
    console.log(`add ${taskName}`);
  });
 
program.parse(process.argv);
if (program.debug) console.log(program.opts());
console.log('pizza details:');
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);