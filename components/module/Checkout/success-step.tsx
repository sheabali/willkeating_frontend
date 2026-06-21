import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function SuccessStep({ orderId }: { orderId: string | null }) {
  return (
    <div className="flex items-center justify-center my-4 min-h-[60vh]">
      <Card className="p-12 bg-white shadow-lg max-w-2xl w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="bg-linear-to-r from-teal-50 to-cyan-50 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="text-2xl font-bold text-gray-900 font-mono">
            {String(orderId).toUpperCase()}
          </p>
        </div>

        <p className="text-gray-600 mb-8">
          A confirmation email has been sent to your email address with order
          details and tracking information.
        </p>

        {/* <div className="space-y-3">
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Premium Tournament Jersey - Home</span>
                <span>$159.98</span>
              </div>
              <div className="text-xs text-gray-500">Size: M | Qty: 2</div>

              <div className="flex justify-between mt-2">
                <span>Professional Soccer Cleats</span>
                <span>$149.99</span>
              </div>
              <div className="text-xs text-gray-500">Size: 10 | Qty: 1</div>

              <hr className="my-3" />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$334.77</span>
              </div>
            </div>
          </div>
        </div> */}

        <Link href="/">
          <Button className="w-full mt-8 h-12 text-white font-bold">
            Back to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}
