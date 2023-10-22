# Convoz - Chat Platform 

Convoz is an open-source chat platform with discord-like features, designed to bring people together in a real-time, engaging online communities. 

## Features

- **Real-time Chat**: Responsive chat experience with real-time updates
- **Channel Management**: Create, join and manage channels easily
- **User Authentication**: Secure user authentication with Google Sign-In
- **User-Friendly Interface**: Intuitive UI/UX design to enhance user experience

## Stack

This project was built using the following technologies:

- React
- TypeScript
- Firebase
- Redux Toolkit
- Vite
- react-firebase-hooks
- react-router-dom
- ESLint
- react-hot-toast

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Start the development server by running `npm start`.

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

## Contributing

Contributions are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them to your branch.
4. Push your changes to your fork.
5. Submit a pull request to the original repository.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
