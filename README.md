# Vue Composables Project

This project is a Vue 3 application using TypeScript and Vite. It demonstrates the use of Vue composables for form validation and data fetching.


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm 

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd vue-composables
    ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000` to view the application.

### Run Tests
``` sh
npm run test
``` 

## Project Details

### Components
- **Home.vue**: The home component that includes the Form component and displays validation results.
- **Form.vue**: A form component with validation for email and password fields. It utilizes the useFormValidation composable to manage form state and validation logic.
- **DataFetcher.vue**: A component to fetch data from an API using the useFetch composable and display it.

### Composables
- **useFetch.ts**: A composable for making HTTP requests. It manages states like loading, success, and error handling.
- **useFormValidation.ts**: A composable for handling form validation. It provides functionality for validating fields and the entire form.

### Router
- **index.ts**: Defines the routes for the application. The router is configured for handling navigation between components.

### Types
- **fetch.ts**: Type definitions for the useFetch composable.
- **form.ts**: Type definitions for the useFormValidation composable.

### Configuration
- **vite.config.ts**: Configuration file for Vite.
- **tsconfig.json**: TypeScript configuration for the overall project.
- **tsconfig.app.json**: TypeScript configuration specifically for the application.
- **tsconfig.node.json**: TypeScript configuration for Node.js environment.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

