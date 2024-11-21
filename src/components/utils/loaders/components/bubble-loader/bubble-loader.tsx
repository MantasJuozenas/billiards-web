import React from 'react';
import styled from 'styled-components';

export const BubbleLoader = () => {
  return (
    <ContainerBubbleLoader>
      <div className="bubble_loader_loading_container">
        <div className="bubble1 bubble_loader" />
        <div className="bubble2 bubble_loader" />
        <div className="bubble3 bubble_loader" />
      </div>
      {/* <div className="bubble_loader_text">Loading</div> */}
    </ContainerBubbleLoader>
  );
};

const ContainerBubbleLoader = styled.div`
  /* text-align: center; */
  /* margin: 0 auto; */
  /* width: 200px; */
  /* background-color: #331f1f; */
  /* padding: 20px; */
  /* color: #fff */
  .bubble_loader {
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.whiteFFF};
    border-radius: 50%;
    display: inline-block;
    -webkit-animation: in-and-out-bubbles 1.2s infinite ease-in-out;
    -moz-animation: in-and-out-bubbles 1.2s infinite ease-in-out;
    -o-animation: in-and-out-bubbles 1.2s infinite ease-in-out;
    animation: in-and-out-bubbles 1.2s infinite ease-in-out;
  }
  .bubble1 {
    -webkit-animation-delay: -0.35s;
    -moz-animation-delay: -0.35s;
    -o-animation-delay: -0.35s;
    animation-delay: -0.35s;
  }
  .bubble2 {
    margin: 0 6px;
    -webkit-animation-delay: -0.2s;
    -moz-animation-delay: -0.2s;
    -o-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }
  .bubble_loader_text {
    font-weight: bold;
  }
  @keyframes in-and-out-bubbles {
    0%,
    80%,
    100% {
      transform: scale(0.8);
    }
    20% {
      transform: scale(1);
    }
  }
  @-webkit-keyframes in-and-out-bubbles {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0.8);
    }
    20% {
      -webkit-transform: scale(1);
    }
  }
`;
