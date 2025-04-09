function delayFunc(time) {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}

async function delayedFuncGreet(name) {
    await delayFunc(2000);
    console.log(`Hello ${name}`);
}

delayedFuncGreet("Ranga");