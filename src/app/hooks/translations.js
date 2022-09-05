import LocalizedStrings from 'react-localization'
import localization from '../localization'

const { REACT_APP_LANGUAGE: lang } = process.env

export default function useTranslation() {
    let translation = new LocalizedStrings(localization)
    const language = lang
    translation.setLanguage(language)
    return translation
}
