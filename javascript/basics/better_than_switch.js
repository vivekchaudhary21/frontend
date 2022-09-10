const extension = '.css';

let contentType;

switch (extension) {
  case '.css':
    contentType = 'text/css';
    break;
  case '.js':
    contentType = 'text/javascript';
    break;
  case '.jpg':
    contentType = 'image/jpg';
    break;
  case '.txt':
    contentType = 'text/plain';
    break;
  default:
    contentType = 'text/html';
}

console.log(contentType);

const extensionMap = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpg',
  '.txt': 'text/plain',
};

console.log(extensionMap[extension] || 'text/html');
