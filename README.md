总结遇到的坑


2017-09-11
# 关于event.target.value
在修改state中的数据时，需要先在setState()方法之前获取到event.target.value，否则在setState()中获取会报`cannot read property 'value' of null`；

# value与defaultValue
在表单元素上设置'value'属性，若不绑定onChange事件，则无法修改value值；如果要想修改value的值，但不想实时反映到state中，只需将`value`更改成`default value`；

# import和require
1. webpack可以使用require和export,但是不能混合使用import 和module.exports ，不然会报错`Cannot assign to read only property 'exports' of object '#<Object>'`。
module.exports对应使用require,export对应improt。
同一个文件中不可混用import和module.exports
2. import要放在文件最顶部

# 关于location
直接使用location时会报`Unexpected use of 'location'  no-restricted-globals`,此时在location之前添加`window`即可解决。

# 关于PropTypes
Warning: You are manually calling a React.PropTypes validation function for the `component` prop on `Route`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library.

# Warning: You are manually calling a React.PropTypes validation function for the `components` prop on `Route`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library.
需要react 15.2.1一下的版本  同时react-dom版本需要与react保持一致

# this.unsubscribe is not a function
在componentWillMount中卸载监听太快，需要设置一个定时器

# React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: object. 

**低级错误
#Uncaught SyntaxError: Unexpected token <
调用方法时没有添加括号











** ES5&ES6

1. 类中的构造函数
ES5: init: function(){ // code here }
ES6: constructor(){ //code here }







reflux

1. 一个页面一个sto