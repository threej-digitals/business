import { threej } from "@/lib/threej";
const jwt = require("jsonwebtoken");

async function validateOtp(req, res) {
  try {
    const { phone, otp } = req.query;
    const result = await threej.query("SELECT * FROM ?? WHERE MOBILENO = ?", [
      process.env.OTPTABLE,
      phone,
    ]);

    const elapsedTime =
      (Date.now() / 1000 - new Date(result[0].TIMESTAMP).getTime() / 1000) / 60;
    //OTP valid till 5 minute
    if (elapsedTime > 5) {
      return res.send({
        ok: false,
        message: `OTP expired, please request a new OTP`,
      });
    }
    if (result[0].ATTEMPTS >= 5) {
      return res.send({
        ok: false,
        message: `You reached maximum attempts limit, please request a new OTP`,
      });
    }
    if (result[0].OTP == otp) {
      let business = await threej.query("SELECT * FROM ?? WHERE MOBILENO = ?", [
        process.env.BUSINESSTABLE,
        phone,
      ]);

      let bid = 0;
      if (business.length == 0) {
        business = await threej.query("INSERT INTO ??(MOBILENO) VALUES(?)", [
          process.env.BUSINESSTABLE,
          phone,
        ]);
        bid = business.insertId;
      } else {
        bid = business[0].BID;
      }
      return res.send({
        ok: true,
        message: "verified!",
        jwt: jwt.sign({ bid: bid }, process.env.SALT),
      });
    }
    await threej.query(
      "UPDATE ?? SET ATTEMPTS = ATTEMPTS+1 WHERE MOBILENO = ?",
      [process.env.OTPTABLE, phone]
    );
    return res.send({
      ok: false,
      message: "Invalid OTP",
    });
  } catch (error) {
    threej.logError(error);
    res.send({
      ok: false,
      message: "Internal error occurred",
    });
  }
}

async function validatePassword(req, res) {
  try {
    const { phone, password } = req.query;
    const result = await threej.query("SELECT * FROM ?? WHERE MOBILENO = ?", [
      process.env.BUSINESSTABLE,
      phone,
    ]);

    if (result.length == 0) {
      return res.send({
        ok: false,
        message: "Business with this mobile no not found",
      });
    }
    if (await threej.comparePassword(password, result[0].PASSWORD)) {
      return res.send({
        ok: true,
        message: "verified!",
        jwt: jwt.sign({ bid: result[0].BID }, process.env.SALT),
      });
    } else {
      res.send({ ok: false, message: "Login failed! password doesn't match." });
    }
  } catch (error) {
    threej.logError(error);
    res.send({ ok: false, message: "Internal error occurred" });
  }
}

export default async function Auth(req, res) {
  if (!(req.query.phone && (req.query.otp || req.query.password))) {
    res.statusCode = 404;
    return res.end({ ok: false });
  }

  if (req.query.otp) {
    return await validateOtp(req, res);
  } else if (req.query.password) {
    return await validatePassword(req, res);
  }
}
