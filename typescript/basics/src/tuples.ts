console.log("******************* Tuples ********************")

/***************************************************************************/
/*********************************** Tuples ********************************/
/***************************************************************************/

export type threeDCordinates = [x: number, y: number, z: number]

export function add3dCoordinate(c1: threeDCordinates, c2: threeDCordinates): threeDCordinates {
  const result = []
  for (let i = 0; i < c1.length; i++) {
    result[i] = c1[i] + c2[i]
  }
  return result as threeDCordinates
}

export function simpleStringState(intialValue: string): [() => string, (v: string) => void] {
  let str: string = intialValue
  return [
    () => str,
    (v: string) => {
      str = v
    }
  ]
}



console.log(add3dCoordinate([1, 2, 3], [1, 2, 3]))

const [stringGetter, stringSetter] = simpleStringState('first')
console.log(stringGetter()) // first
console.log(stringSetter('second'))
console.log(stringGetter()) // second