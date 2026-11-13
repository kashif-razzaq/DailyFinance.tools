-- Pro live sharing: anyone (including logged-out visitors) may read a saved
-- scenario its owner has shared (is_public = true). Private scenarios stay
-- owner-only under "Users can view own saved calculators", and
-- getSharedCalculatorAction double-checks is_public / ownership in app code.
--
-- NOTE: this policy already existed in the live project (created outside the
-- repo's migrations); this file records it as the intended state. The DROP
-- first makes the migration safe to re-apply anywhere.
DROP POLICY IF EXISTS "Public can view shared calculators" ON public.saved_calculators;
CREATE POLICY "Public can view shared calculators"
ON public.saved_calculators
FOR SELECT
TO public
USING (is_public = true);
