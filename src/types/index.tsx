import { Timestamp } from 'firebase/firestore'

export interface Coordinates {
  latitude: number
  longitude: number
}

export type TextAlign = 'left' | 'right' | 'center' | 'justify'

export type FontWeigth = 'normal' | 'bold'

export type FontStyle = 'normal' | 'italic'

export type TextDecoration = 'none' | 'underline' | 'line-through'

export interface TextStyle {
  textAlign?: TextAlign
  color?: string
  backgroundColor?: string
  fontWeight?: FontWeigth
  fontStyle?: FontStyle
  textDecoration?: TextDecoration
  marginBottom?: number
  width?: '100%' | 'auto'
  rotate?: boolean
  flip?: boolean
  reversed?: boolean
}

export type GameDifficultyType = 'easy' | 'medium' | 'hard'
export type GameAgeType = 'all'
export type GameTagType =
  | GameDifficultyType
  | GameAgeType
  | 'estimatedTravelDistance'
  | 'time'

export interface Tags {
  readonly difficulty: GameDifficultyType
  // Temps en secondes
  readonly time: number
  readonly estimatedTravelDistance?: string
  readonly age: GameAgeType
}

export interface Tag {
  color: string
  backgroundColor: string
}

export interface RichTextContentType {
  text: string
  textStyle?: string
}

export type TextContentType = string | RichTextContentType[]

export interface CitySnapshot {
  id: string
  data: CityDocument
}

export interface CityDocument {
  id: string
  active: boolean
  debug: boolean
  name: string
  imageUrl: string
  coordinates: {
    latitude: number
    longitude: number
  }
  hasSecretScenarii: boolean
  ordre: number
}

export interface ScenarioSnapshot {
  id: string
  data: ScenarioDocument
}

export interface ScenarioDocument {
  readonly url: string
  readonly meta: {
    title: string
    description: string
  }
  readonly active: boolean
  readonly secret: boolean
  readonly city?: string
  readonly maxPlayers?: number
  readonly title: string
  readonly ordre: number
  readonly description: TextContentType
  readonly tags: Tags
  readonly region: {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }
  readonly startCoordinates: Coordinates
  /** Polygone définissant la zone du jeu */
  readonly zone: Coordinates[]
  readonly logoUrl: string
  readonly stepsIds: string[]
  // Temps en minutes
  readonly time: number
  // Considéré faux par défaut
  readonly isPlayableByNight?: boolean
  // Musique d'ambiance personnalisée au scénario
  readonly ambianceUrl?: string
  // Message de fin du jeu
  readonly gameOverMessage: string
}

export interface UserDocument {
  id: string
  displayName?: string
  // dev?: boolean;
}

export interface CheckoutSessionDocument {
  // cancel_url: string;
  // client: string;
  // created: Date;
  // mode: string;
  // price: string;
  // sessionId: string;
  // success_url:string;
  url: string
}

export interface UserVoucherCardHistoryDocument {
  voucherCardId: string
  consumedDate: Timestamp
  voucherId: string
}

export interface Payment {
  id: string
  createdDate: Date
  status: string
  amount: number
  consumed?: boolean
  voucherId?: string
}
