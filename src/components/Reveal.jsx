import { useInView } from '../hooks/useInView'

/**
 * Apparition au scroll (fade + translateY 30 px).
 * `delay` en ms permet de décaler les éléments d'une même rangée.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
