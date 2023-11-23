/**
 * This file contains the implementation of a route handler for the "/santa" endpoint in an Express.js server.
 * The purpose of this file is to handle incoming POST requests to the "/santa" endpoint and perform sending user messages to Santa.
 * The code fetches user profiles and user data from external APIs, validates the request data, and performs additional checks.
 * If the request is valid and the user is found, it adds a request to an email service and sends a success response.
 * If the user is not found or the user is not a child (less than 10 years old), it sends an appropriate error response.
 * This file plays a crucial role in the overall functionality of the Santa App, specifically in handling requests related to the Santa app feature.
 */
import express, { Request } from "express";

import {
  IMessageState,
  IUserProfilesResponse,
  IUserResponse,
} from "../../types/SantaForm.types";
import { fetchUserData, userProfilesURL, usersURL } from "../services/api";
import { addRequest } from "../services/email";
import { isDateLessThan10YearsOld } from "../utils/helpers";

const router = express.Router();

router.post("/santa", async (req: Request<IMessageState>, res) => {
  const { id, message } = req.body;

  const [userProfiles, users] = (await Promise.allSettled([
    fetchUserData(userProfilesURL),
    fetchUserData(usersURL),
  ])) as [
    PromiseSettledResult<IUserProfilesResponse[]>,
    PromiseSettledResult<IUserResponse[]>
  ];

  if (userProfiles.status === "fulfilled" && users.status === "fulfilled") {
    const user = users.value.find((user) => user.username === id);
    const userProfile = userProfiles.value.find(
      (profile) => profile?.userUid === user?.uid
    );

    if (!(user && userProfile)) {
      return res.status(400).json({
        code: "2",
        message: "User not found.",
      });
    }

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

export default router;
