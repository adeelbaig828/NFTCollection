import { useSelector } from "react-redux";

const useAddress = () => {
  const address = useSelector((state) => state?.web3?.wallet);

  return address;
};

export default useAddress;
