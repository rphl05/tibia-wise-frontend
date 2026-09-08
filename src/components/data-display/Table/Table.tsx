import type { HTMLAttributes, ReactNode, TableHTMLAttributes } from 'react'

import './Table.css'

/**
 * Tabela base. Em telas pequenas, o contêiner permite scroll horizontal
 * controlado; a decisão de reduzir colunas/transformar em cards fica
 * com a feature que a utiliza.
 */
export function Table({ children, ...rest }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="table-wrapper">
      <table className="table" {...rest}>
        {children}
      </table>
    </div>
  )
}

export function Th({
  align = 'left',
  children,
  ...rest
}: { align?: 'left' | 'center' | 'right' } & HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={`table__th table__th--${align}`} {...rest}>
      {children}
    </th>
  )
}

export function Td({
  align = 'left',
  children,
  ...rest
}: { align?: 'left' | 'center' | 'right' } & HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`table__td table__td--${align}`} {...rest}>
      {children}
    </td>
  )
}

export function Tr({
  onClick,
  children,
  ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={onClick ? 'table__tr table__tr--interactive' : 'table__tr'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </tr>
  )
}
