"use client";

import { FC, useState } from "react";
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
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  const handleImageSelect = (image: string) => {
    editor
      ?.chain()
      .focus()
      .setImage({ src: image, alt: "this is an image" })
      .run();
  };

  return (
    <>
      <div className="flex flex-col space-y-6 h-screen">
        {/* Toolbar */}
        <div className="sticky top-0 bg-white z-50 border-b">
          <Tools
            editor={editor}
            onImageSelection={() => setShowImageGallery(true)}
          />
        </div>

        {/* Editor */}
        <div className="flex-1">
          <EditorContent editor={editor} className="h-full" />
        </div>

        {/* Debug / Save button */}
        <div className="p-4 text-right">
          <button
            onClick={() => console.log(editor?.getHTML())}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Create New Post
          </button>
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
