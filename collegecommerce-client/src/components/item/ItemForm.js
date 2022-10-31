import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { findByItemId, findAll, save } from "../../services/itemService";

function ItemForm() {
    const [item, setItem] = useState({
        itemId: 0,
        name: "",
        price: 0,
        description: "",
        itemCondition: "",
        itemSold: false,
        category: "",
        imageUrl: ""
    });
    const [errs, setErrs] = useState([]);
    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            findByItemId(id)
                .then(setItem)
                .catch(() => history.push("/invalid"));
        }
    }, []);

    function handleChange(evt) {
        const nextItem = { ...item };
        nextItem[evt.target.name] = evt.target.value;
        setItem(nextItem);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        save(item)
            .then(() => history.push("/items"))
            .catch(errs => {
                if (errs) {
                    setErrs(errs);
                } else {
                    history.push("/error")
                }
            });
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>{id > 0 ? "Edit item" : "Add item"}</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" id="name" className="form-control"
                    value={item.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" name="price" id="price" className="form-control"
                    value={item.price} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" name="description" id="description" className="form-control"
                    value={item.description} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="itemCondition" className="form-label">Item Condition</label>
                <input type="text" name="itemCondition" id="itemCondition" className="form-control"
                    value={item.itemCondition} onChange={handleChange} />
            </div>
            {/* Not sure if we want to allow user to say if an item is sold, should be done automatically */}
            {/* <div className="mb-3">
                <label htmlFor="itemSold" className="form-label">Item Sold</label>
                <input type="text" name="itemSold" id="itemSold" className="form-control"
                    value={item.itemSold} onChange={handleChange} />
            </div> */}
            {/* <fieldset>
                <legend>Item Sold</legend>
                <div className="mb-3">
                    <label htmlFor="itemSold" className="form-label">True</label>
                    <input type="radio" id="itemSold" name="itemSold"
                        value={item.itemSold} onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="itemSold" className="form-label">False</label>
                    <input type="radio" id="itemSold" name="itemSold"
                        value={item.itemSold} onChange={handleChange}></input>
                </div>
            </fieldset> */}
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" name="category" id="category" className="form-control"
                    value={item.category} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">Image URL</label>
                <input type="text" name="imageUrl" id="imageUrl" className="form-control"
                    // value={item.imageUrl} 
                    onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="isAvailable" className="form-label">Is Available</label>
                <input type="text" name="isAvailable" id="isAvailable" className="form-control"
                    // value={item.imageUrl} 
                    onChange={handleChange} />
            </div>
            {
                errs.length !== 0 && <div className="alert alert-danger">
                    <ul>
                        {errs.map(err => <li key={err}>{err}</li>)}
                    </ul>
                </div>
            }
            <div className="mb-3">
                <button className="btn btn-primary me-2" type="submit">Save</button>
                <Link to="/items" className="btn btn-warning">Cancel</Link>
            </div>
        </form >
    );
}

export default ItemForm;