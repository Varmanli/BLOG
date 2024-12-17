"use client";

import { useState, useMemo, useCallback } from "react";
import {
  createEditor,
  Transforms,
  Descendant,
  BaseEditor,
  Editor,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { Dialog } from "@headlessui/react";
import {
  FaBold,
  FaItalic,
  FaLink,
  FaImage,
  FaHeading,
  FaCode,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import { Element } from "slate";

// انواع سفارشی برای Slate
type CustomElement =
  | {
      type: "paragraph";
      align?: "left" | "center" | "right";
      children: CustomText[];
    }
  | {
      type: "link";
      url: string;
      align?: "left" | "center" | "right";
      children: CustomText[];
    }
  | {
      type: "image";
      url: string;
      align?: "left" | "center" | "right";
      children: CustomText[];
    }
  | {
      type: "heading";
      level: number;
      align?: "left" | "center" | "right";
      children: CustomText[];
    }
  | {
      type: "code";
      align?: "left" | "center" | "right";
      children: CustomText[];
    };

type CustomText = { text: string; bold?: boolean; italic?: boolean };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const BlogEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      align: "right",
      children: [{ text: "" }],
    },
  ];

  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [title, setTitle] = useState("");

  const editor = useMemo(() => withReact(createEditor()), []);

  const togglePopup = () => setIsOpen((prev) => !prev);

  const toggleMark = (format: "bold" | "italic") => {
    const marks = Editor.marks(editor);
    const isActive = marks?.[format] === true;

    if (isActive) Editor.removeMark(editor, format);
    else Editor.addMark(editor, format, true);
  };

  const addLink = () => {
    const url = prompt("لینک را وارد کنید:");
    if (!url) return;

    Transforms.wrapNodes(
      editor,
      { type: "link", url, children: [{ text: "لینک" }] },
      { split: true }
    );
  };

  const addImage = () => {
    const url = prompt("آدرس تصویر را وارد کنید:");
    if (url) {
      Transforms.insertNodes(editor, {
        type: "image",
        url,
        children: [{ text: "" }],
      });
    }
  };

  const addHeading = (level: number) => {
    Transforms.insertNodes(editor, {
      type: "heading",
      level,
      children: [{ text: `عنوان ${level}` }],
    });
  };

  const addCodeBlock = () => {
    Transforms.insertNodes(editor, {
      type: "code",
      children: [{ text: "// کد خود را وارد کنید" }],
    });
  };

  const setAlignment = (align: "left" | "center" | "right") => {
    Transforms.setNodes<CustomElement>(
      editor,
      { align },
      { match: (n) => !Editor.isEditor(n) && Element.isElement(n) }
    );
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    const { attributes, children, element } = props;
    const style = { textAlign: element.align };

    switch (element.type) {
      case "link":
        return (
          <a
            {...attributes}
            href={element.url}
            className="text-blue-500 underline"
          >
            {children}
          </a>
        );
      case "image":
        return (
          <img
            {...attributes}
            src={element.url}
            alt="تصویر"
            className="max-w-full rounded-lg my-4"
          />
        );
      case "heading":
        return (
          <h2 {...attributes} style={style} className="text-2xl font-bold my-4">
            {children}
          </h2>
        );
      case "code":
        return (
          <pre
            {...attributes}
            className="bg-gray-800 dark:bg-gray-700 text-yellow-300 p-4 rounded-lg overflow-auto font-mono"
          >
            <code>{children}</code>
          </pre>
        );
      default:
        return (
          <p {...attributes} style={style}>
            {children}
          </p>
        );
    }
  }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    let { children } = props;

    if (props.leaf.bold) children = <strong>{children}</strong>;
    if (props.leaf.italic) children = <em>{children}</em>;

    return <span {...props.attributes}>{children}</span>;
  }, []);

  return (
    <div>
      <div className="p-6 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        {/* توضیحات بخش */}
        <h1 className="text-3xl font-bold text-primary dark:text-yellow-400">
          وبلاگ جدید خود را منتشر کنید!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          ابتدا دسته‌بندی و تصویر شاخص خود را مشخص کرده و سپس محتوا را بنویسید.
        </p>

        {/* انتخاب دسته‌بندی */}
        <div>
          <label className="block mb-2 text-gray-800 dark:text-gray-200">
            دسته‌بندی وبلاگ
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg focus:outline-none"
          >
            <option value="">انتخاب دسته‌بندی</option>
            <option value="tech">فناوری</option>
            <option value="lifestyle">سبک زندگی</option>
            <option value="education">آموزشی</option>
            <option value="health">سلامتی</option>
          </select>
        </div>
        {/* انتخاب تصویر شاخص */}
        <div>
          <label className="block mb-2 text-gray-800 dark:text-gray-200">
            تصویر شاخص وبلاگ
          </label>
          <div className="flex items-center gap-4">
            <label className="w-48 h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg shadow-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition">
              <span>+ افزودن تصویر</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="پیش‌نمایش"
                className="w-48 h-48 object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
        <div className="">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            نوشتن محتوای وبلاگ
          </button>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => {}}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      >
        <div className="w-full h-full p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
          {/* هدر پاپ آپ */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary dark:text-yellow-400">
              افزودن/ویرایش وبلاگ
            </h2>
            <div className="flex gap-4">
              <button
                onClick={togglePopup}
                className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                لغو
              </button>
              <button
                onClick={() => console.log("محتوا:", value, "عنوان:", title)}
                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
              >
                ثبت
              </button>
            </div>
          </div>

          {/* عنوان وبلاگ */}
          <input
            type="text"
            placeholder="عنوان وبلاگ"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg mb-4 focus:outline-none"
          />

          {/* نوار ابزار */}
          <div className="flex gap-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4">
            <button onClick={() => toggleMark("bold")}>
              <FaBold />
            </button>
            <button onClick={() => toggleMark("italic")}>
              <FaItalic />
            </button>
            <button onClick={addLink}>
              <FaLink />
            </button>
            <button onClick={addImage}>
              <FaImage />
            </button>
            <button onClick={() => addHeading(2)}>
              <FaHeading />
            </button>
            <button onClick={addCodeBlock}>
              <FaCode />
            </button>
            <button onClick={() => setAlignment("left")}>
              <FaAlignLeft />
            </button>
            <button onClick={() => setAlignment("center")}>
              <FaAlignCenter />
            </button>
            <button onClick={() => setAlignment("right")}>
              <FaAlignRight />
            </button>
          </div>

          {/* ویرایشگر */}
          <Slate
            editor={editor}
            initialValue={initialValue}
            onChange={setValue}
          >
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="اینجا محتوای خود را بنویسید..."
              className="w-full h-[calc(100vh-200px)] p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white overflow-y-auto focus:outline-none"
            />
          </Slate>

          {/* دکمه‌های پایینی */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={togglePopup}
              className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              لغو
            </button>
            <button
              onClick={() => console.log("محتوا:", value, "عنوان:", title)}
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
            >
              ذخیره وبلاگ
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BlogEditor;
