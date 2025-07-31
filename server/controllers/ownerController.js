import imagekit from "../configs/imageKit.js";
import User from "../models/User.js";
import Car from "../models/Car.js";
import fs from "fs";
import Booking from "../models/Booking.js";
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

// API TO LIST OWNER CARS
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({
      owner: _id,
    });

    res.json({
      success: true,
      cars: cars, // ← Changé de 'message' à 'cars'
      message: `${cars.length} voiture${cars.length !== 1 ? "s" : ""} trouvée${
        cars.length !== 1 ? "s" : ""
      }`,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API TO TOGGLE CAR AVAILABILITY

export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    if (car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "unthorized",
      });
    }

    car.isAvaliable = !car.isAvaliable;

    await car.save();
    res.json({
      success: true,
      message: "Availability Toggled",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to delete a car
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const {carId} = req.body;
    const car = await Car.findById(carId);

    if (car.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "unthorized",
      });
    }

    car.owner = null;
    car.isAvaliable = false;

    await car.save();
    res.json({
      success: true,
      message: "Car removed",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    if (role !== "owner") {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const cars = await Car.find({ owner: _id });

    // Fix the sorting by providing a proper sort object
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 })
      .exec();

    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });

    const completedBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
    });

    // Calculate monthly revenue without using slice()
    const monthlyRevenue = bookings
      .filter((b) => b.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3), // Get only first 3 bookings
      monthlyRevenue,
    };

    res.json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    console.error("Dashboard Error:", error); // Better error logging
    res.json({
      success: false,
      message: error.message || "Error fetching dashboard data",
    });
  }
};
// API  to update user image

export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;

    const imageFile = req.file;

    // Upload image to imageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // For URL Generation, works for both images and videos
    var optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          width: "400",
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

    await User.findByIdAndUpdate(_id, { image });
    res.json({
      success: true,
      message: "Image Updated ",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
