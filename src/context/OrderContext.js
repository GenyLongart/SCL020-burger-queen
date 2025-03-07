import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

    const [orderItems, setOrderItems] = useState([])

    const addItemToOrder = (product) => {
        const inOrder = orderItems.find(
            (productInOrder) => productInOrder.id === product.id
        );
        if (inOrder) {
            setOrderItems(
                orderItems.map((productInOrder) => {
                    if (productInOrder.id === product.id) {
                        return { ...inOrder, amount: inOrder.amount + 1 }
                    } else return productInOrder
                })
            );
        } else {
            setOrderItems([...orderItems, { ...product, amount: 1 }]);
        }};

        const deleteItemInOrder = (product) => {
            const inOrder = orderItems.find(
                (productInOrder) => productInOrder.id === product.id
            );

            if (inOrder.amount === 1) {
                setOrderItems(
                    orderItems.filter((productInOrder) => productInOrder.id !== product.id)
                );
            } else {
                setOrderItems(
                    orderItems.map((productInOrder) => {
                    if (productInOrder.id === product.id) {
                        return { ...inOrder, amount: inOrder.amount - 1 }
                    } else return productInOrder
                }));
            }
        };

        return (
            <OrderContext.Provider value={{ orderItems, setOrderItems, addItemToOrder, deleteItemInOrder }}>
                {children}
            </OrderContext.Provider>
        )

};