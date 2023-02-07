import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loading(): React.ReactElement {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Loading
