import { 
  Formik, 
  FormikHelpers 
} from "formik";
import { 
  Form, 
  Input, 
  SubmitButton 
} from "formik-antd";
import {
  Button, 
  Row, 
  Col, 
  Alert
} from 'antd'
import { 
  useCallback, 
  useState 
} from "react";
import { 
    actionEmailForgotPassword
 } from '../../store/authentication/action'
import { Link } from 'react-router-dom';
import styles from "./index.module.css";
import * as Yup from "yup";
import { useAppDispatch } from "../../store";
import {LOGIN_PATH} from "../../constants/routes";
import { useTranslation } from "react-i18next";
import { ErrorResponse } from "../../api/openapi-generator";

const SendEmailForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
  };

  type FormValues = typeof initialValues;

  const validationSchema = Yup.object({
    email: Yup.string()
    .required(`${t('validation.email_required')}`)
    .email(`${t('validation.email_invalid')}`),
  });

  const handleSubmit = useCallback(
    async (values: FormValues, action: FormikHelpers<FormValues>) => {
      try{
        const message = await dispatch(actionEmailForgotPassword({email: values.email}))
        setSuccess(message)                
      } catch (handleErrors) {
        const error = handleErrors as ErrorResponse
        setError(error.errors?.message ? error.errors?.message : error as string);
      } finally {
        action.setSubmitting(false);
      }
    },[dispatch]
  );

  const handleOnChange = () => {
    if(error){
      setError('')
    }
    if(success){
      setSuccess('')
    }
  }

  return (
    <div className={styles["form-wrapper"]}>
      <h1 style={{ textAlign: "center" }} className={styles["title-form"]}>Reset Password</h1>

      <div style={{ marginTop: "30px", marginBottom:"20px" }}>
          { success ?
            <Alert
              banner={false}
              message={success}
              type="success"
              closable
            />
          : t('forgotPassword.email_instruction')}
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form layout="vertical"
          >
            <Form.Item name="email" label={<span style={{fontWeight:"bold", fontSize:"15px"}}>{t('common.email')}</span>} >
              <Input
                placeholder={`${t('common.email_placeholder')}`}
                name="email"
                suffix={<span style={{width: "37px", height: "29px"}} />}
                prefix={<span />}
                onChange={handleOnChange}
              />
            </Form.Item>
            <div style={{ margin: "4px 0" }}>
              {error ? (
                <Alert
                  banner={false}
                  message={<span className={styles["custom-alert-error"]}>{error}</span>}
                  className={styles["custom-alert-style"]}
                  type="error"
                  closable
                />
              ) : (
                <></>
              )} 
            </div>
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
                  {t('common.send')}
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

export default SendEmailForm;
