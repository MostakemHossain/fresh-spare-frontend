import { Button, Form, Input, Modal, Select, Spin, Upload, UploadFile } from "antd";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { PlusOutlined } from "@ant-design/icons";

interface Category {
  _id: string; 
  name: string;
}

const UploadSubCategoryModal = ({
  open,
  close,
  onSubmit,
}: {
  open: boolean;
  close: () => void;
  onSubmit: (data: { name: string; image: File; categories: string[] }) => void;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const allCategory = useAppSelector(
    (state) => state.product.allCategory
  ) as Category[];
  console.log(allCategory);

  const handleFormSubmit = async (values: {
    category: string;
    image: UploadFile[];
    categories: string[];
  }) => {
    const fileList = values.image;
    if (fileList && fileList[0] && fileList[0].originFileObj) {
      const transformedValues = {
        name: values.category,
        image: fileList[0].originFileObj as File,
        categories: values.categories, 
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
      title="Add New Sub Category"
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
          label="Sub Category Name"
          name="category"
          rules={[
            { required: true, message: "Please input the sub category name!" },
          ]}
        >
          <Input placeholder="Enter Sub category name" />
        </Form.Item>

        <Form.Item
          label="Category List"
          name="categories"
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

export default UploadSubCategoryModal;
