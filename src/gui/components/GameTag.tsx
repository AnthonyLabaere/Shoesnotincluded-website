import React from 'react'

import * as Types from '../../types'
import styles from './GameTag.module.scss'

// Libellés des tags
const SPECIFIC_TAGS_LABEL = {
  easy: 'Facile',
  medium: 'Intermédiaire',
  hard: 'Difficile',
  all: 'Tout public',
}

const TYPE_TO_CLASS: Record<string, string> = {
  easy: styles.tagEasy,
  medium: styles.tagMedium,
  hard: styles.tagHard,
  all: styles.tagAll,
  estimatedTravelDistance: styles.tagEstimatedTravelDistance,
  time: styles.tagTime,
}

export interface GameTagProps {
  label?: string
  type: Types.GameTagType
  large?: boolean
}

function GameTag({ label, type, large }: GameTagProps): React.ReactElement {
  let enhancedLabel: undefined | string

  if (label !== undefined) {
    if (Object.keys(SPECIFIC_TAGS_LABEL).includes(label)) {
      enhancedLabel = (SPECIFIC_TAGS_LABEL as any)[label]
    } else {
      enhancedLabel = label
    }
  } else {
    // Cas non censé se produire mais au cas où :
    return <></>
  }

  const typeClass = TYPE_TO_CLASS[type] ?? styles.tagFallback
  const sizeClass = large === true ? styles.tagLarge : ''
  const className = `${styles.tag} ${typeClass} ${sizeClass}`.trim()

  return (
    <div className={className}>
      {large === true ? (
        <div className="fs-5">{enhancedLabel as string}</div>
      ) : (
        (enhancedLabel as string)
      )}
    </div>
  )
}

export default GameTag
