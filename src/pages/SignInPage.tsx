import { useNavigate } from "react-router-dom";
import { HomePath } from "../RouteNames";
import AuthService from "../services/AuthService";

function SignInPage() {
  const authService = new AuthService();
  const navigate = useNavigate();

  const onClickLogin = async () => {
    const isSuccess = await authService.signIn();
    if (isSuccess) navigate(HomePath);
  };

  return (
    <div>
      <button onClick={onClickLogin}>Login</button>
    </div>
  );
}

export default SignInPage;
