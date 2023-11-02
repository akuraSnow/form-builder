import { Form, Input as FormInput } from "antd";

export default function Input(props: any) {
  const {
    control: {
        value,
        event,
        errorList
    },
    field: {
      label
    }
  } = props;

  const validateStatus = errorList.length === 0 ? "success" : "error";
  const validateMes = errorList[0] && errorList[0].mes;

  return (
    <Form>
      <Form.Item label={label}  validateStatus={validateStatus} help={validateMes}>
        <FormInput value={value || ""} {...event} />
      </Form.Item>
    </Form>
  );
}
