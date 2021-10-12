import { FormEvent, ReactElement, useState } from 'react';
import './SignInPage.scss';
import Wave from '../../assets/img/wave.svg';
import LoginAdmin from '../../assets/img/login-admin.svg';
import Email from '../../assets/icons/email.svg';
import Lock from '../../assets/icons/lock.svg';
import Button from '../../components/Button/Button';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../utils/firebase';
import sha1 from 'sha1';
import { ShowToast } from '../../components/ShowToast/ShowToast';

interface ISignInPage {
  history: any;
}

const SignInPage = ({ history }: ISignInPage): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressSignIn = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, sha1(password));
      ShowToast('تم تسجيل الدخول بنجاح', 'success');
    } catch (error: any) {
      console.log(error.toString());
      if (error.toString().includes('wrong-password'))
        ShowToast('كلمة المرور غير صحيحة', 'error');
      else if (error.toString().includes('user-not-found'))
        ShowToast('البريد الالكتروني غير صحيح', 'error');
      else if (error.toString().includes('too-many-requests'))
        ShowToast(
          'تم ادخال كلمة المرور بشكل خاطئ عدة مرات متتالية، الرجاء المحاولة مرة أخرى لاحقاً',
          'error'
        );
    }
    // if (email.length === 0) {
    // } else if (password.length === 0) {
    // } else {
    //   history.push("/chatpage");
    // }
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
                name="email"
                required
              />
            </div>
            <div className="input-div tow">
              <div className="input-icons">
                <img src={Lock} alt="lock" />
              </div>
              <input
                name="password"
                type="password"
                placeholder="كلمة المرور"
                className="input-box"
                onChange={handelChangePassword}
                required
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
