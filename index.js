const homedir=require('os').homedir()
const home=process.env.HOME||homedir //获取加目录  环境变量都大写
const path=require('path')
const fs=require('fs')

const dbPath=path.join(home,'.todo') //用于识别不同系统下的 文件路劲的不同


//先去读取一个.todo文件  没有就创建  否则追加内容
module.exports.add=()=>{
    fs.readFile(dbPath,{flag:'a+'},(err,data)=>{
        console.log(data.toString())
    })
    console.log('hi')
}
