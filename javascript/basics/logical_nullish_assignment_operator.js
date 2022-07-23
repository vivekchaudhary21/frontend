// nullish means only null or undefined
// falsy includes 0, '', null, undefined
// returns first non nullish value

const log = console.log;

log('' ?? 'a'); // ''
log('' || 'a'); // 'a'

log(0 ?? 10); // 0
log(0 || 10); // 10
