import { checkCode, createToken, guard, json } from './_lib/auth.js'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export function POST(request) {
  return guard(async () => {
    const { code } = await request.json().catch(() => ({}))
    // Délai fixe : ralentit les essais de code en série
    await wait(800)
    if (typeof code !== 'string' || !checkCode(code)) return json({ error: 'Code incorrect.' }, 401)
    return json({ token: createToken() })
  })
}
