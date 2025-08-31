# PathFinderEdu ChatBot

A modern, intelligent chatbot for the PathFinderEdu career guidance platform. The chatbot helps users with career guidance, scholarship information, stream selection, and more.

## Features

- 🤖 **Intelligent Responses**: AI-powered responses based on user queries
- 💬 **Real-time Chat**: Smooth, responsive chat interface
- 🎯 **Quick Replies**: Pre-defined quick response buttons for common queries
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🎨 **Modern UI**: Beautiful, professional design with animations
- 🔄 **Fallback System**: Local responses when API is unavailable

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **Python 3.8+**: Core programming language
- **Uvicorn**: ASGI server for running the API

### Frontend
- **React**: JavaScript library for building user interfaces
- **Styled Components**: CSS-in-JS styling solution
- **React Icons**: Icon library for beautiful UI elements

## Installation & Setup

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd ChatBot/c4ai-command
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the FastAPI server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   The website will be available at `http://localhost:3000`

## API Endpoints

### POST `/chat`
Send a message to the chatbot and receive a response.

**Request Body:**
```json
{
  "message": "Hello, I need career guidance"
}
```

**Response:**
```json
{
  "response": "Hello! I'm your PathFinderEdu assistant...",
  "suggestions": ["Career Guidance", "Scholarship Info", "Stream Selection"],
  "category": "greeting"
}
```

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "PathFinderEdu ChatBot"
}
```

## ChatBot Capabilities

The chatbot can help users with:

### 🎓 Career Guidance
- AI-powered career assessments
- Expert consultation booking
- Career roadmap creation
- Industry insights

### 💰 Scholarship Information
- Available scholarship programs
- Application processes
- Eligibility criteria
- Deadlines and requirements

### 📚 Stream Selection
- Science stream guidance
- Commerce stream information
- Arts stream details
- Stream comparison

### 🤖 AI Assessment
- Assessment process explanation
- Sample questions
- Benefits and features
- How to get started

### 👨‍🏫 Expert Consultation
- Expert profiles
- Booking free sessions
- Success stories
- Consultation benefits

## Customization

### Adding New Responses

To add new responses, edit the `RESPONSES` dictionary in `main.py`:

```python
"new_category": {
    "patterns": ["keyword1", "keyword2", "keyword3"],
    "response": "Your response message here.",
    "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
}
```

### Styling Customization

The chatbot styling can be customized by modifying the styled components in `ChatBot.js`:

- `ChatBotContainer`: Main container styling
- `ChatBotButton`: Floating button appearance
- `ChatBotWindow`: Chat window design
- `MessageBubble`: Message bubble styling

## Deployment

### Backend Deployment

1. **Using Docker:**
   ```bash
   docker build -t pathfinderedu-chatbot .
   docker run -p 8000:8000 pathfinderedu-chatbot
   ```

2. **Using Heroku:**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Frontend Deployment

1. **Build the production version:**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred hosting service (Netlify, Vercel, etc.)**

## Environment Variables

Create a `.env` file in the backend directory:

```env
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# CORS Settings
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the frontend URL is added to `ALLOWED_ORIGINS`
2. **API Connection Failed**: Check if the backend server is running on port 8000
3. **Styling Issues**: Make sure all dependencies are installed correctly

### Debug Mode

Enable debug mode by setting `DEBUG=True` in your environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@pathfinderedu.com
- Documentation: [PathFinderEdu Docs](https://docs.pathfinderedu.com)
- Issues: [GitHub Issues](https://github.com/pathfinderedu/chatbot/issues)

