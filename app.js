// Make sure to run with 'node --experimental-modules yourfile.js'

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Mock user data
const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'admin' },
  { id: 2, username: 'user2', password: 'password2', role: 'user' },
  { id: 3, username: 'user3', password: 'password3', role: 'guest' },
];

// Passport local strategy for authentication
passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect username or password' });
    }
  })
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// Authentication route
app.post('/login', passport.authenticate('local'), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key');
  res.json({ token });
});

// Authorization middleware
const authorizeUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// Protected route
app.get('/task', authorizeUser, (req, res) => {
  // Check if the user is authorized to perform the task
  if (req.user.role === 'admin') {
    res.json({ message: 'Task completed successfully' });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
