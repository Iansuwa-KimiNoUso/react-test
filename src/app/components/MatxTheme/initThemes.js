import { themeColors } from './themeColors'
import { createTheme } from '@material-ui/core/styles'
import { forEach, merge } from 'lodash'
import themeOptions from './themeOptions'
import anuyartTtf from 'app/fonts/AnuyartForTrue/03Anuyart-Regular.ttf'

const anuyart = {
    fontFamily: 'Anuyart',
    fontStyle: 'normal',
    fontWeight: 400,
    src: `url(${anuyartTtf})`
}

function createMatxThemes() {
    let themes = {}

    forEach(themeColors, (value, key) => {
        themes[key] = createTheme(merge({
            typography: {
                fontFamily: '"Anuyart", "Noto Serif Thai", "Roboto", "Helvetica", "Arial", "sans-serif"',
            },
            overrides: {
                MuiCssBaseline: {
                    '@global': {
                    '@font-face': [anuyart],
                    },
                },
            },
        }, themeOptions, value))
    })
    return themes
}
export const themes = createMatxThemes()