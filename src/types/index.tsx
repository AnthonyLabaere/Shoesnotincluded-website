export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type TextAlign = 'left' | 'right' | 'center' | 'justify';

export type FontWeigth = 'normal' | 'bold';

export type FontStyle = 'normal' | 'italic';

export type TextDecoration = 'none' | 'underline' | 'line-through';

export interface TextStyle {
  textAlign?: TextAlign;
  color?: string;
  backgroundColor?: string;
  fontWeight?: FontWeigth;
  fontStyle?: FontStyle;
  textDecoration?: TextDecoration;
  marginBottom?: number;
  width?: '100%' | 'auto';
  rotate?: boolean;
  flip?: boolean;
  reversed?: boolean;
}

export type GameDifficultyType = 'easy' | 'medium' | 'hard';
export type GameAgeType = 'all';
export type GameTagType = GameDifficultyType | GameAgeType | 'estimatedTravelDistance' | 'time';

export interface Tags {
  readonly difficulty: GameDifficultyType;
  // Temps en secondes
  readonly time: number;
  readonly estimatedTravelDistance?: string;
  readonly age: GameAgeType;
}

export interface Tag {
  color: string;
  backgroundColor: string;
}

export type RichTextContentType = {
  text: string;
  textStyle?: string;
}

export type TextContentType = string | RichTextContentType[];

export interface CityDocument {
  id: string,
  active: boolean,
  debug: boolean,
  name: string,
  imageUrl: string,
  coordinates: {
    latitude: number,
    longitude: number
  }
  hasSecretScenarii: boolean,
  ordre: number;
}

export interface ScenarioSnapshot {
  id: string;
  data: ScenarioDocument;
}

export interface ScenarioDocument {
  readonly active: boolean;
  readonly secret: boolean;
  readonly city?: string;
  readonly maxPlayers?: number;
  readonly title: string;
  readonly ordre: number;
  readonly description: TextContentType;
  readonly tags: Tags;
  readonly region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  readonly startCoordinates: Coordinates;
  /** Polygone définissant la zone du jeu */
  readonly zone: Coordinates[];
  readonly logoUrl: string;
  readonly stepsIds: string[];
  // Temps en minutes
  readonly time: number;
  // Considéré faux par défaut
  readonly isPlayableByNight?: boolean;
  // Musique d'ambiance personnalisée au scénario
  readonly ambianceUrl?: string;
  // Message de fin du jeu
  readonly gameOverMessage: string;
}