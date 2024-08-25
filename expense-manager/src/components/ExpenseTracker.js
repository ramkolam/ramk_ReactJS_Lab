import { useState } from "react";
import { postExpense } from "../services/expenseService";
import { useNavigate } from "react-router-dom"

function ExpenseTracker(props) {
    const navigate = useNavigate();
    const [payeeName, setPayeeName] = useState("");
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState(0);
    const [billDate, setBillDate] = useState(new Date().toISOString().substring(0, 10));
    const [message, setMessage] = useState("");

    const handlePayeeNameChange = (event) => {
        setPayeeName(event.target.value);
    }
    const handleProductChange = (event) => {
        setProduct(event.target.value);
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }
    const handleBillDateChange = (event) => {
        setBillDate(event.target.value);
    }

    let submitHandler = async (event) => {
        event.preventDefault();
        const newExpense = {
            payeeName,
            product,
            price,
            billDate
        }
        const data = await postExpense(newExpense);
        setMessage("Saved expense successfully!");
    }

    return (
        <section>
            <header>
                <h1>Add New Item</h1>
                <p>Read the belwo instructions before proceeding:
                    <br></br> Make sure you fill all the fields where * is provided
                </p>
            </header>
            <h1>{message}</h1>
            <form onSubmit={submitHandler}>
                <article>
                    <p>Name</p>
                    <select required value={payeeName} onChange={handlePayeeNameChange}>
                        <option value="">Choose</option>
                        <option value="Rahul">Rahul</option>
                        <option value="Ramesh">Ramesh</option>
                    </select>
                </article>

                <article>
                    <p>Product Purchased</p>
                    <input type="text" required value={product} onChange={handleProductChange}></input>
                </article>

                <article>
                    <p>Price</p>
                    <input type="number" required value={price} onChange={handlePriceChange}></input>
                </article>

                <article>
                    <p>Date</p>
                    <input type="date" required value={billDate} onChange={handleBillDateChange}></input>
                </article>

                <button className="form-button" type="button" onClick={() => navigate("/")}>Close</button>

                <button className="form-button" type="submit" onClick={() => {

                    setTimeout(() => {
                        setMessage("");
                        navigate("/");
                    }, 1700);
                }}>Submit</button>


            </form>

        </section>
    )
}

export default ExpenseTracker;