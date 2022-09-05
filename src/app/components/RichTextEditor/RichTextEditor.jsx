import 'react-quill/dist/quill.snow.css'
import React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    editor: {
        '& .ql-container': {
            minHeight: 250,
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
            '& p,code': {
                fontSize: 16,
            },
        },
        '& .ql-toolbar': {
            background: 'white',
            borderBottom: 'none',
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
        },
    },
}))

const RichTextEditor = ({
    content,
    placeholder,
    handleContentChange,
    props,
}) => {
    const classes = useStyles()

    return (
        <ReactQuill
            id={props.id}
            className={classes.editor}
            theme="snow"
            onChange={handleContentChange}
            value={content}
            modules={RichTextEditor.modules}
            formats={RichTextEditor.formats}
            placeholder={placeholder}
        />
    )
}

RichTextEditor.modules = {
    toolbar: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block', 'link'],

        [{ script: 'sub' }, { script: 'super' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],

        ['image', 'video'],

        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],

        ['clean'],
    ],
    clipboard: {
        matchVisual: true,
    },
}

RichTextEditor.formats = [
    'align',
    'background',
    'bold',
    'blockquote',
    'bullet',
    'color',
    'code',
    'code-block',
    'clean',
    'direction',
    'font',
    'header',
    'italic',
    'indent',
    'image',
    'list',
    'link',
    'size',
    'strike',
    'script',
    'underline',
    'video',
]

RichTextEditor.propTypes = {
    placeholder: PropTypes.string,
}

export default RichTextEditor
