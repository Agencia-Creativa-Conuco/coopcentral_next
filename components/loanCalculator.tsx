"use client";

import { useState } from "react";
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
      newErrors.amount = "Ingrese un monto válido";
    } else if (parseFloat(amount) < 1000) {
      newErrors.amount = "El monto mínimo es $1,000";
    } else if (parseFloat(amount) > 5000000) {
      newErrors.amount = "El monto máximo es $5,000,000";
    }

    if (!term || parseInt(term) <= 0) {
      newErrors.term = "Ingrese un plazo válido";
    } else if (parseInt(term) > 240) {
      newErrors.term = "El plazo máximo es 240 meses";
    }

    if (!rate || parseFloat(rate) <= 0) {
      newErrors.rate = "Ingrese una tasa válida";
    } else if (parseFloat(rate) > 50) {
      newErrors.rate = "La tasa máxima es 50%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateLoan = () => {
    if (!validateForm()) return;

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
    }).format(value);
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="amount" className={styles.label}>
            Monto del préstamo
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`${styles.input} ${errors.amount ? styles.error : ""}`}
            placeholder="Ej: 100000"
          />
          {errors.amount && (
            <span className={styles.errorText}>{errors.amount}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="term" className={styles.label}>
            Plazo (meses)
          </label>
          <input
            id="term"
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className={`${styles.input} ${errors.term ? styles.error : ""}`}
            placeholder="Ej: 60"
          />
          {errors.term && (
            <span className={styles.errorText}>{errors.term}</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="rate" className={styles.label}>
            Tasa de interés anual (%)
          </label>
          <input
            id="rate"
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={`${styles.input} ${errors.rate ? styles.error : ""}`}
            placeholder="Ej: 12.5"
          />
          {errors.rate && (
            <span className={styles.errorText}>{errors.rate}</span>
          )}
        </div>

        <button onClick={calculateLoan} className={styles.calculateButton}>
          Calcular
        </button>
      </div>

      {calculation && (
        <div className={styles.results}>
          <h3 className={styles.resultsTitle}>Resultados</h3>
          <div className={styles.resultItem}>
            <span>Pago mensual:</span>
            <strong>{formatCurrency(calculation.monthlyPayment)}</strong>
          </div>
          <div className={styles.resultItem}>
            <span>Total de intereses:</span>
            <strong>{formatCurrency(calculation.totalInterest)}</strong>
          </div>
          <div className={styles.resultItem}>
            <span>Monto total a pagar:</span>
            <strong>{formatCurrency(calculation.totalAmount)}</strong>
          </div>

          <button
            onClick={() => setShowTable(!showTable)}
            className={styles.toggleButton}
          >
            {showTable ? "Ocultar" : "Ver"} tabla de amortización
          </button>

          {showTable && (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Pago</th>
                    <th>Capital</th>
                    <th>Interés</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {calculation.amortizationTable.map((row) => (
                    <tr key={row.month}>
                      <td>{row.month}</td>
                      <td>{formatCurrency(row.payment)}</td>
                      <td>{formatCurrency(row.principal)}</td>
                      <td>{formatCurrency(row.interest)}</td>
                      <td>{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
