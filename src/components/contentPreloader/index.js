import React from "react";
import ContentLoader from "react-content-loader";
import Styles from "./styles.module.scss";

const ContentPreloader = (props) => {
  const { type } = props;

  const preloaderContentHandler = (type) => {
    switch (type) {
      case "main":
        if (window.screen.width < 768) {
          return (
            <section
              className={`${Styles.container}`}
              style={{ height: "40rem" }}
            >
              <ContentLoader
                speed={2}
                width="100%"
                height="100%"
                viewBox="0 0 100% 100%"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
              >
                <rect
                  x="0"
                  y="0"
                  rx="0"
                  ry="0"
                  width="100%"
                  height="calc(50% - 0.5rem)"
                />
                <rect
                  x="0"
                  y="calc(50% + 0.5rem)"
                  rx="0"
                  ry="0"
                  width="calc(50% - 0.5rem)"
                  height="calc(50% - 0.5rem)"
                />
                <rect
                  x="calc(50% + 0.5rem)"
                  y="calc(50% + 0.5rem)"
                  rx="0"
                  ry="0"
                  width="calc(50% - 0.5rem)"
                  height="calc(50% - 0.5rem)"
                />
              </ContentLoader>
            </section>
          );
        } else {
          return (
            <section
              className={`${Styles.container}`}
              style={{ height: "40rem" }}
            >
              <ContentLoader
                speed={2}
                width="100%"
                height="100%"
                viewBox="0 0 100% 100%"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
              >
                <rect
                  x="0"
                  y="0"
                  rx="0"
                  ry="0"
                  width="calc(50% - 0.5rem)"
                  height="100%"
                />
                <rect
                  x="calc(50% + 0.5rem)"
                  y="0"
                  rx="0"
                  ry="0"
                  width="calc(50% - 0.5rem)"
                  height="calc(50% - 0.5rem)"
                />
                <rect
                  x="calc(50% + 0.5rem)"
                  y="calc(50% + 0.5rem)"
                  rx="0"
                  ry="0"
                  width="calc(25% - 0.75rem)"
                  height="calc(50% - 0.5rem)"
                />
                <rect
                  x="calc(75% + 0.75rem)"
                  y="calc(50% + 0.5rem)"
                  rx="0"
                  ry="0"
                  width="calc(25% - 0.75rem)"
                  height="calc(50% - 0.5rem)"
                />
              </ContentLoader>
            </section>
          );
        }
      default:
        return (
          <section
            className={`${Styles.container}`}
            style={{ height: "40rem" }}
          >
            <ContentLoader
              speed={2}
              width="100%"
              height="100%"
              viewBox="0 0 100% 100%"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              {...props}
            >
              <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
            </ContentLoader>
          </section>
        );
    }
  };

  return preloaderContentHandler(type);
};

export default ContentPreloader;
