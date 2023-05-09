import {configureStore} from "@reduxjs/toolkit";
import portfolioSlice from "./reducers/portfolioSlice";

export default configureStore({
        reducer: {
            portfolio: portfolioSlice,
        },
    }
)