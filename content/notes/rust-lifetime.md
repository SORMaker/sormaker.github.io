
💡

只有出现引用才会涉及生命周期问题

生命周期标注并不会改变任何引用的实际作用域--鲁迅



一个生命周期标注，它自身并不具有什么意义，因为生命周期的作用就是告诉编译器多个引用之间的关系。

```rust
fn useless<'a>(first: &'a i32, second: &'a i32) -> &'a i32{}
```

这里的`'a`表示：这两个参数`first`和`second`**至少**活得和`'a`一样久，至于到底活多久或者哪个活得更久一点，不得而知。并且返回值的生命周期也是`'a`。

也就是说，`'a`是两个参数生命周期的**交集。**

**函数的返回值如果是一个引用类型，那么它的生命周期只会来源于**：

- 函数参数的生命周期
- 函数体中某个新建引用的生命周期（典型的悬垂引用）

```rust
fn longest<'a>(x: &str, y: &str) -> &'a str {
    let result = String::from("really long string");
    result.as_str()
}

error[E0515]: cannot return value referencing local variable `result` // 返回值result引用了本地的变量
  --> src/main.rs:11:5
   |
11 |     result.as_str()
   |     ------^^^^^^^^^
   |     |
   |     returns a value referencing data owned by the current function
   |     `result` is borrowed here

```

因为`result`在函数结束后被释放，但是对他的引用依然在继续。

解决方法：返回内部变量的所有权，将所有权转移给调用者。

```rust
fn longest(_x: &str, _y: &str) -> String {
    String::from("really long string")
}

fn main() {
   let s = longest("not", "important");
}
```

生命周期消除规则：

1. **每一个引用参数都会获得独自的生命周期**
    
    例如一个引用参数的函数就有一个生命周期标注: `fn foo<'a>(x: &'a i32)`，两个引用参数的有两个生命周期标注:`fn foo<'a, 'b>(x: &'a i32, y: &'b i32)`,依此类推。
    
2. **若只有一个输入生命周期（函数参数中只有一个引用类型），那么该生命周期会被赋给所有的输出生命周期**，也就是所有返回值的生命周期都等于该输入生命周期
    
    例如函数 `fn foo(x: &i32) -> &i32`，`x` 参数的生命周期会被自动赋给返回值 `&i32`，因此该函数等同于 `fn foo<'a>(x: &'a i32) -> &'a i32`
    
3. **若存在多个输入生命周期，且其中一个是 `&self` 或 `&mut self`，则 `&self` 的生命周期被赋给所有的输出生命周期**
    
    拥有 `&self` 形式的参数，说明该函数是一个 `方法`，该规则让方法的使用便利度大幅提升。
    

`&'static` 对于生命周期有着非常强的要求：一个引用必须要活得跟剩下的程序一样久，才能被标注为 `&'static`。
但是，**`&'static` 生命周期针对的仅仅是引用，而不是持有该引用的变量，对于变量来说，还是要遵循相应的作用域规则**:

```rust
use std::{slice::from_raw_parts, str::from_utf8_unchecked};

fn get_memory_location() -> (usize, usize) {
  // “Hello World” 是字符串字面量，因此它的生命周期是 `'static`.
  // 但持有它的变量 `string` 的生命周期就不一样了，它完全取决于变量作用域，对于该例子来说，也就是当前的函数范围
  let string = "Hello World!";
  let pointer = string.as_ptr() as usize;
  let length = string.len();
  (pointer, length)
  // `string` 在这里被 drop 释放
  // 虽然变量被释放，无法再被访问，但是数据依然还会继续存活
}

fn get_str_at_location(pointer: usize, length: usize) -> &'static str {
  // 使用裸指针需要 `unsafe{}` 语句块
  unsafe { from_utf8_unchecked(from_raw_parts(pointer as *const u8, length)) }
}

fn main() {
  let (pointer, length) = get_memory_location();
  let message = get_str_at_location(pointer, length);
  println!(
    "The {} bytes at 0x{:X} stored: {}",
    length, pointer, message
  );
  // 如果大家想知道为何处理裸指针需要 `unsafe`，可以试着反注释以下代码
  // let message = get_str_at_location(1000, 10);
}
```

面代码有两点值得注意：

- `&'static` 的引用确实可以和程序活得一样久，因为我们通过 `get_str_at_location` 函数直接取到了对应的字符串
- 持有 `&'static` 引用的变量，它的生命周期受到作用域的限制，大家务必不要搞混了

关于`T:'static`:

在《Rust Course》4.1.2下面的评论区中有一个老哥感觉说的比较好，下面是这位老哥的原话。

看了一圈感觉还是老哥比较靠谱, 毕竟 生命周期 就是防止出现 垂悬指针/垂悬引用 实现的, 如果输入不是引用, 那检查它的生命周期有啥意义?

按层主老哥解释, `T: 'static` 为 `T` 涉及引用时的额外限制条件, 那就说得通了

- 泛型 `T` 不涉及引用类型, 那 `'static` 限制失效
- 泛型 `T` 涉及引用类型, 那该引用指向的数据必须获得足够久: `'static`

按这个思路理一下这几个示例代码:

```
use std::fmt::Debug;

// 我们传入引用, 那此时表示引用的原值是 'static 的即可了, 解决报错
fn print_it<T: Debug + 'static>( input: &T) {
    println!( "'static value passed in is: {:?}", input );
}

fn print_it1( input: impl Debug + 'static ) {
    println!( "'static value passed in is: {:?}", input );
}

fn main() {
    let i = 5;

    // 下面三个都不会报错
    print_it(&i);
	print_it1(i);
    print_it1(&5);
}
```

1. `print_it` 要求 `T`为引用时, 引用的数据得是`'static`的, 传入参数是`&T`.
    1. 我们输入`&i`, 根据模式匹配那个原理, 两个`&`匹配相当于解引用, `T`代表的就是`i`的类型`i32`, 不是引用类型, `'static` 限制失效, 编译通过
2. `print_it1` 也要求 `T`为引用时, 引用的数据得是`'static`的, 但传入参数是`T`.
    1. 我们输入`i`, `T`代表的也是`i`的类型`i32`, 不是引用类型, `'static` 限制失效, 编译通过
    2. 我们输入`&5`, 是一个切实的数据(常量(`const`)), 类型是引用类型, 生命周期是 `'static`, 编译通过

---

```
use std::fmt::Debug;
fn print_it<T: Debug + 'static>( input: &T) {
	println!( "'static value passed in is: {:?}", input );
}

fn main(){
    let string = "string".to_string();
    print_it(&string);
    println!("{}",string);
}
```

`print_it` 要求传参 `&T` , 实际传参 `&String`, 解引用后 `T`表示`String`, 不是引用类型, 因此编译通过

---

```
use std::fmt::Debug;
fn print_it<T: Debug + 'static>( input: &T) {
	println!( "'static value passed in is: {:?}", input );
}

fn main(){
    let stk = vec![1, 2, 3];
    print_it(&stk);
    println!("{:?}",stk);
}
```

`print_it` 要求传参 `&T` , 实际传参 `&Vec<_>`, 解引用后 `T`表示`Vec<_>`, 不是引用类型, 因此编译通过

---

```
use std::fmt::Debug;

#[derive(Debug)]struct Test<'a> {
    a: i32,
    b: &'a i32,
}

fn print_it<T: Debug + 'static>(input: &T) {
    println!("'static value passed in is: {:?}", input);
}
fn main() {
    let n = 3;
    let t = Test {a: 3, b: &n};
    print_it(&t);
}
```

`print_it` 要求传参 `&T` , 实际传参 `&Test<'a>`, 解引用后 `T`表示`Test<'a>`, 但`Test`结构体涉及引用和生命周期约束, 因此, 要想通过编译, `'a` 这个生命周期必须为大于等于`'static`. 很显然`&n`也就是`n`的生命周期在`main()`函数运行结束就释放(`drop`), 因此生命周期不是`'static`. 编译失败

如何才能编译通过? 那么给`Test`一个`'static`的`i32`就好啦

```rust
use std::fmt::Debug;

#[derive(Debug)]struct Test<'a> {
    a: i32,
    b: &'a i32,
}

fn print_it<T: Debug + 'static>(input: &T) {
    println!("'static value passed in is: {:?}", input);
}
fn main() {
    const N: i32 = 3;  // const 生命周期是 'static, 此时'a=='static, 通过
    let t = Test {a: 3, b: &N};
    print_it(&t);
}
```
