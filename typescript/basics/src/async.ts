console.log("***************************** Async ******************************")


console.log("1")

export async function some (): Promise<void> {
  console.log(2)
  await Promise.resolve(21)
  console.log(3)
}

some()

console.log(4)



function generateNumberLessThan5(): Promise<number> {
  let num: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
      const number: number = Math.ceil(Math.random() * 10)
      if(number < 5) {
        resolve(number)
      } else {
        reject(number)
      }
    }, 2000);
  })

  return num
}

// generateNumberLessThan5().then(num => {
//   console.log("success") 
//   return num
// }, (num) => {
//   console.log("failure")
// return num
// }).then(num => console.log(`the number was ${num}`)).catch(err => console.log("rejected", err))


// async/await

async function getNumberLessThan5 () {
  try {   
    const number = await generateNumberLessThan5()
    console.log("Succesful number", number)
  } catch (error) {
    console.log("Rejected number", error)
  }
}

getNumberLessThan5()