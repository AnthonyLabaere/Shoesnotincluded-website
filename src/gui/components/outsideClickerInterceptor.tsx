import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react'

const OutsideClickerInterceptor = ({
  enabled,
  exceptionRef,
  onIntercept,
  children,
}: {
  exceptionRef: MutableRefObject<HTMLInputElement>
  enabled: boolean
  onIntercept: () => void
  children: JSX.Element | JSX.Element[]
}): React.ReactNode => {
  const ref = useRef(null)

  const clickListener = useCallback(
    (e: MouseEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (
        enabled &&
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/strict-boolean-expressions
        !(ref.current as unknown as HTMLElement).contains(e.target as Node) &&
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        !(exceptionRef.current as unknown as HTMLElement).contains(
          e.target as Node
        )
      ) {
        onIntercept()
      }
    },
    [ref, enabled, exceptionRef, onIntercept]
  )

  useEffect(() => {
    document.addEventListener('click', clickListener)
    return () => {
      document.removeEventListener('click', clickListener)
    }
  }, [clickListener, enabled])

  return <div ref={ref}>{children}</div>
}

export default OutsideClickerInterceptor
