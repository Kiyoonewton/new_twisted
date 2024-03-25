import { FC } from "react";
import moment from "moment";
import ComponentLazyImage from "@/components/Base-component/LazyImageComponent";
import style from "./style.module.scss";
import clx from "classnames";

const DisplayDetails: FC<{
  props: { [key: string]: any };
  //   savedUserContent;
  //   setShowUnfollow;
  //   authContext;
  //   userSavedContentContext;
  //   setSavedContent;
  hasDate: boolean;
}> = ({
  props,
  //   savedUserContent,
  //   setShowUnfollow,
  //   authContext,
  //   userSavedContentContext,
  //   setSavedContent,
  hasDate,
}) => {
  return (
    <div
      className={clx(
        style["details__row"],
        style["details__row--user"],
        style.justify
      )}
      style={{ paddingTop: "30px" }}
    >
      <div className={clx(style["details__row"], style.gap)}>
        <div className={clx(style.article__author, style.text)}>
          <div className={style.user__image}>
            <ComponentLazyImage
              src={props.user.image.src}
              alt={props.user.image.alt}
              position={"relative"}
              width={60}
              height={60}
            />
          </div>
          <p className={style.user__name}>
            BY <span className={style.span}> {props.user.name}</span>
          </p>
        </div>
        {hasDate && (
          <div className={clx(style.text, style.content__date)}>
            <h4
              className={clx(
                style.article__date,
              )}
            >
              {moment(props.details.date, "DD/MM/YYYY")?.format("DD MMM YYYY")}
            </h4>
            {props.details.time && (
              <p>
                <b className={clx(style.article__note)}>
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.657 1.001a.735.735 0 0 0-.657.73v13.625a.728.728 0 0 0 .733.73c2.543 0 4.464.132 5.99.532 1.524.4 2.662 1.04 3.75 2.16a.735.735 0 0 0 1.054 0c1.088-1.12 2.226-1.76 3.75-2.16 1.526-.4 3.447-.532 5.99-.532a.734.734 0 0 0 .733-.73V1.731a.728.728 0 0 0-.733-.73c-2.591 0-4.624.121-6.363.578A9.243 9.243 0 0 0 11 3.662 9.243 9.243 0 0 0 7.097 1.58C5.357 1.122 3.324 1 .734 1a.717.717 0 0 0-.077 0zM1.5 2.5c2.198.026 3.984.15 5.375.502 1.462.37 2.575.952 3.625 1.931V16.5a9.652 9.652 0 0 0-3.242-1.475c-1.593-.402-3.489-.522-5.758-.546V2.5zm19 0V14.48c-2.27.024-4.165.144-5.758.546A9.65 9.65 0 0 0 11.5 16.5V4.933c1.05-.979 2.163-1.562 3.625-1.931 1.39-.352 3.177-.476 5.375-.502zM3.216 4a.78.78 0 0 0-.516.21.624.624 0 0 0-.2.473c.006.176.09.342.233.462a.79.79 0 0 0 .53.18c1.711.032 3.073.236 4.185.613.186.078.4.083.59.014.191-.07.34-.207.414-.379a.6.6 0 0 0-.029-.528.723.723 0 0 0-.452-.341c-1.315-.446-2.849-.668-4.678-.703a.802.802 0 0 0-.077 0zM18.74 4c-1.841.035-3.385.257-4.709.703a.728.728 0 0 0-.455.341.596.596 0 0 0-.029.53c.074.171.225.308.416.378.192.069.407.064.595-.014 1.119-.378 2.49-.582 4.213-.614a.79.79 0 0 0 .52-.204.625.625 0 0 0 .208-.472.63.63 0 0 0-.229-.464.796.796 0 0 0-.53-.184zM3.227 6.5a.78.78 0 0 0-.522.213.65.65 0 0 0-.205.487c.005.18.089.352.233.476a.787.787 0 0 0 .533.187c2.202.051 3.832.431 5.137 1.058.175.084.38.102.57.049a.736.736 0 0 0 .44-.333.63.63 0 0 0 .054-.52.701.701 0 0 0-.365-.403c-1.541-.74-3.433-1.158-5.805-1.213a.735.735 0 0 0-.07 0zm15.507 0c-2.384.055-4.285.474-5.834 1.214a.703.703 0 0 0-.367.402.628.628 0 0 0 .054.52c.094.16.253.28.443.334.19.053.397.035.573-.05 1.31-.626 2.95-1.006 5.163-1.057a.786.786 0 0 0 .525-.21.65.65 0 0 0 .209-.486.654.654 0 0 0-.231-.477.792.792 0 0 0-.535-.19zm-15.507 3a.78.78 0 0 0-.522.213.65.65 0 0 0-.205.488.658.658 0 0 0 .233.477.787.787 0 0 0 .533.187c2.21.049 3.83.435 5.145 1.06.237.11.522.098.746-.034a.668.668 0 0 0 .342-.607.682.682 0 0 0-.404-.575C7.555 9.977 5.682 9.553 3.297 9.5a.856.856 0 0 0-.07 0zm15.507 0c-2.397.052-4.28.477-5.827 1.209a.683.683 0 0 0-.406.575.668.668 0 0 0 .344.607.816.816 0 0 0 .75.033c1.32-.625 2.95-1.01 5.17-1.059a.787.787 0 0 0 .526-.21.65.65 0 0 0 .209-.487.656.656 0 0 0-.231-.478.792.792 0 0 0-.535-.19zM3.227 12a.778.778 0 0 0-.522.213.65.65 0 0 0-.205.488c.005.18.089.353.233.477a.786.786 0 0 0 .533.187c2.198.051 3.84.436 5.145 1.06.237.11.522.098.746-.034a.668.668 0 0 0 .342-.607.682.682 0 0 0-.404-.575c-1.538-.734-3.427-1.153-5.798-1.208a.734.734 0 0 0-.07 0zm15.507 0c-2.383.055-4.281.474-5.827 1.209a.683.683 0 0 0-.406.574.668.668 0 0 0 .344.608.816.816 0 0 0 .75.033c1.311-.623 2.962-1.008 5.17-1.06a.786.786 0 0 0 .526-.209.651.651 0 0 0 .209-.487.656.656 0 0 0-.231-.478.792.792 0 0 0-.535-.19z"
                      fill="#0D154C"
                      fillRule="nonzero"
                    />
                  </svg>
                  {props.details.time}
                </b>
              </p>
            )}
          </div>
        )}
      </div>
      {/* <div className={"details__row details__row--actions"}>
        <ComponentButton
          click={() => {
            props.showSocialModal();
          }}
          settings={{
            style: "transparent",
          }}
          icon={<IconShareArrow />}
        />
        <p className={"button__save"}>Save</p>
        {savedUserContent &&
        savedUserContent.items &&
        savedUserContent.items.includes(props.id.toString()) ? (
          <ComponentButton
            key={"unfollow"}
            click={() => {
              setShowUnfollow(true);
            }}
            settings={{
              style: "outline",
              class: "button--unfollow",
            }}
            icon={<IconClose />}
          />
        ) : (
          <ComponentButton
            key={"follow"}
            click={() => {
              if (authContext.isLoggedIn) {
                userSavedContentContext.followContent(
                  "article",
                  props.id,
                  () => {
                    setSavedContent(true);

                    setTimeout(() => {
                      setSavedContent(false);
                    }, 4000);
                  }
                );
              } else {
                Router.push("/account/sign-in");
              }
            }}
            settings={{
              style: "outline",
            }}
            icon={<IconPlus />}
          />
        )}
      </div> */}
    </div>
  );
};

export default DisplayDetails;
