/**
 * This file is used to fetch data from the GitHub repo.
 * It uses the `node-fetch` library to fetch data from the GitHub repo.
 * This file is used to fetch data in a Santa app.
 */

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const userProfilesURL =
  "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";
const usersURL =
  "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";

const fetchUserData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Error fetching data from ${url}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchUserData, userProfilesURL, usersURL };
