import { StylePageDivCenter } from '@components/layout/style-page/style-page-div-center';
import { SVGIconNoSound } from '@styles/global-icons/icons/svg-icon-no-sound';
import { SVGIconSound } from '@styles/global-icons/icons/svg-icon-sound';
import { _, media } from '@utilsFn/breakpoint';
import { useSelector } from '@utilsFn/hooks/use-selector';
import React from 'react';
import styled from 'styled-components';

export const LandingVideo = () => {
  const refVideo = React.useRef<HTMLVideoElement | null>(null);

  const [isVideoMuted, setIsVideoMuted] = React.useState(true);
  // const [isVideoPlaying, setIsVideoPlaying] = React.useState(true);

  const screenWidth = useSelector((s) => s.device.screenWidth);

  const video =
    screenWidth < 768
      ? '/video/arena-billiards_50mb.mp4'
      : '/video/arena-billiards.mp4';

  // const video =
  // screenWidth < 768
  //   ? '/video/arena-billiards_25mb.mp4'
  //   : '/video/arena-billiards_50mb.mp4';

  const handlerOnClickPlay = async () => {
    if (refVideo?.current) {
      if (refVideo?.current?.paused || refVideo?.current?.ended) {
        await refVideo?.current?.play();
        // setIsVideoPlaying(true);
      } else {
        refVideo?.current?.pause();
        // setIsVideoPlaying(false);
      }
    }
  };

  return (
    <ContainerLandingVideo>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        // key={defaultLocale2}
        ref={refVideo}
        width="100%"
        autoPlay
        loop
        muted={isVideoMuted}
        playsInline
        onClick={() => handlerOnClickPlay()}
      >
        <source src={video} />
      </video>

      <StylePageDivCenter className="LandingVideo_r1">
        <div
          className="LandingVideo_r1_r1"
          onClick={() => {
            setIsVideoMuted((previous) => !previous);
          }}
        >
          {isVideoMuted ? <SVGIconNoSound /> : <SVGIconSound />}
        </div>
      </StylePageDivCenter>
    </ContainerLandingVideo>
  );
};

const ContainerLandingVideo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  /* background-color: #716464; */

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .LandingVideo_r1 {
    pointer-events: none;
    position: relative;
    flex-direction: column;
    align-items: center;
    flex: 1;
    /* background-color: red; */
  }

  .LandingVideo_r1_r1 {
    pointer-events: all;
    cursor: pointer;
    position: absolute;
    bottom: 40px;
    right: var(--pagePaddingSide);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
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
      position: static;
    }

    .LandingVideo_r1_r1 {
      bottom: 15px;
      right: 15px;
    }
  }
`;
