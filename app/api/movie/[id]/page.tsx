import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movie?id=${params.id}`
  );

  const data = await res.json();

  return {
    title: `${data.title} | AI Movie Insight`,
    description: data.plot,
    openGraph: {
      images: [data.poster],
    },
  };
}

export default function MoviePage() {
  return <div>Movie Page</div>;
}