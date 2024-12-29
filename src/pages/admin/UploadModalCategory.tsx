import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Spin, Upload } from "antd";
import type { UploadFile } from "antd/lib/upload/interface";
import { useState } from "react";

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
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (values: {
    category: string;
    image: UploadFile[];
  }) => {
    const fileList = values.image;
    if (fileList && fileList[0] && fileList[0].originFileObj) {
      const transformedValues = {
        name: values.category,
        image: fileList[0].originFileObj as File,
      };

      setLoading(true); 
      try {
        await onSubmit(transformedValues); 
      } catch (error) {
        console.error("Error during submission", error);
      } finally {
        setLoading(false); 
      }
    } else {
      console.error("No file found in image field");
    }
    form.resetFields();
  };

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
          onClick={() => form.submit()}
          className="bg-primary hover:bg-primary text-black hover:text-black"
        >
          {loading ? <Spin size="small" /> : "Submit"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
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
            beforeUpload={() => false}
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
