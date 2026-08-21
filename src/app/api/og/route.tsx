/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Dynamic params
    const title = searchParams.get('title')?.slice(0, 80) || 'Professional Financial Calculators'
    const description = searchParams.get('description')?.slice(0, 150) || 'Free professional-grade financial calculators for founders and freelancers.'
    const category = searchParams.get('category') || 'Finance Tool'

    const categoryColors: Record<string, { bg: string, text: string, border: string }> = {
      'Freelance': { bg: 'rgba(217, 119, 6, 0.15)', text: '#B45309', border: 'rgba(217, 119, 6, 0.3)' }, // Amber
      'Personal Wealth': { bg: 'rgba(6, 78, 59, 0.15)', text: '#1E3A5F', border: 'rgba(6, 78, 59, 0.3)' }, // Emerald
      'Real Estate': { bg: 'rgba(59, 130, 246, 0.15)', text: '#1D4ED8', border: 'rgba(59, 130, 246, 0.3)' }, // Blue
      'Business': { bg: 'rgba(139, 92, 246, 0.15)', text: '#6D28D9', border: 'rgba(139, 92, 246, 0.3)' }, // Purple
      'Creator': { bg: 'rgba(236, 72, 153, 0.15)', text: '#BE185D', border: 'rgba(236, 72, 153, 0.3)' }, // Pink
      'Ecommerce': { bg: 'rgba(14, 165, 233, 0.15)', text: '#0369A1', border: 'rgba(14, 165, 233, 0.3)' } // Sky
    }

    const theme = categoryColors[category] || { bg: 'rgba(100, 116, 139, 0.15)', text: '#334155', border: 'rgba(100, 116, 139, 0.3)' } // Default slate

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#F8FAFC', // Slate 50 - slightly cool, very clean
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Massive Logo Watermark on the Right */}
          <div
            style={{
              position: 'absolute',
              right: '-10%',
              top: '5%',
              display: 'flex',
              opacity: 0.04,
              transform: 'rotate(-5deg)',
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" width="800" height="800" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="55" width="14" height="25" rx="4" fill="#1E3A5F" />
              <rect x="43" y="35" width="14" height="45" rx="4" fill="#1E3A5F" />
              <rect x="66" y="15" width="14" height="65" rx="4" fill="#D97706" />
            </svg>
          </div>

          {/* Left vertical accent stripe */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '16px',
              height: '100%',
            }}
          >
            <div style={{ flex: 2, background: '#1E3A5F' }} />
            <div style={{ flex: 1, background: '#D97706' }} />
          </div>

          {/* Main Content Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: '80px 100px',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '40px',
              }}
            >
              {/* Category Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 28px',
                  background: theme.bg,
                  color: theme.text,
                  fontSize: '22px',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '32px',
                  borderRadius: '999px',
                  alignSelf: 'flex-start',
                  border: `1px solid ${theme.border}`,
                }}
              >
                {category}
              </div>

              {/* Title */}
              <div
                style={{
                  display: 'flex',
                  fontSize: '64px', // Made it larger
                  fontWeight: '900', // Extra bold
                  color: '#0F172A', // Slate 900
                  lineHeight: 1.05,
                  marginBottom: '40px',
                  letterSpacing: '-2.5px',
                  textShadow: '0 4px 12px rgba(0,0,0,0.02)', // Adds a very subtle pop
                }}
              >
                {title}
              </div>

              {/* Description */}
              <div
                style={{
                  display: 'flex',
                  fontSize: '36px',
                  color: '#475569', // Slate 600
                  lineHeight: 1.4,
                  fontWeight: '400',
                  maxWidth: '85%',
                }}
              >
                {description}
              </div>
            </div>

            {/* Footer Logo Area */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  marginRight: '20px',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  padding: '10px',
                }}
              >
                <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="55" width="14" height="25" rx="4" fill="#1E3A5F" />
                  <rect x="43" y="35" width="14" height="45" rx="4" fill="#1E3A5F" />
                  <rect x="66" y="15" width="14" height="65" rx="4" fill="#D97706" />
                </svg>
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: '34px',
                  fontWeight: '800',
                  color: '#0F172A',
                  letterSpacing: '-0.5px',
                }}
              >
                DailyFinance<span style={{ color: '#94A3B8', fontWeight: '500' }}>.tools</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
