/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

import { cartProductsSelector } from "@/redux/features/cartSlice";
import { useSelector } from "react-redux";
import { OrderSummary } from "./order-summary";
import { StepIndicator } from "./step-indicator";

interface ReviewStepProps {
  shippingData: any;
  paymentData: any;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

export function ReviewStep({
  shippingData,
  paymentData,
  loading,
  onSubmit,
  onBack,
}: ReviewStepProps) {
  const cartItems = useSelector(cartProductsSelector);

  const orderItems = cartItems.map((item) => ({
    productId: item.id,
    name: item.name,
    quantity: item.quantity,
    unitPrice: item.price,
  }));

  return (
    <>
      <StepIndicator
        steps={["Shipping", "Payment", "Review"]}
        currentStep={2}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 bg-white shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Review Your Order
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Shipping Address
                </h4>
                <div className="text-gray-700 space-y-1">
                  <p className="font-medium">
                    {shippingData.firstName} {shippingData.lastName}
                  </p>
                  <p>{shippingData.address}</p>
                  <p>
                    {shippingData.city}, {shippingData.state}{" "}
                    {shippingData.zipCode}
                  </p>
                  <p>{shippingData.email}</p>
                  <p>{shippingData.phone}</p>
                </div>
              </div>

              <hr className="my-4" />

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Payment Method
                </h4>
                <div className="flex items-center gap-3 text-gray-700">
                  <CreditCard className="w-5 h-5" />
                  <div>
                    <p className="font-medium">
                      •••• •••• •••• {paymentData.slice(-4)}
                    </p>
                    {/* <p className="text-sm">{paymentData.cardholderName}</p> */}
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Order Items
                </h4>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 bg-white rounded-lg shadow-md p-4 transition duration-200 hover:shadow-xl"
                    >
                      {/* Image Section */}
                      {/* {item.productImage && (
                        <img
                          src={item.productImage}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )} */}

                      {/* Card with Order Information */}
                      <div className="flex-1">
                        <p className="font-semibold text-lg text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: ${item.unitPrice}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6 mt-6 border-t">
              <Button
                variant="outline"
                className="flex-1 h-12 font-bold bg-transparent"
                onClick={onBack}
              >
                Back
              </Button>
              <Button
                className="flex-1 h-12  text-white font-bold"
                onClick={onSubmit}
                disabled={loading}
                loading={loading}
              >
                Place Order
              </Button>
            </div>
          </Card>
        </div>

        <div>
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
