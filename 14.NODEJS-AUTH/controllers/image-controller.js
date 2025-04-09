const Image = require('../models/image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper');
const fs = require("fs");
const cloudinary = require("../config/cloudinary-config");

const uploadImageController = async(req, res) => {
    try{

        //check if image file is missing in the request object
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: 'Image file is missing in the request'
            });
        }

        //upload image to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path); 

        //save image details in database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newlyUploadedImage.save();

        //delete image file from local storage
        // fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newlyUploadedImage 
        });

    } catch(error) {
        console.log('Error in uploading image', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! please try again'
        });
    }
}


const fetchImagesController = async(req, res) => {
    try{

        //pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || 'createdAt'; //createdAt or any other field
        // const orderBy = req.query.orderBy || 'desc';  //asc or desc
        // const order = orderBy === 'desc' ? -1 : 1;   //1 for ascending order and -1 for descending order
        // const sort = {[sortBy]: order};             //sort object
        // const count = await Image.countDocuments(); //total number of images
        // const totalPages = Math.ceil(count / limit); //total number of pages
        // const images = await Image.find().populate('uploadedBy', 'name email').sort(sort).skip(skip).limit(limit); //fetch images
        const sortOrder = req.query.sortOrder || 'desc';
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {};
        // sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1; //1 for ascending order and -1 for descending order

        sortObj[sortBy] = sortOrder; 


        const images = await Image.find().sort(sortObj).skip(skip).limit(limit).populate('uploadedBy', 'name email'); 
        
        if (images) {
            res.status(200).json({
                success: true,
                currentPage: page,
                totalPages: totalPages,
                totalImages: totalImages,
                data: images
            });
        }

    } catch(error) {
        console.log('Error in fetching images', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! please try again'
        });
    }
}

//delete image controller
const deleteImageController = async(req, res) => {
    try{
        const getCurrentIdOfImageToBeDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOfImage);

        if(!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        //check if the user is authorized to delete the image
        if(image.uploadedBy.toString() !== userId) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to delete this image'
            });
        }

        //delete image from cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        //delete image from database
        await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully' 
        });

    } catch(error) {
        console.log('Error in deleting image', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! please try again'
        });
    }
}

module.exports = {uploadImageController, fetchImagesController, deleteImageController};