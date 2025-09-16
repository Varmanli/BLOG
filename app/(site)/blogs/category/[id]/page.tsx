import BlogSection from "@/app/-component/BlogSection";

interface Props {
  params: { id: string };
}

// گرفتن اسم دسته از API
async function getCategoryName(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.name || null;
}

export default async function CategoryPage({ params }: Props) {
  const catName = await getCategoryName(params.id);

  return (
    <BlogSection
      hideTabs={true}
      initialCategoryId={params.id}
      categoryName={catName || "دسته‌بندی"}
    />
  );
}
