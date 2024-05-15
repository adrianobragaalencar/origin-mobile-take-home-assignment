# Origin Mobile Take Home Assignment

## Video Link

Watch a screen recording presenting the app on Google Drive:
[View Presentation]()

## Setup Instructions

To get started with the project, follow the steps below:

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:adrianobragaalencar/origin-mobile-take-home-assignment.git
2. **Install Dependencies:**
   ```bash
   npm install
3. **Install Dependencies:**
   ```bash
   npx pod-install
4. **Configure Firebase:**
    - Create a new Firebase project: Firebase Console
    - Follow the instructions at React Native Firebase to configure Android and iOS credentials.
5. **Configure Google Maps for Android:**
   - If you don't have one already, sign up for a Google Cloud Platform account at [Google Cloud Platform](https://console.cloud.google.com/).
   - Navigate to the GCP console and create a new project 
   - In the GCP console, navigate to "APIs & Services" > "Library".
   - Enable the "Google Maps Android API" for your project.
   - In the GCP console, go to "APIs & Services" > "Credentials".
   - Click on "Create credentials" and choose "API key".
   - Configure Android app following instructions on
    https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md
5. **Create a `.env` File:**
    ```bash
    API_URL=https://tque3jpn1e.execute-api.us-east-1.amazonaws.com
    TRANSACTION_PATH=mobile-tha/transactions
## Technologies Used

- **Styling**: emotion/native
- **App State management**: redux-toolkit
- **Persistence**: redux-persist and async storage
- **API Integration**: axios
- **Authentication**: Firebase Authentication
- **Image Storage**: Firebase Storage
- **Maps**: react-native-maps
- **Navigation**: react-navigation
- **Validation**: react-hook-form with zod

## Considerations

This project was developed to demonstrate React Native skills. Emphasis was placed on writing concise, clean, and fully functional code, alongside providing an acceptable UI experience.

## Pending Work

Due to time constraints, the following features were not implemented:

- Receipt upload
- Sorting and filtering