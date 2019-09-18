/*
 * 改变目标函数 this 的指向，接受参数列表，目标函数调用 call 后会立即执行
 * fn.call(thisArg, arg1, arg2, ...)
 *
 */

function myCall(context, ...params) {
  if (typeof context === 'object') {
    // 第一个值可能传的是 null，这时候需要将this指向全局对象
    context = context || window;
  } else {
    // 不传第一个参数时，需要生成一个空对象
    // 这里有个问题，在严格模式下，如果不传第一个参数，则 this 值将是 undefined，从而报错，这里需要优化下
    context = Object.create(null);
  }

  // 用Symbol值作为键，避免键重复
  const fn = Symbol();
  // 思路就是将目标函数设置成指定的 this 对象的一个方法，然后调用
  // 因为现在是作为对象方法调用，所以就改变了函数的this指向
  context[fn] = this;

  const result = context[fn](...params);
  // 执行完成后将这个方法从对象中移除
  delete context[fn];

  // 函数有返回值，所以需要将执行的结果返回
  return result;
}

Function.prototype.myCall = myCall;

const person = {
  name: '小明',
  age: 20,
};

function printName(msg) {
  console.log(this.name, msg);
}

printName.myCall(person, 'abcd');
