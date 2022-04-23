
/**
 * 类型声明文件 :   为已存在的文件提供类型声明
 * 声明文件中不可以存在可执行代码
 * 不会生成js
 * @type/* 类型声明文件仓库
 */

// declare 为已存在变量声明类型
declare let count: number

declare function add(x: number, y: number): number

type Props1 = { x: number, y: string }

// 创建自己的类型声明文件
export { Props1, count, add }
