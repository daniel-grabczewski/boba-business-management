import React from 'react'

interface Props {
  component: React.ComponentType<unknown>
}

export const ProtectedComponent = ({ component }: Props) => {
  const Component = component
  return <Component />
}

export default ProtectedComponent
