import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, UserPlus, ArrowRight, Smartphone } from 'lucide-react';

const LINKS = {
  giris: 'https://t.ly/golgiris',
  telegram: 'https://t.ly/goltelegram',
  whatsapp: 'https://t.ly/golwhatsapp',
  twitter: 'https://t.ly/goltwitter',
  instagram: 'https://t.ly/golinstagram',
  android: '/android',
  ios: '/ios',
  androidTr: '/android?lang=tr',
  iosTr: '/ios?lang=tr',
  license: 'https://cert.cga.cw/certificate?id=ZXlKcGRpSTZJbk13ZUhrdkwwazBkR3N6TDNOQ2VVMTNVVE5tT1VFOVBTSXNJblpoYkhWbElqb2ljbWh1VW1kcWFFUlpVSEJyZDAxS2NYUTVVMnBSZHowOUlpd2liV0ZqSWpvaU5HVm1OamhtWkRNeVl6WmxNVFJtTmpNd01UVmxOell5TkRRM1lXSmlOVGszTURObFlqQmlabVF4TURNeU9XWmpORGd5WVRRd01EQTBNamN5TXpCaE5TSXNJblJoWnlJNklpSjk=',
};

const ASSETS = {
  logo: 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/19/golbet-rb-beyaz-_3_.png',
  phoneMockup: 'https://d3rklxwrkddo3q.cloudfront.net/2026/05/22/golbetappphone.png',
  iconGolbet: 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/19/giris_footer_botton_icon.png',
  iconInstagram: 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/16/INSTA.png',
  iconTwitter: 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/16/X.png',
  iconWhatsapp: 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/16/WHATSAPP.png',
  iconTelegram: 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/16/TELEGRAM.png',
};

type Lang = 'tr' | 'en';

const TEXT = {
  tr: {
    heroTitle1: 'Golbet Mobil',
    heroTitle2: 'Uygulaması',
    heroSubtitle: 'Her Zaman Yanınızda!',
    girisBtn: 'Golbet Güncel Giriş',
    followUs: 'Bizi Takip Edin',
    howItWorks: 'Nasıl Çalışır?',
    downloadApp: 'Uygulama İndir',
    downloadAppDesc: 'iOS veya Android cihazınıza Golbet uygulamasını ücretsiz indirin.',
    createAccount: 'Hesap Oluştur',
    createAccountDesc: 'Hızlı kayıt işlemi ile hesabınızı oluşturun ve hoş geldin bonusunuzu alın.',
    ctaTitle: 'Hemen İndirin, Kazanmaya Başlayın!',
    ctaDesc: 'Golbet mobil uygulaması ile bahis dünyasının keyfini çıkarın. Hoş geldin bonusunuzu kaçırmayın!',
    androidBtn: 'Android İndir',
    iosBtn: 'iOS İndir',
    licensed: 'Lisanslı & Güvenli',
    licenseDesc: 'CGA tarafından Trickless N.V aracılığıyla lisanslandırılan Golbet, üyelerinin her zaman yanında olarak gerek güvenlik önlemleri gerekse destek hizmetleriyle bahis deneyimini bir üst boyuta taşımaktadır.',
    phoneMockupAlt: 'Golbet Mobil Uygulama',
  },
  en: {
    heroTitle1: 'Golbet Mobile',
    heroTitle2: 'Application',
    heroSubtitle: 'Always By Your Side!',
    girisBtn: 'Golbet Login',
    followUs: 'Follow Us',
    howItWorks: 'How It Works?',
    downloadApp: 'Download App',
    downloadAppDesc: 'Download the Golbet app for free on your iOS or Android device.',
    createAccount: 'Create Account',
    createAccountDesc: 'Create your account with a quick registration and claim your welcome bonus.',
    ctaTitle: 'Download Now, Start Winning!',
    ctaDesc: 'Enjoy the world of betting with the Golbet mobile app. Don\'t miss your welcome bonus!',
    androidBtn: 'Download Android',
    iosBtn: 'Download iOS',
    licensed: 'Licensed & Secure',
    licenseDesc: 'Licensed by CGA through Trickless N.V, Golbet is always by its members\' side, elevating the betting experience with both security measures and support services.',
    phoneMockupAlt: 'Golbet Mobile App',
  },
};

function SectionTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <span className="text-[#5ba3e6] text-xs">&#10022;</span>
      <span className="text-[#5ba3e6] text-xs font-semibold tracking-[0.2em] uppercase">
        {children}
      </span>
      <span className="text-[#5ba3e6] text-xs">&#10022;</span>
    </div>
  );
}

function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <header className="w-full flex items-center justify-center py-4 px-4 relative">
      <img src={ASSETS.logo} alt="Golbet" className="h-16 sm:h-20" />
      <div className="absolute right-4 flex items-center bg-[#0d2a3d] rounded-full overflow-hidden border border-[#1a4a6b]">
        <button
          onClick={() => setLang('tr')}
          className={`px-3 py-1.5 text-xs font-semibold transition-all duration-200 rounded-full ${
            lang === 'tr' ? 'text-white bg-[#1a61b0]' : 'text-[#8b9bb0]'
          }`}
        >
          TR
        </button>
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1.5 text-xs font-semibold transition-all duration-200 rounded-full ${
            lang === 'en' ? 'text-white bg-[#1a61b0]' : 'text-[#8b9bb0]'
          }`}
        >
          EN
        </button>
      </div>
    </header>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <section className="w-full max-w-[660px] mx-auto px-4 pt-4 pb-8">
      <div className="flex flex-row items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-[clamp(1.4rem,5vw,2.5rem)] font-extrabold text-[#fff9c7] leading-tight mb-2">
            {t.heroTitle1}
            <br />
            {t.heroTitle2}
          </h1>
          <p className="text-[#5ba3e6] text-[clamp(0.875rem,2.5vw,1.125rem)] font-semibold mb-4">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-row items-center gap-2 mb-3 flex-wrap">
            <Link
              to={lang === 'tr' ? LINKS.androidTr : LINKS.android}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1a61b0] to-[#1e5a99] hover:from-[#2070c4] hover:to-[#2468ad] rounded-lg transition-all duration-200 hover:shadow-[0_0_25px_rgba(26,97,176,0.35)]"
            >
              <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z" />
              </svg>
              <div>
                <span className="text-white/70 text-[9px] uppercase tracking-wider block leading-none">DOWNLOAD</span>
                <span className="text-white font-semibold text-xs">Google Play</span>
              </div>
            </Link>
            <Link
              to={lang === 'tr' ? LINKS.iosTr : LINKS.ios}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1a61b0] to-[#1e5a99] hover:from-[#2070c4] hover:to-[#2468ad] rounded-lg transition-all duration-200 hover:shadow-[0_0_25px_rgba(26,97,176,0.35)]"
            >
              <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <span className="text-white/70 text-[9px] uppercase tracking-wider block leading-none">DOWNLOAD</span>
                <span className="text-white font-semibold text-xs">App Store</span>
              </div>
            </Link>
          </div>

          <a
            href={LINKS.giris}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0d2035] border border-[#1a4a6b]/60 hover:border-[#5ba3e6]/60 text-white font-semibold text-sm rounded-lg transition-all duration-200"
          >
            <span>{t.girisBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex-shrink-0 w-[30%] max-w-[180px]">
          <img
            src={ASSETS.phoneMockup}
            alt={t.phoneMockupAlt}
            className="w-full h-auto drop-shadow-[0_0_30px_rgba(26,97,176,0.2)]"
          />
        </div>
      </div>
    </section>
  );
}

function SocialLinks({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <section className="w-full max-w-[660px] mx-auto px-4 pb-10">
      <SectionTitle>{t.followUs}</SectionTitle>

      <div className="grid grid-cols-4 gap-2">
        <a
          href={LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 p-3 bg-[#0d2035] rounded-xl border border-[#1a4a6b]/60 hover:border-[#5ba3e6]/60 transition-all duration-200"
        >
          <img src={ASSETS.iconTelegram} alt="Telegram" className="w-7 h-7" />
          <span className="text-white text-[10px] font-medium">Telegram</span>
        </a>
        <a
          href={LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 p-3 bg-[#0d2035] rounded-xl border border-[#1a4a6b]/60 hover:border-[#5ba3e6]/60 transition-all duration-200"
        >
          <img src={ASSETS.iconWhatsapp} alt="WhatsApp" className="w-7 h-7" />
          <span className="text-white text-[10px] font-medium">WhatsApp</span>
        </a>
        <a
          href={LINKS.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 p-3 bg-[#0d2035] rounded-xl border border-[#1a4a6b]/60 hover:border-[#5ba3e6]/60 transition-all duration-200"
        >
          <img src={ASSETS.iconTwitter} alt="X / Twitter" className="w-7 h-7" />
          <span className="text-white text-[10px] font-medium">X / Twitter</span>
        </a>
        <a
          href={LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 p-3 bg-[#0d2035] rounded-xl border border-[#1a4a6b]/60 hover:border-[#5ba3e6]/60 transition-all duration-200"
        >
          <img src={ASSETS.iconInstagram} alt="Instagram" className="w-7 h-7" />
          <span className="text-white text-[10px] font-medium">Instagram</span>
        </a>
      </div>
    </section>
  );
}

function HowItWorks({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <section className="w-full max-w-[660px] mx-auto px-4 pb-10">
      <SectionTitle>{t.howItWorks}</SectionTitle>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0d2035] rounded-xl border border-[#1a4a6b]/60 p-4 text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#1a61b0]/15 flex items-center justify-center">
            <Download className="w-5 h-5 text-[#5ba3e6]" />
          </div>
          <h3 className="text-white font-bold text-sm mb-1">{t.downloadApp}</h3>
          <p className="text-[#8b9bb0] text-xs leading-relaxed">
            {t.downloadAppDesc}
          </p>
        </div>

        <div className="bg-[#0d2035] rounded-xl border border-[#1a4a6b]/60 p-4 text-center">
          <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#1a61b0]/15 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-[#5ba3e6]" />
          </div>
          <h3 className="text-white font-bold text-sm mb-1">{t.createAccount}</h3>
          <p className="text-[#8b9bb0] text-xs leading-relaxed">
            {t.createAccountDesc}
          </p>
        </div>
      </div>
    </section>
  );
}

function BottomCTA({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <section className="w-full max-w-[660px] mx-auto px-4 pb-10 text-center">
      <h2 className="text-[clamp(1.2rem,4vw,1.75rem)] font-extrabold text-[#fff9c7] mb-2">
        {t.ctaTitle}
      </h2>
      <p className="text-[#8b9bb0] text-xs mb-6 max-w-md mx-auto">
        {t.ctaDesc}
      </p>

      <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
        <Link
          to={lang === 'tr' ? LINKS.androidTr : LINKS.android}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1a61b0] to-[#1e5a99] hover:from-[#2070c4] hover:to-[#2468ad] text-white font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-[0_0_25px_rgba(26,97,176,0.35)]"
        >
          <Smartphone className="w-4 h-4" />
          <span>{t.androidBtn}</span>
        </Link>
        <Link
          to={lang === 'tr' ? LINKS.iosTr : LINKS.ios}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#1a61b0] to-[#1e5a99] hover:from-[#2070c4] hover:to-[#2468ad] text-white font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-[0_0_25px_rgba(26,97,176,0.35)]"
        >
          <Smartphone className="w-4 h-4" />
          <span>{t.iosBtn}</span>
        </Link>
      </div>
    </section>
  );
}

function LicenseSection({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <section className="w-full max-w-[660px] mx-auto px-4 pb-8">
      <a
        href={LINKS.license}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full py-5 bg-gradient-to-r from-[#0d3d2a] to-[#0a3525] rounded-xl border border-[#1a6b4a]/40 overflow-hidden mb-3 group hover:border-[#1a6b4a]/70 transition-all duration-200"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,29,42,0.7)_100%)]" />
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#071d2a]/80 to-transparent" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#071d2a]/80 to-transparent" />
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#071d2a]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#071d2a]/60 to-transparent" />
        </div>
        <div className="relative text-center">
          <span className="text-white text-2xl font-black tracking-wider">CGA</span>
          <p className="text-[#5ba3e6] text-[10px] mt-0.5 group-hover:underline">cert.cga.cw</p>
        </div>
      </a>

      <div className="bg-[#0d2035] rounded-xl border border-[#1a4a6b]/60 p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full border border-[#5ba3e6] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full border border-[#5ba3e6]" />
          </div>
          <span className="text-white font-bold text-xs uppercase tracking-wider">
            {t.licensed}
          </span>
        </div>
        <p className="text-[#8b9bb0] text-xs leading-relaxed">
          {t.licenseDesc}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full max-w-[660px] mx-auto px-4 pb-6 text-center">
      <div className="border-t border-[#1a4a6b]/40 pt-4">
        <div className="flex items-center justify-center gap-2">
          <img src={ASSETS.iconGolbet} alt="" className="w-4 h-4" />
          <span className="text-[#8b9bb0] text-xs font-medium">golbet</span>
          <img src={ASSETS.iconGolbet} alt="" className="w-4 h-4" />
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>('tr');

  return (
    <div className="min-h-screen bg-[#071d2a] flex flex-col items-center">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <SocialLinks lang={lang} />
      <HowItWorks lang={lang} />
      <BottomCTA lang={lang} />
      <LicenseSection lang={lang} />
      <Footer />
    </div>
  );
}

export default App;
