import * as Yup from "yup";
import { useCallback, useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { Formik, FormikHelpers } from "formik";
import styles from "./index.module.css";
import { Alert, Button, Col, Row } from "antd";
import { Form, Input, SubmitButton } from "formik-antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { ErrorResponse } from "../../api/openapi-generator";
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../../constants/routes";
import {
  actionResetPassword
} from '../../store/authentication/action'

const ResetPassWordForm = () => {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  
  const [error, setError] = useState("");
  
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate()
  
  const initialValues = {
    password: "",
    confirmPassword: ""
  };
 
  type FormValues = typeof initialValues;

  const validationSchema = Yup.object({
    password: Yup.string().trim()
    .required(`${t('validation.password_required')}`)
    .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/,
        `${t('validation.password_invalid')}`
    ),
    confirmPassword: Yup.string().trim()
    .oneOf([Yup.ref('password'), null], `${t('validation.confirm_password_invalid')}`)
    .required(`${t('validation.confirm_password_required')}`)
  });
  
  const handleSubmit = useCallback(
    async (values: FormValues, action: FormikHelpers<FormValues>) => {
      try {  
        if(!query.get("token") && !query.get("userId")){
          setError(`${t('forgotPassword.invalid_url')}`);
        }
        const message = await dispatch(actionResetPassword({
          token: query.get("token") as string, 
          userId:Number(query.get("userId")), 
          password: values.password
        }))
        navigate(LOGIN_PATH, { state: { message: message } })
      } catch (handleErrors) {
        const error = handleErrors as ErrorResponse
        setError(error.errors?.message ? error.errors?.message : error as string);
      } finally {
        action.setSubmitting(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  const handleOnchangePassword = () => {
    if(error){
      setError("")
    }
  }

  return (
    <div className={styles["form-wrapper"]}>
      <h1 style={{ textAlign: "center" }} className={styles["title-form"]}>{t('forgotPassword.title_form_reset_password')}</h1>
      <div style={{ margin: "4px 0" }}>
        <Alert
          banner={false}
          message={<span className={styles["custom-alert-error"]}>{error && error}</span>}
          className={styles["custom-alert-style"]}
        />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form layout="vertical"
          >
            <Form.Item name="password" label={<span style={{ fontWeight: "bold" }}>{t('forgotPassword.new_password')}</span>} >
              <Input.Password
                onChange={handleOnchangePassword}
                placeholder={`${t('login.password_placeholder')}`}
                name="password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item name="confirmPassword" label={<span style={{ fontWeight: "bold" }}>{t('signUp.confirm_password')}</span>}>
              <Input.Password
                placeholder={`${t('signUp.confirm_password_placeholder')}`}
                name="confirmPassword"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Row style={{
              justifyContent: "center",
              alignItems: "center",
              padding: "19px 0px 14px 0px"
            }}>
              <Col span={8}>
                <SubmitButton
                  className={styles["submit-btn"]}
                  size="large"
                  >
                  {t('common.submit')}
                </SubmitButton>
              </Col>
              <Col span={12} offset={4} style={{textAlign: "right"}}>
                <Button type="link" htmlType="button" className={styles["custom-link-style"]}>
                  <Link to={LOGIN_PATH} style={{textDecoration:"underline"}}>{t('forgotPassword.login_path')}</Link>
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassWordForm