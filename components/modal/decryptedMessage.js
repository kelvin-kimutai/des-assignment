import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";

export default function DecryptedMessageModal({ message, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size="lg"
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody className="m-4">
          <div className="relative flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Decrypted Message</h3>
            <CgClose className="h-6 w-6 cursor-pointer" onClick={onClose} />
          </div>
          <p>{message}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
