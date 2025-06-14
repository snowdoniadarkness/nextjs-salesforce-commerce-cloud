import { GridTileImage } from "components/grid/tile";
import { getCollectionProducts } from "lib/sfcc";
import { Product } from "lib/sfcc/types";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage?.url}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title as string,
            amountMin: item.priceRange.minVariantPrice.amount,
            amountMax: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  try {
    // Collections that start with `hidden-*` are hidden from the search page.
    const homepageItems = await getCollectionProducts({
      collection: "hidden-homepage-featured-items",
    });

    if (!homepageItems?.length) {
      console.warn("No homepage items found in collection 'hidden-homepage-featured-items'");
      return null;
    }

    if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) {
      console.warn("Not enough homepage items found. Expected 3, got:", homepageItems.length);
      return null;
    }

    const [firstProduct, secondProduct, thirdProduct] = homepageItems;

    return (
      <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
        <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
        <ThreeItemGridItem size="half" item={thirdProduct} />
      </section>
    );
  } catch (error) {
    console.error("Error in ThreeItemGrid:", error);
    return null;
  }
}
