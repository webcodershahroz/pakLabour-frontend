import React, { useContext, useEffect, useState } from "react";
import Alert from "../utils/Alert";
import { StateContext } from "../../context/StateContext";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";

function MakeTransaction() {
  const {
    isAlertVisible,
    alertData,
    setAlertData,
    hideAlert,
    setIsAlertVisible,
  } = useContext(StateContext);

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [stateData, setStateData] = useState({});
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const makeTransaction = async () => {
    if (!stripe || !elements) return;
    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a payment method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setIsLoading(false);
        console.error("Payment Error:", error);
        setAlertData({
          title: "Payment Failed",
          message: error.message,
          type: "error",
        });
        setIsAlertVisible(true);
        hideAlert();
        return;
      }

      // Backend payment processing
      const payload = {
        amount: stateData.jobPrice,
        paymentMethodId: paymentMethod.id,
        workerUserProfileId : stateData.wid._id
      };

      fetch("http://localhost:2000/pay/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(async (res) => {
        const data = await res.json();
        setIsLoading(false);

        if (data.success) {
          setAlertData({
            title: "Payment Successful",
            message: "Transaction completed successfully!",
            type: "success",
          });
          setIsAlertVisible(true);
          hideAlert();
          navigate("/give-review", { state: stateData }); // Redirect after success
        } else {
          setAlertData({
            title: "Transaction Faied",
            message: data.message,
            type: "error",
          });
          setIsAlertVisible(true);
          hideAlert();
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error("Transaction Error:", error);
      setAlertData({
        title: "Transaction Error",
        message: error.message,
        type: "error",
      });
      setIsAlertVisible(true);
      hideAlert();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setStateData(location.state);
  }, []);

  return (
    <>
      {isAlertVisible && <Alert alertData={alertData} />}
      {stateData.jobTitle && (
        <div className="h-[100vh] w-full mb-10 mt-20">
          <div className="px-6 w-[70vw] mx-auto lg:py-0 my-10">
            <div className="bg-white rounded-lg shadow dark:border dark:border-gray-700">
              <div className="flex items-center justify-center flex-wrap p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="w-1/2">
                  <div className="mb-3">
                    <h1 className="text-xl font-bold md:text-2xl ">
                      Payment through Card
                    </h1>
                    <p className="text-sm font-normal">Enter phone number</p>
                  </div>

                  {/* <div className="mb-3">
                    <label
                      htmlFor="phoneno"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneno"
                      id="phoneno"
                      value={phoneno}
                      onChange={(e) => setPhoneno(e.target.value)}
                      className="block w-full mt-2 p-2 border border-gray-300 rounded-md text-gray-900"
                      placeholder="03XX-XXXXXXX"
                      required
                    />
                  </div> */}

                  {/* Stripe Card Element */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-900">
                      Card Details
                    </label>
                    <div className="p-3 border border-gray-300 rounded-md">
                      <CardElement />
                    </div>
                  </div>

                  <button
                    onClick={makeTransaction}
                    className={`w-full flex items-center justify-center py-2 rounded-full font-medium ${
                      isLoading
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-brandcolor"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Next"}
                  </button>
                </div>

                <div className="w-px h-[280px] mx-10 bg-black"></div>

                <div className="w-1/3">
                  <div className="mb-3">
                    <h1 className="text-xl font-bold md:text-2xl ">
                      {stateData.jobTitle}
                    </h1>
                    <p className="text-sm font-normal">
                      {stateData.jobDescription}
                    </p>
                    <p className="text-xs">
                      From {stateData.jobStartTime} to {stateData.jobEndTime} in
                      PKR {stateData.jobPrice} at {stateData.jobLocation}
                    </p>
                  </div>
                  <div className="mb-3">
                    <h2 className="font-bold text-gray-600">Order with:</h2>
                    <div className="flex gap-2">
                      <img
                        height={20}
                        width={20}
                        src={`http://localhost:2000/${stateData.wid?.picture}`}
                        alt="Worker"
                      />
                      <p>{stateData.wid?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MakeTransaction;
