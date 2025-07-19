const bcrypt = require('bcrypt');
const express = require('express');
const { PrismaClient } = require('./generated/prisma');
const app = express();
const prisma = new PrismaClient();

//For test commit

app.use(express.json());   

// LOGIN - Login yapma işlemi.
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Email ve şifre gerekli' });
  }

  // 1) Kullanıcıyı var mı aranıyor.
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: 'Kullanıcı bulunamadı' });
  }

  // 2) Şifre kontrolü
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res
      .status(401)
      .json({ success: false, message: 'Şifre yanlış' });
  }

  // 3) Başarılı
  return res.json({ success: true, message: 'Giriş başarılı' });
});

// CREATE - Yeni post oluşturma endpointi.
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      user: {
        connect: { id: "de50bdf1-63f8-48a0-a399-5e93d85c9271" }
      }
    },
  });
  res.json(post);
});

// READ - Tüm postları getir
app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

// UPDATE - ID'ye göre post güncelle
app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { title, content },
  });
  res.json(post);
});

// DELETE - ID'ye göre post sil
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'Post silindi' });
});

// SIGN UP - Kayıt olma 
app.post('/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Alanlar dolu olmak zorunda
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email ve password zorunlu.' })
    }

    // Önceden kayıtlı mı kontrolü
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(409).json({ error: 'Bu e-posta zaten kullanımda.' })
    }

    // Şifre Hashleme
    const hashed = await bcrypt.hash(password, 10)

    // Yeni kullanıcıyı oluşturma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    })

    return res.status(201).json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Sunucu hatası.' })
  }
})

//Server'ı başlat
app.listen(3000, () => {
  console.log('🚀 Sunucu http://localhost:3000 adresinde çalışıyor');
});