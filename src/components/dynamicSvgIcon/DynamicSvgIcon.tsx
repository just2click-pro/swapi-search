import React, { SVGProps } from 'react'

import { useDynamicSVGImport } from '@/hooks/useDynamicSVGImport'

interface IProps {
  iconName: string
  wrappedStyle?: string
  svgProps?: SVGProps<SVGAElement>
}

function DynamicSvgIcon({ iconName, wrappedStyle, svgProps = {} }: IProps) {
  const { loading, SvgIcon } = useDynamicSVGImport(iconName)

  return (
    <>
      {loading && <div className='rounded-full bg-slate-400 animate-pulse h-8 w-8'></div>}
      {SvgIcon && (
        <div className={wrappedStyle}>
          <SvgIcon {...svgProps} fill={svgProps?.fill} stroke={svgProps?.stroke} />
        </div>
      )}
    </>
  )
}

export default DynamicSvgIcon
