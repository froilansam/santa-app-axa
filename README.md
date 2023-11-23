# Santa App AXA

## Introduction

The Santa app is a web application designed to provide an enchanting platform for children to share their Christmas wishes with Santa Claus. With a user-friendly form, robust server-side validation, and seamless error handling, the app ensures a smooth and magical experience for its young users. Additionally, the automated email notification system guarantees that Santa is kept informed of every heartfelt request, contributing to the joy and wonder of the holiday season.

This project is a web application built with React, TypeScript, and Node.js. It uses Vite as a build tool and npm as a package manager.

## Libraries Used

- **npm**: A package manager for JavaScript. It's used to manage project dependencies and run scripts.

- **ts-node**: A TypeScript execution environment and REPL for Node.js, with source map support. It's used in this project to enable TypeScript for the server-side code. This allows us to use TypeScript features like static typing and ES6 import syntax on the server side, improving code quality and maintainability.

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. It's used in this project to create a server that handles API requests.

- **React**: A JavaScript library for building user interfaces. It allows us to build reusable UI components and manage the state of our application effectively.

- **TypeScript**: A superset of JavaScript that adds static types. It helps us catch errors early in the development process and enhances code readability and maintainability.

- **Vite**: A modern front-end build tool that offers faster and leaner development experiences. It's used in this project for its fast hot module replacement (HMR) and efficient production builds.

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js. It's used in this project to handle HTTP requests and build the server-side API.

- **Redux Toolkit**: This is the official, opinionated, batteries-included toolset for efficient Redux development. In this project, Redux Toolkit is used to manage the global state of the application. It simplifies the Redux workflow and reduces the amount of boilerplate code, making the codebase easier to manage and understand.

- **React Hook Form**: A lightweight and efficient library for managing form states in React. It embraces uncontrolled components and native HTML inputs, reducing the amount of re-rendering and improving performance. In this project, React Hook Form is used to handle form validation and submission, providing a better user experience.

- **Nodemailer**: A module for Node.js applications to send emails. It's used in this project to handle email sending functionality, such as sending confirmation emails or notifications. In this project, Nodemailer is used to send emails of the pending requests.

## Getting Started

1. Clone the repository:

```sh
git clone <repository-url>
```

2. Navigate into the project directory:

```sh
cd <project-directory>
```

3. Install the dependencies:

```sh
npm install
```

4. Create a duplicate of `sample.env` and rename it as `.env`.

```sh
sample.env -> .env
```

5. Start the server:

```sh
npm run start
```

6. Start the application:

```sh
npm run start:vite
```

## Project Structure

- [`src/web`]: This directory contains the React application code. It's separate from the server code, which makes it easier to manage the front-end codebase.

- [`src/server`]: This directory contains the Node.js server code. Keeping it separate from the front-end code helps to maintain a clear separation of concerns.

- [`src/types`]: This directory contains TypeScript type definitions. Centralizing types in one place makes the codebase easier to understand and maintain.

- [`src/web/store`]: This directory contains the state management logic using Redux. Organizing the state management code in one place makes it easier to understand how data flows through the application.

- [`src/web/constants`]: This directory contains files that define constant values used across the web application. These constants can include things like static text, configuration values, or any other values that do not change during the application's runtime.

- [`src/web/services`]: This directory typically contains files that handle communication with external services or APIs. For example, if your application fetches data from an API, the function to make that API call might be located in this directory. It helps to centralize and manage all the service-related logic.

- [`src/web/state`]: This directory contains the state management logic of your application. In your case, it seems like you're using Redux for state management. The `state` directory would contain Redux reducers, actions, and possibly selectors or sagas, depending on your application's architecture. It helps to manage and understand the data flow in your application.

- [`src/web/pages/SantaForm`]: This directory contains the SantaForm component and its child components. Organizing components by feature or functionality can make the codebase easier to navigate.

- [`src/server/routes`]: This directory contains the route handlers for your Express.js server. Each file in this directory corresponds to a specific endpoint of your API. For example, the santa.ts file contains the route handler for the "/santa" endpoint. These route handlers define what actions to take when a request is made to their respective endpoints.

- [`src/server/services`]: This directory contains files that handle communication with external services or APIs. For example, the api.ts file contains functions to fetch data from external APIs, and the email.ts file contains functions to send emails using the nodemailer library. These services are used by the route handlers to perform their actions.

- [src/server/utils]: This directory typically contains utility functions that are used across multiple files in the server code. These can include helper functions for data manipulation, validation, error handling, etc. For example, the helpers.ts file might contain a function to check if a date is less than 10 years old, which is used in the /santa route handler.

```
project-root
│
├── src
│ ├── web
│ │ ├── store
│ │ │ └── ... # Redux state management logic
│ │ ├── constants
│ │ │ └── ... # Constant values used across the web application
│ │ ├── services
│ │ │ └── ... # Communication with external services or APIs
│ │ ├── state
│ │ │ └── ... # Redux reducers, actions, selectors, sagas, etc.
│ │ ├── pages
│ │ │ └── SantaForm
│ │ │ └── ... # Components related to the SantaForm feature
│ │ └── ... # Other React application code
│ │
│ ├── server
│ │ ├── routes
│ │ │ └── ... # Route handlers for Express.js server
│ │ ├── services
│ │ │ └── ... # Communication with external services or APIs
│ │ ├── utils
│ │ │ └── ... # Utility functions for server-side code
│ │ └── ... # Other Node.js server code
│ │
│ └── types
│ └── ... # TypeScript type definitions
│
└── ... # Other project files
```

This structure is recommended because it promotes modularity and separation of concerns, which are key principles in software engineering. It makes the codebase easier to understand, navigate, and maintain. It also makes it easier to scale the application as more features are added.

## Author

- **Froilan Sam Malibiran** - _Santa App_ - [froilansam](https://github.com/froilansam)

```

```
