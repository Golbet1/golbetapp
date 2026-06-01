import { useState, useRef } from 'react';
import { ArrowLeft, Download, MoreVertical, Plus, Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePWAInstall } from '../PWAInstallContext.tsx';

const LOGO = 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/19/golbet-rb-beyaz-_3_.png';
const ICON = '/App_Icon.png';

const TEXT = {
  en: {
    home: 'Home',
    title: 'Android App',
    subtitle: 'Add Golbet to your home screen and use it like an app.',
    installBtn: 'Add to Home Screen',
    preparingInstall: 'Preparing installation...',
    installedTitle: 'Installation Complete!',
    installedDesc: 'Golbet has been added to your home screen. You can open the app from your home screen.',
    stepsTitle: 'Manual Installation Steps',
    stepsNote: 'Make sure you are using Chrome browser. Follow the steps below if the automatic installation does not start.',
    step1Title: 'Open the Chrome menu',
    step1Desc: 'Tap the',
    step1Desc2: 'icon in the top-right corner',
    step2Title: 'Tap "Add to Home Screen"',
    step2Desc: 'Add to Home screen',
    step3Title: 'Tap the "Add" button',
    step3Desc: 'The Golbet icon will be added to your home screen.',
  },
  tr: {
    home: 'Ana Sayfa',
    title: 'Android Uygulaması',
    subtitle: 'Golbet\'i ana ekranınıza ekleyerek uygulama gibi kullanın.',
    installBtn: 'Ana Ekrana Ekle',
    preparingInstall: 'Kurulum hazırlanıyor...',
    installedTitle: 'Kurulum Tamamlandı!',
    installedDesc: 'Golbet ana ekranınıza eklendi. Uygulamayı ana ekranınızdan açabilirsiniz.',
    stepsTitle: 'Manuel Kurulum Adımları',
    stepsNote: 'Chrome tarayıcısında açtığınızdan emin olun. Otomatik kurulum başlamazsa aşağıdaki adımları takip edin.',
    step1Title: 'Chrome menüsünü açın',
    step1Desc: 'Sağ üstteki',
    step1Desc2: 'ikonuna dokunun',
    step2Title: '"Ana ekrana ekle" seçeneğine dokunun',
    step2Desc: 'Ana ekrana ekle',
    step3Title: '"Ekle" butonuna dokunun',
    step3Desc: 'Golbet ikonu ana ekranınıza eklenecektir.',
  },
};

type Lang = 'en' | 'tr';

export default function AndroidInstall() {
  const [searchParams] = useSearchParams();
  const lang: Lang = searchParams.get('lang') === 'tr' ? 'tr' : 'en';
  const t = TEXT[lang];

  const { deferredPrompt, clearPrompt } = usePWAInstall();
  const [installed, setInstalled] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
      }
      clearPrompt();
      return;
    }

    setPreparing(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 4000));
    setPreparing(false);

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
      }
      clearPrompt();
    } else {
      stepsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#071d2a] flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[#5ba3e6] text-sm font-medium mb-8 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.home}</span>
        </Link>

        <div className="text-center mb-8">
          <img src={LOGO} alt="Golbet" className="h-14 mx-auto mb-6" />
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#0d2035] border border-[#1a4a6b]/60 flex items-center justify-center shadow-lg">
            <img src={ICON} alt="Golbet" className="w-12 h-12 rounded-xl" />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-2">{t.title}</h1>
          <p className="text-[#8b9bb0] text-sm">{t.subtitle}</p>
        </div>

        {installed ? (
          <div className="bg-[#0d3d2a] border border-[#1a6b4a]/60 rounded-xl p-6 text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#1a6b4a]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white font-bold text-lg mb-1">{t.installedTitle}</h2>
            <p className="text-[#8b9bb0] text-sm">{t.installedDesc}</p>
          </div>
        ) : (
          <button
            onClick={handleInstall}
            disabled={preparing}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#1a61b0] to-[#1e5a99] hover:from-[#2070c4] hover:to-[#2468ad] disabled:opacity-70 text-white font-bold text-base rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,97,176,0.4)] mb-8"
          >
            {preparing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t.preparingInstall}</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{t.installBtn}</span>
              </>
            )}
          </button>
        )}

        <div ref={stepsRef} className="bg-[#0d2035] border border-[#1a4a6b]/60 rounded-xl p-5">
          <h2 className="text-white font-bold text-base mb-2 text-center">
            {t.stepsTitle}
          </h2>
          <p className="text-[#5ba3e6] text-xs text-center mb-4 leading-relaxed">
            {t.stepsNote}
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a61b0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#5ba3e6] font-bold text-sm">1</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium mb-1">{t.step1Title}</p>
                <div className="flex items-center gap-2 text-[#8b9bb0] text-xs">
                  <span>{t.step1Desc}</span>
                  <MoreVertical className="w-4 h-4 text-[#5ba3e6]" />
                  <span>{t.step1Desc2}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a61b0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#5ba3e6] font-bold text-sm">2</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium mb-1">{t.step2Title}</p>
                <div className="flex items-center gap-2 text-[#8b9bb0] text-xs">
                  <Plus className="w-4 h-4 text-[#5ba3e6]" />
                  <span>{t.step2Desc}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a61b0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#5ba3e6] font-bold text-sm">3</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium mb-1">{t.step3Title}</p>
                <p className="text-[#8b9bb0] text-xs">{t.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
