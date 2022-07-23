/**
 * Builder provides an API for constructing an object step by step
 */

class Tag {
  constructor(name, text) {
    this.name = name;
    this.text = text;
  }

  toString() {
    return `  <${this.name}>${this.text}</${this.name}>\n`;
  }
}

class HTMLBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.root.children = [];
  }

  addChild(childname, childtext) {
    let child = new Tag(childname, childtext);
    this.root.children.push(child);
  }

  toString() {
    return `<${this.root.name}>\n${this.root.children.join('')}</${
      this.root.name
    }>`;
  }
}

const words = ['js', 'react', 'webpack', 'gql'];

const ul = new HTMLBuilder('ul');
for (let word of words) {
  ul.addChild('li', word);
}
