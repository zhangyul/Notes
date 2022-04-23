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

/** 高级类型
 * 
 */

// class
class Person3 {
    age: number
    name = 'zhangsan'
    // 构造函数
    constructor(age: number, name?: string) {
        this.age = age
        this.name = name
    }
    // 实例方法
    setName(name: string) {
        this.name = name
    }
}
const p3 = new Person3(27, 'zhangyuling')
console.log(p.name)
p3.setName('zhang')
console.log(p.name)
/**
 * class继承
 * 1. extends   继承父类
 * 2. implements    实现接口【TS提供的】
 */
// extends
class My extends Person3 { }
const m = new My(27)
m.setName('li')
// implements 使类实现定义的接口，类中必须提供接口定义的接口
interface Singable {
    name: string
    sing(): void
}
class Person4 implements Singable {
    name = '那时的我，现在的我'
    sing() {
        console.log('那时的我总以为等不到现在~')
    }
}

/** 类成员可见性
 * 可见性修饰符 public / protected / private
 *  */
class Person5 {
    age: number
    name = 'zhangsan'
    phone: number
    // 实例方法
    public setName(name: string) {
        this.name = name
    }
    // 类/子类中可见，实例对象无法访问
    protected setPhone(phone: number) {
        this.phone = phone
    }
    private setAge(age: number) {
        this.age = age
    }
}
class You extends Person5 {
    setYouPhone() {
        this.setPhone(15110779740)
        //   this.setAge() 无法访问到
    }
}
const you = new You()
you.setName('zhang')
// you.setPhone() 无法访问到

// readonly修饰符 只读属性，不可以修饰函数
class Person6 {
    // 允许设置默认值，和constructor时设置初始值
    readonly age: number = 18
    constructor(age: number) {
        this.age = age
    }
    setAge(age: number) {
        // this.age = age 会报错
    }
}
// 可以修饰接口
interface IPerson3 {
    readonly name: string
}
let obj2: IPerson3 = { name: 'zhang' }
// obj2.name='' 报错

// 可以修饰{}类型
let obj3: { readonly name: string } = { name: 'zhang' }
// obj3.name='' 报错

/**
 * 类型兼容性
 * 两种类型系统：1 Structural Type System（结构化类型系统） 2 Nominal Type System（标明类型系统）。
 * TS 采用的是结构化类型系统，也叫做 duck typing（鸭子类型），类型检查关注的是值所具有的形
 * 也就是说，在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型
 */
let arr = ['a', 'b']
arr.forEach(item => { })
arr.forEach((item, index) => { })

class P1 {
    x: number
}
class P2 {
    x: number
    y: number
}
const p4: P1 = new P2() // Nominal Type System 无法此种操作
// 成员多兼容成员少

// 接口兼容性
interface P3 { x: number }
interface P4 { x: number, y: number }
let p6: P4
let p5: P3 = p6
// 成员多兼容成员少

// 函数兼容性
// 参数少兼容参数多与上面两种不同
type F1 = (a: number) => void
type F2 = (a: number, b: number) => void
let f1: F1
let f2: F2 = f1
// 返回值类型只要考虑返回值本身即可

// 交叉类型（&）：功能类似于接口继承（extends），用于组合多个类型为一个类型（常用于对象类型）
interface P5 { name: string }
interface P6 { age: number }
// type PersonDetail = P5 & P6
let obj4: P5 & P6 = {
    name: "zhang",
    age: 18
}

/** 泛型<>
 * 函数与多种类型一起工作
 */
// 创建泛型函数
function id<Type>(value: Type): Type { return value }
id<number>(10)
id(10)
// 约束-限定具体类型
function aLength<Type>(value: Type[]) { return value.length }
aLength(['10'])
// 添加约束
interface BLength { length: number }
function id3<T extends BLength>(value: T): T { return value }
id3([0])
// 多个泛型变量
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) { return obj[key] }
getProp({ a: "00" }, 'a')
getProp(['0'], 'concat')
getProp(18, 'valueOf')
/** 泛型接口
 * 对全部成员可见
 * 使用必须显式命名 
 * */
interface IdFunc<T> {
    id: (value: T) => T
    ids: () => T[]
}
let obj5: IdFunc<number> = {
    id: (v) => v,
    ids: () => [1]
}
/**泛型类
 * 
 */
class GenericNumber<T>{
    defaultValue: T
    add: (z: TemplateStringsArray, y: T) => T
    constructor(value: T) {

    }
}
const myNum = new GenericNumber<number>(100)
myNum.defaultValue = 10
/**工具类型
 * Partial<T> 可选属性
 * Readonly<T> 只读属性
 * Pick<T,''|''> 选择
 * Record<'',number> 新建属性类型相同的对象
 * [key: string]:number索引签名类型
 * [key in T]映射类型 基于旧的类型创建新的类型 只能在类型别名中使用，不可以在接口里使用
 * [Key in keyof T] 根据对象类型创新新的类型
 *  */
interface Props {
    id: number
    childern: number[]
}
type PartialProps = Partial<Props>
let p7: PartialProps = {}

type ReadonlyProps = Readonly<Props>
let p8: ReadonlyProps = { id: 2, childern: [11] }
// p8.id = 1 报错

type PickProps = Pick<Props, 'id'>
let p9: PickProps = { id: 2 }


type RecordProps = Record<'id' | 'b', number[]>
let p10: RecordProps = { id: [1], b: [] }

interface AnyObject { [key: string]: number }
let obj6: AnyObject = { a: 100 }

type PropsKeys = 'x' | 'y' | 'z'
type Type2 = { [Key in PropsKeys]: number }
let obj7: Type2 = { x: 1, y: 2, z: 3 }
type Type3 = { [key in keyof Type2]: string }

// 类型声明文件
import { Props1 } from "./type"
const p11: Props1 = { x: 1, y: "100" }
