import React from "react";
import styled from "styled-components/macro";

const Chip = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
  height: 72px;
  border: 1px solid #dadce0;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 14px 0px 20px 0px;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FileNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-weight: bold;
    padding-left: 10px;
    line-height: 0.3px;
  }
`;

const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  background: #dcedff;
  border-radius: 50%;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  p {
    color: #09539e;
  }
`;

const DeleteIcon = styled.img`
  padding-left: 15px;
`;

const FileChip = ({ name, handleDelete }) => {
  const today = new Date();

  return (
    <Chip>
      <FileInfo>
        <IconContainer />
        <FileNameWrapper>
          <p>{name}</p>
          <span>{today.toLocaleDateString("en-US")}</span>
        </FileNameWrapper>
      </FileInfo>
      <LeftContainer>
        <p>Preview</p>
        <DeleteIcon src="/static/img/delete.svg" onClick={handleDelete} />
      </LeftContainer>
    </Chip>
  );
};

export default FileChip;
