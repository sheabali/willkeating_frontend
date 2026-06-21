"use client";

import { Card } from "@/components/ui/card";
import {
  shippingSelector,
  subTotalSelector,
  taxSelector,
  totalSelector,
} from "@/redux/features/cartSlice";
import { CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";

export function OrderSummary() {
  const subtotal = useSelector(subTotalSelector) ?? 0;
  const tax = useSelector(taxSelector) ?? 0;
  const shipping = useSelector(shippingSelector) ?? 0;
  const total = useSelector(totalSelector) ?? 0;

  // safer formatter
  const formatPrice = (value: number) => {
    if (isNaN(value)) return "$0.00";

    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <Card className="p-6 bg-white shadow-lg sticky top-4">
      <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>

      <div className="space-y-3 mb-6 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? "FREE" : formatPrice(shipping)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Free Shipping Message */}
      {shipping === 0 && subtotal > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <span className="text-sm text-green-700">Free shipping applied!</span>
        </div>
      )}
    </Card>
  );
}
