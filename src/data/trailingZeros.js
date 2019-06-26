const demo = function(params) {
  const factorial = (n) => {
    if(n === 0){
      return 1;
    }
    return n * factorial(n - 1);
  }

  const trailingZeros = (n) => {
    const factorialREsult = factorial(n);
    let count = 0;
    let temp = Math.floor(n / 5);
    while(temp !== 0) {
      count += temp;
      temp = Math.floor(temp / 5);
    }
    return count;
  }
  console.log(trailingZeros(params));
}

export default demo;