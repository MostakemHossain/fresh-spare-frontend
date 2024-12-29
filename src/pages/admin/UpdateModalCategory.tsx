/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Upload } from "antd";
import { useState } from "react";

interface UpdateModalCategoryProps {
  open: boolean;
  close: () => void;
  onSubmit: (values: { name: string; image: File | null }) => void;
  initialValues: { name: string; image: string };
  isLoading: boolean;
}

const UpdateModalCategory: React.FC<UpdateModalCategoryProps> = ({
  open,
  close,
  onSubmit,
  initialValues,
  isLoading,
}) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = (values: { name: string }) => {
    onSubmit({ ...values, image: imageFile });
  };

  const handleImageChange = (info: any) => {
    console.log(info.fileList[0].originFileObj);
    if (info.fileList[0]) {
      setImageFile(info.fileList[0].originFileObj);
    }
  };

  return (
    <Modal
      title="Update Category"
      open={open}
      onCancel={close}
      onOk={() => form.submit()}
      confirmLoading={isLoading} 
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ name: initialValues.name }}
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="flex items-center">
          <Form.Item label="Category Image">
            <Upload
              accept="image/*"
              listType="picture-card"
              maxCount={1}
              defaultFileList={[
                {
                  uid: "-1",
                  name: "Current Image",
                  url: initialValues.image,
                },
              ]}
              onChange={handleImageChange}
              beforeUpload={() => false} 
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateModalCategory;
