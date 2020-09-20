const homedir = require("os").homedir();
const home = process.env.HOME || homedir; //获取加目录  环境变量都大写
const path = require("path");
const fs = require("fs");
const dbPath = path.join(home, ".todo"); //用于识别不同系统下的 文件路劲的不同

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(dbPath, { flag: "a+" }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        try {
          var todoList = JSON.parse(data.toString());
        } catch (error) {
          todoList = [];
        }
        resolve(todoList);
      });
    });
  },
  write(task, path = dbPath) {
    const string = JSON.stringify(task);
    return new Promise((resolve, reject) => {
      fs.writeFile(dbPath, string + "\n", (err) => {
        //添加回车
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },
};

module.exports = db;
