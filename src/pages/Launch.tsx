import { useEffect, useState, useRef } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, Gift, Star, Trophy, Users } from 'lucide-react';
import { supabase } from '../supabase';

const REDIRECT_URL = 'https://t.ly/golgiris';
const PROMO_URL = 'https://t.ly/golpromosyon';
const LOGO = 'https://d3rklxwrkddo3q.cloudfront.net/2026/03/19/golbet-rb-beyaz-_3_.png';

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
const PROMO_GRADIENTS = [
  'from-[#0d3d2a] to-[#0a2e20]',
  'from-[#2a1a0d] to-[#1f140a]',
  'from-[#0d2a3d] to-[#0a1f2e]',
  'from-[#1a2a0d] to-[#141f0a]',
];

export default function Launch() {
  const [showContent, setShowContent] = useState(false);
  const [promotions, setPromotions] = useState<Promotion[]>(FALLBACK_PROMOTIONS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1200);
    return () => clearTimeout(timer);
  }, []);

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

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 260;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

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

  return (
    <div className="min-h-screen bg-[#071d2a] flex flex-col items-center px-4 py-8 overflow-hidden">
      <img src={LOGO} alt="Golbet" className="h-14 mb-6 mx-auto" />

      <a
        href={REDIRECT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1a61b0] to-[#1e5a99] hover:from-[#2070c4] hover:to-[#2468ad] text-white font-bold text-base rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(26,97,176,0.4)] mb-8 w-full max-w-sm"
      >
        <span>Golbet'e Git</span>
        <ExternalLink className="w-5 h-5" />
      </a>

      <div className="w-full max-w-lg mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-[#fff9c7] font-bold text-sm">Kampanyalar</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[#0d2035] border border-[#1a4a6b]/60 text-[#5ba3e6] hover:bg-[#1a4a6b]/40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[#0d2035] border border-[#1a4a6b]/60 text-[#5ba3e6] hover:bg-[#1a4a6b]/40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {promotions.map((promo, idx) => {
            const Icon = PROMO_ICONS[idx % PROMO_ICONS.length];
            const gradient = PROMO_GRADIENTS[idx % PROMO_GRADIENTS.length];
            return (
              <a
                key={promo.id}
                href={promo.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 w-[240px] snap-start rounded-xl bg-gradient-to-br ${gradient} border border-[#1a4a6b]/40 p-4 hover:border-[#5ba3e6]/60 transition-all duration-200 hover:scale-[1.02] group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#071d2a] bg-[#fff9c7] px-2 py-0.5 rounded">
                    {promo.badge_text}
                  </span>
                  <Icon className="w-5 h-5 text-[#5ba3e6] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-white font-bold text-sm leading-tight mb-1.5">
                  {promo.title}
                </h3>
                <p className="text-[#8b9bb0] text-xs leading-relaxed line-clamp-2">
                  {promo.subtitle}
                </p>
              </a>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 p-4 bg-[#0d2035] rounded-xl border border-[#1a4a6b]/40">
          <div className="w-10 h-10 rounded-full bg-[#1a61b0]/15 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-[#5ba3e6]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold">Resmi Marka Elçimiz</p>
            <p className="text-[#8b9bb0] text-[11px]">Ryan Babel ile birlikte</p>
          </div>
          <a
            href={PROMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5ba3e6] text-xs font-semibold hover:text-white transition-colors flex-shrink-0"
          >
            Detay
          </a>
        </div>
      </div>
    </div>
  );
}
