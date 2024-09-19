// import { useHistory, useLocation, useParams } from "react-router-dom";
import { Button } from "antd";

// import LogoBigIcon from "../../images/icons/logo-big-icon";
// import ArrowLineIcon from "../../images/icons/arrow-line-icon";

const PageNotFound = () => {
  //   const { workspaceId } = useParams<{
  //     workspaceId: string;
  //   }>();

  //   const history = useHistory();
  //   const location = useLocation();

  const redirectToDashBoard = () => {
    // history.push(`/workspaces/${workspaceId}/dashboard/traffic`);
  };

  const returnToBack = () => {
    // history.goBack();
  };

  return (
    <div className="HV-center table-center page-not-found">
      <div className="text-center">
        {/* <LogoBigIcon /> */}
        <h1 className="h4">{"common.labels.page_not_found"}</h1>
        <p className="m-b-16">{"common.labels.page_does_not_exist"}</p>
        <div className="ant-row ant-row-center">
          <Button
            onClick={returnToBack}
            icon={<span className="anticon">{/* <ArrowLineIcon /> */}</span>}
            className="go-back"
          >
            {"common.labels.go_back"}
          </Button>
          {![
            "/login",
            "/forgot-password",
            "/set-password",
            "/reset-password",
            "/two-factor-authentication",
            "/two-factor-authentication/email",
            "/two-factor-authentication/authenticatorApp",
            "/two-factor-authentication/authenticateUsingBoth",
            "/two-factor-authentication/email/",
            "/two-factor-authentication/authenticatorApp/",
            "/two-factor-authentication/authenticateUsingBoth/",
            "/organization",
          ].includes(location.pathname) && (
            <Button type="primary" onClick={redirectToDashBoard}>
              {"common.labels.go_to_dashboard"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default PageNotFound;
