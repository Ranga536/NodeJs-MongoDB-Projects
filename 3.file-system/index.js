const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
    console.log("dataFolder is Created");
}

const filePath = path.join(dataFolder, "example.txt");

//Synchronous Way of Creating a File 
fs.writeFileSync(filePath, "Hello From Node JS");
console.log("File Created SuccessFully!");

const readContentFromFile = fs.readFileSync(filePath, 'utf8');
console.log("File Content: ", readContentFromFile);

fs.appendFileSync(filePath, "\nThis is new line added to the file");
console.log("new file content added");

//Async way of creating a File
const asyncFilePath = path.join(dataFolder, "async-example.txt")

fs.writeFile(asyncFilePath, "Hello, Async Node JS", (err)=> {
    if(err) throw err;
    console.log('Async File is created successfully!');
    
    fs.readFile(asyncFilePath, "utf8", (err, data) => {
        if (err) throw err;
        console.log("Async File Content: ", data);
        fs.appendFile(asyncFilePath, "\nThis is anther line added", (err) => {
            if (err) throw err;
            console.log("New Line Added to Async File");
            fs.readFile(asyncFilePath, "utf8", (err, updatedData) => {
                if (err) throw err;
                console.log("Updated File Content: ", updatedData);
            })
    })
  })

})