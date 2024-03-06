import CardWrapper from "@/components/auth/card-wrapper";

const ErrorPage = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center"></div>
    </CardWrapper>
  );
};

export default ErrorPage;
