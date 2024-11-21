import { SVGIconNoSound } from '@styles/global-icons/icons/svg-icon-no-sound';
import { SVGIconSound } from '@styles/global-icons/icons/svg-icon-sound';
import { _, media } from '@utilsFn/breakpoint';
import { useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';
import styled from 'styled-components';

export const AboutUsVideo = () => {
  const refAboutUsVideo = React.useRef<HTMLVideoElement | null>(null);
  const [isVideoMuted, setIsVideoMuted] = React.useState(true);

  const screenWidth = useSelector((s) => s.device.screenWidth);

  const video =
    screenWidth < 768
      ? '/video/darts-billiards-v2_25mb.mp4'
      : '/video/darts-billiards-v2_50mb.mp4';

  const handlerOnClickPlay = async () => {
    if (refAboutUsVideo?.current) {
      if (refAboutUsVideo?.current?.paused || refAboutUsVideo?.current?.ended) {
        await refAboutUsVideo?.current?.play();
      } else {
        refAboutUsVideo?.current?.pause();
      }
    }
  };

  return (
    <ContainerAboutUsVideo>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={refAboutUsVideo}
        width="100%"
        autoPlay
        loop
        muted={isVideoMuted}
        playsInline
        onClick={() => handlerOnClickPlay()}
      >
        <source src={video} />
      </video>

      <div className="AboutUsVideo_r1">
        <div
          className="AboutUsVideo_r1_r1"
          onClick={() => {
            setIsVideoMuted((previous) => !previous);
          }}
        >
          {isVideoMuted ? <SVGIconNoSound /> : <SVGIconSound />}
        </div>
      </div>
    </ContainerAboutUsVideo>
  );
};

const ContainerAboutUsVideo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .AboutUsVideo_r1 {
    pointer-events: none;
    flex-direction: column;
    align-items: center;
    max-width: calc(var(--layoutWidth) + 2 * var(--pagePaddingSide));
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .AboutUsVideo_r1_r1 {
    pointer-events: all;
    cursor: pointer;
    position: absolute;
    bottom: 30px;
    margin-right: var(--pagePaddingSide);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.whiteFFF};
    border-radius: 50%;

    svg {
      width: 27px;
      height: 21px;
    }

    :hover {
      ::before {
        position: absolute;
        bottom: -5px;
        right: -5px;
        content: '';
        width: 60px;
        height: 60px;
        border: 2px solid #ffffff;
        border-radius: 50%;
      }
    }
  }

  // mobile
  ${_(media.max.sm)} {
    video {
      height: 100%;
      object-fit: cover;
    }

    .AboutUsVideo_r1_r1 {
      bottom: 15px;
      max-width: 100%;
    }
  }
`;
