'use client'
import React from 'react'

type ButtonWithLabelProps = {
    label: string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    className?: string
}

const ButtonWithLabel: React.FC<ButtonWithLabelProps> = ({
    label,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center font-semibold text-base text-black transition
        ${disabled
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-200'
                }
        ${className}
      `}
        >
            {label}
        </button>
    )
}

export default ButtonWithLabel
