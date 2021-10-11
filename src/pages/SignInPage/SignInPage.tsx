import { FormEvent, ReactElement, useState } from 'react';
import './SignInPage.scss';
import Wave from '../../assets/img/wave.svg';
import LoginAdmin from '../../assets/img/login-admin.svg';
import Email from '../../assets/icons/email.svg';
import Lock from '../../assets/icons/lock.svg';
import Button from '../../components/Button/Button';
import { ShowToast } from '../../components/ShowToast/ShowToast';

interface ISignInPage {
  history: any;
}

const SignInPage = ({ history }: ISignInPage): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressSignIn = (event: FormEvent) => {
    event.preventDefault();
    if (email.length === 0) {
      ShowToast('البريد الالكتروني غير صحيح', 'error');
    } else if (password.length === 0) {
      ShowToast('كلمة المرور غير صحيحة', 'error');
    } else {
      ShowToast('تم تسجيل الدخول بنجاح', 'success');
      history.push('/home');
    }
  };

  const handelChangeEmail = ({ target: { value } }: any) => {
    setEmail(value);
  };
  const handelChangePassword = ({ target: { value } }: any) => {
    setPassword(value);
  };
  return (
    <div className="sign-in-page">
      <img src={Wave} alt="Wave" className="Wave" />
      <div className="sign-in-page-container">
        <div className="sign-in-img">
          <img
            src={LoginAdmin}
            alt="LoginAdmin"
            className="log-in-admin-image"
          />
        </div>
        <div className="sign-in-container">
          <form onSubmit={onPressSignIn}>
            <h2>لوحة التحكم</h2>
            <div className="input-div one">
              <div className="input-icons">
                <img src={Email} alt="user" />
              </div>
              <input
                type="email"
                placeholder="البريد الالكتروني"
                className="input-box"
                onChange={handelChangeEmail}
              />
            </div>
            <div className="input-div tow">
              <div className="input-icons">
                <img src={Lock} alt="lock" />
              </div>
              <input
                type="password"
                placeholder="كلمة المرور"
                className="input-box"
                onChange={handelChangePassword}
              />
            </div>
            <Button buttonStyleType="solidGreen sign-in-button" type="submit">
              تسجيل الدخول
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
