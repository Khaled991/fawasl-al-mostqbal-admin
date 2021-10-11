import Loading from "../loading/loading";

interface IWithLoadingProps {
  isLoading: boolean;
  otherProps: any;
}

const WithLoading =
  (WrapperComponent: any) =>
  ({ isLoading, ...otherProps }: IWithLoadingProps) =>
    isLoading ? <Loading /> : <WrapperComponent {...otherProps} />;

export default WithLoading;
