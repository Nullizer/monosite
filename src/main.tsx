import * as React from 'react'
import { Fragment, lazy, Suspense, StrictMode, memo } from 'react'
import { render } from 'react-dom'
import Clock from './Components/Clock'

const Toggle = lazy(() => import('./Components/Toggle'))

const root = document.createElement('div')
document.body.insertBefore(root, document.body.firstElementChild)

const Heading = memo((props: {name: string}) =>
  <Fragment>
    <h1>Hello, {props.name}!</h1>
    <h2>This is a lab page</h2>
  </Fragment>)

render(
  <StrictMode>
    <Heading name='JSX' />
    <p>Hyperion 796</p>
    <Clock />
    <Suspense fallback={<div>Loading...</div>}>
      <Toggle />
    </Suspense>
    <div>
      <div>
        <p>itemA</p>
      </div>
      <div>
        <p>itemB</p>
      </div>
      <div>
        <p>itemC</p>
      </div>
      <div>
        <p>itemD</p>
      </div>
    </div>
    <div>
      😀 😎 🤖 👨‍👩‍👧‍👦 👦🏻 👧🏻 👨🏻 👩🏻 👦🏼 👧🏼 👨🏼 👩🏼<br />
      👦🏽 👧🏽 👨🏽 👩🏽 👦🏾 👧🏾 👨🏾 👩🏾 👦🏿 👧🏿 👨🏿 👩🏿<br />
      🐱 🐶 🐌 🌎 🍕 🍲 🍫 🍻 ⚽️ 🏀 🏈 ⚾️<br />
      🌈 🏯 🗽 🚆 📱 🎉 🗓 💸 🇫 🇴 🇳 🇹<br />
      🇺🇸 🇧🇷 🇲🇹 🇸🇪 🇳🇬 🇰🇭 🇭🇷 🇮🇩 🇳🇿 🇪🇬 🇨🇳 🇹🇼<br />
    </div>
    <p>{navigator.userAgent}</p>
  </StrictMode>,
  root
)

;(async function () {
  const resp = await fetch('https://api.github.com/users/nullizer').then(r => r.json())
  console.log(resp, 42)
  console.log('My Avatar: ' + resp.avatar_url)
})()
