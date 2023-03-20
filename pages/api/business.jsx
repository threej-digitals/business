import { threej } from "@/lib/threej";
const fs = require("fs");
const jwt = require("jsonwebtoken");

export default async function Auth(req, res) {
  //only accessible to logged in user
  if (!req.cookies.lpbBID) {
    res.statusCode = 404;
    return res.end();
  }

  try {
    //extract business id from auth cookies
    const business = jwt.verify(req.cookies.lpbBID, process.env.SALT);

    // get business details from db
    const result = await threej.query("SELECT * FROM ?? WHERE BID = ?", [
      process.env.BUSINESSTABLE,
      business.bid,
    ]);

    if (result.length == 0) {
      return res.json({ ok: false, message: "Business details not found!" });
    } else {
      business["details"] = result[0];
    }

    if (req.method == "GET") {
      //respond with business details
      return res.json(business.details);
    } else if (req.method == "POST") {
      const logo = req.body.logo;
      // logic for accepting image file with size upto 2mb
      if (/^data.*base64,.*/.test(logo)) {
        const imgType = logo.match(/data:(.*);/)[1];
        if (!["image/png", "image/jpg", "image/jpeg"].includes(imgType)) {
          return res.json({ ok: false, message: "File type not allowed" });
        }

        if (((logo.length - logo.indexOf(",")) * 3) / 4 / 1024 / 1024 > 2) {
          return res.json({ ok: false, message: "File is too big" });
        }

        //delete older image
        if (business.details.LOGO) {
          fs.unlink("./public/img/uploads/" + business.details.LOGO, () => {});
        }

        req.body["logoFileName"] =
          Date.now() + "." + imgType.replace("image/", "");

        await threej.base64ToImg(
          logo.split(",")[1],
          "./public/img/uploads/" + req.body.logoFileName
        );
      }

      if (req.body.password) {
        req.body.password = await threej.encryptPassword(req.body.password);
      }

      threej.query(
        "UPDATE ?? SET BNAME = ?,  LOGO = ?, ADDRESS = ?, GSTIN = ?, PASSWORD = ? WHERE BID = ?",
        [
          process.env.BUSINESSTABLE,
          req.body.businessName || business.details.BNAME,
          req.body.logoFileName || business.details.LOGO,
          req.body.address || business.details.ADDRESS,
          req.body.gstin || business.details.GSTIN,
          req.body.password || business.details.PASSWORD,
          business.details.BID,
        ]
      );
      return res.json({ ok: true, message: "Profile updated" });
    }
  } catch (error) {
    threej.logError(error);
    res.send({
      ok: false,
      message: "Internal error occurred",
    });
  }
}
