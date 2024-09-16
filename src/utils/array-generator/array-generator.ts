import { IRandomArray } from "../../types";

const randomArrayGenerator = (length: number): IRandomArray[] => {
  const array = new Array(length).fill(0);
  array.forEach((_, index) => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    array[index] = {
      value: randomNum,
      isPositionChanged: false,
      isAtCorrectPosition: false,
    };
  });
  return array;
};
export default randomArrayGenerator;