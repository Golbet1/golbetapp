import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ExternalLink, Gift, Star, Trophy, Users } from 'lucide-react';
import { supabase } from '../supabase';

const REDIRECT_URL = 'https://t.ly/golgiris';
const PROMO_URL = 'https://t.ly/golpromosyon';
const LOGO = 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/19/golbet-rb-beyaz-_3_.png';
const ICON_GOLBET = 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/19/giris_footer_botton_icon.png';

type Lang = 'tr' | 'en';

const TEXT = {
  tr: {
    redirecting: 'Yönlendiriliyorsunuz...',
    goBtn: "Golbet'e Git",
    campaigns: 'Kampanyalar',
  },
  en: {
    redirecting: 'Redirecting...',
    goBtn: 'Go to Golbet',
    campaigns: 'Campaigns',
  },
};

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  badge_text: string;
  link_url: string;
  sort_order: number;
}

const FALLBACK_PROMOTIONS: Promotion[] = [
  { id: '1', title: '%25 Çevrimsiz Spor Bonusu', subtitle: 'İlk yatırımınıza özel çevrimsiz spor bonusu', badge_text: 'İLK YATIRIMA ÖZEL', link_url: PROMO_URL, sort_order: 1 },
  { id: '2', title: '250 Freespin / Freebet', subtitle: 'Hemen kayıt ol, 250 Freespin veya Freebet bonusunu al', badge_text: 'YENİ ÜYE', link_url: PROMO_URL, sort_order: 2 },
  { id: '3', title: '%15 Yatırım Bonusu', subtitle: 'Her yatırımınıza %15 bonus kazanın', badge_text: 'BONUS', link_url: PROMO_URL, sort_order: 3 },
  { id: '4', title: 'Ryan Babel Resmi Marka Elçimiz', subtitle: 'Golbet resmi marka elçisi Ryan Babel ile kazanın', badge_text: 'ÖZEL', link_url: PROMO_URL, sort_order: 4 },
];

const PROMO_ICONS = [Trophy, Gift, Star, Users];
const COUNTDOWN_SECONDS = 10;

export default function Launch() {
  const [searchParams] = useSearchParams();
  const lang: Lang = searchParams.get('lang') === 'en' ? 'en' : 'tr';
  const t = TEXT[lang];

  const [showContent, setShowContent] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [promotions, setPromotions] = useState<Promotion[]>(FALLBACK_PROMOTIONS);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = REDIRECT_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showContent]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('promotions')
        .select('id, title, subtitle, badge_text, link_url, sort_order')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (data && data.length > 0) {
        setPromotions(data);
      }
    })();
  }, []);

  if (!showContent) {
    return (
      <div className="min-h-screen bg-[#071d2a] flex flex-col items-center justify-center px-4">
        <img src={LOGO} alt="Golbet" className="h-16 mb-8 mx-auto animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#5ba3e6] animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 rounded-full bg-[#5ba3e6] animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 rounded-full bg-[#5ba3e6] animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  const progress = ((COUNTDOWN_SECONDS - countdown) / COUNTDOWN_SECONDS) * 100;

  return (
    <div className="min-h-screen bg-[#071d2a] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-[660px] mx-auto">
        <img src={LOGO} alt="Golbet" className="h-14 mb-6 mx-auto" />

        <div className="mb-6 text-center">
          <p className="text-[#8b9bb0] text-sm mb-3">
            {t.redirecting} <span className="text-white font-bold">{countdown}</span>
          </p>
          <div className="w-full max-w-xs mx-auto h-1.5 bg-[#0d2035] rounded-full overflow-hidden border border-[#1a4a6b]/40">
            <div
              className="h-full bg-gradient-to-r from-[#1a61b0] to-[#5ba3e6] rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <a
          href={REDIRECT_URL}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1a61b0] to-[#1e5a99] hover:from-[#2070c4] hover:to-[#2468ad] text-white font-bold text-base rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,97,176,0.4)] mb-8 w-full"
        >
          <span>{t.goBtn}</span>
          <ExternalLink className="w-5 h-5" />
        </a>

        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-[#5ba3e6] text-xs">&#10022;</span>
            <span className="text-[#5ba3e6] text-xs font-semibold tracking-[0.2em] uppercase">
              {t.campaigns}
            </span>
            <span className="text-[#5ba3e6] text-xs">&#10022;</span>
          </div>

          <div className="space-y-3">
            {promotions.map((promo, idx) => {
              const Icon = PROMO_ICONS[idx % PROMO_ICONS.length];
              return (
                <a
                  key={promo.id}
                  href={promo.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#0d2035] rounded-xl border border-[#1a4a6b]/60 hover:border-[#5ba3e6]/60 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1a61b0]/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#5ba3e6]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#5ba3e6] bg-[#1a61b0]/15 px-2 py-0.5 rounded">
                        {promo.badge_text}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm leading-tight">
                      {promo.title}
                    </h3>
                    <p className="text-[#8b9bb0] text-xs mt-0.5 truncate">
                      {promo.subtitle}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <footer className="text-center pt-4 border-t border-[#1a4a6b]/40">
          <div className="flex items-center justify-center gap-2">
            <img src={ICON_GOLBET} alt="" className="w-4 h-4" />
            <span className="text-[#8b9bb0] text-xs font-medium">golbet</span>
            <img src={ICON_GOLBET} alt="" className="w-4 h-4" />
          </div>
        </footer>
      </div>
    </div>
  );
}
