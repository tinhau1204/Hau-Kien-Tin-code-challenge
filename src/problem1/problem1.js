//Problem 1: Three ways to sum to n

// # Task

// Provide 3 unique implementations of the following function in JavaScript.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

var sum_to_n_a = function(n) {
    return n * (n + 1) / 2;
};

var sum_to_n_b = function(n) {
    let sum = 0;
    for (var i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_c = function(n) {
    return n === 1 ? 1 : n + sum_to_n_c(n - 1);
};


console.log('check a',sum_to_n_a(10)) // use formula n(n+1)/2 in arithmetic progression
console.log('check b',sum_to_n_b(10)) // use for loop and sum from 1 to n 
console.log('check c',sum_to_n_c(10)) // recursion