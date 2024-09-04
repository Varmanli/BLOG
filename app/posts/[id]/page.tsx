import Image from "next/image";

type ContentBlock =
  | { type: "image"; image: ImageData; children?: never }
  | { type: "paragraph"; children: TextBlock[] }
  | { type: "heading"; level: number; children: TextBlock[] };

interface TextBlock {
  type: "text";
  text: string;
}

async function page({ params }: any) {
  const result = await fetch(
    `https://strapi-blog.liara.run/api/posts/${params.id}`,
    {
      next: { revalidate: 10 },
    }
  );

  const data = await result.json();
  const post = data.data;
  console.log(params);

  const { Title, Context } = post.attributes;

  const image = Context.find(
    (item: { type: "image"; image: ImageData }) => item.type === "image"
  )?.image.url;

  return (
    <div className="p-10 flex flex-col justify-center items-center gap-10">
      <div>
        <Image
          src={image}
          alt="image"
          className="rounded-xl"
          width={750}
          height={400}
        />
      </div>
      <div className="flex flex-col justify-center  gap-10 md:mx-[100px]">
        <h1 className="text-primary text-xl font-bold">{Title}</h1>
        {Context.map((contentBlock: ContentBlock, index: number) => {
          switch (contentBlock.type) {
            case "paragraph":
              return contentBlock.children.map((child, childIndex) => (
                <p key={childIndex} className="text-base text-neutral/90">
                  {child.text}
                </p>
              ));
            case "heading":
              return (
                <h5 key={index} className="text-primary font-semibold text-lg">
                  {contentBlock.children.map((child, childIndex) => (
                    <span key={childIndex}>{child.text}</span>
                  ))}
                </h5>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

export default page;
