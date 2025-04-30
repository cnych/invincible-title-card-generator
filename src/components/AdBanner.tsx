import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
  style?: React.CSSProperties;
  'data-ad-slot'?: string;
  'data-ad-format'?: string;
  'data-ad-client'?: string;
  'data-full-width-responsive'?: string;
}

export default function AdBanner(props: AdBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { className, style, ...adProps } = props;

  useEffect(() => {
    try {
      // 如果window.adsbygoogle存在，可以在这里加载广告
      if (bannerRef.current && (window as any).adsbygoogle) {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div
      ref={bannerRef}
      className={`adsbygoogle ${className || ''}`}
      style={style}
      data-ad-client="ca-pub-3546568775824580"
      {...adProps}
    ></div>
  );
}