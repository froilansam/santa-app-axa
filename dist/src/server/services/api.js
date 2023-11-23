"use strict";
/**
 * This file is used to fetch data from the GitHub repo.
 * It uses the `node-fetch` library to fetch data from the GitHub repo.
 * This file is used to fetch data in a Santa app.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersURL = exports.userProfilesURL = exports.fetchUserData = void 0;
const fetch = (...args) => Promise.resolve().then(() => __importStar(require("node-fetch"))).then(({ default: fetch }) => fetch(...args));
const userProfilesURL = "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";
exports.userProfilesURL = userProfilesURL;
const usersURL = "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";
exports.usersURL = usersURL;
const fetchUserData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url);
        if (response.status === 200) {
            return response.json();
        }
        else {
            throw new Error(`Error fetching data from ${url}`);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.fetchUserData = fetchUserData;
