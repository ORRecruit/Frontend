import Script from "next/script";
import React, { FC } from "react";

interface Props {
  containerId: string;
}

const GoogleTagManager: FC<Props> = ({ containerId }) => {
  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WQBFH7L6');`,
        }}
      />
      <Script
        id="apollo-tracker"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      function initApollo() {
        var n = Math.random().toString(36).substring(7);
        var o = document.createElement("script");
        o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
        o.async = true;
        o.defer = true;
        o.onload = function() {
          window.trackingFunctions.onLoad({appId: "667d8edb4b466e0a9f2e49a4"});
        };
        document.head.appendChild(o);
      }
      initApollo();
    `,
        }}
      />{" "}
    </>
  );
};

export default GoogleTagManager;
