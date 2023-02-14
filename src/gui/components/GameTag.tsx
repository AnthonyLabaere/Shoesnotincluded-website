import React from 'react'
import styled from 'styled-components'

import * as Constants from '../../constants'
import { Theme } from '../../styles/theme'
import * as Types from '../../types'

// Libellés des tags
const SPECIFIC_TAGS_LABEL = {
  easy: 'Facile',
  medium: 'Intermédiaire',
  hard: 'Difficile',
  all: 'Tout public',
}

const Tag = styled.div<{ type: Types.GameTagType; large?: boolean }>`
  align-self: flex-start;
  padding-left: ${({ large }: { large?: boolean }) => {
    return large === true ? '15px' : '5px'
  }};
  padding-right: ${({ large }: { large?: boolean }) => {
    return large === true ? '15px' : '5px'
  }};
  padding-top: ${({ large }: { large?: boolean }) => {
    return large === true ? '0' : '1px'
  }};
  padding-bottom: ${({ large }: { large?: boolean }) => {
    return large === true ? '0' : '1px'
  }};
  margin: ${({ large }: { large?: boolean }) => {
    return large === true ? '5px' : '1px'
  }};
  border-radius: 5px;
  color: ${({ type, theme }: { type: Types.GameTagType; theme: Theme }) => {
    if (Object.keys(theme.tags).includes(type)) {
      return (theme.tags as any)[type].color
    }
    // Cas non censé se produire mais au cas où :
    return Constants.THEME_WHITE_COLOR
  }};
  background-color: ${({
    type,
    theme,
  }: {
    type: Types.GameTagType
    theme: Theme
  }) => {
    if (Object.keys(theme.tags).includes(type)) {
      return (theme.tags as any)[type].backgroundColor
    }
    // Cas non censé se produire mais au cas où :
    return Constants.THEME_BLACK_COLOR
  }};
`

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

  return (
    <Tag type={type} large={large}>
      {large === true ? (
        <div className="fs-5">{enhancedLabel as string}</div>
      ) : (
        (enhancedLabel as string)
      )}
    </Tag>
  )
}

export default GameTag
