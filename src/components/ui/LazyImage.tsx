import { useState, type ImgHTMLAttributes } from 'react'

import './LazyImage.css'

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string
  alt: string
  placeholder?: string
  widths?: number[]
  sizes?: string
}

export function LazyImage({
  src,
  alt,
  placeholder,
  widths = [400, 800, 1200],
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const srcSet = widths
    .map((w) => `${src}?w=${w} ${w}w`)
    .join(', ')

  return (
    <div className="lazy-image">
      {placeholder && !loaded && (
        <div className="lazy-image__placeholder" role="img" aria-label="Carregando imagem">
          {placeholder}
        </div>
      )}
      <picture>
        {widths.map((w) => (
          <source
            key={w}
            media={`(max-width: ${w}px)`}
            srcSet={`${src}?w=${w}`}
            type="image/webp"
          />
        ))}
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`lazy-image__img ${loaded ? 'lazy-image__img--loaded' : ''} ${error ? 'lazy-image__img--error' : ''}`}
        />
      </picture>
      {error && <span className="lazy-image__error" role="alert">Erro ao carregar imagem</span>}
    </div>
  )
}

export default LazyImage