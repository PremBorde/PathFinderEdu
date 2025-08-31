# PathFinderEdu

A comprehensive educational guidance platform helping students discover and pursue their ideal career paths.

## 🚀 Features

- **Career Exploration**: Browse through 500+ careers with detailed insights
- **Course Discovery**: Find the right courses aligned with your career goals
- **College Search**: Explore top educational institutions
- **AI Assessment**: Get personalized career recommendations
- **Smart Search**: Find careers, courses, and colleges easily
- **Expert Guidance**: Access detailed guides for various engineering streams
- **Interactive UI**: Modern, responsive design with smooth animations

## 🛠️ Tech Stack

### Frontend
- React.js
- Styled Components
- React Router
- React Icons
- Lottie Animations

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

### ChatBot
- FastAPI (Python)
- React Frontend

## 📦 Project Structure

```
PathFinderEdu/
├── frontend/           # React frontend application
├── backend/           # Node.js backend API
├── ChatBot/           # AI chatbot service
└── docs/             # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14
- Python >= 3.8
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/PathFinderEdu.git
   cd PathFinderEdu
   ```

2. Frontend setup:
   ```bash
   cd frontend
   npm install
   cp config.template.js .env
   # Edit .env with your configuration
   npm start
   ```

3. Backend setup:
   ```bash
   cd backend
   npm install
   cp config.template.js .env
   # Edit .env with your configuration
   npm start
   ```

4. ChatBot setup:
   ```bash
   cd ChatBot/c4ai-command
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```

## 🌐 Environment Variables

Create `.env` files in both frontend and backend directories using the provided templates:

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SITE_URL=http://localhost:3000
```

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pathfinder_edu
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

## 📚 Documentation

For detailed documentation, please refer to:
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [API Documentation](docs/API.md)
- [Frontend Documentation](frontend/README.md)
- [Backend Documentation](backend/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.