"use client"

import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { createContext, useContext, useState, ReactNode } from 'react'

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

interface TabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: ReactNode
}

interface TabsListProps {
  className?: string
  children: ReactNode
}

interface TabsTriggerProps {
  value: string
  className?: string
  children: ReactNode
}

interface TabsContentProps {
  value: string
  className?: string
  children: ReactNode
}

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className = '',
  children,
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const value = controlledValue ?? uncontrolledValue

  const handleValueChange = (newValue: string) => {
    if (!controlledValue) {
      setUncontrolledValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className = '', children }: TabsListProps) {
  return (
    <div className={classNames('flex w-full', className)}>
      {children}
    </div>
  )
}

export function TabsTrigger({ value, className = '', children }: TabsTriggerProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const isSelected = context.value === value

  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={classNames(
        'flex-1 px-4 py-2 text-sm font-medium transition-colors',
        isSelected
          ? 'bg-zinc-800 text-white'
          : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800',
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className = '', children }: TabsContentProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  if (context.value !== value) return null

  return <div className={className}>{children}</div>
}
