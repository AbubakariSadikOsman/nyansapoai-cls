# NyansapoAI Competence Level System (CLS) - Frontend

React Native (**Expo**) mobile application for tracking student performance across learning strands using the NyansapoAI Competence Level System (CLS).

## Links

- **GitHub Repository:** [NyansapoAI Fullstake Developer Take Home Assessment](https://github.com/AbubakariSadikOsman/nyansapoai-cls)
- **Figma Design:** [NyansapoAI CLS UI/UX](https://www.figma.com/design/d9UfhQ310Tlew3v0HPMhzq/Nyansapo-AI---CLS?node-id=0-1&t=UHGEIkg1RwUBs8nm-1)

## Design Decisions

- **File-based navigation (Expo Router):** Simplifies navigation setup and aligns with modern best practices.
- **Centralized theme (`src/styles/theme.js`):** Consistent colors, fonts, and spacing across the app.
- **Reusable components:** (e.g., `SearchBar`, `ProgressBar`, `CompetenceBadge`) to reduce code duplication.
- **Competence Levels (BE, AE, ME, EE):** Color-coded badges to provide teachers with quick performance insights.
- **Clean UI:** Focused on simplicity and readability for teachers, with icons and spacing optimized for mobile.

## Project Structure

```
fullstack-dev-takehome/
└── frontend/
    ├── app/                   # Expo Router directory (navigation is file-based)
    │     ├── (tabs)/          # Main tab navigation (Overview, Analytics, Reports, Settings)
    │     ├── strand/          # Strand-specific screens (students by strand)
    │     └── student/         # Individual student detail screens
    │
    ├── assets/
    │     └── images/          # Logos, icons, and branding assets
    │
    └── src/
            ├── components/    # Reusable UI components (SearchBar, ProgressBar, etc.)
            ├── screens/       # Major feature screens (ClassOverview, Profile, Settings, etc.)
            ├── navigation/    # Additional navigation configs (if needed)
            ├── context/       # Global state management (AppContext)
            ├── services/      # API integration (fetching students, class data)
            ├── utils/         # Constants & helpers (competence levels, API base URL)
            └── styles/        # Centralized theme (colors, fonts, spacing)
└── db.json                    # Data source for JSON Server
└── README.md                  # This file
└── nyansapo-ai-env/
```

## Assumptions

- Teachers are the primary users of the app.
- Backend APIs for fetching students, class data, and performance reports are available (but mocked locally during development).
- Email entered on the **Welcome Screen** uniquely identifies the teacher and is carried into the Profile screen (Authentification not implemented).
- Application will be extended with persistence (e.g., AsyncStorage or backend integration) in future versions.

## Setup & Running

### Prerequisites

- [Node.js](https://nodejs.org/) >= 16.x
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go app (for testing on a device)

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/AbubakariSadikOsman/nyansapoai-cls.git
   cd nyansapoai-cls/fullstach-dev-takehome
   ```

2. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Install JSON Server Global
   ```bash
   npm install -g json-server
   ```
4. Start JSON Server (in a separate terminal):

   ```bash
   json-server --watch db.json --port 3000
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Run the app:

   - Press `i` → Launch iOS simulator
   - Press `a` → Launch Android emulator
   - Scan QR code in **Expo Go** app to run on a real device

### API Configuration

Update `src/utils/constants.js` with your backend URL:

```js
export const API_BASE_URL = "http://your-machine-ip:port";
// Example: http://192.168.1.100:8081 (LAN IP for Expo) or http://localhost:8081 (for web)
```

To find your IP:

- **Mac/Linux:** `ifconfig | grep inet`
- **Windows:** `ipconfig`

## Technologies Used

- **React Native (Expo):** Cross-platform mobile development.
- **Expo Router:** Simplified, file-based navigation.
- **Ionicons:** Iconography for clean UI.
- **React Native Components:** `FlatList`, `ScrollView`, `TouchableOpacity` for performant UI.
- **Expo Go:** Quick testing on physical devices.

## Technology Stack

- **Frontend**: React Native with Expo SDK 53
  - **React Native (Expo):** Cross-platform mobile development.
  - **Expo Go:** Quick testing on physical devices.
  - **Expo Router:** Simplified, file-based navigation.
  - **Styling**: Custom theme system
  - **Ionicons:** Iconography for clean UI.
  - **Navigation**: React Navigation v6
  - **State Management**: React Context API for global state management for class & student data
  - **React Native Components:** `FlatList`, `ScrollView`, `TouchableOpacity` for performant UI.
- **Backend**: JSON Server (REST API)
- **Database**: JSON file (db.json)

**Solutions:**

1. **Use iOS Simulator** (most reliable)
2. **Use Physical Device** with Expo Go
3. **Increase file descriptor limit** in terminal
4. **Restart terminal** and try again

**Why these technologies?**

- **Expo** reduces setup complexity and speeds up prototyping.
- **Expo Router** aligns with modern navigation standards and avoids boilerplate.
- **Context API** avoids prop drilling and provides a lightweight global store.
- **Reusable components** enforce DRY principles and simplify future scaling.

## Testing

1. Start development server (`npm start`).
2. Test on device or simulator.
3. Use test data to:

   - Search students by name/ID.
   - Navigate strands and view progress.
   - Access student detail pages.
   - Update settings (toggle dark mode, notifications) future work.

## Error Handling & Best Practices

- **Network errors:**

  - API requests wrapped in `try/catch`.
  - User-friendly alerts (`Alert.alert`) on failure.

- **State management:**

  - Context API (`AppContext`) manages global state (students, class info, loading/error states).
  - `useMemo` for filtering student lists efficiently.

- **UI feedback:**

  - Loading indicators for async calls.
  - Disabled states for non-editable fields (e.g., email).
  - Refresh control (`Pull to refresh`) on lists.

- **Code quality:**

  - Centralized theme for consistency.
  - Modular directory structure for scalability.
  - Reusable UI components.

## License

© 2025 NyansapoAI CLS. All rights reserved.
