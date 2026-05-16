import React from 'react'

interface MarginerProps {
  direction?: 'horizontal' | 'vertical'
  margin: number | string
}

const Marginer = ({
  direction = 'horizontal',
  margin,
}: MarginerProps): React.ReactElement => {
  const value = typeof margin === 'string' ? margin : `${margin}px`
  const style: React.CSSProperties =
    direction === 'horizontal'
      ? { display: 'flex', width: value }
      : { display: 'flex', height: value }
  return <span style={style} />
}

export default Marginer
