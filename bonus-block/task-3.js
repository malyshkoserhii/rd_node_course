const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Пройшло 2 секунди");
        }, ms);
    });
};

delay(2000).then((result) => console.log("🚀 ~ result:", result));