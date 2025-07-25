const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const { PrismaClient } = require('./generated/prisma');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Token doğrulama.
function authToken(req, res, next) {
  const authHeader = req.headers.authorization 
  const token =  authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401).json({ message: 'Token gerekli.'})

    try {
      const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = payload;
      next();
    } catch (err) {
      console.error('JWT verify error:', err.message);
      return res.status(403).json({ message: 'Geçersiz veya süresi dolmuş token' });
    }
}

// LOGIN - Login yapma işlemi.
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(200)
      .json({ success: false, message: 'Email ve şifre gerekli', token: '' });
  }

  // 1) Kullanıcıyı var mı aranıyor.
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res
      .status(200)
      .json({ success: false, message: 'Kullanıcı bulunamadı', token: '' });
  }

  // 2) Şifre kontrolü
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res
      .status(200)
      .json({ success: false, message: 'Şifre yanlış', token: '' });
  }

  // 3) Başarılı

  // Access token oluşrma
  const userInfo = await prisma.user.findUnique({ 
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
    }
  })
  const accessToken = jwt.sign(
    userInfo,
    process.env.JWT_ACCESS_SECRET,
  )

  return res.json({ success: true, message: 'Giriş başarılı', token: accessToken });
});

// CREATE - Yeni post oluşturma endpointi.
app.post('/posts', authToken, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  if (!title || !content) {
    return res
      .status(200)
      .json({ success: false, message: 'Başlık ve içerik alanını doldurmak zorunludur.'});
  }
  const post = await prisma.post.create({
    data: {
      title,
      content,
      user: {
      connect: { id: userId }
      }
    },
  });
  res.json({success: true, message: 'Post oluşturuldu.', post});
});

// READ - Tüm postları getir
app.get('/posts', authToken, async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: { name: true }
      }
    }
  });
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
      return res.status(400).json({ 
        success: false,
        message: 'Kullanıcı adı, email ve şifre zorunludur.', })
    }

    const nameExisting = await prisma.user.findUnique({ where: { name } })
    if (nameExisting) {
      return res.status(409).json({ 
        success: false,
        message: 'Bu kullanıcı adı zaten kullanımda. Farklı bir tane deneyiniz.' })
    }

    // Önceden kayıtlı mı kontrolü
    const mailExisting = await prisma.user.findUnique({ where: { email } })
    if (mailExisting) {
      return res.status(409).json({ 
        success: false,
        message: 'Bu e-posta zaten kullanımda.' })
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
    return res.status(201).json({
      success: true,
      message: 'Kullanıcı Oluşturuldu.',
      user
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: 'Sunucu hatası.' })
  }
})

//Server'ı başlat
app.listen(3000, () => {
  console.log('🚀 Sunucu http://localhost:3000 adresinde çalışıyor');
});