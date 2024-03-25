export async function modifyContent(data: { [key: string]: any }) {
  const page_content = data.data.page_content;
  let content = page_content.content;
  console.log(data?.data);

  content = await content.replace(
    /<iframe.*?youtube.com\/embed\/.*?<\/iframe>/g,
    function (match: string) {
      return match.replace(
        '<iframe class="ql-video"',
        '<div class="youtube-container"><iframe class="ql-video video"'
      );
    }
  );

  content = await content.replace(
    /<iframe.*?instagram.com\/.*?<\/iframe>/g,
    function (match: string) {
      return match.replace(
        '<iframe class="ql-video"',
        '<div class="custom__embed instagram__embed"><iframe class="ql-video"'
      );
    }
  );

  content = await content.replace(
    /<iframe.*?facebook.com\/.*?<\/iframe>/g,
    function (match: string) {
      return match.replace(
        '<iframe class="ql-video"',
        '<div class="fb-post custom__embed"><iframe class="ql-video"'
      );
    }
  );

  content = await content.replace(
    /<iframe.*?twitter.com\/.*?<\/iframe>/g,
    function (match: string) {
      return match.replace(
        '<iframe class="ql-video"',
        '<div class="custom__embed jtv__embed"><iframe class="ql-video"'
      );
    }
  );

  content = await content.replace(
    /<iframe.*?jwplatform.com\/.*?<\/iframe>/g,
    function (match: string) {
      return match.replace(
        '<iframe class="ql-video"',
        '<div class="custom__embed jtv__embed"><iframe class="ql-video"'
      );
    }
  );

  content = await content.replace(
    /<iframe.*?vimeo.com\/.*?<\/iframe>/g,
    function (match: string) {
      return match.replace(
        '<iframe class="ql-video"',
        '<div class="custom__embed jtv__embed"><iframe class="ql-video"'
      );
    }
  );

  content = await content.replace(
    /<iframe.*?tiktok.com\/.*?<\/iframe>/g,
    function (match: string) {
      return match.replace(
        '<iframe class="ql-video"',
        '<div class="custom__embed tiktok__embed"><iframe class="ql-video"'
      );
    }
  );

  content = await content.replace(/<\/iframe>/g, function (match: string) {
    return match.replace("</iframe>", "</iframe></div>");
  });

  return {
    data: {
      page_content: {
        uuid: page_content.uuid,
        status: page_content.status,
        content: content,
        author: page_content.author,
        title: page_content.title,
        excerpt: page_content.excerpt,
        slug: page_content.slug,
        hero_images: page_content.hero_images,
        meta: page_content.meta,
        tags: page_content.tags,
        category: page_content.category,
        post_date: page_content.post_date,
        posted_time_ago: page_content.posted_time_ago,
        reading_time: page_content.reading_time,
        categories: page_content.categories,
        related_post: page_content.related_post,
        meta_tags: page_content.meta_tags,
        facebook_tags: page_content.facebook_tags,
        twitter_tags: page_content.twitter_tags,
      },
      type: data.data.type,
      categories: data.data.categories,
      next_post: "",
      previous_post: "",
    },
  };
}
