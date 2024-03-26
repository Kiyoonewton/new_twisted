import { FC } from "react";
import ComponentSection from "../ComponentSection";
import { ArticleDetailPageProps } from "../../types";

export const ArticleDetailsRelated:FC<ArticleDetailPageProps>=(props) =>{
    console.log(props);
    
    return (
        <ComponentSection identifier={"related-artices"}>
            <></>
            {/* <div className={"text"}>
                <h2 className={"text__element font--secondary weight--black"}>
                    {props.text.title}
                </h2>
            </div>
            <div className={"articles"}>
                {!props.loading ? (
                    <>
                        {props.articles.map((article, index) => {
                            return (
                                <ComponentCardArticle
                                    key={`article-item--${index}`}
                                    text={{ ...article.text }}
                                    image={{ ...article.image }}
                                    link={{ ...article.link }}
                                    tags={article.tags}
                                    id={article.id}
                                    follow={(type, id) => {
                                        props.follow(type, id);
                                    }}
                                    unfollow={(title, id, type) => {
                                        props.unfollow(title, id, type);
                                    }}
                                    following={props.savedUserContent}
                                />
                            );
                        })}
                    </>
                ) : (
                    <>
                        {[...Array(3)].map((_, index) => {
                            return <ComponentCardArticle key={index} loading={true} />;
                        })}
                    </>
                )}
            </div> */}
        </ComponentSection>
    );
}