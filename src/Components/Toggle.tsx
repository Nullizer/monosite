import * as React from 'react'
import { useState } from 'react'

export default function Toggle () {
  const [toggleOn, toggle] = useState(true)

  return (
    <button onClick={() => toggle(!toggleOn)}>
      {toggleOn ? 'ON' : 'OFF'}
    </button>
  )
}
