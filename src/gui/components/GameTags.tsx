import React from 'react';

import * as Types from '../../types';
import GameTag, { GameTagProps } from './GameTag';

interface GameTagsProps {
  tags: Types.Tags;
  large?: boolean;
}

function GameTags({ tags, large }: GameTagsProps) {
  const gameTagPropsList: GameTagProps[] = [];
  gameTagPropsList.push({
    label: tags.difficulty,
    type: tags.difficulty,
  });
  gameTagPropsList.push({
    label: tags.time + 'min',
    type: 'time',
  });
  if (tags.estimatedTravelDistance !== undefined) {
    gameTagPropsList.push({
      label: tags.estimatedTravelDistance,
      type: 'estimatedTravelDistance',
    });
  }
  gameTagPropsList.push({
    label: tags.age,
    type: tags.age,
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', padding: 10 }}>
      {
        gameTagPropsList.map(gameTagProps => {
          return (
            <GameTag key={gameTagProps.type} label={gameTagProps.label} type={gameTagProps.type} large={large} />
          );
        })
      }
    </div>
  );
}

export default GameTags;
