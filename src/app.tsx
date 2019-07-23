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
    <form action='./demo' method='post'>
      <p>
        <label htmlFor='oneline'>Fill（填空）:</label>
        <input id='oneline' type='text' placeholder='fill this' />
      </p>
      <p>
        <input type='checkbox' name='ck0' id='ck0_0' />Check here
        <select>
          <optgroup label='Group 1'>
            <option>Option 1.1</option>
          </optgroup>
          <optgroup label='Group 2'>
            <option>Option 2.1</option>
            <option>Option 2.2</option>
          </optgroup>
          <optgroup label='Group 3' disabled>
            <option>Option 3.1</option>
            <option>Option 3.2</option>
            <option>Option 3.3</option>
          </optgroup>
        </select>
      </p>
      <textarea name='ta' placeholder='A textarea'></textarea>
      <button type='reset'>Reset（重置）</button>
    </form>
    <p>{navigator.userAgent}</p>
  </StrictMode>,
  document.getElementById('app')
)

;(async function () {
  const resp = await fetch('https://api.github.com/users/nullizer').then(r => r.json())
  console.log(resp, 42)
  console.log('My Avatar: ' + resp.avatar_url)
})()
