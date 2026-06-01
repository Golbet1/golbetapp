/*
  # Create promotions table

  1. New Tables
    - `promotions`
      - `id` (uuid, primary key) - unique identifier for each promotion
      - `title` (text) - main headline of the promotion
      - `subtitle` (text) - secondary description text
      - `badge_text` (text) - small badge label like "OZEL" or "ILK YATIRIMA OZEL"
      - `link_url` (text) - URL the promotion links to
      - `sort_order` (integer) - display order (lower = first)
      - `is_active` (boolean) - whether the promotion is currently displayed
      - `created_at` (timestamptz) - creation timestamp

  2. Security
    - Enable RLS on `promotions` table
    - Add policy for anonymous/public read access to active promotions only (public-facing content)

  3. Seed Data
    - 4 promotions based on the Golbet website's active campaigns
*/

CREATE TABLE IF NOT EXISTS promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  badge_text text NOT NULL DEFAULT '',
  link_url text NOT NULL DEFAULT 'https://t.ly/golpromosyon',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active promotions"
  ON promotions
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

INSERT INTO promotions (title, subtitle, badge_text, link_url, sort_order) VALUES
  ('%25 Çevrimsiz Spor Bonusu', 'İlk yatırımınıza özel çevrimsiz spor bonusu', 'İLK YATIRIMA ÖZEL', 'https://t.ly/golpromosyon', 1),
  ('250 Freespin / Freebet', 'Hemen kayıt ol, 250 Freespin veya Freebet bonusunu al', 'YENİ ÜYE', 'https://t.ly/golpromosyon', 2),
  ('%15 Yatırım Bonusu', 'Her yatırımınıza %15 bonus kazanın', 'BONUS', 'https://t.ly/golpromosyon', 3),
  ('Ryan Babel Resmi Marka Elçimiz', 'Golbet resmi marka elçisi Ryan Babel ile kazanın', 'ÖZEL', 'https://t.ly/golpromosyon', 4);
