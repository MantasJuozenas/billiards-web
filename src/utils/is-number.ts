export const IsNumber = (testNumber: any) => {
  let numberValue = 0;
  let isNumber = false;

  if (!Number.isNaN(Number(testNumber))) {
    numberValue = Number(testNumber);
    isNumber = true;
  }
  if (testNumber === 'Infinity') {
    numberValue = 0;
    isNumber = false;
  }

  return { numberValue, isNumber };
};
