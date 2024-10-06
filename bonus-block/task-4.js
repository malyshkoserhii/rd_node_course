const task4 = (value) => {
    return new Promise((resolve) => {
        resolve(value * 2);
    });
};

const test = task4(5)
    .then((res) => res + 10)
    .then((res) => console.log("🚀 ~ result:", result));