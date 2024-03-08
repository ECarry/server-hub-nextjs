"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const DashboardPage = () => {
  return (
    <div>
      <InputOTP
        maxLength={6}
        render={({ slots }) => (
          <>
            <InputOTPGroup>
              {slots.slice(0, 6).map((slot, index) => (
                <InputOTPSlot key={index} {...slot} />
              ))}{" "}
            </InputOTPGroup>
          </>
        )}
      />
    </div>
  );
};

export default DashboardPage;
