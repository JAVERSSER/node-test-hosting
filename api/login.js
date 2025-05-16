import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Missing username or password' });
    return;
  }

  // Connect to your MySQL database
  const connection = await mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12779030',
    password: 'DqQuShRnx2',
    database: 'sql12779030'
  });

  try {
    await connection.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password]
    );

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ error: 'Database error' });
  } finally {
    await connection.end();
  }
}
