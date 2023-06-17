// class ErrorHandler extends Error{
//     constructor(message, code){
//         super(message)
//         this.code = code;
//     }
// }

// export const customizedError = (err, req, res, next) => {
//     err.message = err.message || "Internal Server Error";
//     return res.status(404).json({
//       success: false,
//       message: err.message,
//     });
//   };

// export default ErrorHandler;