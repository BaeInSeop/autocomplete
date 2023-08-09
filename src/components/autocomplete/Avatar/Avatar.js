import React, { useCallback, useEffect, useState } from 'react';
import validator from 'validator';
import {
  calcBorderRadius,
  defaultInitial,
  displayText,
  getAvatarFromGoogle,
  getRandomColor,
} from './CommonUtil';
import Skeleton from './Skeleton';

const Avatar = ({
  className = '',
  name,
  src,
  size = 50,
  round,
  googleAccessToken,
  maxText = 1,
  style,
  textSizeRatio = 3,
  onClick,
}) => {
  const [loading, setLoading] = useState(true);
  const [imageReady, setImageReady] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (googleAccessToken) {
      getAvatarFromGoogle(googleAccessToken).then((picUrl) => {
        setImageUrl(picUrl);
        setImageReady('url');
      });
    } else if (src && validator.isURL(src)) {
      setImageUrl(src);
      setImageReady('url');
    } else if (src && src.startsWith('blob:')) {
      setImageUrl(src);
      setImageReady('url');
    } else {
      setImageReady('element');
      setLoading(false);
    }
  }, [googleAccessToken, src]);

  useEffect(() => {
    if (imageUrl) {
      const image = new Image();

      const handleLoad = () => {
        setLoading(false);
      };

      image.src = imageUrl;

      image.addEventListener('load', handleLoad);

      return () => {
        image.removeEventListener('load', handleLoad);
      };
    }
  }, [imageUrl]);

  const drawAvatar = useCallback(() => {
    switch (imageReady) {
      case 'url':
        return (
          <div
            className={`avatar-container ${className}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              lineHeight: `${size}px`,
              borderRadius: calcBorderRadius(round),
              ...style,
            }}
          >
            <img
              key={imageUrl}
              src={imageUrl}
              style={{ borderRadius: calcBorderRadius(round) }}
              title={name ? name : ''}
            />
          </div>
        );

      case 'element':
      default:
        return makeAvatarFromValue(name);
    }
  }, [imageReady, imageUrl]);

  const makeAvatarFromValue = useCallback((value) => {
    let text = value;
    let backgroundColor = '';

    try {
      backgroundColor = getRandomColor(value);
    } catch {
      text = '*';
      backgroundColor = getRandomColor(text);
    }

    return (
      <div
        className={`avatar-container ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          lineHeight: `${size}px`,
          borderRadius: calcBorderRadius(round),
          background: backgroundColor,
          fontSize: size / textSizeRatio,
          fontStyle: 'normal',
          ...style,
        }}
        onClick={onClick?.onClick}
        title={name ? name : ''}
      >
        {displayText(text, maxText)}
      </div>
    );
  }, []);

  return <>{loading ? <Skeleton size={size} round={round} /> : drawAvatar()}</>;
};

export default Avatar;
