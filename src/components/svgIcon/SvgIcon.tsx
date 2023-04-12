import { SVGProps } from 'react'

import { useDynamicSVGImport } from '@/hooks/useDynamicSVGImport'

interface IProps {
  iconName: string
  wrappedStyle?: string
  svgProps?: SVGProps<SVGAElement>
}

function SvgIcon(props: IProps) {
  const { iconName, wrappedStyle, svgProps } = props
  const { loading, SvgIcon } = useDynamicSVGImport(iconName)

  return (
    <>
      {loading && <div className='rounded-full bg-slate-400 animate-pulse h-8 w-8'></div>}
      {SvgIcon && (
        <div className={wrappedStyle}>
          <SvgIcon {...svgProps} />
        </div>
      )}
    </>
  )
}

export default SvgIcon
