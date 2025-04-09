const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/booksDB", {
  useNewUrlParser: true,    // To avoid deprecation warning
  useUnifiedTopology: true  // To avoid deprecation warning
})
.then(() => console.log("Database connected successfully"))
.catch(err => console.log(err));


// Create a schema
const userSchema = new mongoose.schema({
    name : String,
    email : String,
    age : Number,
    isActive : Boolean,
    tags : [String],
    createdAt : {type : Date, default : Date.now}
});

// Create a model
const User = mongoose.model("User", userSchema);

async function runQueryExample() {
    try {
        // Create a document using create method
        // const newUser = await User.create({ //way of creating a new document
        //     name : "Ram",
        //     email : "ranga@gmail.com",
        //     age : 24,
        //     isActive : true,
        //     tags : ["developer", "designer"]
        // })

        //cerate a document using save new model and save method
        const newUser = new User({ //way of creating a new document
            name : "Ram",
            email : "ranga@gmail.com",
            age : 24,
            isActive : true,
            tags : ["developer", "designer"]
        })

        await newUser.save(); //save the document to the database collection

        console.log("New user created: ", newUser);

        //get all users 
        const allUsers = await User.find();
        console.log("All users: ", allUsers);

        //get a user by id
        const userById = await User.findById("60f3d1b1b1e1d9b9c8b1e8e2");
        console.log("User by id: ", userById);

        //get one user only by find one method
        const oneUser = await User.findOne({name : "Ram"});
        console.log("One user: ", oneUser);

        //get selected fields 
        const selectedFields = await User.find().select("name email -_id");
        console.log("Selected fields: ", selectedFields);

        //pagination or get limited records
        const limitedRecords = await User.find().limit(5);
        console.log("Limited records: ", limitedRecords);
        
        //sorting
        const sortedRecords = await User.find().sort({age : 1}); //1 for ascending order and -1 for descending order
        console.log("Sorted records: ", sortedRecords);

        //filtering
        const filteredRecords = await User.find({age : 24});        
        console.log("Filtered records: ", filteredRecords);

        //count documents 
        const count = await User.find().countDocuments({isActive : true});
        console.log("Total documents: ", count);

        //update a document
        const updatedUser = await User.updateOne({name : "Ram"}, {name : "Rama"});
        console.log("Updated user: ", updatedUser);

        //delete a document
        const deletedUser = await User.deleteOne({name : "Rama"});
        console.log("Deleted user: ", deletedUser);


    } catch (error) {
        console.log(error);
    } finally {
        mongoose.connection.close();
    }
}

runQueryExample();