import React from "react";
import FlexBox from "components/FlexBox";
import Scrollspy from "react-scrollspy";
import styled from "styled-components/macro";

const TabsWrapper = styled.div`
  ul {
    display: flex;
    position: fixed;
    flex-direction: column;
    width: 210px;
    margin: 55px 0px 0px 0px;
    a {
      text-decoration: none;
      padding-bottom: 7px;
      color: #dadce0;
      position: relative;
      padding-left: 10px;
      &:before {
        position: absolute;
        content: "";
        left: 0;
        width: 2px;
        background: #ccc;
        top: 0;
        height: 16px;
      }
    }
  }

  ul .is-current {
    color: #09539e;
    font-weight: bold;
    position: relative;
    &:before {
      background: #09539e;
    }
  }
`;

export default function VerticalTabs({ labels = [], children }) {
  return (
    <FlexBox>
      <TabsWrapper>
        <Scrollspy items={labels} currentClassName="is-current">
          {labels.map((name) => (
            <a key={name} href={`#${name}`}>
              {name}
            </a>
          ))}
        </Scrollspy>
      </TabsWrapper>
      <div data-spy="scroll" data-target="#nav-spy">
        {children}
      </div>
    </FlexBox>
  );
}

export const TabWrapper = styled.div`
  position: relative;
  left: 220px;
`;
