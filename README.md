<h1 align="center">臺科二宿退宿預約系統 (Clone)</h1>

<div align="center">
    <img src="https://imgur.com/mY4tqFx.png" width="20%" height="20%">
</div>

## ✒️overview
由於看到自己宿舍的退宿預約系統，萌生想clone的心態（也有可能是剛放暑假很開心），花了一天的時間，此作品便誕生了。

本專案為開源，但並未deploy至vercel，且目前僅串localhost postgreSQL，若未來能扶正（？）會重新整理至雲端部署，期待那天的到來！

>❗本專案並未有太多資安防護，請輕鬆看待。
> * 有實作hashed password
> * 目前使用者為寫死在 `env.local`
> * 有實作 `JWT`

## 🛠️tools
* Next.js 14 - Frontend Framework
* TypeScript - Frontend Language
* Node.js - Backend Framwork
* Shadcn/ui - UI Package
* Lucide - Icon Pachage
* PostgresSQL - Database

## feature
1. **退宿規則**
<div align="center">
    <img src="https://imgur.com/iyrORn7.jpg" width="50%" height="50%">
</div>

2. **預約表單**
<div align="center">
    <img src="https://imgur.com/M5Hdjuj.jpg" width="50%" height="50%">
</div>

3. **使用者查詢預約**
<div align="center">
    <img src="https://imgur.com/kbNt0qf.jpg" width="50%" height="50%">
</div>

4. **樓長登入**
<div align="center">
    <img src="https://imgur.com/OHcKmdG.jpg" width="50%" height="50%">
</div>

5. **檢查合格/不合格**
<div align="center">
    <img src="https://imgur.com/P6e0Hnj.jpg" width="50%" height="50%">
</div>

6. **Dark Mode**
<div align="center">
    <img src="https://imgur.com/GU6LhHZ.jpg" width="50%" height="50%">
</div>