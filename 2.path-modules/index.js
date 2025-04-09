const path = require("path");

console.log("Directory Name: ", path.dirname(__filename));
console.log("File Name: ", path.basename(__filename));
console.log("File Extension: ", path.extname(__filename));

const joinPath = path.join("/users", "documents", "node", "projects");
console.log("joined Path : ", joinPath);

const resolvePath = path.resolve("/users", "documents", "node", "projects");
console.log("Resolved Path: ", resolvePath);