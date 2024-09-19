import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Spinner = () => {
  return (
    <Spin
      className="HV-center"
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          spin
        />
      }
      size="large"
    />
  );
};
export default Spinner;
