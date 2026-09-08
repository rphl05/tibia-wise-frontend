import { clsx } from 'clsx'
import type { HTMLAttributes } from 'react'

import './Skeleton.css'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
  circle?: boolean
}

/**
 * Placeholder de carregamento. Deve aproximar as dimensões do conteúdo
 * final para evitar layout shift.
 */
export function Skeleton({ width, height, circle, className, style, ...rest }: SkeletonProps) {
  return (
    <div
      className={clsx('skeleton', circle && 'skeleton--circle', className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      aria-hidden
      {...rest}
    />
  )
}
