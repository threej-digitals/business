import { threej } from "@/lib/threej";
const crypto = require("crypto");

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === "subscribe" && token === process.env.WA_VERIFY_TOKEN) {
        // Respond with 200 OK and challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.status(403).send();
      }
    }
  }

  if (req.method === "POST" && req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

      if (msg_body.toLowerCase() != "send login otp") return res.send("ok");

      const OTP = crypto.randomInt(100000, 999999);
      let body = `
*${OTP}*  - valid for next 5 minutes

Use this 6 digit otp to login to your business account at lekhpal book [https://threej.in/business] - An easy to use Invoice management webapp

Thanks,
*ThreeJ - Digital services*`;

      try {
        await threej.query("INSERT INTO ??(MOBILENO, OTP) VALUES(?, ?)", [
          process.env.OTPTABLE,
          from,
          OTP,
        ]);
      } catch (error) {
        threej.logError(error);
        body = `Unable to generate OTP`;
      }

      let bodyContent = JSON.stringify({
        messaging_product: "whatsapp",
        to: from,
        text: {
          body: body,
        },
      });

      let response = await fetch(
        "https://graph.facebook.com/v16.0/115565808145331/messages",
        {
          method: "POST",
          body: bodyContent,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.WA_TOKEN,
          },
        }
      );

      let data = await response.text();
      console.log(data);
    }
    res.status(200).send();
  }
}
