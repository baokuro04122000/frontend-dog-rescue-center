import { Formik, FormikHelpers } from "formik";
import { Form, Input, SubmitButton } from "formik-antd";
import {Button, Row, Col, Alert} from 'antd'
import { useCallback, useState } from "react";
import { Link } from 'react-router-dom';
import styles from "./login.module.css";
import * as Yup from "yup";
import { useAppDispatch } from "../../store";
import { actionLogin } from "../../store/authentication/action";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import {
  SIGNUP_PATH
} from '../../constants/routes'
import {
  ErrorResponse
} from '../../api/openapi-generator'
const initialValues = {
  email: "",
  password: "",
};

type FormValues = typeof initialValues;

const LoginForm = () => {
  const { t } = useTranslation();
  
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const location = useLocation()
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(`${t('validation.email_required')}`)
      .email(`${t('validation.email_invalid')}`),
    password: Yup.string()
    .required(`${t('validation.password_required')}`)
    .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, `${t('validation.password_invalid')}`),
  });

  const handleSubmit = useCallback(
    async (values: FormValues, action: FormikHelpers<FormValues>) => {
      try {
       await dispatch(actionLogin({
          email: values.email,
          password: values.password
        }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (handleErrors) {
        const error = handleErrors as ErrorResponse
        setError(error.errors?.message ? error.errors?.message : error as string);
      } finally {
        action.setSubmitting(false);
      }
    },
    [dispatch]
  );
  
  const handleClose = () => {
    window.history.replaceState({}, document.title)
  }
  return (
    <div className={styles["form-wrapper"]}>
      <h1 style={{ textAlign: "center" }} className={styles["title-form"]}>{t('login.login')}</h1>
      <div style={{ margin: "4px 0" }}>
        <Alert
        banner={false} 
        message={<span className={styles["custom-alert-error"]}>{error && error}</span>} 
        className={styles["custom-alert-style"]}
        />
        {location.state?.message ? <Alert message={location.state.message} type="success" closable afterClose={handleClose} /> : <></>}
        
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
                  {t('login.login')}
                </SubmitButton>
              </Col>
              <Col span={12} offset={4} style={{textAlign: "right"}}>
                <Button type="link" htmlType="button" className={styles["custom-link-style"]}  >
                  <Link to={SIGNUP_PATH} style={{textDecoration:"underline"}}>{t('signUp.signUp')}</Link>
                </Button>
              </Col>
            </Row>
          </Form> 
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;