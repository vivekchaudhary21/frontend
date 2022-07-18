const obj = {
  name: 'User',
};

function showName(message, message2) {
  console.log(`${message}, ${this.name}. ${message2}`);
}

const showNameWithMessage = showName.bind(obj, 'Good Morning');

showNameWithMessage('Today is your day');

Function.prototype.bindModified = function (calledObj, ...rest) {
  return (...rest2) => {
    calledObj[this.name] = this;
    return calledObj[this.name](...rest, ...rest2);
  };
};

const showNameWithMessageWithBindModified = showName.bindModified(
  obj,
  'Good Morning'
);

showNameWithMessageWithBindModified('Today is your day');
