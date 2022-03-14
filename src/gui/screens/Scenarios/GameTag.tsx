import React from 'react';

import styled from 'styled-components';

import * as Constants from '../../../constants';
import * as Types from '../../../types';
import { Theme } from '../../../style/theme';

// Libellés des tags
const SPECIFIC_TAGS_LABEL = {
  easy: 'Facile',
  medium: 'Intermédiaire',
  hard: 'Difficile',
  all: 'Tout public',
};

const Tag = styled.div <{ type: Types.GameTagType }>`
  align-self: flex-start;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 1px;
  padding-bottom: 1px;
  margin-left: 1px;
  margin-right: 1px;
  margin-top: 1px;
  margin-bottom: 1px;
  border-radius: 5px;
  color: ${({ type, theme }: { type: Types.GameTagType, theme: Theme }) => {
    if (Object.keys(theme.tags).includes(type)) {
      return (theme.tags as any)[type].color;
    }
    // Cas non censé se produire mais au cas où :
    return Constants.THEME_WHITE_COLOR;
  }}; 
  background-color: ${({ type, theme }: { type: Types.GameTagType, theme: Theme }) => {
    if (Object.keys(theme.tags).includes(type)) {
      return (theme.tags as any)[type].backgroundColor;
    }
    // Cas non censé se produire mais au cas où :
    return Constants.THEME_BLACK_COLOR;
  }};
`;

export interface GameTagProps {
  label?: string;
  type: Types.GameTagType;
}

function GameTag({ label, type }: GameTagProps) {
  let enhancedLabel: undefined | string;

  if (label !== undefined) {
    if (Object.keys(SPECIFIC_TAGS_LABEL).includes(label)) {
      enhancedLabel = (SPECIFIC_TAGS_LABEL as any)[label];
    } else {
      enhancedLabel = label;
    }
  } else {
    // Cas non censé se produire mais au cas où :
    return (
      <></>
    );
  }

  return (
    <Tag type={type}>
      {enhancedLabel as string}
    </Tag>
  );
}

export default GameTag;
