`npm i -g typescript`  
`npm i -g ts-node`  
使用 `tsc index.ts` 编译ts  
使用 `ts-node index.ts` 直接运行ts 

package.json中的`typings` 用于声明所使用的类型声明文件

常用类型声明库 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

创建支持TS的React项目 `npx create-react-app react-ts --template typescript`

[现有项目添加TS支持](https://create-react-app.dev/docs/adding-typescript/) `npm install --save typescript @types/node @types/react @types/react-dom @types/jest`

使用 CRA 创建支持 TS 的项目
1. 项目根目录中增加了 tsconfig.json 配置文件：指定 TS 的编译选项（比如，编译时是否移除注释）。
2. React 组件的文件扩展名变为：*.tsx。
3. src 目录中增加了 react-app-env.d.ts：React 项目默认的类型声明文件

`tsc --init` 初始化ts配置
