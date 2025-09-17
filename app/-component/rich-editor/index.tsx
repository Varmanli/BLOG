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
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl outline-none bg-gray-50 dark:bg-[#1e1e22] p-6 rounded-2xl text-gray-900 dark:text-gray-100 w-full max-w-5xl shadow-md transition-all",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  const handleImageSelect = (image: string) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: image, alt: "تصویر انتخاب‌شده" })
      .run();
  };

  return (
    <>
      <div className="flex flex-col h-screen space-y-6">
        {/* Toolbar */}
        <div className="fixed top-0 left-1/3 transform -translate-x-1/2 z-50 bg-white dark:bg-[#2a2a34] border-b border-gray-200 dark:border-gray-700 rounded-b-2xl shadow-lg w-fit max-w-5xl px-4 py-2 flex justify-between items-center transition-all">
          <Tools
            editor={editor}
            onImageSelection={() => setShowImageGallery(true)}
          />
        </div>

        {/* Editor */}
        <div className="flex-1 mt-20">
          <EditorContent
            editor={editor}
            className="min-h-[600px] w-full max-w-5xl mx-auto bg-white dark:bg-[#1f1f25] prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl outline-none p-6 rounded-2xl shadow-lg transition-all"
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
