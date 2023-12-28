import API from './api.js';
import { setLocal } from './helpers.js';

const authEle = {
  loginForm: document.querySelector('#login'),
  nameInp: document.querySelector('#name'),
  passInp: document.querySelector('#pass'),
  nameWarn: document.querySelector('.name-warning'),
  passWarn: document.querySelector('.pass-warning'),
};
//  sifre kuralları için regex
// min 1 büyük ve küçük harf
// min 1 sayı
// min 1 özel karakter
// min 8 karakter
const regex =
  '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$';

//isim ve sifreyi kontrol et
const checkValues = (name, pass) => {
  let isPassError = false
  let isNameError = false

  //ismi kontrol et

  if(!name.trim()){
    isNameError = true
    authEle.nameWarn.innerHTML = "<p> Lütfen isim giriniz</p>"
  } else {
    isNameError = false;
    authEle.nameWarn.innerHTML = '';
  }

  if (!pass.trim()) {
    isPassError = true;
    authEle.passWarn.innerHTML = 
    "<p>Lütfen şifre giriniz</p>";
  }else if (pass.length < 8) {
    isPassError = true;
    authEle.passWarn.innerHTML = '<p>Şifre en az 8 haneli olmalı</p>';
  }else if (!pass.match(regex)) {
    isPassError = true;
    authEle.passWarn.innerHTML = '<p>Şifre yeterince güçlü değil</p>';
  }else {
    isPassError = false;
    authEle.passWarn.innerHTML = '';
  }

  //3. fonksiyonun döndüreceği degere karar
  if (isNameError || isPassError) {
    return false;
  } else {
    return true;
  }
   
}



//formun gonderilme olayı 
authEle.loginForm.addEventListener('submit', (e) => {
// sayfayı yenilemeyi engelle
    e.preventDefault();

  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

//hata yoksa kullanıc bil. al
  if (checkValues(name, pass)) {
  // kullanıcı bilgilerini apiden al
    API.getUser(name)
      .then((data) => {
        if (data.status === 'error') {

//kullanıcı bulunamadıysa uyarı ver
          authEle.nameWarn.innerHTML = '<p>Kullanıcı bulunamadı</p>';
        } else {

 // kullanıcı bulunduysa locale kaydet
          setLocal('user', data);
          console.log(setLocal)

// anasayfaya yönlendir
          location = '/';
        }
      })
      .catch((err) => console.log(err));
  }
  
})