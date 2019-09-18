/*
 * 改变目标函数 this 的指向，接受数组作为参数，目标函数调用 apply 后会立即执行
 * fn.apply(thisArg, [arg1, arg2, ...])
 */

function myApply(context, params) {
  if (typeof context === 'object') {
    context = context || window;
  } else {
    context = Object.create(null);
  }

  const fn = Symbol();
  context[fn] = this;

  const result = context[fn](...params);
  delete context[fn];
  return result;
}

Function.prototype.myApply = myApply;

const person = {
  name: '小明',
  age: 20,
};

function printName(msg) {
  console.log(this.name, msg);
}

printName.myApply(person, ['abcd']);
