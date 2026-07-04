import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MoonStar, SunMedium, Globe2, ArrowUpRight, Download, Mail, Sparkles, BookOpen, Code2 } from 'lucide-react'
import { SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiGithub, SiReactquery, SiReactrouter } from 'react-icons/si'
import { SectionReveal } from './components/SectionReveal'
import { ContactForm } from './components/ContactForm'
import './App.css'

type SkillItem = {
  name: string
  icon: React.ElementType
  accent: string
}

const skillItems: SkillItem[] = [
  { name: 'skills.items.html', icon: SiHtml5, accent: 'from-amber-500/35 to-orange-500/10' },
  { name: 'skills.items.css', icon: SiCss, accent: 'from-sky-500/35 to-blue-500/10' },
  { name: 'skills.items.javascript', icon: SiJavascript, accent: 'from-yellow-500/35 to-amber-500/10' },
  { name: 'skills.items.typescript', icon: SiTypescript, accent: 'from-sky-600/35 to-indigo-500/10' },
  { name: 'skills.items.react', icon: SiReact, accent: 'from-cyan-400/35 to-teal-500/10' },
  { name: 'skills.items.next', icon: SiNextdotjs, accent: 'from-zinc-200/25 to-zinc-500/10' },
  { name: 'skills.items.github', icon: SiGithub, accent: 'from-violet-400/30 to-fuchsia-500/10' },
  { name: 'skills.items.reactQuery', icon: SiReactquery, accent: 'from-emerald-400/30 to-lime-500/10' },
  { name: 'skills.items.reactRouter', icon: SiReactrouter, accent: 'from-rose-400/30 to-orange-500/10' },
]

const navItems = ['home', 'about', 'skills', 'projects', 'contact'] as const

function App() {
  const { t, i18n } = useTranslation()
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = window.localStorage.getItem('portfolio-theme')
    return (saved as 'dark' | 'light') || 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const changeLanguage = (language: string) => {
    void i18n.changeLanguage(language)
    window.localStorage.setItem('portfolio-language', language)
  }

  return (
    <div className="relative overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(110,106,222,0.18),_transparent_26%),radial-gradient(circle_at_80%_0%,_rgba(104,166,200,0.16),_transparent_24%)] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob blob-one" />
        <div className="blob blob-two" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium tracking-[0.24em] text-zinc-200 uppercase">
            <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-zinc-100 shadow-[0_10px_30px_rgba(255,255,255,0.08)]">
              <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
            <span className="hidden xs:inline text-xs sm:text-sm">Maxmud Orifov</span>
          </a>

          <nav className="hidden items-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-400 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item} href={`#${item}`} className="transition hover:text-zinc-100 whitespace-nowrap">
                {t(`nav.${item}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center rounded-full border border-white/10 bg-white/10 p-0.5 sm:p-1 text-xs sm:text-sm text-zinc-200 backdrop-blur-xl">
              {(['en', 'ru', 'uz'] as const).map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => changeLanguage(language)}
                  className={`rounded-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs transition ${i18n.language === language ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-zinc-100'}`}
                  aria-label={`Switch language to ${language.toUpperCase()}`}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-zinc-200 transition hover:scale-105"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunMedium className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <MoonStar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </button>
          </div>
        </div>
      </header>

      <main id="home" className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <SectionReveal className="rounded-xl sm:rounded-2xl lg:rounded-[32px] border border-white/10 bg-white/10 p-4 sm:p-6 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/15 px-3 py-1.5 text-xs sm:text-sm text-violet-100">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                {t('hero.eyebrow')}
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h1 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-[-0.04em] text-zinc-50">
                  {t('hero.name')}
                </h1>
                <p className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-300">
                  {t('hero.title')}
                </p>
                <p className="max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-zinc-400">
                  {t('hero.description')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  href="/Maxmud-Orifov-Resume.pdf"
                  download
                  className="inline-flex items-center justify-center sm:justify-start gap-2 rounded-full border border-white/15 bg-white/10 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-zinc-100 transition hover:border-violet-400/40 w-full sm:w-auto"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  {t('hero.resume')}
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  href="#contact"
                  className="inline-flex items-center justify-center sm:justify-start gap-2 rounded-full border border-violet-400/30 bg-violet-500/20 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-violet-100 transition hover:border-violet-400/50 w-full sm:w-auto"
                >
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                  {t('hero.contact')}
                </motion.a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl sm:rounded-2xl lg:rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-zinc-500">Now</p>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-emerald-200">Available for work</span>
              </div>
              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-xs sm:text-sm text-zinc-300">
                <div className="rounded-lg sm:rounded-2xl border border-white/10 bg-violet-500/10 p-3 sm:p-4">
                  <p className="text-zinc-400 text-xs">Focus</p>
                  <p className="mt-1 text-sm sm:text-base text-zinc-100">React, TypeScript, clean UI systems.</p>
                </div>
                <div className="rounded-lg sm:rounded-2xl border border-white/10 bg-indigo-500/10 p-3 sm:p-4">
                  <p className="text-zinc-400 text-xs">Current stack</p>
                  <p className="mt-1 text-sm sm:text-base text-zinc-100">Vite, Tailwind, Framer Motion, i18n</p>
                </div>
              </div>
            </motion.div>
          </div>
        </SectionReveal>

        <SectionReveal id="about" className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-xl sm:rounded-2xl lg:rounded-[28px] border border-white/10 bg-white/10 p-4 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-zinc-500">{t('about.title')}</p>
            <h2 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-50">{t('about.title')}</h2>
            <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-8 text-zinc-400">{t('about.description')}</p>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="rounded-xl sm:rounded-2xl lg:rounded-[28px] border border-white/10 bg-white/10 p-4 sm:p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-2 sm:gap-3 text-zinc-100">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <h3 className="text-base sm:text-lg font-medium">{t('about.educationTitle')}</h3>
              </div>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 sm:leading-7 text-zinc-400">{t('about.educationText')}</p>
            </div>
            <div className="rounded-xl sm:rounded-2xl lg:rounded-[28px] border border-white/10 bg-white/10 p-4 sm:p-6 backdrop-blur-2xl">
              <div className="flex items-center gap-2 sm:gap-3 text-zinc-100">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <h3 className="text-base sm:text-lg font-medium">{t('about.focusTitle')}</h3>
              </div>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 sm:leading-7 text-zinc-400">{t('about.focusText')}</p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="skills" className="rounded-xl sm:rounded-2xl lg:rounded-[32px] border border-white/10 bg-white/10 p-4 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
          <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-zinc-500">{t('skills.title')}</p>
              <h2 className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-50">{t('skills.title')}</h2>
            </div>
            <p className="max-w-xl text-xs sm:text-sm leading-6 sm:leading-7 text-zinc-400">{t('skills.description')}</p>
          </div>
          <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
            {skillItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.article
                  key={item.name}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-lg sm:rounded-2xl lg:rounded-[24px] border border-white/10 bg-zinc-900/70 p-3 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
                >
                  <div className={`inline-flex rounded-lg sm:rounded-2xl bg-gradient-to-br ${item.accent} p-2 sm:p-3`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-100" />
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-medium text-zinc-100">{t(item.name)}</h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500">{index < 6 ? 'Core tool' : 'Supporting tool'}</p>
                </motion.article>
              )
            })}
          </div>
        </SectionReveal>

        <SectionReveal id="projects" className="grid gap-4 sm:gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-xl sm:rounded-2xl lg:rounded-[28px] border border-white/10 bg-white/10 p-4 sm:p-6 lg:p-8 backdrop-blur-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-zinc-500">{t('projects.title')}</p>
            <h2 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-50">{t('projects.title')}</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-6 sm:leading-8 text-zinc-400">{t('projects.description')}</p>
          </div>
          <div className="grid gap-3 sm:gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-xl sm:rounded-2xl lg:rounded-[28px] border border-white/10 bg-white/10 p-4 sm:p-6 backdrop-blur-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-medium text-zinc-100">{t('projects.comingSoon')}</h3>
                  <a href="#contact" className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 transition hover:text-zinc-100 whitespace-nowrap">
                    {t('hero.contact')} <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                </div>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-6 text-zinc-500">I will replace these placeholders with real work soon.</p>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal id="contact" className="grid gap-4 sm:gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl sm:rounded-2xl lg:rounded-[28px] border border-white/10 bg-white/10 p-4 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-zinc-500">{t('contact.title')}</p>
            <h2 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-50">{t('contact.title')}</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-6 sm:leading-8 text-zinc-400">{t('contact.description')}</p>

            <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
              <a href="mailto:maxmudorifov36@gmail.com" className="flex items-center gap-3 rounded-lg sm:rounded-2xl border border-white/10 bg-white/5 p-3 text-xs sm:text-sm text-zinc-300 transition hover:bg-white/10">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-300 flex-shrink-0" />
                <span className="truncate">maxmudorifov36@gmail.com</span>
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg sm:rounded-2xl border border-white/10 bg-white/5 p-3 text-xs sm:text-sm text-zinc-300 transition hover:bg-white/10">
                <SiGithub className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-300 flex-shrink-0" />
                <span className="truncate">{t('contact.github')}</span>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg sm:rounded-2xl border border-white/10 bg-white/5 p-3 text-xs sm:text-sm text-zinc-300 transition hover:bg-white/10">
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-300 flex-shrink-0" />
                <span className="truncate">{t('contact.linkedin')}</span>
              </a>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl lg:rounded-[28px] border border-white/10 bg-white/10 p-4 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl">
            <ContactForm />
          </div>
        </SectionReveal>
      </main>

      <footer className="border-t border-white/10 bg-zinc-950/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:gap-3 px-3 py-4 sm:py-6 text-xs sm:text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="truncate">{t('footer.crafted')}</p>
          <div className="flex items-center gap-2">
            <Globe2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>EN / RU / UZ</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
