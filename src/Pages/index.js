import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Box,
  Stepper,
  StepLabel,
  Step,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";

const sleepTime = (time) => new Promise((set) => setTimeout(set, time));

export default function Home() {
  return (
    <Card>
      <CardContent>
        <FormkikStepper
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            designation: "",
            jobTitle: "",
            orgName: "",
          }}
          onSubmit={async () => {
            await sleepTime(3000);
          }}
        >
          <FormikStep
            label="Basic Info"
            validationSchema={yup.object().shape({
              firstname: yup.string().required("first name is required"),
              lastname: yup.string().required("last name is required"),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="firstname"
                component={TextField}
                label="First Name"
              />
            </Box>

            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="lastname"
                component={TextField}
                label="Last Name"
              />
            </Box>
          </FormikStep>

          <FormikStep
            label="Credential Details"
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email("invalid email")
                .required("email is required"),
              password: yup
                .string()
                .required("password is required")
                .min(8, "your password too short atleast 8 characters")
                .max(15, "your password too large less than 15 character"),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="email"
                component={TextField}
                label="Email"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="password"
                type="password"
                component={TextField}
                label="Password"
              />
            </Box>
          </FormikStep>

          <FormikStep
            label="Employment Details"
            validationSchema={yup.object().shape({
              jobTitle: yup.string().required("job title is required"),
              orgName: yup.string().required("organization name is required"),
              designation: yup.string().required("designation is required"),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="designation"
                component={TextField}
                label="Designation"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="orgName"
                component={TextField}
                label="Organization Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="jobTitle"
                component={TextField}
                label="Job Title"
              />
            </Box>
          </FormikStep>
        </FormkikStepper>
      </CardContent>
    </Card>
  );
}
export function FormikStep({ children }) {
  return <> {children} </>;
}
export function FormkikStepper({ children, ...props }) {
  const arrayChildren = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChildren = arrayChildren[step];
  const [completed, setCompleted] = useState(false);
  console.log(currentChildren);
  const stepBack = () => {
    setStep((step) => step - 1);
  };
  function isLast() {
    return step === arrayChildren.length - 1;
  }
  return (
    <Formik
      {...props}
      validationSchema={currentChildren.props.validationSchema}
      onSubmit={async (values, helper) => {
        if (isLast()) {
          await props.onSubmit(values, helper);
          setCompleted(true);
          helper.resetForm();
          setStep(0);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {arrayChildren.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentChildren}
          <Grid container spacing={1}>
            <Grid item>
              {step > 0 ? (
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={stepBack}
                >
                  Back
                </Button>
              ) : null}
            </Grid>
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {" "}
                {isSubmitting ? "Submitting" : isLast() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
