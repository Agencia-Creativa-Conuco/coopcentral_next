"use client";
import React, { useState, useEffect } from "react";
import styles from "./loanCalculator.module.scss";

interface LoanCalculation {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  amortizationTable: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

interface ValidationErrors {
  amount?: string;
  term?: string;
  rate?: string;
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Por favor ingrese un monto válido mayor a 0";
    } else if (parseFloat(amount) < 1000) {
      newErrors.amount = "El monto mínimo es RD$1,000";
    } else if (parseFloat(amount) > 5000000) {
      newErrors.amount = "El monto máximo es RD$5,000,000";
    }

    if (!term || parseInt(term) <= 0) {
      newErrors.term = "Por favor ingrese un plazo válido mayor a 0";
    } else if (parseInt(term) > 240) {
      newErrors.term = "El plazo máximo es 240 meses";
    }

    if (!rate || parseFloat(rate) <= 0) {
      newErrors.rate = "Por favor ingrese una tasa válida mayor a 0";
    } else if (parseFloat(rate) > 50) {
      newErrors.rate = "La tasa máxima es 50%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateLoan = () => {
    if (!validateForm()) {
      setCalculation(null);
      setShowTable(false);
      return;
    }

    const principal = parseFloat(amount);
    const months = parseInt(term);
    const annualRate = parseFloat(rate) / 100;
    const monthlyRate = annualRate / 12;

    // Calcular pago mensual usando la fórmula de amortización
    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = monthlyPayment * months;
    const totalInterest = totalAmount - principal;

    // Generar tabla de amortización
    const amortizationTable = [];
    let balance = principal;

    for (let month = 1; month <= months; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      amortizationTable.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    setCalculation({
      monthlyPayment,
      totalInterest,
      totalAmount,
      amortizationTable,
    });
    setShowTable(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-DO", {
      style: "currency",
      currency: "DOP",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className={styles.calculator}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputs}>
          <div className={styles.inputWrapper}>
            <label htmlFor="amount">Monto del préstamo (RD$)</label>
            <input
              id="amount"
              type="number"
              className={`${styles.input} ${
                errors.amount ? styles.inputError : ""
              }`}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) {
                  setErrors({ ...errors, amount: undefined });
                }
              }}
              placeholder="Ej: 500,000"
              min="1000"
              max="5000000"
              step="1000"
            />
            {errors.amount && (
              <span className={styles.errorMessage}>{errors.amount}</span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="term">Plazo (meses)</label>
            <input
              id="term"
              type="number"
              className={`${styles.input} ${
                errors.term ? styles.inputError : ""
              }`}
              value={term}
              onChange={(e) => {
                setTerm(e.target.value);
                if (errors.term) {
                  setErrors({ ...errors, term: undefined });
                }
              }}
              placeholder="Ej: 12"
              min="1"
              max="240"
            />
            {errors.term && (
              <span className={styles.errorMessage}>{errors.term}</span>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="rate">Tasa de interés anual (%)</label>
            <input
              id="rate"
              type="number"
              className={`${styles.input} ${
                errors.rate ? styles.inputError : ""
              }`}
              value={rate}
              onChange={(e) => {
                setRate(e.target.value);
                if (errors.rate) {
                  setErrors({ ...errors, rate: undefined });
                }
              }}
              placeholder="Ej: 24"
              min="1"
              max="50"
              step="0.1"
            />
            {errors.rate && (
              <span className={styles.errorMessage}>{errors.rate}</span>
            )}
          </div>
        </div>

        <div className={styles.buttonBox}>
          <button
            type="button"
            className={styles.calculateButton}
            onClick={calculateLoan}
          >
            Calcular préstamo
          </button>
        </div>

        {calculation && (
          <>
            <div className={styles.results}>
              <div className={styles.result}>
                <h4 className={styles.resultTitle}>Pago mensual</h4>
                <h3 className={styles.resultValue}>
                  {formatCurrency(calculation.monthlyPayment)}
                </h3>
              </div>

              <div className={styles.result}>
                <h4 className={styles.resultTitle}>Total de intereses</h4>
                <h3 className={styles.resultValue}>
                  {formatCurrency(calculation.totalInterest)}
                </h3>
              </div>

              <div className={styles.result}>
                <h4 className={styles.resultTitle}>Monto total a pagar</h4>
                <h3 className={styles.resultValue}>
                  {formatCurrency(calculation.totalAmount)}
                </h3>
              </div>
            </div>

            <div className={styles.buttonBox}>
              <button
                type="button"
                className={styles.button}
                onClick={() => setShowTable(!showTable)}
              >
                {showTable ? "Ocultar" : "Ver"} tabla de amortización
              </button>
            </div>

            {showTable && (
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr>
                      <th className={styles.th}>Mes</th>
                      <th className={styles.th}>Pago</th>
                      <th className={styles.th}>Capital</th>
                      <th className={styles.th}>Interés</th>
                      <th className={styles.th}>Balance</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tbody}>
                    {calculation.amortizationTable.map((row) => (
                      <tr key={row.month} className={styles.tr}>
                        <td className={styles.td}>{row.month}</td>
                        <td className={styles.td}>
                          {formatCurrency(row.payment)}
                        </td>
                        <td className={styles.td}>
                          {formatCurrency(row.principal)}
                        </td>
                        <td className={styles.td}>
                          {formatCurrency(row.interest)}
                        </td>
                        <td className={styles.td}>
                          {formatCurrency(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
}
