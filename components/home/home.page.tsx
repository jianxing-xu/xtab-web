'use client'

import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import {
  Route,
  HashRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom'
import { ErrorBoundary } from '../error'
import { AuthPage } from '../auth/auth.page'
import { SideBar } from './sidebar'
import styles from './home.module.scss'
import LoadingIcon from '@/assets/icons/three-dots.svg'
import BotIcon from '@/assets/icons/bot.svg'
import { getISOLang } from '@/locale'
import { Path } from '@/utils/constants'

import('@/utils/polyfill')

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={`${styles['loading-content']} no-dark`}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  )
}

const Settings = dynamic(async () => (await import('../settings/settings.page')).SettingsPage, {
  loading: () => <Loading noLogo />,
})

const Chat = dynamic(async () => (await import('../chat/chat.page')).ChatPage, {
  loading: () => <Loading noLogo />,
})

export function useSwitchTheme() {
  // const config = useAppConfig()

  // useEffect(() => {
  //   document.body.classList.remove('light')
  //   document.body.classList.remove('dark')

  // if (config.theme === 'dark') {
  //   document.body.classList.add('dark')
  // }
  // else if (config.theme === 'light') {
  //   document.body.classList.add('light')
  // }

  // const metaDescriptionDark = document.querySelector(
  //   'meta[name="theme-color"][media*="dark"]',
  // )
  // const metaDescriptionLight = document.querySelector(
  //   'meta[name="theme-color"][media*="light"]',
  // )

  // if (config.theme === 'auto') {
  //   metaDescriptionDark?.setAttribute('content', '#151515')
  //   metaDescriptionLight?.setAttribute('content', '#fafafa')
  // }
  // else {
  //   const themeColor = getCSSVar('--theme-color')
  //   metaDescriptionDark?.setAttribute('content', themeColor)
  //   metaDescriptionLight?.setAttribute('content', themeColor)
  // }
  // }, [config.theme])
}

function useHtmlLang() {
  useEffect(() => {
    const lang = getISOLang()
    const htmlLang = document.documentElement.lang

    if (lang !== htmlLang) {
      document.documentElement.lang = lang
    }
  }, [])
}

function useHasHydrated() {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false)

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  return hasHydrated
}

function Screen() {
  const location = useLocation()
  const isHome = location.pathname === Path.Home
  const isAuth = location.pathname === Path.Auth

  const renderContent = () => {
    if (isAuth)
      return <AuthPage />
    return (
      <>
        <SideBar className={isHome ? styles['sidebar-show'] : ''} />
        <div className={styles['window-content']}>
          <Routes>
            <Route path={Path.Home} element={<Chat />} />
            <Route path={Path.Settings} element={<Settings />} />
          </Routes>
        </div>
      </>
    )
  }

  return (
    <div className={`${styles.container}`}>
      {renderContent()}
    </div>
  )
}

export function Home() {
  useSwitchTheme()
  useHtmlLang()

  if (!useHasHydrated()) {
    return <Loading />
  }

  return (
    <ErrorBoundary>
      <Router>
        <Screen />
      </Router>
    </ErrorBoundary>
  )
}
