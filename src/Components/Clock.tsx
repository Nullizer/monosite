import * as React from 'react'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

export default function Clock () {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    console.log('useEffect callback called!')
    const timer = window.setInterval(() => setDate(new Date()), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <h1>Clock Panel</h1>
      <FormattedDate date={date} />
    </div>
  )
}

interface FormattedDateProps {
  date: Date
}

function FormattedDate (props: FormattedDateProps) {
  return <h2>Now is {format(props.date, 'HH:mm:ss O')}.</h2>
}
