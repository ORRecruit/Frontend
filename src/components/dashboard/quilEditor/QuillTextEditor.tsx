import dynamic from 'next/dynamic';
import React, { FC, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface QuillTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const QuillTextEditor: FC<QuillTextEditorProps> = ({ value, onChange, placeholder }) => {
  const quillModules = useMemo(() => ({
    toolbar: true
  }), []);

  const quillFormats = useMemo(() => [
    'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link'
  ], []);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={quillModules}
      formats={quillFormats}
      placeholder={placeholder || "Type here..."}
    />
  );
};

export default QuillTextEditor;
