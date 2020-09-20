const db = require("./db");

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
module.exports.showAll = async () => {
  const list = await db.read();
  list.map((val, index) => {
    console.log(` ${val.done ? "[x]" : "[_]"} ${index + 1} - ${val.taskName}`);
  });
};
