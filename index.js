const db = require("./db");
const inquirer = require("inquirer");

//先去读取一个.todo文件  没有就创建  否则追加内容
module.exports.add = async (taskName) => {
  const todoList = await db.read(taskName);
  todoList.push({
    taskName,
    done: false,
  });
  await db.write(todoList);
};
module.exports.clear = async () => {
  await db.write([]);
};
function doneTask(list, taskIndex) {
  list[taskIndex].done = true;
  db.write(list);
}
function todoTask(list, taskIndex) {
  list[taskIndex].done = false;
  db.write(list);
}
function deleteTask(list, taskIndex) {
  list.splice(taskIndex, 1);
  db.write(list);
}

function operateTask(list, taskIndex) {
  inquirer
    .prompt([
      {
        type: "list",

        name: "operation",

        message: "选择你要执行的操作",

        choices: [
          { name: "退出", value: "exit" },
          { name: "已完成", value: "doneTask" },
          { name: "未完成", value: "todoTask" },
          { name: "删除", value: "deleteTask" },
          { name: "修改任务", value: "editTask" },
        ],
      },
    ])
    .then((answers) => {
      // TODO
      const table = { doneTask, todoTask, deleteTask, editTask };
      table[answers.operation] && table[answers.operation](list, taskIndex);
      //   switch (answers.operation) {
      //     case "exit":
      //       break;
      //     case "doneTask":
      //       doneTask(list, taskIndex);
      //       break;
      //     case "todoTask":
      //       todoTask(list, taskIndex);
      //       break;
      //     case "deleteTask":
      //       deleteTask(list, taskIndex);
      //       break;
      //     case "editTask":
      //       editTask(list, taskIndex);
      //       break;
      //     default:
      //       break;
      //   }
    });
}
function editTask(list, taskIndex) {
  inquirer
    .prompt({
      type: "input",

      name: "taskName",

      message: "新的标题",
      default: list[taskIndex].taskName,
    })
    .then((answers) => {
      list[taskIndex].taskName = answers.taskName;
    });
}
function createTask(list) {
  inquirer
    .prompt({
      type: "input",

      name: "taskName",

      message: "请输入新创建的任务标题",
    })
    .then((answers) => {
      list.push({ taskName: answers.taskName, done: false });
      db.write(list);
    });
}
function printTaskList(list) {
  const mapList = list.map((val, index) => {
    return {
      name: `${val.done ? "[x]" : "[_]"} ${index + 1} - ${val.taskName}`,
      value: index,
    };
  });
  inquirer
    .prompt([
      {
        type: "list",

        name: "task",

        message: "选择你要编辑的任务",

        choices: [
          { name: "退出", value: "-1" },
          ...mapList,
          { name: "+ 添加任务", value: "-2" },
        ],
      },
    ])

    .then((answers) => {
      const taskIndex = parseInt(answers.task);
      if (taskIndex >= 0) {
        //选中一个任务
        operateTask(list, taskIndex);
      }
      if (taskIndex === -2) {
        //添加任务
        createTask(list);
      }
    });
}
module.exports.showAll = async () => {
  const list = await db.read();
  // 打印任务列表的操作
  printTaskList(list);
};
