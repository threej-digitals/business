import { threej } from "@/lib/threej";
import Cookies from "js-cookie";

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
      return res.send(`OTP expired, please request a new OTP`);
    }
    if (result[0].ATTEMPTS >= 5) {
      return res.send(
        `You reached maximum attempts limit, please request a new OTP`
      );
    }
    if (result[0].OTP == req.query.otp) {
      return res.send("verified!");
    }
    await threej.query(
      "UPDATE ?? SET ATTEMPTS = ATTEMPTS+1 WHERE MOBILENO = ?",
      [process.env.OTPTABLE, req.query.phone]
    );
    return res.send("Invalid OTP");
  } catch (error) {
    threej.logError(error);
    res.send("Internal error occurred");
  }
}
