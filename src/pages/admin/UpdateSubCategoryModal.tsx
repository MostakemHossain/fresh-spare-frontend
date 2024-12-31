/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Select, Upload } from "antd";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";

interface Category {
  _id: string;
  name: string;
}

interface UpdateSubCategoryModalProps {
  open: boolean;
  close: () => void;
  onSubmit: (values: {
    name: string;
    image: File | null;
    categories: string[];
  }) => void;
  isLoading: boolean;
  subCategory: any;
}

const UpdateSubCategoryModal: React.FC<UpdateSubCategoryModalProps> = ({
  open,
  close,
  onSubmit,
  subCategory,
}) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const allCategory = useAppSelector(
    (state) => state.product.allCategory
  ) as Category[];

  const handleSubmit = async (values: {
    name: string;
    categories: string[];
  }) => {
    setLoading(true);
    try {
      await onSubmit({ ...values, image: imageFile });
      setLoading(false);
      close();
    } catch (error: any) {
      setLoading(false);
    }
  };

  const handleImageChange = (info: any) => {
    if (info.fileList[0]) {
      setImageFile(info.fileList[0].originFileObj);
    }
  };

  return (
    <Modal
      title="Update Sub Category"
      open={open}
      onCancel={close}
      onOk={() => form.submit()}
      confirmLoading={loading} // Bind loading state to the OK button
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: subCategory?.name,
          categories: subCategory?.category,
        }}
      >
        <Form.Item
          name="name"
          label="Sub Category Name"
          rules={[
            { required: true, message: "Please input the sub category name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="categories"
          label="Categories"
          rules={[
            { required: true, message: "Please select at least one category!" },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Select categories"
            options={allCategory.map((category) => ({
              value: category._id,
              label: category.name,
            }))}
          />
        </Form.Item>
        <Form.Item label="Sub Category Image">
          <Upload
            accept="image/*"
            listType="picture-card"
            maxCount={1}
            defaultFileList={[
              {
                uid: "-1",
                name: "Current Image",
                url: subCategory?.image,
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
      </Form>
    </Modal>
  );
};

export default UpdateSubCategoryModal;
