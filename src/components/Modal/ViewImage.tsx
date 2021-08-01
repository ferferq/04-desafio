import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Image,
  Link,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  const ref = useRef(null);
  const [widthSizeImage, setWithSizeImage] = useState(0);

  function setWidthImage() {
    if (ref.current.clientWidth) {
      setWithSizeImage(ref.current.clientWidth);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xs"} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="900px" maxHeight="600px" bgColor="transparent">
        <ModalBody>
          <Flex maxWidth="900px" maxHeight="600px" flexDirection="column" justifyContent="center" alignItems="center">
            <Image
              ref={ref}
              src={imgUrl}
              alt="openImage"
              maxWidth="inherit"
              maxHeight="inherit"
              onLoad={setWidthImage}
            />

            <Link href={imgUrl} isExternal bgColor="pGray.800" height="32px" width={widthSizeImage} borderBottomRadius={8}
              px="10px"
            >
              Abrir original
            </Link>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
