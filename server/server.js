// server.js
// where your node app starts

// Importing required modules
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { json } = require("body-parser");
const { fetchUserData, userProfilesURL, usersURL } = require("./api");
const { sendEmail, addRequest } = require("./email");
const { isDateLessThan10YearsOld } = require("./helpers");

const app = express();

app.use(cors());
app.use(json());
app.use(morgan("dev"));

// Route handler for POST requests to /santa
app.post("/santa", async (req, res) => {
  const { id, message } = req.body;

  const [userProfiles, users] = await Promise.allSettled([
    fetchUserData(userProfilesURL),
    fetchUserData(usersURL),
  ]);

  if (userProfiles.status === "fulfilled" && users.status === "fulfilled") {
    const user = users.value.find((user) => user.username === id);
    const userProfile = userProfiles.value.find(
      (profile) => profile?.userUid === user?.uid
    );

    if (!(user && userProfile))
      return res.status(400).json({
        code: "2",
        message: "User not found.",
      });

    delete userProfile.userUid;
    const completeUser = { ...user, ...userProfile };

    if (isDateLessThan10YearsOld(completeUser.birthdate)) {
      addRequest({
        username: id,
        address: completeUser.address,
        message,
      });

      return res.send({
        user: completeUser,
        code: "1",
        message: "Success",
      });
    }
    return res.status(400).json({
      code: "3",
      message: "Children should be less than 10 years old.",
    });
  } else {
    return res.status(400).json({
      error: "Error fetching user profiles or users",
    });
  }
});

// Starting the server
const listener = app.listen(process.env.PORT || 3000, () => {
  setInterval(sendEmail, 15000);
  console.log(`Your app is listening on port ${listener.address().port}`);
});
