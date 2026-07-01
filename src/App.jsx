import { ConfigProvider, theme } from 'antd'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/Header'
import Hero from './components/Hero'
import ModelShowcase from './components/ModelShowcase'
import Metrics from './components/Metrics'
import WhatIDo from './components/WhatIDo'
import NotableWork from './components/NotableWork'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Polymath from './components/Polymath'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

const antdTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#38bdf8',
    colorBgBase: '#050c17',
    colorTextBase: '#c8d8ea',
    colorBorder: '#1a3048',
    colorBorderSecondary: '#1a3048',
    borderRadius: 10,
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    colorLink: '#38bdf8',
    colorLinkHover: '#7dd3fc',
    colorBgContainer: '#0d1829',
    colorBgElevated: '#111e35',
  },
  components: {
    Card: { colorBgContainer: '#0d1829', colorBorderSecondary: '#1a3048' },
    Button: {
      colorPrimary: '#38bdf8',
      colorPrimaryHover: '#7dd3fc',
      colorPrimaryActive: '#0ea5e9',
      defaultBg: '#0d1829',
      defaultBorderColor: '#1a3048',
      defaultColor: '#c8d8ea',
      defaultHoverBg: '#111e35',
      defaultHoverBorderColor: '#38bdf8',
      defaultHoverColor: '#38bdf8',
    },
    Tag: {
      defaultBg: 'rgba(56,189,248,0.1)',
      defaultColor: '#38bdf8',
    },
    Timeline: { colorPrimary: '#38bdf8', colorText: '#c8d8ea' },
    Tooltip: { colorBgSpotlight: '#111e35', colorTextLightSolid: '#c8d8ea' },
  },
}

export default function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <ModelShowcase />
        <Metrics />
        <WhatIDo />
        <NotableWork />
        <TechStack />
        <Projects />
        <Polymath />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </ConfigProvider>
  )
}
