import { useEffect, useState } from 'react'

type ToggleSwitchProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
  scale?: number
}

const ToggleSwitch = ({
  checked,
  onChange,
  label,
  disabled = false,
  scale = 1,
}: ToggleSwitchProps) => {
  const [enableTransition, setEnableTransition] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setEnableTransition(true)
    }, 50)

    return () => clearTimeout(timeoutId)
  }, [])

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    width: `${38 * scale}px`,
    height: 'auto',
  }

  const switchStyles = {
    width: `${38 * scale}px`,
    height: `${21 * scale}px`,
    backgroundColor: checked ? '#22c55e' : '#ef4444',
    border: `${1 * scale}px solid white`,
    borderRadius: `${11 * scale}px`,
    position: 'relative' as const,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: enableTransition
      ? 'background .3s, border-color .3s, box-shadow .2s'
      : 'none',
    marginTop: `${1 * scale}px`,
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
    borderRadius: '50%',
    backgroundColor: '#fff',
    transform: checked ? `translateX(${17 * scale}px)` : 'translateX(0)',
    transition: enableTransition ? 'transform .3s ease' : 'none',
  }

  const labelStyles = {
    fontSize: `${12 * scale}px`,
    lineHeight: `${20 * scale}px`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    textAlign: 'center' as const,
    userSelect: 'none' as const,
  }

  return (
    <div style={containerStyles}>
      <label
        htmlFor="toggleSwitch"
        style={labelStyles}
        className="font-semibold text-gray-700"
      >
        {label}
      </label>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        disabled={disabled}
        style={{ display: 'none' }}
        id="toggleSwitch"
      />
      <div style={switchStyles} onClick={() => !disabled && onChange(!checked)}>
        <div style={afterStyles}></div>
      </div>
    </div>
  )
}

export default ToggleSwitch
