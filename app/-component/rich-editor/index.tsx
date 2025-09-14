"use client";

import { FC, useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

import Tools from "./Tools";
import ImageGallery from "./ImageGallery";

interface Props {
  value?: string;
  onChange?: (val: string) => void;
}

const extensions = [
  StarterKit,
  Underline,
  Link.configure({
    openOnClick: false,
    autolink: false,
    linkOnPaste: true,
    HTMLAttributes: { target: "" },
  }),
  Image.configure({
    inline: false,
    HTMLAttributes: { class: "w-[80%] mx-auto" },
  }),
  TextAlign.configure({ types: ["paragraph"] }),
  Placeholder.configure({ placeholder: "Write something..." }),
];

const RichEditor: FC<Props> = ({ value = "", onChange }) => {
  const [showImageGallery, setShowImageGallery] = useState(false);

  const editor = useEditor({
    extensions,
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl outline-none bg-slate-600 p-4 rounded-md text-white w-full max-w-5xl",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  // 👇 این بخش مهمه برای sync شدن مقدار بیرونی
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const handleImageSelect = (image: string) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: image, alt: "this is an image" })
      .run();
  };

  return (
    <>
      <div className="flex flex-col space-y-6 h-screen ">
        {/* Toolbar */}
        <div className="fixed top-0 bg-accent z-50 border-b ">
          <Tools
            editor={editor}
            onImageSelection={() => setShowImageGallery(true)}
          />
        </div>

        {/* Editor */}
        <div className="flex-1">
          <EditorContent
            editor={editor}
            className="min-h-[600px] w-full max-w-5xl mx-auto bg-slate-600 prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl outline-none p-6 rounded-lg shadow"
          />
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGallery
        onSelect={handleImageSelect}
        visible={showImageGallery}
        onClose={setShowImageGallery}
      />
    </>
  );
};

export default RichEditor;
