/*
  # Constrain promotion link targets to web addresses

  promotions.link_url is rendered straight into an anchor href on the
  redirect page. Without a constraint, a stored value using a scripting
  scheme (for example javascript:) would execute in the site's origin for
  every visitor who taps that campaign card.

  1. Security
    - Add a CHECK constraint requiring link_url to begin with http:// or https://
    - Verified against existing data: all 4 rows already satisfy it, so no
      current campaign is affected
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'promotions_link_url_is_web_url'
      AND conrelid = 'public.promotions'::regclass
  ) THEN
    ALTER TABLE public.promotions
      ADD CONSTRAINT promotions_link_url_is_web_url
      CHECK (link_url ~* '^https?://');
  END IF;
END $$;
