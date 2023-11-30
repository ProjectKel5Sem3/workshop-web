<?php

?>



<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ViosCake</title>

        <!-- Font Google -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Rancho&display=swap" rel="stylesheet">
        
        <!-- Feather Icons -->
        <script src="https://unpkg.com/feather-icons"></script>

        <!-- File Style -->
        <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
        
    <!-- Navbar -->
    <header>
      <nav class="navbar">
        <div class="navbar-nav">
          <a href="#about">Tentang Kami</a>
          <a href="#catalog">Katalog</a>
          <a href="#gallery">Galeri</a>
          <a href="#contact">Kontak</a>
          <button class="login-button">Masuk</button>
          <button class="daftar-button">Daftar</button>
        </div>
      </nav>
      <img class="logo" src="image/logo.png" alt="logo">
    </header>
    <div class="container">
      <img class="kue" src="image/kue.jpg" alt="kue"/>
    </div>

        <!-- Tentang Kami -->
        <section id="about" class="about">
      <h2>Tentang Kami</h2>

      <div class="row">
        <div class="about-img">
          <img src="image/tentang-kami.png" alt="Tentang Kami" />
        </div>
        <div class="content">
          <h3>Kenapa memilih cake kami?</h3>
          <p>
            ViosCake adalah sebuah tempat khusus di dunia kue ulang tahun dan
            kue-kue spesial lainnya. Sebagai perusahaan yang berdedikasi untuk
            menciptakan pengalaman manis dan tak terlupakan, Vioscake tidak
            hanya sekadar sebuah toko kue, tetapi juga merupakan pencipta seni
            kuliner yang memahami arti sejati dari kelezatan.
          </p>
          <p>
            Di ViosCake, inovasi adalah kunci. Tim kreatifnya selalu berusaha
            untuk memberikan yang terbaik dalam hal desain dan rasa. Mereka
            menggabungkan tradisi dengan tren terkini dalam dunia kue-kue,
            menciptakan kombinasi yang unik dan menyegarkan untuk setiap
            pelanggan. Dengan menggunakan bahan-bahan berkualitas tinggi,
            kue-kue Vioscake selalu segar, lezat, dan memikat.
          </p>
        </div>
      </div>
    </section>

     <!-- Katalog -->
     <section id="catalog" class="catalog">
        <h2>Katalog Kami</h2>

        <div class="row">
            <div class="catalog-item" id="item1">
                <img src="image/katalog1.jpg" alt="Katalog 1" />
                <div class="item-description">
                    <h3>Katalog 1</h3>
                    <p>Deskripsi singkat mengenai katalog ini.</p>
                    <a href="katalog1.html">Lihat Detail</a>
                </div>
            </div>

            <div class="catalog-item" id="item2">
                <img src="image/katalog2.jpg" alt="Katalog 2" />
                <div class="item-description">
                    <h3>Katalog 2</h3>
                    <p>Deskripsi singkat mengenai katalog ini.</p>
                    <a href="katalog2.html">Lihat Detail</a>
                </div>
            </div>

            <div class="catalog-item" id="item3">
                <img src="image/katalog3.jpg" alt="Katalog 3" />
                <div class="item-description">
                    <h3>Katalog 3</h3>
                    <p>Deskripsi singkat mengenai katalog ini.</p>
                    <a href="katalog3.html">Lihat Detail</a>
                </div>
            </div>

            <div class="catalog-item" id="item4">
                <img src="image/katalog4.jpg" alt="Katalog 4" />
                <div class="item-description">
                    <h3>Katalog 4</h3>
                    <p>Deskripsi singkat mengenai katalog ini.</p>
                    <a href="katalog4.html">Lihat Detail</a>
                </div>
            </div>

        </div>
    </section>

    <!-- Galeri -->
    <section id="gallery" class="galery">
      <h2>Galeri Kami</h2>

      <div class="glr">
        <div class="about-img">
          <img src="image/tentang-kami.png" alt="Tentang Kami" />
        </div>
        <div class="content">

        </div>
      </div>
    </section>

     <!-- Kontak Kami -->
     <section id="contact" class="contact">
      <h2>Kontak Kami</h2>
      <p>
        Kirim pesan kepada kami dan beritahu Design Cake yang ingin kami buat,
        kami siap memberikan hasil Cake terbaik untuk anda.
      </p>

      <div class="row">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.2472972394385!2d113.65460917421316!3d-8.177823881973607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd693fadeb3b501%3A0x2433008be7cde2d1!2sJl.%20Bandeng%20No.22%2C%20Mrapa%2C%20Dukuh%20Mencek%2C%20Kec.%20Sukorambi%2C%20Kabupaten%20Jember%2C%20Jawa%20Timur%2068131!5e0!3m2!1sid!2sid!4v1697676450665!5m2!1sid!2sid"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="map"
        >
        </iframe>

        <form action="">
          <div class="input-group">
            <i data-feather="user"></i>
            <input type="text" placeholder="nama" />
          </div>
          <div class="input-group">
            <i data-feather="mail"></i>
            <input type="text" placeholder="email" />
          </div>
          <div class="input-group">
            <i data-feather="phone"></i>
            <input type="text" placeholder="no hp" />
          </div>
          <button type="submit" class="btn">kirim pesan</button>
        </form>
      </div>
    </section>
    
    <!-- Footer -->
    <footer>
      <div class="socials">
        <a href="#"><i data-feather="instagram"></i></a>
        <a href="#"><i data-feather="facebook"></i></a>
      </div>

      <div class="credit">
        <p>Created by <a href="">ViosCake</a>. | &copy; 2023.</p>
      </div>
    </footer>
    
    <!-- Feather Icons -->
    <script>
    feather.replace();
    </script>
    
    <!-- My Javascript -->
    <script src="main.js"></script>

    </body>
</html>