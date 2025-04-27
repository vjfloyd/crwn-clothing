import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {FormContainer, PaymentButton, PaymentFormContainer} from "./payment-form.styles";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/user/user.selector";
import {selectCartTotal} from "../../store/carts/cart.selector";
import {FormEvent, useState} from 'react';
import { StripeCardElement} from '@stripe/stripe-js';

const ifValidCardElement =
    (cardElement: StripeCardElement | null): cardElement is StripeCardElement => cardElement !== null;


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const currentUser = useSelector(selectCurrentUser);
    const amount = useSelector(selectCartTotal);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
        console.log("Payment handler");
        event.preventDefault();
        if(!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true);
        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount : amount * 100}),

        }).then(response => response.json());
        console.log(response);

        const { paymentIntent : { client_secret} } = response;
        console.log("Payment Intent", client_secret);

        const cardDetails = elements.getElement(CardElement);
        if (!ifValidCardElement(cardDetails)) return;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest",
                }
            }
        });
        setIsProcessingPayment(false);
        if (paymentResult.error) {
            alert(paymentResult);
        }else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert("Payment successful");
            }
        }
    };

    return (
        <PaymentFormContainer>
           <FormContainer onSubmit={paymentHandler}>
               <h2> Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment}  buttonType={BUTTON_TYPE_CLASSES.inverted}>
                    Pay now
                </PaymentButton>
           </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
