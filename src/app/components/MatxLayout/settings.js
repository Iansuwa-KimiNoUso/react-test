import layout1Settings from './Layout1/Layout1Settings'
import { themes } from '../MatxTheme/initThemes'

export const MatxLayoutSettings = {
    activeLayout: 'layout1',
    activeTheme: 'blue',
    perfectScrollbar: false,

    themes: themes,
    layout1Settings,

    secondarySidebar: {
        show: true,
        open: false,
        theme: 'slateDark1',
    },

    footer: {
        show: true,
        fixed: false,
        theme: 'slateDark1',
    },
}
