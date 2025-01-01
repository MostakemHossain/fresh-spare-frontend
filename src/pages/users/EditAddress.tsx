/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Modal } from "antd";
import toast from "react-hot-toast";
import { useUpdateAddressMutation } from "../../redux/features/address/addressApi";

interface EditAddressProps {
  record: any;
  close: () => void;
}

const EditAddress = ({ record, close }: EditAddressProps) => {
  const [form] = Form.useForm();
  const [updateAddress] = useUpdateAddressMutation();
  const handleFinish = async (values: any) => {
    try {
      const result = await updateAddress({
        id: record._id,
        data: values,
      }).unwrap();
      if (result.success) {
        toast.success("address deleted successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }

    close();
  };

  return (
    <Modal title="Edit Address" visible={true} onCancel={close} footer={null}>
      <Form
        form={form}
        initialValues={record}
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item
          name="address_line"
          label="Address Line"
          rules={[{ required: true, message: "Address Line is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "City is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: "State is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Country is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pincode"
          label="Pincode"
          rules={[{ required: true, message: "Pincode is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mobile"
          label="Mobile"
          rules={[{ required: true, message: "Mobile number is required" }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form>
    </Modal>
  );
};

export default EditAddress;
