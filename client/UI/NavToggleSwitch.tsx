import { useEffect, useState } from 'react'

type NavToggleSwitchProps = {
  isShopperView: boolean
  handleIsShopperView: (checked: boolean) => void
  scale?: number
  goTo: (link: string) => void
  adminNavigateTo: string
  shopperNavigateTo: string
}

const NavToggleSwitch = ({
  isShopperView,
  handleIsShopperView,
  scale = 1,
  goTo,
  adminNavigateTo,
  shopperNavigateTo,
}: NavToggleSwitchProps) => {
  const [enableTransition, setEnableTransition] = useState(false)
  const [isShopperHovered, setIsShopperHovered] = useState(isShopperView)
  const [isAdminHovered, setIsAdminHovered] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setEnableTransition(true)
    }, 50)

    return () => clearTimeout(timeoutId)
  }, [])

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
  }

  const labelStyles = {
    fontSize: `${18}px`,
    lineHeight: `${20}px`,
    textAlign: 'center' as const,
    userSelect: 'none' as const,
    margin: `0 ${8 * scale}px`,
    transition: 'color 0.3s ease',
  }

  const switchStyles = {
    width: `${38 * scale}px`,
    height: `${21 * scale}px`,
    backgroundColor: isShopperView ? '#5754ff' : '#ffa835',
    border: `${1 * scale}px solid white`,
    borderRadius: `${5 * scale}px`,
    position: 'relative' as const,
    cursor: 'pointer',
    transition: enableTransition
      ? 'background .3s, border-color .3s, box-shadow .2s'
      : 'none',
    display: 'flex',
    alignItems: 'center',
  }

  const afterStyles = {
    content: "''",
    display: 'block',
    position: 'absolute' as const,
    left: `${2 * scale}px`,
    width: `${15 * scale}px`,
    height: `${15 * scale}px`,
    borderRadius: '25%',
    backgroundColor: '#fff',
    transform: isShopperView ? 'translateX(0)' : `translateX(${17 * scale}px)`,
    transition: enableTransition ? 'transform .3s ease' : 'none',
  }
  console.log('isShopperView', isShopperView)
  console.log('isShopperHovered', isShopperHovered)
  return (
    <div style={containerStyles}>
      {/* Shopper View label */}
      <span
        style={{
          ...labelStyles,
          width: '120px',
          color: isShopperHovered || isShopperView ? 'white' : '#b0b0b0',
          cursor: !isShopperView ? 'pointer' : '',
        }}
        className={`flex justify-end`}
        onClick={() => {
          handleIsShopperView(true)
          goTo(shopperNavigateTo)
        }}
        onMouseEnter={() => !isShopperView && setIsShopperHovered(true)}
        onMouseLeave={() => setIsShopperHovered(false)}
      >
        Shopper View
      </span>

      {/* Toggle Switch */}
      <input
        type="checkbox"
        checked={isShopperView}
        onChange={() => handleIsShopperView(!isShopperView)}
        style={{ display: 'none' }}
      />
      <div
        style={switchStyles}
        onClick={() => {
          handleIsShopperView(!isShopperView)
          if (!isShopperView) {
            goTo(shopperNavigateTo)
          } else {
            goTo(adminNavigateTo)
          }
        }}
      >
        <div style={afterStyles}></div>
      </div>

      {/* Admin View label */}
      <span
        style={{
          ...labelStyles,
          width: '100px',
          color: isAdminHovered || !isShopperView ? 'white' : '#b0b0b0',
          cursor: isShopperView ? 'pointer' : '',
        }}
        className={`flex justify-start`}
        onClick={() => {
          handleIsShopperView(false)
          goTo(adminNavigateTo)
        }}
        onMouseEnter={() => setIsAdminHovered(true)}
        onMouseLeave={() => setIsAdminHovered(false)}
      >
        Admin View
      </span>
    </div>
  )
}

export default NavToggleSwitch
