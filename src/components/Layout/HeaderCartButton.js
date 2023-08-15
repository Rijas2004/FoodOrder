import { useContext, useEffect, useState } from "react";

import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { ShoppingCart } from "@mui/icons-material";

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true)
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300);

        return (() => {
            clearTimeout(timer)
        })
    }, [items])

    const btnClass = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

    return <button className={btnClass} onClick={props.onClick}>
        <span className={styles.icon}>
            <ShoppingCart />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
};

export default HeaderCartButton;