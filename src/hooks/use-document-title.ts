import { useEffect } from 'react'
import { APP_NAME } from '@/constants'

/**
 * Sets document.title to "<title> | MedAdmin" and resets on unmount.
 * Pass an empty string to use just the app name.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME
    return () => { document.title = prev }
  }, [title])
}
