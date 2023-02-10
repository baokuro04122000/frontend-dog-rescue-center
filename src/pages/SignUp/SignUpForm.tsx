import { Formik, FormikHelpers } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import {Button, Row, Col, Alert} from 'antd'
import { RcFile } from "antd/lib/upload"
import { useCallback, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from "./signUp.module.css";
import * as Yup from "yup";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { notification, Progress } from 'antd';
import { 
  actionRegister
} from "../../store/authentication/action";
import { 
  EyeInvisibleOutlined, 
  EyeTwoTone, 
  UploadOutlined 
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  Upload
} from '../../components/Upload/Upload';
import {
  useUpload
} from '../../hooks/useUpload'
import ImgCrop from 'antd-img-crop';
import {
  ErrorResponse
} from '../../api/openapi-generator';
import {
  LOGIN_PATH
} from '../../constants/routes';



const initialValues = {
  username:"",
  email: "",
  password: "",
  confirmPassword:""
};

type FormValues = typeof initialValues;

const SignUpForm = () => {
  const { t } = useTranslation();
  
  const [error, setError] = useState("");
  const {handleUploadProps, fileList, progress, error: err} = useUpload(t)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  
  const validationSchema = Yup.object({
    username: Yup.string()
      .required(),
    email: Yup.string()
      .required(`${t('validation.email_required')}`)
      .email(`${t('validation.email_invalid')}`),
    password: Yup.string()
      .required(`${t('validation.password_required')}`)
      .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, `${t('validation.password_invalid')}`),
    confirmPassword:  Yup.string()
      .oneOf([Yup.ref('password'), null], `${t('validation.confirm_password_invalid')}`)
      .required(`${t('validation.confirm_password_required')}`)
  
  });
  useEffect(() => {
    if(err){
      api.error({
        message: err,
        duration: 5,
        placement: 'topRight'
      })
    }
  }, [err, api])

  const handleSubmit = useCallback(
    async (values: FormValues, action: FormikHelpers<FormValues>) => {
        try {
          const message = await dispatch(actionRegister({
            name: values.username,
            email: values.email,
            password: values.password,
            avatar: fileList.length > 0 ? fileList[0].thumbUrl: undefined
          }));

          if(message) navigate(LOGIN_PATH, { state: { message: message } })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (handleErrors) {
        const error = handleErrors as ErrorResponse
        setError(error.errors?.message ? error.errors?.message : error as string);
      } finally {
        action.setSubmitting(false);
      }
    },
    [dispatch, fileList, navigate]
  );
  
  const handleBeforeCrop = (file: RcFile) => {
    const math:string[] = ['image/jpeg','image/png','image/gif', 'image/jpg']
    
    const limitFile = file.size / 1024 /1024 < 2
    if(math.indexOf(file.type) === -1){
      api.error({
        message:t('validation.image_format_invalid'),
        duration:5,
        placement:'topRight'
      })
      return false
    }
    if(!limitFile){
      api.error({
        message:t('validation.image_size_invalid'),
        duration:5,
        placement:'topRight'
      })
      return false
    }
    return true
  }
  return (
    <>
      {contextHolder}
      <div className={styles["form-wrapper"]}>
        <h1 style={{ textAlign: "center" }} className={styles["title-form"]}>{t('signUp.signUp')}</h1>
        <div style={{ margin: "4px 0" }}>
          <Alert
          banner={false} 
          message={<span className={styles["custom-alert-error"]}>{error && error}</span>} 
          className={styles["custom-alert-style"]}
          />
          {/* {error && <Alert message={error} type="error" />} */}
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            
            <Form layout="vertical"
            >
              <Form.Item name="username" label={<span style={{fontWeight:"bold"}}>{t('signUp.username')}</span>} >
                <Input
                  placeholder={`${t('signUp.username_placeholder')}`}
                  name="username" 
                  suffix={<span />} 
                  prefix={<span />} 
                />
              </Form.Item>
              <Form.Item name="email" label={<span style={{fontWeight:"bold"}}>{t('common.email')}</span>} >
                <Input
                  placeholder={`${t('common.email')}`}
                  name="email" 
                  suffix={<span />} 
                  prefix={<span />} 
                />
              </Form.Item>
              <Form.Item name="password" label={<span style={{fontWeight:"bold"}}>{t('login.password')}</span>}>
                <Input.Password
                  placeholder={`${t('login.password_placeholder')}`}
                  name="password"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item name="confirmPassword" label={<span style={{fontWeight:"bold"}}>{t('signUp.confirm_password')}</span>}>
                <Input.Password
                  placeholder={`${t('signUp.confirm_password_placeholder')}`}
                  name="confirmPassword"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <Form.Item name='avatar'>
                <ImgCrop rotate={true} beforeCrop={handleBeforeCrop}> 
                  <Upload {...handleUploadProps}>
                    <Button icon={<UploadOutlined />}>{t('common.upload')}</Button>
                    {progress > 0 ? <Progress percent={progress} /> : null}
                  </Upload>
                </ImgCrop>
              </Form.Item>
              <Row style={{
                justifyContent:"center", 
                alignItems:"center",
                padding: "19px 0px 14px 0px" 
              }}>
                <Col span={8}>
                  <SubmitButton 
                  className={styles["submit-btn"]} 
                  size="large"
                  >
                    {t('signUp.signUp')}
                  </SubmitButton>
                </Col>
                <Col span={12} offset={4} style={{textAlign: "right"}}>
                  <Button type="link" htmlType="button" className={styles["custom-link-style"]}  >
                    <Link to={LOGIN_PATH} style={{textDecoration:"underline"}}>{t('login.login')}</Link>
                  </Button>
                </Col>
              </Row>
            </Form> 
          )}
        </Formik>
      </div>
    </>
  );
};

export default SignUpForm;