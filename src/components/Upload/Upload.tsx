
import { Upload as AntdUpload, UploadProps } from 'antd';


export const Upload: React.FC<UploadProps> = (props) => {
  return <AntdUpload {...props} />;
};