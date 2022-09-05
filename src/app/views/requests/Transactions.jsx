import React from 'react'
import { Typography } from '@material-ui/core'
import { SCPageHeading } from 'app/components'
// import { makeStyles } from '@material-ui/styles'
import useTranslation from 'app/hooks/translations'

// const useStyles = makeStyles(({ palette, ...theme }) => ({
//     heading: {
//         color: '#333',
//         fontSize: '40px',
//         fontWeight: 700,
//         marginBottom: 24,
//     },
//     subheading: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     subheading1: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginTop: 62,
//         marginBottom: 16,
//     },
// }))

const Finances = () => {
    // const classes = useStyles()
    const translation = useTranslation()
    return (
        <div className="m-sm-30">
            <SCPageHeading title={translation.pages.transactions.heading} />
            <Typography>
                Nulla quis lorem ut libero malesuada feugiat. Vivamus magna
                justo, lacinia eget consectetur sed, convallis at tellus. Proin
                eget tortor risus. Nulla quis lorem ut libero malesuada feugiat.
                Curabitur aliquet quam id dui posuere blandit. Mauris blandit
                aliquet elit, eget tincidunt nibh pulvinar a. Curabitur arcu
                erat, accumsan id imperdiet et, porttitor at sem. Nulla
                porttitor accumsan tincidunt. Nulla porttitor accumsan
                tincidunt. Nulla porttitor accumsan tincidunt.
            </Typography>
        </div>
    )
}

export default Finances
