const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}

// The same with recursion approach

function recursiveIteration(array, index = 0) {
    const el = array[index];

    console.log(el);

    if (arr.length === index) {
        return;
    }

    recursiveIteration(array, index + 1);
}

console.log(recursiveIteration(arr, 0));