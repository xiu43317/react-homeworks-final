import { EditorState,convertToRaw,ContentState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function ArticleEditor({setContent,isOpen,initialContent}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const htmlToPlainText = (html)=>html.replace(/<[^>]*>/g, '');

  useEffect(()=>{
    const content = convertToRaw(editorState.getCurrentContent()).blocks[0].text
    setContent(content)
  },[editorState])
  
  useEffect(()=>{
    const content = htmlToPlainText(initialContent)
    setEditorState(EditorState.createWithContent(ContentState.createFromText(content)))
  },[initialContent])
  return (
    <div style={{ border: "1px, solid, black", height: "300px" }}>
      <Editor
        toolbar={{
          options: ['inline','textAlign', 
                    'history', 'colorPicker'],                                
          inline: {
            options: ['italic','bold'],
            bold: { className: 'demo-option-custom' },
            italic: { className: 'demo-option-custom' },
            underline: { className: 'demo-option-custom' },
            strikethrough: {className: 'demo-option-custom' },
            monospace: { className: 'demo-option-custom' },
            superscript: {className: 'demo-option-custom'},
            subscript: { className: 'demo-option-custom' }
          },
          blockType: {className: 'demo-option-custom-wide',
          dropdownClassName: 'demo-dropdown-custom'},
          fontSize: { className: 'demo-option-custom-medium' }
        }}
        initialEditorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={(val)=>setEditorState(val)}
        editorState={editorState}
      />
    </div>
  );
}

export default ArticleEditor;
