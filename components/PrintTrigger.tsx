'use client'

import { useEffect, useRef } from 'react'

export default function PrintTrigger() {
  const hasPrinted = useRef(false)

  useEffect(() => {
    if (!hasPrinted.current) {
      window.print()
      hasPrinted.current = true
    }
  }, [])

  return null
}
