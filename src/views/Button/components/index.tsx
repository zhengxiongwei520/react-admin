import React from "react"
import classNames from "classnames";
import '../style/index.scss'
import LoadingIcon from './LoadingIcon'

interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  icon?: React.ReactNode
  loading?: boolean
  ghost?: boolean
  danger?: boolean
  disabled?: boolean
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
}


// type ButtonTypes = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text'
const ButtonTypes = ['default', 'primary', 'ghost', 'dashed', 'link', 'text'] as const
export type ButtonType = typeof ButtonTypes[number]
const ButtonSizes = ['lg', 'md', 'sm'] as const
export type ButtonSize = typeof ButtonSizes[number]

const BearerButton: React.FC<ButtonProps> = function (props) {
  const {
    type = 'default',
    size = 'md',
    loading = false,
    icon,
    ghost = false,
    danger = false,
    disabled = false,
  } = props

  const [innerLoading, setInnerLoading] = React.useState<boolean>(loading)
  React.useMemo(() => {
    setInnerLoading(loading)
    console.log('loading 变化了')
  }, [loading])

  const iconNode = !icon && loading
    ?
    <LoadingIcon></LoadingIcon>
    :
    icon

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props
    if (innerLoading) {
      return e.preventDefault
    }
    return onClick ? onClick(e) : null
  }

  const classes = classNames(
    'b-btn',
    `b-btn-${type}`,
    `b-btn-${size}`,
    ghost ? 'b-btn-background-ghost' : '',
    innerLoading ? 'b-btn-loading' : '',
    danger ? 'b-btn-dangerous' : '',
    ['primary', 'default', 'dashed'].indexOf(type) !== -1 ? 'has-ami' : ''
  )

  return (
    <>
      <button
        className={classes}
        onClick={handleClick}
        disabled={disabled}
      >
        {iconNode}
        {props.children}
      </button>
    </>
  )
}

export default BearerButton