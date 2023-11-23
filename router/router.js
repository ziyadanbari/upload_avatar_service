import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const route = express.Router();

route.post("/uploadAvatar", authorizeUser, uploadAvatar);

const authorizedToken =
  "ec23002edf982c99d4d7859806cddd15a6fe017d80e8ca150cbcf7a989e5";
function authorizeUser(req, res, next) {
  if (req.headers.authorization === authorizedToken) {
    return next();
  } else {
    return res.status(403).json({ message: "You are not authorized for that" });
  }
}

async function uploadAvatar(req, res) {
  try {
    const { base64Image } = req.body;
    const virtualName = crypto.randomBytes(20).toString("hex");
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");
    const imagePath = path.resolve(__dirname, `uploads/${virtualName}.png`);
    fs.writeFileSync(imagePath, imageBuffer);
    console.log("Image has been saved:", imagePath);
    res.status(200).json({
      uploadPath: `${process.env.AVATAR_UPLOAD_SERVICE}public/avatar/${virtualName}.png`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}

export { route };
