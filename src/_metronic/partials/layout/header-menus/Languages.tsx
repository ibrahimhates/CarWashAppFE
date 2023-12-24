/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { toAbsoluteUrl } from '../../../helpers'
import { useTranslation } from 'react-i18next'

const I18N_CONFIG_KEY = 'i18nConfig';

const initialState: Props = {
    selectedLang: 'tr',
}

type Props = {
    selectedLang: 'en' | 'tr' //'de' | 'es' | 'fr' | 'ja' | 'zh'
}

export function getConfig(): Props {
    const ls = localStorage.getItem(I18N_CONFIG_KEY)
    if (ls) {
        try {
            return JSON.parse(ls) as Props
        } catch (er) {
            console.error(er)
        }
    }
    return initialState
}

function setLanguage(lang: string) {
    localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }))
    window.location.reload()
}

const languages = [
    {
        lang: 'en',
        name: 'English',
        flag: toAbsoluteUrl('/media/flags/united-states.svg'),
    },
    {
        lang: 'tr',
        name: 'Turkish',
        flag: toAbsoluteUrl('/media/flags/turkey.svg'),
    },
]

const Languages: FC = () => {
    const { i18n } = useTranslation();
    const currentLanguage = languages.find((x) => x.lang === i18n.language)
    return (
        <div
            className='menu-item px-5'
            data-kt-menu-trigger='hover'
            data-kt-menu-placement='left-start'
            data-kt-menu-flip='bottom'
        >
            <a href='#' className='menu-link px-5'>
                <span className='menu-title position-relative'>
                    Language
                    <span className='fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0'>
                        {currentLanguage?.name}{' '}
                        <img
                            className='w-15px h-15px rounded-1 ms-2'
                            src={currentLanguage?.flag}
                            alt='metronic'
                        />
                    </span>
                </span>
            </a>

            <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                {languages.map((l) => (
                    <div
                        className='menu-item px-3'
                        key={l.lang}
                        onClick={() => {
                            setLanguage(l.lang)
                        }}
                    >
                        <a
                            href='#'
                            className={clsx('menu-link d-flex px-5', { active: l.lang === currentLanguage?.lang })}
                        >
                            <span className='symbol symbol-20px me-4'>
                                <img className='rounded-1' src={l.flag} alt='metronic' />
                            </span>
                            {l.name}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Languages }
