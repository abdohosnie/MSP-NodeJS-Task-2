const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const tagsRoutes = require('./routes/tags');
const relationshipsRoutes = require('./routes/relationships');

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/tags', tagsRoutes);
app.use('/relationships', relationshipsRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
