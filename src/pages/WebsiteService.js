import React from 'react';
import { Helmet } from 'react-helmet';

const WebsiteService = () => {
  return (
    <div>
      <Helmet>
        <title>Jasa Pembuatan Website Profesional | Nama Perusahaan</title>
        <meta name="description" content="Kami menawarkan jasa pembuatan website profesional dengan desain responsif dan SEO-friendly. Hubungi kami untuk konsultasi gratis." />
      </Helmet>
      <h1>Jasa Pembuatan Website</h1>
      <h2>Desain Website yang Responsif</h2>
      <p>Kami menyediakan layanan pembuatan website dengan desain yang responsif dan menarik. Setiap website yang kami buat dioptimalkan untuk SEO dan memiliki performa yang baik.</p>
      <h2>Portofolio Kami</h2>
      <p>Lihat beberapa contoh website yang telah kami buat untuk klien kami.</p>
      <img src="path/to/portfolio-image.jpg" alt="Contoh Website" />
    </div>
  );
};

export default WebsiteService;