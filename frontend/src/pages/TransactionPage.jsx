import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTransaction, deleteTransaction, getCategorySummary, getTransactions, updateTransaction } from "../services/transactionService";
import { useNavigate } from "react-router-dom";
import { getJourneyById } from "../services/journeyService";
import "../styles/TransactionPage.css";
import "../styles/Common.css";
import AppLayout from "../components/AppLayout";
import { FaTrash } from "react-icons/fa";

import {
    FaCar,
    FaHotel,
    FaUtensils,
    FaGamepad,
    FaShoppingBag,
    FaShieldAlt,
    FaEllipsisH
} from "react-icons/fa";

function TransactionPage() {
    const [transactions, setTransactions] = useState([]);
    const { journeyId } = useParams();
    const [journeyName, setJourneyName] = useState("");
    const navigate = useNavigate();

    const [currency, setCurrency] = useState("");
    const [transactionDate, setTransactionDate] = useState("");

    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("...");
    const [depositAmount, setDepositAmount] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");

    const [editingTransactionId, setEditingTransactionId] = useState(null);
    const [editCurrency, setEditCurrency] = useState("");
    const [editTransactionDate, setEditTransactionDate] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDepositAmount, setEditDepositAmount] = useState("");
    const [editExpenseAmount, setEditExpenseAmount] = useState("");
    
    const [defaultCurrency, setDefaultCurrency] = useState("USD");

    const [categorySummary, setCategorySummary] = useState([]);

    console.log("journeyId:", journeyId);
    console.log("token:", localStorage.getItem("authToken"));

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate("/login");
            return;
        }

        async function loadTransactions() {
            try {

                const journey = await getJourneyById(journeyId);
                setJourneyName(journey.journeyName);
                setCurrency(journey.defaultCurrency);

                const transactionData = await getTransactions(journeyId);
                transactionData.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

                setTransactions(transactionData);

                const summaryData = await getCategorySummary(journeyId);
                setCategorySummary(summaryData);

            } catch (error) {
                localStorage.removeItem("authToken");
                navigate("/login");
            }
        }

        loadTransactions();

    }, [journeyId, navigate]);

    async function refreshCategorySummary() {
        const summaryData = await getCategorySummary(journeyId);
        setCategorySummary(summaryData);
    }

    async function handleLogout(event) {
        localStorage.removeItem('authToken');
        navigate("/login");
    }

    async function handleCreateTransaction(event) {
        event.preventDefault();
        let amount;
        let type;

        if (depositAmount) {
            amount = depositAmount;
            type = 'DEPOSIT';
        } else if (expenseAmount) {
            amount = expenseAmount;
            type = 'EXPENSE';
        } else {
            alert("Please enter either expense amount or deposit amount.");
            return;
        }

        const newTransaction = await createTransaction(journeyId, amount, description, currency, type, transactionDate, category);

        if (!newTransaction) {
            return;
        }

        setTransactions([newTransaction, ...transactions]);

        await refreshCategorySummary();

        setDescription("");
        setDepositAmount("");
        setExpenseAmount("");
        setTransactionDate("");
    }

    async function handleDeleteTransaction(transactionId) {
        const confirmed = confirm("🗑️ Are you sure you want to delete this transaction?");
        if (!confirmed) {
            return
        }

        try {
            await deleteTransaction(journeyId, transactionId);
            setTransactions(transactions.filter(transaction => transaction.id !== transactionId));

            await refreshCategorySummary();

            alert("✅ Transaction deleted successfully!");
        } catch (error) {
            alert("❌ Delete failed! Please try again.");
        }


    }

    function handleEditTransaction(transaction) {
        let deposit;
        let expense;
        if (transaction.type === "DEPOSIT") {
            deposit = transaction.amount;
        } else if (transaction.type === "EXPENSE") {
            expense = transaction.amount;
        }
        setEditingTransactionId(transaction.id);
        setEditCurrency(transaction.currency);
        setEditTransactionDate(transaction.transactionDate);
        setEditCategory(transaction.category);
        setEditDescription(transaction.description);
        setEditDepositAmount(deposit);
        setEditExpenseAmount(expense);
    }

    async function handleSaveTransaction(transactionId) {
        const confirmed = confirm("Save changes to this transaction?");

        if (!confirmed) {
            return;
        }

        let amount;
        let type;

        if (editDepositAmount) {
            amount = Number(editDepositAmount);
            type = "DEPOSIT";
        } else if (editExpenseAmount) {
            amount = Number(editExpenseAmount);
            type = "EXPENSE";
        } else {
            alert("Please enter either expense amount or deposit amount.");
        }

        if (amount < 0) {
            alert("Please type a positive number");
            return;
        } 

        try {
            const updatedTransaction = await updateTransaction(journeyId, transactionId, amount, editDescription, editCurrency, type, editTransactionDate, editCategory);
            setTransactions(transactions.map(t => t.id === transactionId ? updatedTransaction : t));

            await refreshCategorySummary();

            setEditingTransactionId(null);    
            setCategory("");
            console.log(updatedTransaction);
            alert("✅ Changes saved successfully!")
        } catch (error) {
            alert("❗ Error: Save transaction failed");
        }
    }

    const totalDeposit = transactions.filter(t => t.type === "DEPOSIT").reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpense = transactions.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + Number(t.amount), 0);
    const balance = totalDeposit - totalExpense;

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }

    function getAmountClass(amount, isCurrentType) {
        if (!isCurrentType || Number(amount) === 0) {
            return "text-muted";
        }

        return isCurrentType === "DEPOSIT" ? "deposit-color" : "expense-color";
    }

    const countryCurrencies = {
    "Argentina": "ARS",
    "Australia": "AUD",
    "Austria": "EUR",
    "Belgium": "EUR",
    "Brazil": "BRL",
    "Canada": "CAD",
    "Chile": "CLP",
    "China": "CNY",
    "Colombia": "COP",
    "Czech Republic": "CZK",
    "Denmark": "DKK",
    "Egypt": "EGP",
    "Finland": "EUR",
    "France": "EUR",
    "Germany": "EUR",
    "Greece": "EUR",
    "Hungary": "HUF",
    "Iceland": "ISK",
    "India": "INR",
    "Indonesia": "IDR",
    "Ireland": "EUR",
    "Italy": "EUR",
    "Japan": "JPY",
    "Malaysia": "MYR",
    "Maldives": "MVR",
    "Mexico": "MXN",
    "Morocco": "MAD",
    "New Zealand": "NZD",
    "Norway": "NOK",
    "Philippines": "PHP",
    "Portugal": "EUR",
    "Qatar": "QAR",
    "Russia": "RUB",
    "Saudi Arabia": "SAR",
    "Singapore": "SGD",
    "South Africa": "ZAR",
    "South Korea": "KRW",
    "Spain": "EUR",
    "Sweden": "SEK",
    "Switzerland": "CHF",
    "Taiwan": "TWD",
    "Thailand": "THB",
    "Turkey": "TRY",
    "United Arab Emirates": "AED",
    "United Kingdom": "GBP",
    "United States": "USD",
    "Vietnam": "VND"
    };

    function getCategoryIcon(category) {
        switch (category) {
            case "TRANSPORTATION":
                return <FaCar />;
            case "ACCOMMODATION":
                return <FaHotel />;
            case "FOOD":
                return <FaUtensils />;
            case "ENTERTAINMENT":
                return <FaGamepad />;
            case "SHOPPING":
                return <FaShoppingBag />;
            case "INSURANCE":
                return <FaShieldAlt />;
            default:
                return <FaEllipsisH />;
        }
    }

    const allCategories = [
    "TRANSPORTATION",
    "ACCOMMODATION",
    "FOOD",
    "ENTERTAINMENT",
    "SHOPPING",
    "INSURANCE",
    "OTHER"
    ];

    const completedCategorySummary = allCategories.map((category) => {
        const found = categorySummary.find((item) => item.category === category);

        return {
            category: category,
            totalExpense: found ? found.totalExpense : 0,
            percentage: found ? found.percentage : 0
        };
    });


    return (
        <AppLayout title={journeyName + " - Transaction Details"}>
        <div className="page-container">
            <div className="form-card">
                <h2 className="section-title">Add New Transaction</h2>

                <form onSubmit={handleCreateTransaction} className="transaction-form">
                    <div className="form-row">
                        <label >Currency</label>
                        <select value={currency} disabled>
                            {
                                Object.entries(countryCurrencies).map(([country, code]) => (
                                    <option key={code} value={code}>
                                        {code}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-row">
                        <label >Date</label>
                        <input value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} type="datetime-local" required/>
                    </div>

                    <div className="form-row">
                        <label >Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value="">Select category</option>
                            <option value="TRANSPORTATION">Transportation</option>
                            <option value="ACCOMMODATION">Accommodation</option>
                            <option value="FOOD">Food</option>
                            <option value="ENTERTAINMENT">Entertainment</option>
                            <option value="SHOPPING">Shopping</option>
                            <option value="INSURANCE">Insurance</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <label >Description</label>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text"/>
                    </div>

                    <div className="form-row">
                        <label >Budget</label>
                        <input value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} type="number" min="0"/>
                    </div>

                    <div className="form-row">
                        <label >Expense</label>
                        <input value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} type="number" min="0"/>
                    </div>

                    <button className="btn-primary" type='submit'>Add Transaction</button>
                </form>
            </div>
        

            <div className="summary-card">
                <h2 className="summary-title">Summary</h2>
                <div className="summary-content">
                    <div className="summary-item">
                        <div className="summary-label">Travel Budget</div>
                        <div className="summary-value totalDeposit">
                            {totalDeposit.toLocaleString("en-US", { minimumFractionDigits: 2})} {currency}
                        </div>
                    </div>

                    <div className="summary-item">
                        <div className="summary-label">Total Expense</div>
                        <div className="summary-value totalExpense">
                            {totalExpense.toLocaleString("en-US", {
                                minimumFractionDigits: 2
                            })} {currency}
                        </div>
                    </div>
                    
                    <div className="summary-item">
                        <div className="summary-label">Remaining Balance</div>
                        <div className="summary-value">
                            {balance.toLocaleString("en-US", {
                                minimumFractionDigits: 2
                            })} {currency}
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="category-summary-card">
                <h4>Category Breakdown ({currency})</h4>
                {completedCategorySummary.map((item) => (
                    <div key={item.category} className={`category-summary-row ${item.category.toLowerCase()}`}>
                        <div className={`category-info ${item.category.toLowerCase()}`}>
                            <span className="category-icon">
                                {getCategoryIcon(item.category)}
                            </span>
                            <span className="category-name">{item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase()}</span>
                        </div>

                        <div className="category-amount-percentage">

                            <span className="category-amount">
                                {Number(item.totalExpense).toLocaleString("en-US", {
                                    minimumFractionDigits: 2
                                })}
                            </span>

                            <span className="category-percentage">
                                {item.percentage}%
                            </span>

                        </div>

                    </div>
                ))}
            </div>

            <div className="table-card">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th className="fixed-col-date">Date</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Budget</th>
                            <th>Expense</th>
                            <th className="hide-on-mobile">Currency</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                {editingTransactionId === transaction.id ? (
                                <>
                                    <td className="fixed-col-date">
                                        <input type="datetime-local" value={editTransactionDate} onChange={(e) => setEditTransactionDate(e.target.value)}/>
                                    </td>

                                    <td>
                                            <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                                                <option value="">Select category</option>
                                                <option value="TRANSPORTATION">Transportation</option>
                                                <option value="ACCOMMODATION">Accommodation</option>
                                                <option value="FOOD">Food</option>
                                                <option value="ENTERTAINMENT">Entertainment</option>
                                                <option value="SHOPPING">Shopping</option>
                                                <option value="INSURANCE">Insurance</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                    </td>

                                    <td>
                                        <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                                    </td>

                                    <td>
                                        <input type="number" value={editDepositAmount} onChange={(e) => setEditDepositAmount(e.target.value)} min="0"/>
                                    </td>

                                    <td>
                                        <input type="number" value={editExpenseAmount} onChange={(e) => setEditExpenseAmount(e.target.value)} min="0"/>
                                    </td>

                                    <td className="hide-on-mobile">
                                        <select value={editCurrency} onChange={(e) => setEditCurrency(e.target.value)} disabled>
                                            {
                                                Object.entries(countryCurrencies).map(([country, code]) => (
                                                    <option key={country} value={code}>
                                                        {code}
                                                    </option>
                                                ))
                                            }                                 
                                        </select>
                                    </td>


                                    <td className="action-buttons">
                                        <button className="cancel-button" onClick={() => setEditingTransactionId(null)}>Cancel</button>
                                        <button className="save-button" onClick={() => handleSaveTransaction(transaction.id)}>Save</button>
                                    </td>

                                </>
                                ) : (
                                    <>
                                        <td className="fixed-col-date">{formatDate(transaction.transactionDate)}</td>
                                        <td>{transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1).toLowerCase()}</td>
                                        <td>{transaction.description}</td>
                                        <td className={getAmountClass(transaction.amount, transaction.type === "DEPOSIT" ? "DEPOSIT" : null)}>{transaction.type === "DEPOSIT" ? transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 }) 
                                                                            : (0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                                        <td className={getAmountClass(transaction.amount, transaction.type === "EXPENSE" ? "EXPENSE" : null)}>{transaction.type === "EXPENSE" ? transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2}) 
                                                                            : (0).toLocaleString('en-US', { minimumFractionDigits: 2})}</td>
                                        <td className="hide-on-mobile">{transaction.currency}</td>
                                        <td className="action-buttons">
                                            <button className="btn-primary" onClick={() => handleEditTransaction(transaction)}>Edit</button>
                                            <button className="btn-danger" onClick={() => handleDeleteTransaction(transaction.id)}><FaTrash /></button>
                                        </td>
                                    </>
                                )}

                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
        </AppLayout>
    );
}

export default TransactionPage;