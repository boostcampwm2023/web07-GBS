import { ThemeFlag, themeState } from '@/states/theme'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

function useStoredTheme() {
  const [theme, setTheme] = useRecoilState(themeState)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') === `${ThemeFlag.light}` ? ThemeFlag.light : ThemeFlag.dark
    if (storedTheme === ThemeFlag.light || storedTheme === ThemeFlag.dark) {
      setTheme(storedTheme)
    }
  }, [setTheme])

  useEffect(() => {
    localStorage.setItem('theme', `${theme}`)
  }, [theme])

  return theme
}

export default useStoredTheme
