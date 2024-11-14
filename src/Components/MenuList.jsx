import { NavContainer, NavContent } from '../Components'
import { HamburgerButton } from './Buttons'
import traduction from '../Data/traduction.json'
import { ThemeContext, LanguageContext } from '../Contexts'
import { useContext, useState, useRef, useEffect } from 'react'
import { faCircleHalfStroke, faHouse } from '@fortawesome/free-solid-svg-icons'

export default function MenuList() {
  const { Theme, setTheme } = useContext(ThemeContext)
  const { selectedLanguage } = useContext(LanguageContext)
  const [isSelectorVisible, setIsSelectorVisible] = useState(false)
  const menuRef = useRef(null)

  function handleClose() {
    setIsSelectorVisible(false)
  }

  function handleToggleTheme() {
    const newTheme = Theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    handleClose()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsSelectorVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative block sm:hidden" ref={menuRef}>
      <HamburgerButton onClick={() => setIsSelectorVisible((prev) => !prev)} />

      {isSelectorVisible && (
        <NavContainer>
          <NavContent
            icon={faCircleHalfStroke}
            data={traduction[selectedLanguage]['Thème']}
            onClick={handleToggleTheme}
          />
          <NavContent
            icon={faHouse}
            data={traduction[selectedLanguage]['Accueil']}
            link="/"
            onClick={handleClose}
          />
        </NavContainer>
      )}
    </div>
  )
}