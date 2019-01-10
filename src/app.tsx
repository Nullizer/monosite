/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Fragment, lazy, Suspense, StrictMode, memo } from 'react'
import { render } from 'react-dom'
import Clock from './Components/Clock'

const Toggle = lazy(() => import('./Components/Toggle'))

const Heading = memo((props: {name: string}) =>
  <Fragment>
    <h1>Hello, {props.name}!</h1>
    <h2>This is a lab page</h2>
  </Fragment>)

const paragraphStyle = css({
  backgroundColor: 'grey',
  boxSizing: 'initial',
})

render(
  <StrictMode>
    <Heading name='JSX' />
    <p css={paragraphStyle}>Hyperion 796</p>
    <Clock />
    <Suspense fallback={<div>Loading...</div>}>
      <Toggle />
    </Suspense>
    <div className='container'>
      <div className='item-a'>
        <p>itemA</p>
      </div>
      <div className='item-b'>
        <p>itemB</p>
      </div>
      <div className='item-c'>
        <p>itemC</p>
      </div>
      <div className='item-d'>
        <p>itemD</p>
      </div>
    </div>
    <div className='emoji-board'>
      😀 😎 🤖 👨‍👩‍👧‍👦 👦🏻 👧🏻 👨🏻 👩🏻 👦🏼 👧🏼 👨🏼 👩🏼<br />
      👦🏽 👧🏽 👨🏽 👩🏽 👦🏾 👧🏾 👨🏾 👩🏾 👦🏿 👧🏿 👨🏿 👩🏿<br />
      🐱 🐶 🐌 🌎 🍕 🍲 🍫 🍻 ⚽️ 🏀 🏈 ⚾️<br />
      🌈 🏯 🗽 🚆 📱 🎉 🗓 💸 🇫 🇴 🇳 🇹<br />
      🇺🇸 🇧🇷 🇲🇹 🇸🇪 🇳🇬 🇰🇭 🇭🇷 🇮🇩 🇳🇿 🇪🇬 🇨🇳 🇹🇼<br />
    </div>
    <p>{navigator.userAgent}</p>
  </StrictMode>,
  document.getElementById('app')
)

;(async function () {
  const resp = await fetch('https://api.github.com/users/nullizer').then(r => r.json())
  console.log(resp, 42)
  console.log('My Avatar: ' + resp.avatar_url)
})()
