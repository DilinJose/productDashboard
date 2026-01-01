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
            className={`flex w-full items-center justify-center font-semibold text-base  rounded-xl h-14 transition
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
