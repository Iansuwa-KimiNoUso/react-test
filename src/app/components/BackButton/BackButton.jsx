import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ArrowLeft from 'app/assets/images/icons/arrowLeft.svg'
import useTranslation from 'app/hooks/translations'
import _ from 'lodash'

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#008C44',
        backgroundColor: 'transparent',
        padding: 0,
        lineHeight: 0,
        fontSize: 12,
        textTransform: 'uppercase',
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}))(Button)

const BackButton = (props) => {
    const history = useHistory()
    const translation = useTranslation()

    return (
        <ColorButton
            id={props.id}
            onClick={() => {
                props.customPath
                    ? history.push(props.customPath)
                    : history.goBack()
            }}
            style={
                _.isEmpty(props.height)
                    ? { height: 'auto' }
                    : { height: props.height }
            }
        >
            <img src={ArrowLeft} alt="" style={{ marginRight: '4px' }} />
            {translation.breadcrumbs._back}
        </ColorButton>
    )
}

export default BackButton
