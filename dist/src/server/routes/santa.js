"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file contains the implementation of a route handler for the "/santa" endpoint in an Express.js server.
 * The purpose of this file is to handle incoming POST requests to the "/santa" endpoint and perform sending user messages to Santa.
 * The code fetches user profiles and user data from external APIs, validates the request data, and performs additional checks.
 * If the request is valid and the user is found, it adds a request to an email service and sends a success response.
 * If the user is not found or the user is not a child (less than 10 years old), it sends an appropriate error response.
 * This file plays a crucial role in the overall functionality of the Santa App, specifically in handling requests related to the Santa app feature.
 */
const express_1 = __importDefault(require("express"));
const api_1 = require("../services/api");
const email_1 = require("../services/email");
const helpers_1 = require("../utils/helpers");
const router = express_1.default.Router();
router.post("/santa", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, message } = req.body;
    const [userProfiles, users] = (yield Promise.allSettled([
        (0, api_1.fetchUserData)(api_1.userProfilesURL),
        (0, api_1.fetchUserData)(api_1.usersURL),
    ]));
    if (userProfiles.status === "fulfilled" && users.status === "fulfilled") {
        const user = users.value.find((user) => user.username === id);
        const userProfile = userProfiles.value.find((profile) => (profile === null || profile === void 0 ? void 0 : profile.userUid) === (user === null || user === void 0 ? void 0 : user.uid));
        if (!(user && userProfile)) {
            return res.status(400).json({
                code: "2",
                message: "User not found.",
            });
        }
        delete userProfile.userUid;
        const completeUser = Object.assign(Object.assign({}, user), userProfile);
        if ((0, helpers_1.isDateLessThan10YearsOld)(completeUser.birthdate)) {
            (0, email_1.addRequest)({
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
    }
    else {
        return res.status(400).json({
            error: "Error fetching user profiles or users",
        });
    }
}));
exports.default = router;
