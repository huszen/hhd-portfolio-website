# 🚀 Modern Dynamic Portfolio & Case Study Management System

Sistem website portfolio pribadi modern yang 100% dinamis (*CMS-driven*). Pengelolaan seluruh konten seperti identitas profil, riwayat pendidikan, keahlian (*skills*), sertifikasi, hingga penulisan *case study* proyek dilakukan secara langsung melalui **Dashboard Admin (`/admin`)** tanpa perlu mengubah kode sumber (*source code*) atau melakukan proses *re-deploy*.

---

## 🎯 Tujuan Proyek

- **Professional Branding**: Menampilkan identitas, keahlian, rekam jejak sertifikasi, dan projek secara interaktif dan modern.
- **Full Content Autonomy**: Memberikan kendali penuh kepada pemilik website untuk memperbarui konten (CRUD) secara fleksibel kapan saja.
- **Zero Hosting Cost ($0/Month)**: Memanfaatkan batas penggunaan gratis (*Free Tier*) infrastruktur *cloud* terpercaya secara permanen tanpa khawatir risiko tagihan otomatis.

---

## 📋 Kebutuhan Sistem (*Requirements*)

1. **Akses Publik (*Read-Only*)**:
   - **Main Page (`/`)**: Menampilkan Hero Section (foto, bio, headline), About & Education, Skills Grid, Featured Projects, dan Featured Certificates.
   - **Halaman Sertifikasi (`/certificates`)**: Menampilkan *grid* banner sertifikat dengan tautan langsung ke halaman verifikasi resmi.
   - **Halaman Projek (`/projects`) & Detail (`/projects/[slug]`)**: Menampilkan daftar projek dan detail *case study* berformat *Rich Text*.

2. **Akses Admin (`/admin`) (Protected)**:
   - Dilindungi oleh sistem otentikasi login (hanya email terdaftar yang memiliki akses *Write*).
   - **Profile Manager**: Form untuk mengedit nama, *headline*, bio, foto profil, riwayat pendidikan, dan daftar *skills*.
   - **Project & Certificate Manager**: Form tambah/edit/hapus data projek dan sertifikat.
   - **Medium-like Editor**: Editor penulisan cerita projek berbasis *WYSIWYG/Rich Text* yang mendukung format teks, *code block*, dan unggah gambar *drag-and-drop*.

3. **Infrastruktur Bebas Biaya & Kartu Kredit**:
   - Tidak menggunakan *Blaze Plan* / kartu kredit pada backend.
   - Pemisahan layanan *database* dan *media storage* untuk menghindari batasan berbayar.

---

## 🛠️ Teknologi & Stack Modern

### **Frontend & Framework**
- **Next.js (App Router, TypeScript)**: Framework React modern untuk *Server-Side Rendering* (SSR) / *Static Site Generation* (SSG) dan performa tinggi.
- **Tailwind CSS**: Framework CSS utility-first untuk desain responsif dan kustomisasi cepat.
- **shadcn/ui & Lucide Icons**: Komponen UI modern dan ikonografi yang bersih.
- **TipTap Editor**: Pustaka editor teks interaktif (*Rich Text Editor*) berbasis blok ala Medium / Notion.

### **Backend-as-a-Service (BaaS) & Storage**
- **Firebase Authentication**: Manajemen kredensial login akun Admin yang aman.
- **Firebase Firestore Database (NoSQL)**: Penyimpanan data profil, *skills*, projek, dan sertifikasi (Spark Plan - 100% Gratis).
- **Cloudinary Storage**: Penyimpanan aset gambar (banner, foto profil, screenshot projek) berbasis CDN gratis tanpa kartu kredit via SDK `next-cloudinary`.

### **Hosting & Deployment**
- **Vercel**: Platform hosting frontend Next.js gratis (*Hobby Tier*) terintegrasi *CI/CD* otomatis dari GitHub.

---

## 🏗️ Arsitektur Sistem & Alur Data

```text
┌──────────────────────────────────────────────────────────┐
│                   FRONTEND & HOSTING                     │
│  Next.js (App Router) + Tailwind CSS + TipTap Editor     │
│  Hosted di: Vercel (Gratis $0/bulan)                    │
└──────────────┬────────────────────────────┬──────────────┘
               │                            │
               │ (Upload Gambar)            │ (Data Firestore & Auth)
               ▼                            ▼
┌────────────────────────────┐  ┌──────────────────────────┐
│   CLOUDINARY STORAGE       │  │   FIREBASE (Spark Plan)  │
│   - Banner Projects        │  │   - Firestore DB         │
│   - Certificate Images     │  │   - Firebase Auth        │
│   - Profile Avatar         │  │                          │
└────────────────────────────┘  └──────────────────────────┘