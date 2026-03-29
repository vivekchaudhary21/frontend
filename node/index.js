for (let i = 0; i < 10; i++) {
  console.log('before', i)

  if (i == 5) {
    continue
  }

  console.log('after', i)
}

let x = 3

function z() {
  console.log(x)
  let y = x * 3
  console.log(x)
}

z()
