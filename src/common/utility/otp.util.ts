// src/common/utility/otp.util.ts
export function generateOtp(length = 5): string {
    // example: generate 5 digit OTP
    return Math.floor(
        10000 + Math.random() * 90000
    ).toString(); // returns a 5-digit OTP
}
