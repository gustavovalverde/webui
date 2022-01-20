import dynamic from 'next/dynamic'

const View = dynamic(() => import('react-json-view'), { ssr: false })

export const Json: React.FC<{
  data: Record<string, unknown>
  bg?: string
}> = ({ data, bg = '#181818' }) => (
  <View
    src={data}
    enableClipboard={false}
    displayDataTypes={false}
    collapsed={true}
    iconStyle="square"
    theme={{
      base00: bg,
      base01: '#bbbbbb',
      base02: '#9fe9ce',
      base03: '#bbbbbb',
      base04: '#25b37e',
      base05: '#bbbbbb',
      base06: '#bbbbbb',
      base07: '#bbbbbb',
      base08: '#bbbbbb',
      base09: '#ffffff',
      base0A: '#25b37e',
      base0B: '#25b37e',
      base0C: '#25b37e',
      base0D: '#25b37e',
      base0E: '#25b37e',
      base0F: '#25b37e',
    }}
  />
)
