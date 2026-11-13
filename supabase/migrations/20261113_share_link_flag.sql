-- Pro live sharing (redesign): the share modal auto-saves the current
-- calculation as a public scenario so the link carries a savedId — but
-- those rows are NOT Vault scenarios and must never appear in the Vault
-- list, the compare picker, the analytics picture, or any Vault count.
-- is_share_link flags them; getSavedCalculatorsAction and the Vault
-- counts filter them out. The restore path (getSharedCalculatorAction by
-- id) is unaffected — link openers still get the scenario.
ALTER TABLE public.saved_calculators
  ADD COLUMN IF NOT EXISTS is_share_link BOOLEAN NOT NULL DEFAULT false;
