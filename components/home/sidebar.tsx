import React, { Fragment, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '../ui-lib/button'
import styles from './home.module.scss'
import SettingsIcon from '@/assets/icons/settings.svg'
import ChatGptIcon from '@/assets/icons/chatgpt.svg'
import DragIcon from '@/assets/icons/drag.svg'
import { Path } from '@/utils/constants'
import { isIOS, useMobileScreen } from '@/utils/utils'

export function useHotKey() {
  const chatStore = { nextSession(_: number) {
  } }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey) {
        if (e.key === 'ArrowUp') {
          chatStore.nextSession(-1)
        }
        else if (e.key === 'ArrowDown') {
          chatStore.nextSession(1)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })
}

export function useDragSideBar() {
  const startX = useRef(0)

  const toggleSideBar = () => {

  }

  const onDragStart = (e: MouseEvent) => {
    startX.current = e.clientX
    const dragStartTime = Date.now()

    const handleDragMove = () => {

    }

    const handleDragEnd = () => {
      // In useRef the data is non-responsive, so `config.sidebarWidth` can't get the dynamic sidebarWidth
      window.removeEventListener('pointermove', handleDragMove)
      window.removeEventListener('pointerup', handleDragEnd)

      // if user click the drag icon, should toggle the sidebar
      const shouldFireClick = Date.now() - dragStartTime < 300
      if (shouldFireClick) {
        toggleSideBar()
      }
    }

    window.addEventListener('pointermove', handleDragMove)
    window.addEventListener('pointerup', handleDragEnd)
  }

  return {
    onDragStart,
  }
}
export function SideBarContainer(props: {
  children: React.ReactNode
  onDragStart: (e: MouseEvent) => void
  shouldNarrow: boolean
  className?: string
}) {
  const isMobileScreen = useMobileScreen()
  const isIOSMobile = useMemo(
    () => isIOS() && isMobileScreen,
    [isMobileScreen],
  )
  const { children, className, onDragStart, shouldNarrow } = props
  return (
    <div
      className={`${styles.sidebar} ${className} ${
        shouldNarrow && styles['narrow-sidebar']
      }`}
      style={{
        // #3016 disable transition on ios mobile screen
        transition: isMobileScreen && isIOSMobile ? 'none' : undefined,
      }}
    >
      {children}
      <div
        className={styles['sidebar-drag']}
        onPointerDown={e => onDragStart(e as any)}
      >
        <DragIcon />
      </div>
    </div>
  )
}

export function SideBarHeader(props: {
  title?: string | React.ReactNode
  subTitle?: string | React.ReactNode
  logo?: React.ReactNode
  children?: React.ReactNode
}) {
  const { title, subTitle, logo, children } = props
  return (
    <Fragment>
      <div className={styles['sidebar-header']} data-tauri-drag-region>
        <div className={styles['sidebar-title']} data-tauri-drag-region>
          {title}
        </div>
        <div className={styles['sidebar-sub-title']}>{subTitle}</div>
        <div className={`${styles['sidebar-logo']} no-dark`}>{logo}</div>
      </div>
      {children}
    </Fragment>
  )
}

export function SideBarBody(props: {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) {
  const { onClick, children } = props
  return (
    <div className={styles['sidebar-body']} onClick={onClick}>
      {children}
    </div>
  )
}

export function SideBarTail(props: {
  primaryAction?: React.ReactNode
  secondaryAction?: React.ReactNode
}) {
  const { primaryAction, secondaryAction } = props

  return (
    <div className={styles['sidebar-tail']}>
      <div className={styles['sidebar-actions']}>{primaryAction}</div>
      <div className={styles['sidebar-actions']}>{secondaryAction}</div>
    </div>
  )
}

export function SideBar(props: { className?: string }) {
  useHotKey()
  const { onDragStart } = useDragSideBar()

  return (
    <SideBarContainer
      onDragStart={onDragStart}
      shouldNarrow={false}
      {...props}
    >
      <SideBarHeader
        title="NextChat"
        subTitle="Build your own AI assistant."
        logo={<ChatGptIcon />}
      >
        SideHeader
      </SideBarHeader>
      <SideBarBody>
        SideBody
      </SideBarBody>
      <SideBarTail
        primaryAction={(
          <>
            <div className={styles['sidebar-action']}>
              <Link to={Path.Settings}>
                <IconButton icon={<SettingsIcon />} shadow />
              </Link>
            </div>
          </>
        )}
      />
    </SideBarContainer>
  )
}
