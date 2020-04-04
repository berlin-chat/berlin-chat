import { useEffect, useState } from 'react'

export function useMobile() {
    const smallWidth = 400
    const [isMobile, setIsMobile] = useState(400 > window.innerWidth)

    useEffect(() => {
        function handleResize() {
        setIsMobile(smallWidth > window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

  return isMobile
}
