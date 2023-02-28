import { encryptMessage } from "@/services/message";
import { Button, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { isValidPhoneNumber } from "libphonenumber-js";
import * as Yup from "yup";
import InputField from "../input/inputField";
import TextArea from "../input/textArea";

export default function EncryptForm() {
  const toast = useToast();

  const initialValues = {
    mobile_number: "",
    email: "",
    key: "",
    message: "",
  };

  const validationSchema = Yup.object({
    mobile_number: Yup.string()
      .required("Required")
      .test("phoneNumberValidation", "Invalid mobile number", (value) =>
        isValidPhoneNumber(value, "KE")
      ),
    email: Yup.string().email("Invalid email").required("Required"),
    key: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await encryptMessage({ body: values });
      toast({
        description: response.message,
        status: "success",
        duration: 5000,
        position: "top-right",
      });
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className="space-y-4">
          <InputField
            name="email"
            type="email"
            label="Email"
            placeholder="Enter email"
          />
          <InputField
            name="mobile_number"
            type="tel"
            label="Mobile number"
            placeholder="Enter mobile number"
          />
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
              loadingText="Encrypting"
              colorScheme="blue"
              variant="solid"
            >
              Encrypt
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
