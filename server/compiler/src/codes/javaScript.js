
                const input = [51, 22, 61, 42, 91, 48, 57, 14, 28, 9, 76, 14];
                console.log(function findSum(arr) {
    const arrayHandler = {
        data: arr.slice(0),
        calculateSum: function () {
          //console.log(arr)
            return this.data.reduce((total, num) => total + num, 0);
        }
      
    };

    return arrayHandler.calculateSum();
}(input));
            