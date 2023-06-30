# Pokemon App

This is a web application for interacting with the Pokemon API. It is built using React and Next.js, and additional libraries used include Chakra UI and SWR. The application allows users to browse and search for Pokemon, view their details, and filter them based on selected abilities.

## Developer

- Name: Thomas Beckford
- GitHub: github.com/thomasbeckford

## Tech Stack

- React
- Next.js v13
- Chakra UI (see why below)
- SWR (see why below)

## Project structure

The project follows a standard Next.js project structure. Here's an overview of the main directories and files:

- components: Contains reusable React components used in the application.
- pages: Contains the Next.js pages that define the routes and layout of the application.
- utils: Contains utility functions and helpers used throughout the application.
- types: Contains TypeScript type definitions used in the application.
- public: Contains static assets such as images.

## Getting started

To run the project locally, follow these steps:

1. Clone the repository:

```
git clone <repository_url>
```

2. Install the dependencies:

```
pnpm install
```

3. Start dev server

```
pnpm dev
```

The application will be accessible at http://localhost:3000.

## Env variables

The project does not require any specific environmental variables.

## Usage

The application allows users to browse and search for Pokemon. The main features include:

- Pagination: The list of Pokemon is paginated, allowing users to navigate through the different pages.
- Filtering by Ability: Users can select specific abilities to filter the list of - Pokemon and view only those that possess the selected abilities.
- Pokemon Details: Clicking on a Pokemon card displays detailed information about the selected Pokemon.

## Unit testing

```
pnpm dev test
```

## Why chakra UI?

Chakra UI is a popular UI library for React that provides a set of accessible and customizable components. It was chosen for this project to streamline the development process by providing pre-designed components with built-in accessibility features. Chakra UI also offers easy theming and responsive design capabilities, making it an excellent choice for creating a visually appealing and responsive web application.

## Why SWR?

SWR is a data-fetching library that simplifies the process of fetching data from APIs and managing the caching and revalidation of that data. It provides a lightweight and intuitive API for fetching data with built-in support for caching, revalidation, and error handling. SWR was used in this project to fetch data from the Pokemon API and handle the loading, error, and data states seamlessly. It also allows for easy integration with Next.js, making it an ideal choice for data fetching in a Next.js application.
