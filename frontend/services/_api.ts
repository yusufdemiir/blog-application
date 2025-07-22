import axios from 'axios';

// iOS simulator: http://localhost:3000
// Android emulator: http://10.0.2.2:3000
// Gerçek cihaz: http://<bilgisayar_ip>:3000
export const API = axios.create({
  baseURL: 'http://localhost:3000', // .env’den de okuyabilirsin
  headers: { 'Content-Type': 'application/json' },
});