import { threej } from "@/lib/threej";
const jwt = require("jsonwebtoken");

export default async function Auth(req, res) {
  try {
    const result = await threej.query("SELECT * FROM ?? WHERE MOBILENO = ?", [
      process.env.OTPTABLE,
      req.query.phone,
    ]);

    const elapsedTime =
      (Date.now() / 1000 - new Date(result[0].TIMESTAMP).getTime() / 1000) / 60;
    //OTP valid till 5 minute
    if (elapsedTime > 5) {
      return res.json({
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
    if (result[0].OTP == req.query.otp) {
      let business = await threej.query("SELECT * FROM ?? WHERE MOBILENO = ?", [
        process.env.BUSINESSTABLE,
        req.query.phone,
      ]);

      let bid = 0;
      if (business.length == 0) {
        business = await threej.query("INSERT INTO ??(MOBILENO) VALUES(?)", [
          process.env.BUSINESSTABLE,
          req.query.phone,
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
      [process.env.OTPTABLE, req.query.phone]
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
