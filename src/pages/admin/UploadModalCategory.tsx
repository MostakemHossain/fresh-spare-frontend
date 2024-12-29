import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import type { UploadFile } from "antd/lib/upload/interface";

const UploadModalCategory = ({
  open,
  close,
  onSubmit,
}: {
  open: boolean;
  close: () => void;
  onSubmit: (data: { name: string; image: File }) => void;
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Add New Category"
      open={open}
      onCancel={close}
      footer={[
        <Button key="cancel" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          className="bg-primary hover:bg-primary-dark"
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values: { category: string; image: UploadFile[] }) => {
          const fileList = values.image;
          if (fileList && fileList[0] && fileList[0].originFileObj) {
            const transformedValues = {
              name: values.category,
              image: fileList[0].originFileObj as File, // Ensure it's treated as File
            };
            onSubmit(transformedValues);
          } else {
            console.error("No file found in image field");
          }
          form.resetFields();
        }}
      >
        <Form.Item
          label="Category Name"
          name="category"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item
          label="Upload Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload
            name="image"
            listType="picture-card"
            beforeUpload={() => false} // Prevent auto upload
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadModalCategory;
