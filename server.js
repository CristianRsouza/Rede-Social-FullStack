import express from 'express';
import cors from 'cors';
import pg from 'pg';
const {
  Pool
} = pg;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'cristian',
  database: 'postgres'
});

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  pool.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});


app.post('/userPost', async (req, res) => {
  const {
    Name,
    userId
  } = req.body;
  const newUser = await pool.query('INSERT INTO usuarios (nome, user_id) VALUES ($1, $2)', [Name, userId]);
  res.sendStatus(201);
});


app.post('/post', async (req, res) => {
  const {
    Curtidas,
    Text,
    Name
  } = req.body
  const newPost = await pool.query('INSERT INTO posts (curtidas, texto, nome ) VALUES ($1, $2, $3)', [Curtidas, Text, Name])
  res.sendStatus(201);
})

app.get('/postagens', async (req, res) => {
  pool.query('SELECT * FROM posts ORDER BY id DESC', (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});


app.post('/PostCurtir', async (req, res) => {
  const {
    postId
  } = req.body;
  const updateCurtirQuery = 'UPDATE posts SET curtidas = curtidas + 1 WHERE id = $1';

  try {
    await pool.query(updateCurtirQuery, [postId]);
    res.sendStatus(201);
  } catch (error) {
    console.error('Erro ao curtir o post:', error);
    res.sendStatus(500);
  }
});

app.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const userQuery = 'SELECT * FROM usuarios WHERE user_id = $1';
  try {
    const userResult = await pool.query(userQuery, [userId]);
    res.send(userResult.rows[0]); // Enviar o primeiro usuário encontrado ou null
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.sendStatus(500);
  }
});

app.post('/NewNome', async (req, res) => {
  const { NewName, userId } = req.body;

  const updateNameQuery = 'UPDATE usuarios SET nome = $1 WHERE user_id = $2';

  try {
    await pool.query(updateNameQuery, [NewName, userId]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao atualizar nome do usuário:', error);
    res.status(500).send('Erro ao atualizar o nome do usuário');
  }
});





app.listen(3333, () => {
  console.log('Server is running on http://localhost:3333');
});