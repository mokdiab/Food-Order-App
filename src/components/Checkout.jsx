import Modal from "./Modal";
import { totalPrice } from "../utils/utils";
import Button from "./UI/Button";
import Error from "./Error";
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import useHttp from "../hooks/useHttp";
import { UserProgressContext } from "../store/userProgressContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
export default function Checkout() {
  const { items, onClearCart } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const handleHideCheckout = () => {
    userProgressCtx.hideCheckout();
  };
  const requestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const userSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    street: Yup.string().required("Street is required"),
    "postal-code": Yup.string().required("Postal code is required"),
    city: Yup.string().required("City is required"),
  });
  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );
  const handleSubmit = (values, actions) => {
    if (!userSchema.isValidSync(values)) {
      console.log("Form is not valid. Submission aborted.");
      return;
    }
    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: values,
        },
      })
    );
    // handleHideCheckout();
    actions.setSubmitting(false);
  };
  const handleFinished = () => {
    userProgressCtx.hideCheckout();
    onClearCart();
    clearData();
  };
  let actions = (isSubmitting) => {
    return (
      <>
        <p className="modal-actions">
          <Button type="button" onClick={handleHideCheckout} textOnly>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Submit order
          </Button>
        </p>
      </>
    );
  };

  if (isLoading) {
    actions = (isSubmitting) => {
      return (
        <div className="center">
          <ClimbingBoxLoader
            color="#ffc404"
            cssOverride=""
            loading={isLoading}
            size={15}
            speedMultiplier={1}
          />
        </div>
      );
    };
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleHideCheckout}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinished}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleHideCheckout}
    >
      <h3>Checkout</h3>
      <p>Your total is {totalPrice(items)}</p>
      <Formik
        initialValues={{
          name: "",
          email: "",
          street: "",
          "postal-code": "",
          city: "",
        }}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form action="">
            <div className="control">
              <label htmlFor="full-name">Full Name</label>
              <Field
                label={"Full Name"}
                id={"full-name"}
                type="text"
                name="name"
              />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className="control">
              <label htmlFor="email">Email</label>
              <Field label={"Email"} id={"email"} name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="control">
              <label htmlFor="street">Street</label>
              <Field label={"Street"} name="street" id={"street"} type="text" />
              <ErrorMessage name="street" component="div" />
            </div>
            <div className="control-row">
              <div className="control">
                <label htmlFor="postal-code">Postal code</label>
                <Field
                  label={"Postal code"}
                  name="postal-code"
                  id={"postal-code"}
                  type="text"
                />
                <ErrorMessage name="postal-code" component="div" />
              </div>
              <div className="control">
                <label htmlFor="city">City</label>
                <Field label={"City"} name="city" id={"city"} type="text" />
                <ErrorMessage name="city" component="div" />
              </div>
            </div>
            {error && <Error message={error} title={"Somethisng went wrong"} />}
            {actions(isSubmitting)}
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
