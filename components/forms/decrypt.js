import { decryptMessage } from "@/services/message";
import { Button, useToast, useDisclosure } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import InputField from "../input/inputField";
import TextArea from "../input/textArea";
import DecryptedMessageModal from "../modal/decryptedMessage";

export default function DecryptForm() {
  const toast = useToast();
  const [message, setMessage] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues = {
    message: "",
    key: "",
  };

  const validationSchema = Yup.object({
    message: Yup.string().required("Required"),
    key: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await decryptMessage({
        body: {
          message: values.message.trim(),
          key: values.key.trim(),
        },
      });
      toast({
        description: "Message has been decrypted",
        status: "success",
        duration: 5000,
        position: "top-right",
      });
      setMessage(response.message);
      onOpen();
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: 5000,
        position: "top-right",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <DecryptedMessageModal
        isOpen={isOpen}
        onClose={onClose}
        message={message}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className="space-y-4">
            <InputField
              name="key"
              type="text"
              label="Key"
              placeholder="Enter key"
            />
            <TextArea
              name="message"
              type="text"
              label="Message"
              placeholder="Enter message"
              rows={3}
            />
            <div className="ml-auto w-full sm:w-fit">
              <Button
                type="submit"
                isLoading={props.isSubmitting}
                loadingText="Decrypting"
                colorScheme="blue"
                variant="solid"
              >
                Decrypt
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
