import Modal from "@material-ui/core/Modal";
import styled from "styled-components/macro";
import CloseIcon from "@material-ui/icons/Close";
import { Divider } from "@material-ui/core";

const ModalWrapper = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: white;
  position: fixed;
  left: 30%;
  top: 10%;
  border-radius: 8px;
  :focus {
    outline: none !important;
  }
`;

const ModalHeader = styled.div`
  height: 50px;
  padding: 15px;
  .ModalHeader {
    display: flex;
    justify-content: space-between;
  }
  .ModalHeader .modalTitle {
    font-weight: 600;
    font-size: 13px;
  }
  svg {
    cusrsor: pointer;
  }
`;

const CustomModal = ({
  title = "",
  children,
  handleClose,
  open,
  width = "50%",
  height = "500px",
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <ModalWrapper width={width} height={height}>
        <ModalHeader>
          <div className="ModalHeader">
            <div className="modalTitle">{title}</div>
            <CloseIcon onClick={handleClose} />
          </div>
        </ModalHeader>
        <Divider />
        {children}
      </ModalWrapper>
    </Modal>
  );
};

export default CustomModal;
