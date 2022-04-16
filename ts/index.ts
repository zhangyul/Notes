/**
 * 类型注解 变量: 类型
 * */
let age: number
age = 20
// age = '20' 会报错
/** 
 * 1. JS 已有类型
 *  原始类型：number/string/boolean/null/undefined/symbol。
 *  对象类型：object（包括，数组、对象、函数等对象）。
 * */
let numbers: number[] = [1, 2, 3, 4]
let strings: Array<string> = ['1', '2', '3', '4']

/**
* 2. TS 新增类型
* 联合类型、自定义类型（类型别名）、接口、元组、字面量类型、枚举、void、any 等
*/

// 联合类型：|
let arr1: (number | string)[] = [1, '2', '3', '4']
let arr2: number | string[] = ['1', '2', '3', '4']// 数字或字符串数组

// 类型别名type
type CustomArry = (number | string)[]
let arr3: CustomArry = [1, '2', '3', '4']

// 函数类型返回值function add(): 返回值类型
function add1(num1: number): number {
    return num1
}

const add2 = (num1: number): number => {
    return num1
}

const add3: (num1: number) => number = (num1) => {
    return num1
}
const b = add1(1)

// void函数类型
const add4: () => void = () => {
    console.log("void函数类型")
}

//可选参数类型 ?，可选必须置于必选之后
function mySlice(start?: number) {
    console.log(start)
}

// 对象类型
let person: {
    name: string;
    age: number;
    // sayHi(): void
    sayHi: () => void
    sayPhone(phone: string): void
} = {
    name: 'zhang',
    age: 27,
    sayHi() { },
    sayPhone(phone) { }
}

// 对象的可选属性
function myAxios(config: { url: string, method?: string }) { }
myAxios({ url: '' })

// 接口 interface
interface IPerson {
    name: string,
    age: number;
    sayHi: () => void
}
let interfacePerson: IPerson = {
    name: 'zhang',
    age: 27,
    sayHi() { },
}

// 继承 extends
interface IPerson2 extends IPerson { type: string }
let p: IPerson2 = {
    name: 'zhang',
    age: 27,
    sayHi() { },
    type: 'woman'
}

// 元组 Tuple 确切知道含有多少元素以及对应索引类型
// 使用场景：经纬度坐标记录位置信息
let position: [number, number] = [200, 11]

/**
 * 类型推论 类型注解可以不写
 * 初始化值和返回值时
 * 声明变量未初始化时不得省略
 *  */
let age2 = 18
// age2='' 报错

/**
 * 类型断言 指定更准确的类型 as 关键字
 */
const a = document.getElementById('a') as HTMLAnchorElement
// const a = <HTMLAnchorElement>document.getElementById('a')
// tips:可以使用 console.dir() 打印dom元素查看元素类型

/**
 * 字面量类型 因const特性导致的'Hello'类型
 * 使用场景：表示一组明确的可选值
 *  */
const str1 = 'Hello'
function changeDirection(direction: 'up' | 'down' | 'left' | 'right') { }
changeDirection('up')

/**
 * 枚举 enum 可选常量
 * 枚举默认从0开始的自增长枚举称为【数字枚举】
 * 【字符枚举】无自增长，需要每个都设置
 * 特性：
 *  1. 枚举有默认值
 *  2. 
 * 
 */
enum Direction { Up = 1, Down, Left = 'O' }
function changeDirection2(direction: Direction) { }
changeDirection2(Direction.Down)

/** 编译后代码 Up，Down都含有默认值
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Down"] = 2] = "Down";
        Direction["Left"] = "O";
    })(Direction || (Direction = {}));
    function changeDirection2(direction) { }
    changeDirection2(Direction.Down);
 */

// any 不推荐使用，失去了ts的类型保护
let obj: any = { x: 0 }
let any

/**
 * typeof
 *  1. 原来js提供的类型查询
 *  2. 上下文环境中的类型查询 只能查询变量或者属性的类型，不可以查询函数调用的类型
 *  */
console.log(typeof 'Hello Ts')
let pp = { x: 1, y: 2 };
function fo(point: typeof p) { }
