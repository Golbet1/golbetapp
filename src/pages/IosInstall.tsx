import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Download, Share, Plus } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const LOGO = 'https://cmsbetconstruct.com/storage/medias/golbetting-18764295/media_18764295_98125707f0f76595cfda7a3ec28e7286.svg';
const ICON = '/App_Icon.png';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const TEXT = {
  en: {
    home: 'Home',
    title: 'iOS App',
    subtitle: 'Add Golbet to your home screen and use it like an app.',
    installBtn: 'Add to Home Screen',
    installedTitle: 'Installation Complete!',
    installedDesc: 'Golbet has been added to your home screen. You can open the app from your home screen.',
    stepsTitle: 'Steps to Add to Home Screen',
    step1Title: 'Open this page in Safari',
    step1Desc: 'This page must be open in the Safari browser. If you are using a different browser, copy the link and paste it into Safari.',
    step2Title: 'Tap the Share button',
    step2Desc1: 'Tap the',
    step2Desc2: 'icon at the bottom of the screen',
    step3Title: 'Find "Add to Home Screen"',
    step3Desc: 'Scroll down and tap "Add to Home Screen"',
    step4Title: 'Tap the "Add" button',
    step4Desc: 'Tap "Add" in the top-right corner. The Golbet icon will be added to your home screen.',
  },
  tr: {
    home: 'Ana Sayfa',
    title: 'iOS Uygulaması',
    subtitle: 'Golbet\'i ana ekranınıza ekleyerek uygulama gibi kullanın.',
    installBtn: 'Ana Ekrana Ekle',
    installedTitle: 'Kurulum Tamamlandı!',
    installedDesc: 'Golbet ana ekranınıza eklendi. Uygulamayı ana ekranınızdan açabilirsiniz.',
    stepsTitle: 'Ana Ekrana Ekleme Adımları',
    step1Title: 'Bu sayfayı Safari\'de açın',
    step1Desc: 'Bu sayfa Safari tarayıcısında açık olmalıdır. Farklı bir tarayıcı kullanıyorsanız, bağlantıyı kopyalayıp Safari\'ye yapıştırın.',
    step2Title: 'Paylaş butonuna dokunun',
    step2Desc1: 'Ekranın altındaki',
    step2Desc2: 'ikonuna dokunun',
    step3Title: '"Ana Ekrana Ekle" seçeneğini bulun',
    step3Desc: 'Aşağı kaydırın ve "Ana Ekrana Ekle" seçeneğine dokunun',
    step4Title: '"Ekle" butonuna dokunun',
    step4Desc: 'Sağ üst köşedeki "Ekle" butonuna dokunun. Golbet ikonu ana ekranınıza eklenecektir.',
  },
};

type Lang = 'en' | 'tr';

export default function IosInstall() {
  const [searchParams] = useSearchParams();
  const lang: Lang = searchParams.get('lang') === 'tr' ? 'tr' : 'en';
  const t = TEXT[lang];

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowSteps(true);
      setTimeout(() => {
        stepsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
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
          <p className="text-[#8b9bb0] text-sm">
            {t.subtitle}
          </p>
        </div>

        {installed ? (
          <div className="bg-[#0d3d2a] border border-[#1a6b4a]/60 rounded-xl p-6 text-center mb-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#1a6b4a]/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white font-bold text-lg mb-1">{t.installedTitle}</h2>
            <p className="text-[#8b9bb0] text-sm">
              {t.installedDesc}
            </p>
          </div>
        ) : (
          <>
            <button
              onClick={handleInstall}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#1a61b0] to-[#1e5a99] hover:from-[#2070c4] hover:to-[#2468ad] text-white font-bold text-base rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,97,176,0.4)] mb-8"
            >
              <Download className="w-5 h-5" />
              <span>{t.installBtn}</span>
            </button>

            {(showSteps || !deferredPrompt) && (
              <div ref={stepsRef} className="bg-[#0d2035] border border-[#1a4a6b]/60 rounded-xl p-5 mb-6">
                <h2 className="text-white font-bold text-base mb-4 text-center">
                  {t.stepsTitle}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a61b0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#5ba3e6] font-bold text-sm">1</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">
                        {t.step1Title}
                      </p>
                      <p className="text-[#8b9bb0] text-xs">
                        {t.step1Desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a61b0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#5ba3e6] font-bold text-sm">2</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">
                        {t.step2Title}
                      </p>
                      <div className="flex items-center gap-2 text-[#8b9bb0] text-xs">
                        <span>{t.step2Desc1}</span>
                        <Share className="w-4 h-4 text-[#5ba3e6]" />
                        <span>{t.step2Desc2}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a61b0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#5ba3e6] font-bold text-sm">3</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">
                        {t.step3Title}
                      </p>
                      <div className="flex items-center gap-2 text-[#8b9bb0] text-xs">
                        <Plus className="w-4 h-4 text-[#5ba3e6]" />
                        <span>{t.step3Desc}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a61b0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#5ba3e6] font-bold text-sm">4</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">
                        {t.step4Title}
                      </p>
                      <p className="text-[#8b9bb0] text-xs">
                        {t.step4Desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
