import React, { createContext, useState } from 'react';

export const VoucherContext = createContext();

export const VoucherProvider = ({ children }) => {
    const [discount, setDiscount] = useState(0);
    const validVoucher = "toiyeupizza";

    const applyVoucher = (code) => {
        if (code === validVoucher) {
            setDiscount(10); // Giảm giá 10%
            return true;
        } else {
            setDiscount(0);
            return false;
        }
    };

    return (
        <VoucherContext.Provider value={{ discount, applyVoucher }}>
            {children}
        </VoucherContext.Provider>
    );
};
