const task2 = (value) => {
    const str = value.toString();

    const isPalindrome = str === str.split("").reverse().join("");

    return isPalindrome ? true : false;
};

const result = task2()
console.log("🚀 ~ result:", result)
