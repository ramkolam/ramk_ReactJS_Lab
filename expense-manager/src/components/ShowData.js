import { useEffect, useState } from "react";
import { getExpense } from "../services/expenseService";
import { useNavigate } from "react-router-dom"

function ShowData() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [sum, setSum] = useState();
    const [rahulSpent, setRahulSpent] = useState(0);
    const [rameshSpent, setRameshSpent] = useState(0);
    const [showform, setShowForm] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await getExpense();
                setItems(data);
                setSum(data.reduce((result, v) => (result = parseFloat(result) + parseFloat(v.price)), 0));
                calculateShares(data);
            } catch (error) {
                setError(error);
            }
        };
        fetchMenu();
    }, [showform]);

    const calculateShares = (data) => {
        let rahul_spent = 0;
        let ramesh_spent = 0;

        data.map((sams) =>
            sams.payeeName === "Rahul"
                ? (rahul_spent = parseFloat(rahul_spent) + parseFloat(sams.price))
                : (ramesh_spent = parseFloat(ramesh_spent) + parseFloat(sams.price))
        );
        setRahulSpent(rahul_spent);
        setRameshSpent(ramesh_spent);
    };

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => navigate("/add")}>
                Add
            </button>
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{ width: 112 }}>
                    Payee
                </div>
            </>
            {items &&
                items.map((user, idx) => (
                    <div key={idx}>
                        <div className="use-inline date">{user.billDate}</div>
                        <div className="use-inline">{user.product}</div>
                        <div className="use-inline price">{user.price}</div>
                        <div className={`use-inline ${user.payeeName}`}>
                            {user.payeeName}
                        </div>
                    </div>
                ))}
            <hr />
            <div className="use-inline ">Total: </div>
            <span className="use-inline total">{sum}</span> <br />
            <div className="use-inline ">Rahul paid: </div>
            <span className="use-inline total Rahul">{rahulSpent}</span> <br />
            <div className="use-inline ">Ramesh paid: </div>
            <span className="use-inline total Ramesh">{rameshSpent}</span> <br />
            <span className="use-inline payable">
                {rahulSpent > rameshSpent ? "Pay Rahul " : "Pay Ramesh"}
            </span>
            <span className="use-inline payable price">
                {" "}
                {Math.abs((parseFloat(rahulSpent) - parseFloat(rameshSpent)) / 2)}
            </span>
            {error && <>{error?.message}</>}
        </>
    );
}
export default ShowData;