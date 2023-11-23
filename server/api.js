const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// URLs for fetching user data
const userProfilesURL =
  "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";
const usersURL =
  "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";

// Function to fetch user data from a given URL
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

exports.fetchUserData = fetchUserData;
exports.userProfilesURL = userProfilesURL;
exports.usersURL = usersURL;
