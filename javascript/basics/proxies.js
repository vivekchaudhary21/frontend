/**
 * Proxy() constructor : The Proxy() constructor is used to create Proxy objects.
 * Parameters
 * target: A target object to wrap with Proxy. It can be any sort of object, including a native array, a function, or even another proxy.
 * handler: An object whose properties are functions that define the behavior of the proxy when an operation is performed on it.
 * Description: Use the Proxy() constructor to create a new Proxy object. This constructor takes two mandatory arguments:
 * target is the object for which you want to create the proxy
 * handler is the object that defines the custom behavior of the proxy.
 * An empty handler will create a proxy that behaves, in almost all respects, exactly like the target. By defining any of a set group of functions on the handler object, you can customize specific aspects of the proxy's behavior. For example, by defining get() you can provide a customized version of the target's property accessor.
 */

let obj = {
  prop1: 'hello',
  prop2: 'goodbye',
};

let handler = {
  get: function (target, prop) {
    return target[prop];
  },
  set: function (target, prop, newVal) {
    target[prop] = newVal.toUpperCase();
    return true;
  },
};

let proxy = new Proxy(obj, handler);

proxy.prop1 = 'hey';
console.log(proxy.prop1);
