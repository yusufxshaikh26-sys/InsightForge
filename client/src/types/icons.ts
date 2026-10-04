import { ReactNode } from 'react'

export type IconName =
  | 'dashboard'
  | 'table'
  | 'chart'
  | 'search'
  | 'box'
  | 'shield'
  | 'graduation'
  | 'globe'
  | 'file-text'
  | 'folder'
  | 'history'
  | 'settings'
  | 'home'
  | 'upload'
  | 'warn'
  | 'check'
  | 'spark'
  | 'data'
  | 'chartBar'
  | 'plus'
  | 'bell'
  | 'moon'
  | 'sun'
  | 'searchIcon'
  | 'download'
  | 'refresh'
  | 'link'
  | 'filter'
  | 'arrow'

export interface IconProps {
  className?: string
  children?: ReactNode
}
