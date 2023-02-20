import { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";

import { Link, useNavigate } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ["Shipping Address", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
      } catch (error) {
        navigate("/");
      }
    };
    generateToken();
  }, [cart, navigate]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };
  let Confirmation = () =>
    order.customer ? (
      <div>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}. You will receive a confirmation email
            shortly.
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back To Home
        </Button>
      </div>
    ) : isFinished ? (
      <div>
        <div>
          <Typography variant="h5">
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </Typography>
          <Divider className={classes.divider} />
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back To Home
        </Button>
      </div>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <div>
      <Typography variant="h5">Error: {error} </Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back To Home
      </Button>
    </div>;
  }
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
      />
    );

  return (
    <div>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </div>
  );
};
export default Checkout;
