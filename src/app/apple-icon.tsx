import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#E5E7EB',
          borderRadius: '40px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
          <div style={{ width: '22px', height: '45px', background: '#064E3B', borderRadius: '5px' }} />
          <div style={{ width: '22px', height: '81px', background: '#064E3B', borderRadius: '5px' }} />
          <div style={{ width: '22px', height: '117px', background: '#D97706', borderRadius: '5px' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
