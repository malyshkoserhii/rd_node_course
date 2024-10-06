const task1 = (n) => {
    let arr = [];

    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 || i % 5 === 0 || i % 7 === 0) {
            arr.push(i);
        }
    }

    return arr;
};

const result = task1()
console.log("🚀 ~ result:", result)
