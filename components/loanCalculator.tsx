import React, { useState } from "react";

import Loading from "../loading";

import HubspotForm from "react-hubspot-form";

import { useForm } from "react-hook-form";

export default function LoanCalculator({}) {
  const formatNumber = new Intl.NumberFormat("en-US");

  const { register, errors, handleSubmit } = useForm();

  const [isFormSubmiting, setFormSubmiting] = useState(false);

  const [amortizationReady, setAmortizationReady] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);

  const [results, setResults] = useState({
    monthlyPayment: 0.0,
    totalPayment: 0.0,
    totalInterest: 0.0,
  });
  const [errorMessages, setErrorMessages] = useState([]);

  const onSubmit = async (data) => {
    setFormSubmiting(true);

    // Parámetros iniciales
    const amount = Number(data.amount);
    const rate = Number(data.rate); // Se transforma a meses
    const duration = Number(data.period); //Se transforma a meses
    const method = data.method; //Define el metodo de calculo

    const {
      monthlyPayment,
      monthlyInterest,
      monthlyCapital,
      totalPayment,
      totalInterest,
      isResult,
    } = calculate(method, amount, duration, rate);

    const { amortization } = amortize(method, amount, duration, rate);

    setResults({
      monthlyPayment,
      monthlyInterest,
      monthlyCapital,
      totalPayment,
      totalInterest,
      isResult,
      amortization,
    });

    setFormSubmiting(false);
  };

  const calculate = (iMethod, iAmount, iDuration, iRate) => {
    // Parámetros iniciales
    const amount = Number(iAmount);
    const rate = Number(iRate) / 100 / 12; // Se transforma a meses
    const duration = Number(iDuration);

    if (iMethod) {
      // Cálculos Cuota Fija
      const capital = amount / duration;
      const interest = amount * rate;
      const monthly = capital + interest;

      if (isFinite(monthly)) {
        const monthlyPaymentCalculated = monthly.toFixed(2);
        const monthlyInterest = interest.toFixed(2);
        const monthlyCapital = capital.toFixed(2);
        const totalPaymentCalculated = (monthly * duration).toFixed(2);
        const totalInterestCalculated = (monthly * duration - amount).toFixed(
          2
        );

        // Set up results to the state to be displayed to the user
        return {
          monthlyPayment: monthlyPaymentCalculated,
          monthlyInterest,
          monthlyCapital,
          monthlyPayment: monthlyPaymentCalculated,
          totalPayment: totalPaymentCalculated,
          totalInterest: totalInterestCalculated,
          amount: amount,
          balance: amount - monthlyCapital,
          remainingDuration: duration - 1,
          isResult: true,
        };
      }
    } else {
      // Cálculos Cuota Fija
      const x = Math.pow(1 + rate, duration);
      const monthly = (amount * x * rate) / (x - 1);
      const interest = amount * rate;
      const capital = monthly - interest;

      if (isFinite(monthly)) {
        const monthlyPaymentCalculated = monthly.toFixed(2);
        const monthlyInterest = interest.toFixed(2);
        const monthlyCapital = capital.toFixed(2);
        const totalPaymentCalculated = (monthly * duration).toFixed(2);
        const totalInterestCalculated = (monthly * duration - amount).toFixed(
          2
        );

        // Set up results to the state to be displayed to the user
        return {
          monthlyPayment: monthlyPaymentCalculated,
          monthlyInterest,
          monthlyCapital,
          monthlyPayment: monthlyPaymentCalculated,
          totalPayment: totalPaymentCalculated,
          totalInterest: totalInterestCalculated,
          amount: amount,
          balance: amount - monthlyCapital,
          remainingDuration: duration - 1,
          isResult: true,
        };
      }
    }
  };

  const amortize = (iMethod, amount, duration, rate) => {
    let body = [];
    let result;

    for (var i = 0; i < duration; i++) {
      if (i < 1) {
        result = calculate(iMethod, amount, duration, rate);
      } else {
        result = calculate(
          iMethod,
          result.balance,
          result.remainingDuration,
          rate
        );
      }

      setAmortizationReady(true);

      body.push([
        i + 1,
        result.monthlyPayment,
        result.monthlyCapital,
        result.monthlyInterest,
        result.balance,
      ]);
    }

    setAmortizationReady(true);

    return {
      amortization: {
        head: ["pago", "Cuota", "Capital", "Intereses", "Balance"],
        body,
      },
    };
  };

  const { openModal } = actions.theme;

  const openContactModal = () => {
    state.theme.modalTitle = "Contáctanos";
    state.theme.modalContent = () => () =>
      (
        <Form>
          <HubspotForm
            portalId={state.theme.settings.hubspot.id}
            formId="b845c8ab-9eea-48c1-90ca-278bef416e72"
            loading={<Loading height="200px" />}
          />
        </Form>
      );
    openModal();
  };

  return true ? (
    <Calculator bgColor={colors.gray.light}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col size={12} order={1}>
            <Inputs>
              <Row>
                {/* <Col size={12}>
                                    <Switch>
                                        <SwitchInput
                                            type="checkbox"
                                            name="method"
                                            ref={register}
                                        />
                                        <SwitchText>Capital fijo</SwitchText>
                                    </Switch>
                                </Col> */}
                <Col size={12} sizeMD={4}>
                  <InputWrapper>
                    <Input
                      type="number"
                      name="amount"
                      min="1"
                      step="0.01"
                      placeholder="Monto"
                      disabled={isFormSubmiting}
                      // defaultValue={100000}
                      ref={register({
                        required: "Este campo es requerido",
                      })}
                    />
                    {errors["amount"] ? (
                      <InputError color={state.theme.colors.red.base}>
                        {errors["amount"].message}
                      </InputError>
                    ) : null}
                  </InputWrapper>
                </Col>
                <Col size={12} sizeMD={4}>
                  <InputWrapper>
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      name="period"
                      placeholder="Meses"
                      disabled={isFormSubmiting}
                      // defaultValue={24}
                      ref={register({
                        required: "Este campo es requerido",
                      })}
                    />
                    {errors["period"] ? (
                      <InputError color={state.theme.colors.red.base}>
                        {errors["period"].message}
                      </InputError>
                    ) : null}
                  </InputWrapper>
                </Col>
                <Col size={12} sizeMD={4}>
                  <InputWrapper>
                    <Input
                      type="number"
                      min="0.01"
                      step="0.01"
                      name="rate"
                      placeholder="Tasa anual"
                      disabled={isFormSubmiting}
                      // defaultValue={24}
                      ref={register({
                        required: "Este campo es requerido",
                      })}
                    />
                    {errors["rate"] ? (
                      <InputError color={state.theme.colors.red.base}>
                        {errors["rate"].message}
                      </InputError>
                    ) : null}
                  </InputWrapper>
                </Col>

                {errorMessages.length > 0 && (
                  <Col size="12">
                    <ErrorMessages>
                      {errorMessages.map((item, index) => {
                        return (
                          <ErrorMessage key={index}>
                            {item.message}
                          </ErrorMessage>
                        );
                      })}
                    </ErrorMessages>
                  </Col>
                )}
              </Row>
            </Inputs>
          </Col>

          <Col size={12} sizeMD={8} order={3}>
            <Row>
              <Col>
                <Results>
                  <Row>
                    <Col size={12} sizeMD={6}>
                      <Result>
                        <ResultTitle>Cuota mensual</ResultTitle>
                        <ResultValue>
                          {formatNumber.format(results.monthlyPayment)}
                        </ResultValue>
                      </Result>
                    </Col>
                    <Col size={12} sizeMD={6}>
                      <Result>
                        <ResultTitle>Total Intereses</ResultTitle>
                        <ResultValue>
                          {formatNumber.format(results.totalInterest)}
                        </ResultValue>
                      </Result>
                    </Col>
                    <Col size={12} sizeMD={6}>
                      <Result>
                        <ResultTitle>Monto Total</ResultTitle>
                        <ResultValue>
                          {formatNumber.format(results.totalPayment)}
                        </ResultValue>
                      </Result>
                    </Col>
                  </Row>
                </Results>
              </Col>
            </Row>
          </Col>

          <Col size={12} sizeMD={4} order={2}>
            <Row justifyContent="center">
              <Col size={12}>
                <ButtonBox>
                  <Submit
                    type="submit"
                    value="Calcular"
                    color={colors.text_main}
                    bgColor={colors.yellow.base}
                    bgColorDisabled="#F0F7F2"
                  />
                </ButtonBox>
              </Col>
              <Col size={12}>
                <ButtonBox>
                  <Button
                    color={"#FFFFFF"}
                    colorDisabled={colors.primary.base}
                    bgColor={colors.primary.base}
                    bgColorDisabled="#F0F7F2"
                    disabled={!amortizationReady}
                    onClick={(e) => {
                      setShowAmortization(true);
                    }}
                  >
                    Amortizar
                  </Button>
                </ButtonBox>
              </Col>
              {/* <Col size="auto">
                                <ButtonBox>
                                    <Button 
                                        bgColor="#F0F7F2"
                                        color={colors.primary.light} 
                                        disabled={!amortizationReady}
                                        onClick={(e)=>{openContactModal()}}
                                    >
                                        Solicitar
                                    </Button>
                                </ButtonBox>
                            </Col> */}
            </Row>
          </Col>
        </Row>
      </Form>

      {showAmortization ? (
        <>
          <Section spaceBottomNone>
            <Container noGutters>
              <Row>
                <Col
                  css={css`
                    overflow: auto;
                  `}
                >
                  <Table>
                    <THead>
                      <Tr>
                        {results.amortization.head.map((item, index) => {
                          return <Th key={index}>{item}</Th>;
                        })}
                      </Tr>
                    </THead>
                    <TBody>
                      {results.amortization.body.map((item, index) => {
                        const fees = item;

                        return (
                          <Tr key={index}>
                            {fees.map((item, index) => {
                              return (
                                <Td key={index}>{formatNumber.format(item)}</Td>
                              );
                            })}
                          </Tr>
                        );
                      })}
                    </TBody>
                  </Table>
                </Col>
              </Row>
              {/* <Row>
                                <Col size="auto" sizeMD={12} mxAuto>
                                    <Section as="div" thin>
                                        <ButtonBox>
                                            <Button 
                                                bgColor="#F0F7F2"
                                                color={colors.primary.light} 
                                                disabled={!amortizationReady}
                                                onClick={(e)=>{openContactModal()}}
                                            >
                                                Solicitar
                                            </Button>
                                        </ButtonBox>
                                    </Section>
                                </Col>
                            </Row> */}
            </Container>
          </Section>
        </>
      ) : null}
    </Calculator>
  ) : (
    <MessageBox>
      <MessageTitle>Mensaje enviado</MessageTitle>
      <MessageText>
        Gracias por contactarnos. Tratamos de responder lo más rápido posible.
      </MessageText>
    </MessageBox>
  );
}
