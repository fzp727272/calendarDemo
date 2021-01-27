import React from 'react';
import styles from './index.less';
import logo from '../../assets/logo.png';
import { connect } from 'dva';

const LoginPage = ({ dispatch, login }) => {
  const onLogin = e => {
    e.preventDefault();
    dispatch({
      type: 'login/login',
      payload: login,
    });
  };

  const handleUserNameChange = event => {
    dispatch({
      type: 'login/reduce',
      payload: { userName: event.target.value },
    });
  };

  const handlePasswordChange = event => {
    dispatch({
      type: 'login/reduce',
      payload: { password: event.target.value },
    });
  };

  return (
    <div className={styles.loginDiv}>
      <form className={styles.formContainer} onSubmit={onLogin}>
        <div className={styles.imgContainer}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="TMS" />
          </div>
          <h2 className={styles.imgTitle}>中通一体化物流</h2>
          <p className={styles.imgText}>Zhongtong Transportation Management System</p>
          {/* <p  className={styles.urlText}>http://www.shytsc.com</p> */}
        </div>
        <div className={styles.signInform}>
          <div className={styles.signInformInner}>
            <div className={styles.signInContainer}>
              <div className={styles.title}>
                {/* <img style={{ width: '30%' }} src={logo2} alt="TMS" /> */}
                <h2 style={{ marginTop: 18 }}> 登陆</h2>
              </div>
            </div>

            <h3 className={styles.logInName}>用户名</h3>
            <input
              value={login.userName}
              onChange={handleUserNameChange}
              className={styles.inputContainer}
              placeholder="用户名/手机号码"
            />
            <h3 className={styles.logInName}>密码</h3>

            <input
              value={login.password}
              onChange={handlePasswordChange}
              className={styles.inputContainer}
              type="password"
              placeholder="密码"
            />
            <div style={{ marginTop: 12, textAlign: 'left', lineHeight: '16px' }}>
              <input
                style={{ float: 'left', width: 24 }}
                type="checkbox"
                className="styled-checkbox"
              />
              <label
                style={{
                  textAlign: 'left',
                  fontSize: 12,
                  marginTop: 155,
                  marginLeft: 4,
                  color: '#BABAC8',
                }}
              >
                7天内免登陆
              </label>
            </div>

            <button className={styles.buttonContainer} onClick={onLogin}>
              <div className={styles.buttonText}>登录</div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(({ login }) => ({
  login,
}))(LoginPage);
