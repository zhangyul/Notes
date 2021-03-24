```json
{
  "name": "webpack", // 包名
  "version": "1.0.0", // 版本号
  "description": "",
  "main": "webpack.js", // 执行入口文件
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }, // 自定义脚本命令功能
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

## npm命令参数  
`npm ** -d（--save-dev）`开发环境的依赖，可以将一些测试工具等包安装在开发环境下  
`npm install --only=prod` 只安装生产环境的包   
`npm install --only=dev` 只安装开发环境的包   
【区分生产环境，加快安装速度⬆️】

语义话版本   
- `^v` 中版本和小版本的最新版本  `^1.0.1->1.x.x`  
- `~v` 小版本的最新版本   `^1.0.1->1.0.x`  
- `v` 特定版本     


## webpack 打包过程

打包过程
1. 从入口文件开始，分析整个应用的依赖
2. 将每个依赖模块包装，放入数组等待调用
3. 实现模块加载的方法，并放入模块执行环境在，确保模块间可以相互调用
4. 执行入口文件的逻辑，放入一个函数表达式中，并立即执行

## npm install 过程
1. 寻找包版本信息文件（package.json）,依照它来进行安装
2. 查找package.json中依赖，并检查项目中其他的版本信息文件
3. 若发现新版本 ，则更新版本信息文件
