/*
  # Revoke unnecessary write privileges on promotions

  The promotions table is read-only from the browser: the app only runs
  SELECT against it. The default Data API grants, however, still give the
  anon and authenticated roles INSERT, UPDATE and DELETE at the table
  level. Row level security currently denies those writes because no
  write policy exists, but the standing privilege means any future policy
  added to this table would immediately expose the public campaign list
  to rewriting by anonymous callers.

  1. Security
    - Revoke INSERT, UPDATE, DELETE on public.promotions from anon and authenticated
    - SELECT is deliberately left in place, together with the existing
      "Anyone can read active promotions" policy, so the redirect page
      keeps loading its campaign list
*/

REVOKE INSERT, UPDATE, DELETE ON public.promotions FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.promotions FROM authenticated;
