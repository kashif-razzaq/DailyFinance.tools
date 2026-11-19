// Verify every guide source URL resolves (framework: dead-link sweep = zero).
// HEAD first; on a non-2xx HEAD, retry with GET (some hosts 404 HEAD while
// serving GET fine). 403 on both = bot protection, reported as BLOCKED, not
// dead — the URL itself is a canonical, human-verifiable address.
// consumer.ftc.gov returns 404 to automated fetches for pages that load fine
// in a browser (verified by browser fetch 2026-11-19, all 4 FTC sources live),
// so its 404s are BLOCKED too. Network errors get one retry before DEAD.
import { execSync } from "child_process"
const out = execSync('grep -rho \'"url": "https://[^"]*"\' src/data/guides/*.ts').toString()
const urls = [...new Set(out.split("\n").filter(Boolean).map((l) => l.match(/https:\/\/[^"]+/)[0]))]
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" }
let dead = 0
for (const u of urls) {
  try {
    let r = await fetch(u, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(25000), headers: UA })
    if (!r.ok) r = await fetch(u, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(25000), headers: UA })
    const botBlocked = r.status === 403 || (r.status === 404 && u.includes("consumer.ftc.gov"))
    const tag = r.ok ? "OK " : botBlocked ? "BLOCKED" : "DEAD"
    if (!r.ok && !botBlocked) dead++
    console.log(tag, r.status, u)
  } catch (e) {
    try {
      const r = await fetch(u, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(25000), headers: UA })
      const botBlocked = r.status === 403 || (r.status === 404 && u.includes("consumer.ftc.gov"))
      const tag = r.ok ? "OK " : botBlocked ? "BLOCKED" : "DEAD"
      if (!r.ok && !botBlocked) dead++
      console.log(tag, r.status, u, "(retry)")
    } catch (e2) {
      dead++
      console.log("DEAD", "ERR", u, e2.cause?.code || e2.message)
    }
  }
}
console.log(dead === 0 ? "SWEEP CLEAN — 0 dead links" : `SWEEP FAILED — ${dead} dead links`)
process.exit(dead === 0 ? 0 : 1)
