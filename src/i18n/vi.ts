import { TTranslations } from "./EN";

export const vi: TTranslations = {
  common: {
    hi: "Xin chào",
    save: "Lưu",
    continue: "Tiếp tục",
    signOut: "Đăng xuất",
    ok: "Đồng ý",
    cancel: "Hủy",
  },
  biometric: {
    FaceID: {
      title: "Bảo vệ tài khoản của bạn\nvới Face ID",
      message:
        "Đây là cách chúng tôi đảm bảo rằng chỉ có bạn\nmới có thể truy cập vào ví của mình.",
      enableBTN: "Kích hoạt Face ID",
    },
    TouchID: {
      title: "Bảo vệ tài khoản của bạn\nvới Touch ID",
      message:
        "Đây là cách chúng tôi đảm bảo rằng chỉ có bạn\nmới có thể truy cập vào ví của mình.",
      enableBTN: "Kích hoạt Touch ID",
    },
    Biometrics: {
      title: "Bảo vệ tài khoản của bạn\nvới Xác thực Vân tay",
      message:
        "Đây là cách chúng tôi đảm bảo rằng chỉ có bạn\nmới có thể truy cập vào ví của mình.",
      enableBTN: "Kích hoạt Vân tay",
    },
    promtMessage: "Xác nhận vân tay của bạn",
    cancelButtonText: "Hủy",
  },
  input: {
    email: {
      label: "Email",
      placeholder: "Nhập email của bạn",
    },
    password: {
      label: "Mật khẩu",
      placeholder: "Nhập mật khẩu của bạn",
    },
  },
  errorMessage: {
    input: {
      compare: "{{input}} phải khớp",
      required: "Vui lòng đảm bảo bạn đã điền {{input}}.",
      incorrect: "Vui lòng đảm bảo bạn đã nhập thông tin chính xác.",
      invalid: "{{input}} không hợp lệ.",
      mesExtensionOne: "Vui lòng chỉ tải lên định dạng pdf, png, jpg, jpeg",
      bankAccountNumber: "Số tài khoản phải có từ 10 đến 15 chữ số.",
      email: "Vui lòng nhập địa chỉ email hợp lệ",
      dob: "Bạn phải ít nhất 18 tuổi để sử dụng ứng dụng này.",
    },
    minLength: " độ dài phải lớn hơn hoặc bằng {{length}}",
    maxLength: " độ dài phải nhỏ hơn hoặc bằng {{length}}",
  },
  language: {
    title: "Ngôn ngữ",
  },
  signIn: {
    title: "Đăng nhập",
    submitButton: "Đăng nhập",
  },
  signOut: {
    modal: {
      title: "Đăng xuất",
      message: "Bạn có chắc chắn muốn đăng xuất không?",
    },
  },
  home: {
    title: "Trang chủ",
  },
};
