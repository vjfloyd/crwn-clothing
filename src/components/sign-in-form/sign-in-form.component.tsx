import {ChangeEvent, FormEvent, useState} from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";
import {useDispatch} from "react-redux";
import {ButtonContainer, SignInFormContainer} from "./sign-in-form.styles";


const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const dispatch = useDispatch();

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    try {

      dispatch(emailSignInStart(email,password))

      resetFormFields();
    } catch (error ) {
      console.log("user sign in failed ", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signWithGoogle = async () => {
    //await signInWithGooglePopup();
    dispatch(googleSignInStart());

  };

  return (
    <SignInFormContainer>
      <h2>Already have an account </h2>
      <span> Sign in with your email and password</span>
      <form onSubmit={(e) => handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signWithGoogle}
          >
            Sign In Google
          </Button>
        </ButtonContainer>
      </form>
    </SignInFormContainer>
  );
};

export default SignInForm;
