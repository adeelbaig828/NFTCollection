import { useEffect } from 'react';

import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextFormatter = ({ setEmailContent, htmlText, editorState, setEditorState }) => {
  const onTextChange = (editState) => {
    setEditorState(editState);
  };

  const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  setEmailContent(text);

  useEffect(() => {
    const contentBlock = htmlToDraft(htmlText ?? '');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Editor
      editorState={editorState}
      editorClassName='editor'
      onEditorStateChange={onTextChange}
      placeholder={'Long Description'}
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'list', 'colorPicker', 'link', 'image'],
        inline: {
          options: ['bold', 'italic', 'underline', 'strikethrough'],
          className: 'richTextIcon',
        },
        list: { options: ['unordered', 'ordered'] },
        link: { options: ['link'] },
        fontFamily: {
          options: ['Proxima Nova', 'Calibri'],
        },
      }}
    />
  );
};

export default TextFormatter;
