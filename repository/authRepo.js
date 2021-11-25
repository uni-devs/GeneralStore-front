export default function ($axios) {
  return {
    /**
     * @param userData - An object holds he first and last name + the phone and the password
     **/
    register: function (userData) {
      return $axios.post("auth/register",{...userData});
    },
    sendResetPasswordOTP: function (phone){
      return $axios.post("/auth/request-pass", phone)
    },
    checkOTP: function (phone, code){
      const request = {
        phone:phone,
        code: code
      }
      return $axios.post(`/auth/request-pass/verify-code`, request)
    },
    applyNewPassword: function (phone, code, password){
      const request = {
        phone:phone,
        code: code,
        newPass:password
      }
      return $axios.post(`/auth/request-pass/reset`, request)
    }
  }
}
