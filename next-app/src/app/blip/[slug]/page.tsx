// app/tile/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Types for the tile data
interface TileData {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  // Add other tile properties as needed
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `Tile - ${params.slug}`,
    // Add other metadata as needed
  };
}

// Function to fetch tile data
async function getTileData(slug: string): Promise<TileData | null> {
  // Replace this with your actual data fetching logic
  // This is just an example implementation
  try {
    // const response = await fetch(`/api/tiles/${slug}`);
    // return response.json();

    // Dummy data for example
    return {
      id: slug,
      title: `Tile ${slug}`,
      description: `This is the description for tile ${slug}`,
      imageUrl: `/api/placeholder/400/300`,
    };
  } catch (error) {
    console.error("Error fetching tile data:", error);
    return null;
  }
}

export default async function TilePage({
  params,
}: {
  params: { slug: string };
}) {
  const tileData = await getTileData(params.slug);

  if (!tileData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {tileData.imageUrl && (
            <div className="relative h-48 bg-gray-700">
              <img
                src={tileData.imageUrl}
                alt={tileData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{tileData.title}</h1>
            <p className="text-gray-300">{tileData.description}</p>

            {/* Add your tile-specific content here */}
            <div className="mt-6 space-y-4">
              {/* Example interactive elements */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Interact with Tile
              </button>

              <div className="flex justify-between text-sm text-gray-400">
                <span>ID: {tileData.id}</span>
                <span>More details...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Optional: Add loading state
export function loading() {
  return <div>Loading tile...</div>;
}

// Optional: Add error handling
export function error({ error }: { error: Error }) {
  return <div>Error: {error.message}</div>;
}
