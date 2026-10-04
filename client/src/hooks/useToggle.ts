import { useState } from 'react'

export function useToggle(initial = false) {
  const [state, setState] = useState(initial)

  const toggle = () => setState((prev) => !prev)
  const set = (value: boolean) => setState(value)

  return { state, toggle, set }
}
