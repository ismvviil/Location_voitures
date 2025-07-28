import imagekit from "../configs/imageKit.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import fs from "fs";
export const changerRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { role: "owner" });

    res.json({
      success: true,
      message: "Now you can list yr cars",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// APi to list car

export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;

    // Upload image to imageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // For URL Generation, works for both images and videos
    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          width: "1280",
        },
        {
          quality: "auto",
        },
        {
          format: "webp",
        },
      ],
    });

    const image = optimizedImageUrl;

    await Car.create({
      ...car,
      owner: _id,
      image,
    });

    res.json({
      success: true,
      message: "Car Added",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
