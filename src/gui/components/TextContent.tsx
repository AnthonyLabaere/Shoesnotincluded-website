import React from 'react';
import styled from 'styled-components';

import * as Constants from '../../constants';
import * as Types from '../../types';
import * as LocaleUtils from '../../utils/localeUtils';

const getTextStyleFromRichTextPart = (textPart: Types.RichTextContentType): Types.TextStyle => {
  const textStyle: Types.TextStyle = {};
  // TODO : faire des tableaux
  if (textPart.textStyle !== undefined) {
    if (textPart.textStyle.includes('left')) {
      textStyle.textAlign = 'left';
    } else {
      textStyle.textAlign = 'center';
    }

    if (textPart.textStyle.includes('bold')) {
      textStyle.fontWeight = 'bold';
    }
    if (textPart.textStyle.includes('italic')) {
      textStyle.fontStyle = 'italic';
    }
    if (textPart.textStyle.includes('underline')) {
      textStyle.textDecoration = 'underline';
    }
    if (textPart.textStyle.includes('line-through')) {
      textStyle.textDecoration = 'line-through';
    }

    // Couleurs
    if (textPart.textStyle.includes('red')) {
      textStyle.color = Constants.THEME_RED_COLORS[0];
    } else if (textPart.textStyle.includes('turquoise')) {
      textStyle.color = Constants.THEME_TURQUOISE_COLORS[0];
    } else if (textPart.textStyle.includes('blue')) {
      textStyle.color = Constants.THEME_BLUE_COLORS[0];
    } else if (textPart.textStyle.includes('grey')) {
      textStyle.color = Constants.THEME_GREY_COLOR;
    } else if (textPart.textStyle.includes('white')) {
      textStyle.color = Constants.THEME_WHITE_COLOR;
    } else if (textPart.textStyle.includes('yellow')) {
      textStyle.color = Constants.THEME_YELLOW_COLORS[0];
    } else if (textPart.textStyle.includes('orange')) {
      textStyle.color = Constants.THEME_ORANGE_COLORS[0];
    } else if (textPart.textStyle.includes('green')) {
      textStyle.color = Constants.THEME_GREEN_COLORS[0];
    } else if (textPart.textStyle.includes('purple')) {
      textStyle.color = Constants.THEME_PURPLE_COLORS[0];
    } else if (textPart.textStyle.includes('firebrick')) {
      textStyle.color = 'firebrick';
    }
  }
  return textStyle;
};

export const getTextContentFromRichText = (
  text: Types.RichTextContentType[],
  globalTextStyle: Types.TextStyle = {},
  textStyle: undefined | Types.TextStyle,
  globalStyle: undefined | any
): JSX.Element => {
  return (
    <TextContent textStyle={globalTextStyle} style={globalStyle}>
      {text.map((textPart: Types.RichTextContentType, index: number) => {
        return (
          <TextContent
            key={index}
            textStyle={{ ...textStyle, ...getTextStyleFromRichTextPart(textPart) }}
          >
            {textPart.text}
          </TextContent>
        );
      })}
    </TextContent>
  );
};

/**
 * Construction d'un texte suivant les règles suivantes :
 * - si textFont est renseigné, ses informations sont appliquées sur le style de la police
 * - si textFontSize est renseigné, ses informations sont appliquées sur le style de la police et écrasent éventuellement celles de textFont
 *
 * A voir si ces margin et width sont à gérer différemment suivant les prochains jeux à développer
 */
const StyledTextContent = styled.span<{ key?: number | string; textStyle?: Types.TextStyle }>`
  text-align: ${({ textStyle = {} }: { textStyle?: Types.TextStyle }) =>
    textStyle.textAlign !== undefined ? textStyle.textAlign : 'center'};
  font-weight: ${({ textStyle = {} }: { textStyle?: Types.TextStyle }) =>
    textStyle.fontWeight !== undefined ? textStyle.fontWeight : 'normal'};
  font-style: ${({ textStyle = {} }: { textStyle?: Types.TextStyle }) =>
    textStyle.fontStyle !== undefined ? textStyle.fontStyle : 'normal'};
  text-decoration: ${({ textStyle = {} }: { textStyle?: Types.TextStyle }) =>
    textStyle.textDecoration !== undefined ? textStyle.textDecoration : 'none'};
  color: ${({ textStyle = {} }: { textStyle?: Types.TextStyle }) =>
    textStyle.color !== undefined ? textStyle.color : 'black'};
  background-color: ${({ textStyle = {} }: { textStyle?: Types.TextStyle }) =>
    textStyle.backgroundColor !== undefined ? textStyle.backgroundColor : 'transparent'};
  margin-bottom: ${({ textStyle = {} }: { textStyle?: Types.TextStyle }) =>
    textStyle.marginBottom !== undefined ? `${textStyle.marginBottom}px` : 0};
  width: ${({ textStyle = {} }: { textStyle?: Types.TextStyle }) =>
    textStyle.width !== undefined ? textStyle.width : 'auto'};
  ${({ textStyle = {} }) =>
    textStyle.rotate === true &&
    `
    transform: rotate(90deg);
  `};
  ${({ textStyle = {} }) =>
    textStyle.flip === true &&
    `
    transform: rotate(180deg);
  `};
  ${({ textStyle = {} }) =>
    textStyle.reversed === true &&
    `
    transform: rotateY(180deg);
  `};
`;

interface TextContentProps {
  globalTextStyle?: Types.TextStyle;
  textStyle?: Types.TextStyle;
  // FIXME children: number | string | Types.RichTextContentType[] | JSX.Element | (number | string | JSX.Element)[];
  children: any;
  globalStyle?: any;
  style?: any;
}

function TextContent({
  globalTextStyle,
  textStyle,
  children,
  globalStyle,
  style
}: TextContentProps): React.ReactElement {
  const newChildren = LocaleUtils.getObjectFromLocale(children);

  if (
    Array.isArray(newChildren) &&
    newChildren.length > 0 &&
    (newChildren[0] as Types.RichTextContentType).text !== undefined
  ) {
    // Texte enrichi
    return getTextContentFromRichText(
      newChildren as Types.RichTextContentType[],
      globalTextStyle,
      textStyle,
      globalStyle
    );
  }

  return (
    <StyledTextContent textStyle={textStyle} style={style}>
      {newChildren as React.ReactNode}
    </StyledTextContent>
  );
}

export default TextContent;
