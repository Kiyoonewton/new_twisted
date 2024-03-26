import { LayoutArticleProps } from "@/components/types";

function LayoutArticle(props: LayoutArticleProps) {
  return (
    <section>
      <main data-scroll-container style={{ position: "relative" }}>
        <article data-scroll-section>
          <div data-scroll-section>{props.children}</div>
        </article>
      </main>
    </section>
  );
}

export default LayoutArticle;
