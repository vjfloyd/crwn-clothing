import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./routes/home/home-component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./components/shops/shop.component";
import Checkout from "./components/checkout/checkout.component";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {
    createUserDocumentFromAuth,
    onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils.js";
import {setCurrentUser} from "./store/user/user.action";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const subscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        return subscribe;
    }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
