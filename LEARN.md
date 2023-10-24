# Convoz

Convoz is a real-time chat platform designed to offer a responsive chat experience with features similar to Discord.

## Built with

Convoz is powered by a modern technology stack:

- React: A JavaScript library for dynamic user interfaces.
- Redux Toolkit: Manages application state effectively.
- Firebase: Handles user authentication and real-time data synchronization.
- Vite: Optimizes performance and builds the project efficiently.
- react-firebase-hooks: Simplifies Firebase integration with React.
- react-router-dom: Handles routing within the application.
- Tailwind CSS: Provides responsive and visually appealing styling.
- TypeScript: Adds type safety and code validation to the project.
- ESLint: Enforces code quality and standards.

## Project Structure

The project is structured as follows:

```
.
├── src/
│   ├── assets
│   ├── components
│   ├── features/
│   │   ├── Channels/
│   │   │   ├── CreateChannel.tsx
│   │   │   └── channelsSlice.ts
│   │   └── Chat
│   ├── lib/
│   │   ├── firebase.ts
│   │   └── store.ts
│   ├── pages/
│   │   ├── Landing.tsx
│   │   └── Channels.tsx
│   ├── styles
│   ├── App.tsx
│   ├── main.tsx
│   └── RootLayout.ts
├── package.json
└── tailwind.config.js
```

- `src/assets`: Store all project assets, such as images and icons
- `src/components`: For reusable React components across different pages
- `src/features/`: Contains the main features of our application:
  - `Channels/`: Things related to channels, for example:
    - `CreateChannel.tsx`: Handles the creation of channels
    - `channelsSlice.ts`: Defines the Redux slice for channels
  - `Chat/`: Things related to chat ...
- `src/lib/`: For utility files
  - `firebase.ts`: Handles Firebase configuration and initialization
  - `store.ts`: Configures the Redux store 
- `src/pages/`: Store individual page components
- `src/styles`: Contains global styles and Tailwind CSS configuration
- `src/App.tsx`: Defines all routes and handles authentication
- `src/RootLayout.tsx`: Defines the app layout
- `src/main.tsx`: Configures and starts the application.



## Contributing

If you'd like to contribute to the project, here's how to get started:

- [Contribution Guidelines](CONTRIBUTING.md): Review our guidelines for code, documentation, and more.
- [Code of Conduct](CODE_OF_CONDUCT.md): Ensure you follow our code of conduct during your interactions.
