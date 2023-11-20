import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const users = [
  { id: 1, username: 'admin', password: 'password', role: 'admin' },
  { id: 2, username: 'user', password: 'password', role: 'user' },
  { id: 3, username: 'guest', password: 'password', role: 'guest' },
];

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key');
  res.json({ token });
});

const authorizeUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    const user = users.find(u => u.id === decoded.userId);
    if (user) {
      req.user = { userId: user.id, role: user.role };
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });
};


app.get('/current-user', authorizeUser, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ username: user.username, role: user.role });
});

app.get('/users', authorizeUser, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const userList = users.map(u => ({ id: u.id, username: u.username, role: u.role }));
  res.json(userList);
});
app.get('/logout', authorizeUser, (req, res) => {
  req.logout()

})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
